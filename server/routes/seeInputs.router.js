const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "see_inputs" WHERE "user_event_id"=$1;`;
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error in GETting request for see inputs: ", error);
      res.sendStatus(500);
    });
});

router.post("/", rejectUnauthenticated, (req, res) => {
    const { see_item_1, see_item_2, see_item_3, see_item_4, see_item_5, eventId } = req.body;  // Destructure the properties directly from req.body
    console.log("In seeInputs POSTing see items: ", req.body); 

    const queryText = `
        INSERT INTO "see_inputs" ("see_item_1", "see_item_2", "see_item_3", "see_item_4", "see_item_5", "user_event_id")
        VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const queryValues = [
        see_item_1,
        see_item_2,
        see_item_3,
        see_item_4,
        see_item_5,
        eventId,
    ];

    pool
        .query(queryText, queryValues)
        .then(() => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making query ${queryText}`, error);
            res.sendStatus(500);
        });
});


module.exports = router;

