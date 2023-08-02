const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const { rejectUnauthenticated } = require("../modules/authentication-middleware");

router.get("/", rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "touch_inputs" WHERE "user_event_id"=$1;`;
    pool.query(queryText, [req.user.id])
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('Error in GET request for touch inputs: ', error);
        res.sendStatus(500);
    })
});

router.post("/", rejectUnauthenticated, (req, res) => {
    const newInput = req.body;
    const userId = req.user.id;
    const queryText = `
        INSERT INTO "touch_inputs" ("touch_item_1", "touch_item_2", "touch_item_3", "touch_item_4", "user_event_id")
        VALUES ($1, $2, $3, $4, $5)
    `;
    const queryValues = [
        newInput.touch_item_1,
        newInput.touch_item_2,
        newInput.touch_item_3,
        newInput.touch_item_4,
        userId,
    ]
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
