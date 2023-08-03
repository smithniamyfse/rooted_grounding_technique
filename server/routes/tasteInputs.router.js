const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "taste_inputs" WHERE "user_event_id"=$1;`;
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error in GETting request for taste input: ", error);
      res.sendStatus(500);
    });
});

// Add taste input for a specific event entry
router.post("/", rejectUnauthenticated, (req, res) => {
  // Destructure the properties directly from req.body
  const { taste_item_1, userId, eventId } = req.body;
  console.log("In tasteInputs, POSTing taste item: ", req.body);

  const queryText = `
    INSERT INTO "taste_inputs" ("taste_item_1", "user_id", "user_event_id")
    VALUES ($1, $2, $3)
`;

  const queryValues = [taste_item_1, userId, eventId];

  pool
    .query(queryText, queryValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error making query taste ${queryText}`, error);
      res.sendStatus(500);
    });
});

module.exports = router;