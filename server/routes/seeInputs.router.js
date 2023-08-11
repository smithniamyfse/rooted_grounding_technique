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

// Addition ***
router.get("/:event_id", rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "see_inputs" WHERE "user_id"=$1 AND "user_event_id"=$2;`;
    const eventId = req.params.event_id;
    pool
      .query(queryText, [req.user.id, eventId])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log("Error in GETting request for see inputs: ", error);
        res.sendStatus(500);
      });
  });
  


// Add see inputs for a specific event entry
router.post("/", rejectUnauthenticated, (req, res) => {
  // Destructure the properties directly from req.body
  const {
    see_item_1,
    see_item_2,
    see_item_3,
    see_item_4,
    see_item_5,
    userId,
    eventId,
  } = req.body;
  console.log("In seeInputs, POSTing see items: ", req.body);

  const queryText = `
        INSERT INTO "see_inputs" ("see_item_1", "see_item_2", "see_item_3", "see_item_4", "see_item_5", "user_id", "user_event_id")
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
  const queryValues = [
    see_item_1,
    see_item_2,
    see_item_3,
    see_item_4,
    see_item_5,
    userId,
    eventId,
  ];

  pool
    .query(queryText, queryValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error making POST query for saving values in see_inputs ${queryText}: `, error);
      res.sendStatus(500);
    });
});


router.put("/:id", rejectUnauthenticated, (req, res) => {
  // Update this single see_item
  const idToUpdate = req.params.id;
  const queryText = `
  UPDATE "see_inputs"
  SET 
  "see_item_1" = $1, 
  "see_item_2" = $2, 
  "see_item_3" = $3, 
  "see_item_4" = $4, 
  "see_item_5" = $5 
  WHERE "id" = $6;`;
  pool
    .query(queryText, [
      req.body.see_item_1,
      req.body.see_item_2,
      req.body.see_item_3,
      req.body.see_item_4,
      req.body.see_item_5,
      idToUpdate,
    ])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error making PUT query for updating specific see_item ${queryText}: `, error);
      res.sendStatus(500);
    });
});

module.exports = router;

// ** OG WORKING VERSION BEFORE THE IMAGE MAP **
// const express = require("express");
// const router = express.Router();
// const pool = require("../modules/pool");
// const {
//   rejectUnauthenticated,
// } = require("../modules/authentication-middleware");

// router.get("/", rejectUnauthenticated, (req, res) => {
//   const queryText = `SELECT * FROM "see_inputs" WHERE "user_event_id"=$1;`;
//   pool
//     .query(queryText, [req.user.id])
//     .then((result) => {
//       res.send(result.rows);
//     })
//     .catch((error) => {
//       console.log("Error in GETting request for see inputs: ", error);
//       res.sendStatus(500);
//     });
// });

// // Add see inputs for a specific event entry
// router.post("/", rejectUnauthenticated, (req, res) => {
//   // Destructure the properties directly from req.body
//   const {
//     see_item_1,
//     see_item_2,
//     see_item_3,
//     see_item_4,
//     see_item_5,
//     userId,
//     eventId,
//   } = req.body;
//   console.log("In seeInputs, POSTing see items: ", req.body);

//   const queryText = `
//         INSERT INTO "see_inputs" ("see_item_1", "see_item_2", "see_item_3", "see_item_4", "see_item_5", "user_id", "user_event_id")
//         VALUES ($1, $2, $3, $4, $5, $6, $7)
//     `;
//   const queryValues = [
//     see_item_1,
//     see_item_2,
//     see_item_3,
//     see_item_4,
//     see_item_5,
//     userId,
//     eventId,
//   ];

//   pool
//     .query(queryText, queryValues)
//     .then(() => {
//       res.sendStatus(201);
//     })
//     .catch((error) => {
//       console.log(`Error making query see ${queryText}`, error);
//       res.sendStatus(500);
//     });
// });

// module.exports = router;
