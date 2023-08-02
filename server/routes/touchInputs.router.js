const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "touch_inputs" WHERE "user_event_id"=$1;`;
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error in GETting request for touch inputs: ", error);
      res.sendStatus(500);
    });
});

// Add touch inputs for a specific event entry
router.post("/", rejectUnauthenticated, (req, res) => {
  // Destructure the properties directly from req.body
  const {
    touch_item_1,
    touch_item_2,
    touch_item_3,
    touch_item_4,
    userId,
    eventId,
  } = req.body;
  console.log("In touchInputs POSTing touch items: ", req.body);

  const queryText = `
        INSERT INTO "touch_inputs" ("touch_item_1", "touch_item_2", "touch_item_3", "touch_item_4", "user_id", "user_event_id")
        VALUES ($1, $2, $3, $4, $5, $6)
    `;
  const queryValues = [
    touch_item_1,
    touch_item_2,
    touch_item_3,
    touch_item_4,
    userId,
    eventId,
  ];

  pool
    .query(queryText, queryValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error making query touch ${queryText}`, error);
      res.sendStatus(500);
    });
});

module.exports = router;
