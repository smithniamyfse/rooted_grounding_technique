const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// Get all see inputs for a specific event entry
router.get("/:entryId", rejectUnauthenticated, (req, res) => {
  const entryId = req.params.entryId;
  let queryText = `SELECT * FROM "see_inputs" WHERE user_event_id=$1;`;
  pool
    .query(queryText, [entryId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error in GETting of /api/see-inputs/:entryId: ", error);
      res.sendStatus(500);
    });
});

// Add a see input for a specific event entry
router.post("/", rejectUnauthenticated, (req, res) => {
  const newSeeInput = req.body.seeInput;
  const entryId = req.body.entryId;
  const queryText = `
    INSERT INTO "see_inputs" ("see_item_1", "user_event_id")
    VALUES ($1, $2)
  `;
  const queryParams = [newSeeInput, entryId];
  pool
    .query(queryText, queryParams)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error making query ${queryText}`, error);
      res.sendStatus(500);
    });
});

module.exports = router;
