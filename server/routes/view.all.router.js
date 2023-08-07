const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET: Retrieve all entries from the user_event_entries table and the image urls from the user_images table
// Filter the results by user ID
router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = `
    SELECT "user_event_entries".*, "user_images"."image_url"
    FROM "user_event_entries"
    LEFT JOIN "user_images"
    ON "user_event_entries"."id" = "user_images"."user_event_id"
    WHERE "user_event_entries"."user_id" = $1
    ORDER BY "user_event_entries"."date" DESC
    `;
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error in GETting entries from /api/view-all: ", error);
      res.sendStatus(500);
    });
});

router.get("/:id", rejectUnauthenticated, (req, res) => {
  const queryText = `
    SELECT * FROM "user_event_entries" WHERE id=$1;
    `;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error completing SELECT event entry query", error);
      res.sendStatus(500);
    });
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


router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const queryText = `
    DELETE FROM "user_event_entries" WHERE id=$1;
    `;
  pool
    .query(queryText, [req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error deleting specific event entry", error);
      res.sendStatus(500);
    });
});

module.exports = router;