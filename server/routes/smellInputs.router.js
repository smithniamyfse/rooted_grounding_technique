const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "smell_inputs" WHERE "user_event_id"=$1;`;
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error in GETting request for smell inputs: ", error);
      res.sendStatus(500);
    });
});

// Add smell inputs for a specific event entry
router.post("/", rejectUnauthenticated, (req, res) => {
  // Destructure the properties directly from req.body
  const { smell_item_1, smell_item_2, userId, eventId } = req.body;
  console.log("In smellInputs, POSTing smell items: ", req.body);

  const queryText = `
    INSERT INTO "smell_inputs" ("smell_item_1", "smell_item_2", "user_id", "user_event_id")
    VALUES ($1, $2, $3, $4)
`;

  const queryValues = [smell_item_1, smell_item_2, userId, eventId];

  pool
    .query(queryText, queryValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error making query smell ${queryText}`, error);
      res.sendStatus(500);
    });
});

module.exports = router;
