const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// Get all event entries for a particular user
router.get("/", rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT * FROM "user_event_entries" WHERE "user_id"=$1;`;
    pool.query(queryText, [req.user.id])
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('Error in GET request for event entries: ', error);
        res.sendStatus(500);
    })
});

// Get specific event entry for a particular user
router.get('/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "user_event_entries" WHERE "id"=$1 AND "user_id"=$2;`;
    pool.query(queryText, [req.params.id, req.user.id])
    .then(result => { 
        res.send(result.rows); 
    })
    .catch(error => {
        console.log('Error completing SELECT event entry query', error);
        res.sendStatus(500);
    });
});

// Create new event entry for the logged-in user
router.post("/", rejectUnauthenticated, (req, res) => {
    const newEntry = req.body;
    const userId = req.user.id;
    const queryText = `
      INSERT INTO "user_event_entries" ("location", "date", "time", "intensity_rating", "user_id")
      VALUES ($1, $2, $3, $4, $5)
    `;
    const queryValues = [
        newEntry.location,
        newEntry.date,
        newEntry.time,
        newEntry.intensity_rating,
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

// TODO: (If necessary) Update an event entry for the logged-in user
// router.put("/:id", rejectUnauthenticated, (req, res) => { ... });

// TODO: (If necessary) Delete an event entry for the logged-in user
// router.delete("/:id", rejectUnauthenticated, (req, res) => { ... });

module.exports = router;



// ** VERSION 1 **
// const express = require("express");
// const router = express.Router();
// const pool = require("../modules/pool");
// const {
//   rejectUnauthenticated,
// } = require("../modules/authentication-middleware");

// // Get all event entries for a particular user
// router.get("/", rejectUnauthenticated, (req, res) => {
//     console.log('In GET request for triggers: ', req.body);
//     let queryText = `SELECT * FROM "triggers";`;
//     pool.query(queryText)
//     .then (result => {
//         res.send(result.rows);
//         console.log('Server request for GET triggers: ', result.rows);
//     })
//     .catch(error => {
//         console.log('Error in GET request for triggers: ', error);
//         res.sendStatus(500);
//     })
// });

// router.get('/:id', rejectUnauthenticated, (req, res) => {
//     const queryText = `SELECT * FROM "triggers" WHERE id=$1`;
//     pool.query(queryText, [req.user.id])
//     .then((result) => { res.send(result.rows); })
//     .catch((error) => {
//         console.log('Error completing SELECT trigger query', error);
//         res.sendStatus(500);
//     });
// });

// // // Create a new trigger for the logged-in user
// // router.post("/", rejectUnauthenticated, (req, res) => {
// //   // Implement your code here...
// // });

// // Create new trigger event for the logged-in user
// router.post("/", rejectUnauthenticated, (req, res) => {
//     console.log('inside of /api/triggers req.body', req.body);
//     const newTrigger = req.body;
//     const userId = req.user.id;
//     const queryText = `
//       INSERT INTO "triggers" (location, date, time, intensity_rating, user_id)
//       VALUES ($1, $2, $3, $4, $5)
//     `;
//     const queryValues = [
//         newTrigger.location,
//         newTrigger.date,
//         newTrigger.time,
//         newTrigger.intensity_rating,
//         userId,  // Use userId directly here
//     ]
//     pool
//       .query(queryText, queryValues)
//       .then((results) => {
//         res.send(201);
//       })
//       .catch((error) => {
//         console.log(`Error making query ${queryText}`, error);
//         res.sendStatus(500);
//       });
// });




// // Update a trigger for the logged-in user
// router.put("/:id", rejectUnauthenticated, (req, res) => {
//   // Implement your code here...
// });

// // Delete a trigger for the logged-in user
// router.delete("/:id", rejectUnauthenticated, (req, res) => {
//   // Implement your code here...
// });

// module.exports = router;