const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const fs = require("fs");
const cfUtil = require("aws-cloudfront-sign");

const privateKeyString = fs.readFileSync(
  process.env.CLOUDFRONT_PRIVATE_KEY_PATH,
  "utf8"
);

// GET: Retrieve all entries from the user_event_entries table and the image urls from the user_images table
// Filter the results by user ID
router.get("/", rejectUnauthenticated, async (req, res) => {
  const queryText = `
    SELECT "user_event_entries".*, "user_images"."image_url"
    FROM "user_event_entries"
    LEFT JOIN "user_images"
    ON "user_event_entries"."id" = "user_images"."user_event_id"
    WHERE "user_event_entries"."user_id" = $1
    ORDER BY "user_event_entries"."date" DESC
    `;
  try {
    const result = await pool.query(queryText, [req.user.id]);
    const signedEntries = result.rows.map((row) => {
      if (row.image_url) {
        const key = row.image_url.split(".com/")[1];
        const cfUrl = `https://${process.env.CLOUDFRONT_DISTRIBUTION_ID}.cloudfront.net/${key}`;

        const options = {
            keypairId: process.env.CLOUDFRONT_KEY_PAIR_ID,
            privateKeyString,
            // URL expires in 7 days
            expireTime: Date.now() + 1000 * 60 * 60 * 24 * 7,
          };

        row.image_url = cfUtil.getSignedUrl(cfUrl, options);
      }
      return row;
    });

    res.send(signedEntries);
  } catch (error) {
    console.log("Error in GETting entries from /api/view-all: ", error);
    res.sendStatus(500);
  }
});

// PUT: Update the date and time of a specific entry
router.put("/", rejectUnauthenticated, (req, res) => {
  const updatedDateTime = req.body;

  const queryText = `
  UPDATE "user_event_entries"
  SET "date" = $1,
  "time" = $2
  WHERE id = $3;
`;

  const queryValues = [
    updatedDateTime.date,
    updatedDateTime.time,
    updatedDateTime.id,
  ];

  pool
    .query(queryText, queryValues)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error PUTting updated date and time", error);
      res.sendStatus(500);
    });
});

router.delete("/:id", rejectUnauthenticated, async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN"); // Start transaction

    const deleteInputsQueries = [
      'DELETE FROM "see_inputs" WHERE "user_event_id" = $1;',
      'DELETE FROM "touch_inputs" WHERE "user_event_id" = $1;',
      'DELETE FROM "hear_inputs" WHERE "user_event_id" = $1;',
      'DELETE FROM "smell_inputs" WHERE "user_event_id" = $1;',
      'DELETE FROM "taste_inputs" WHERE "user_event_id" = $1;',
      'DELETE FROM "user_images" WHERE "user_event_id" = $1;',
    ];

    for (let query of deleteInputsQueries) {
      await client.query(query, [req.params.id]);
    }

    const deleteUserEventEntriesQuery =
      'DELETE FROM "user_event_entries" WHERE "id" = $1;';
    await client.query(deleteUserEventEntriesQuery, [req.params.id]);

    await client.query("COMMIT"); // Commit transaction

    res.sendStatus(200);
  } catch (error) {
    await client.query("ROLLBACK"); // Rollback transaction in case of error
    console.log("Error deleting specific event entry", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

module.exports = router;
