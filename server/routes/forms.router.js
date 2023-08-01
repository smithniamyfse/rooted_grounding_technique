const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// Get all inputted items for each sense type
router.get("/", rejectUnauthenticated, (req, res) => {
  let queryText = `SELECT * FROM "inputs";`;
  pool
    .query(queryText)
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
    console.log("Inside /api/forms/see POST route with req.body:", req.body);
  // Check endpoint
  console.log("Inside of /api/forms/see req.body: ", req.body);
  let label = req.body.label;
  let triggerId = req.body.triggerId; // <=== CHANGED HERE
  // queryText for data fields and sql injection
  const queryText = `
    INSERT INTO "inputs" (see_input, trigger_id)
    VALUES ($1, $2)
    `;
  // Re-declaring data fields
  const queryParams = [label, triggerId];
  pool
    .query(queryText, queryParams)
    .then((results) => {
        console.log("Query results:", results);
      res.send(201);
    })
    .catch((error) => {
      console.log(`Error making query ${queryText}`, error);
      res.sendStatus(500);
    });
});

module.exports = router;
