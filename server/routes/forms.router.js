const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// Get all inputted items for each sense type
router.get("/", rejectUnauthenticated, (req, res) => {
  let sqlQuery = `SELECT * FROM "inputs";`;
  pool
    .query(sqlQuery)
    .then((result) => {
      res.send(result.rows);
      console.log("Server request successful: ", result.rows);
    })
    .catch((error) => {
      console.log("Error in GETting of /forms: ", error);
      res.sendStatus(500);
    });
});

// Add see items for the logged-in user
router.post("/api/forms/see", rejectUnauthenticated, (req, res) => {
  // Check endpoint
  console.log("Inside of /api/forms/see req.body: ", req.body);
  let label = req.body.label;
  let triggerId = req.trigger.id;
  // queryText for data fields and sql injection
  const queryText = `
    INSERT INTO "inputs" (see_input, trigger_id)
    VALUES ($1, $2)
    `;
  // Re-declaring data fields
  const queryParams = [label, triggerId];
  // Bringing in pool
  pool
    .query(queryText, queryParams)
    .then((results) => {
      res.send(201);
    })
    .catch((error) => {
      console.log(`Error making query ${queryText}`, error);
      res.sendStatus(500);
    });
});

module.exports = router;
