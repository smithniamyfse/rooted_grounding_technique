const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

const ALL_ENTRIES_QUERY = `SELECT * FROM "user_event_entries" WHERE "user_id"=$1;`;

const SPECIFIC_ENTRY_QUERY = `SELECT * FROM "user_event_entries" WHERE "id"=$1 AND "user_id"=$2;`;

const INSERT_ENTRY_QUERY = `
  INSERT INTO "user_event_entries" ("location", "date", "time", "intensity_rating", "user_id")
  VALUES ($1, $2, $3, $4, $5)
  RETURNING "id";
`;

const UPDATE_DISTRESS_QUERY = `
  UPDATE "user_event_entries"
  SET "distress_rating" = $1
  WHERE "user_id" = $2 AND "id" = $3;
`;
// const UPDATE_ENTRY_QUERY = `
//   UPDATE "user_event_entries"
//   SET "location" = $1, "date" = $2, "time" = $3, "intensity_rating" =$4
//   WHERE "id" = $5 AND "user_id" = $6;
// `;

// Get all event entries for a particular user
router.get("/", rejectUnauthenticated, (req, res) => {
  pool
    .query(ALL_ENTRIES_QUERY, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.error("Error in GET request for event entries: ", error);
      res.sendStatus(500);
    });
});

// Get specific event entry for a particular user
router.get("/:id", rejectUnauthenticated, (req, res) => {
  pool
    .query(SPECIFIC_ENTRY_QUERY, [req.params.id, req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.error("Error completing SELECT event entry query", error);
      res.sendStatus(500);
    });
});

// Create new event entry for the logged-in user
router.post("/", rejectUnauthenticated, (req, res) => {
    const newEntry = req.body;
    const userId = req.user.id;
    const queryValues = [
      newEntry.location,
      newEntry.date,
      newEntry.time,
      newEntry.intensity_rating,
      userId,
    ];
    pool
      .query(INSERT_ENTRY_QUERY, queryValues)
      .then((result) => {
        // Send the id of the new entry in the response
        res.status(201).json({ id: result.rows[0].id });
      })
      .catch((error) => {
        console.error(`Error making query ${INSERT_ENTRY_QUERY}`, error);
        res.sendStatus(500);
      });
  });

// // Create new event entry for the logged-in user
// router.post("/", rejectUnauthenticated, (req, res) => {
//   const newEntry = req.body;
//   const userId = req.user.id;
//   const queryValues = [
//     newEntry.location,
//     newEntry.date,
//     newEntry.time,
//     newEntry.intensity_rating,
//     userId,
//   ];
//   pool
//     .query(INSERT_ENTRY_QUERY, queryValues)
//     .then(() => {
//       res.sendStatus(201);
//     })
//     .catch((error) => {
//       console.error(`Error making query ${INSERT_ENTRY_QUERY}`, error);
//       res.sendStatus(500);
//     });
// });

router.put('/distress-rating', rejectUnauthenticated, (req, res) => {
    console.log('Received request to update distress rating');
    const distressValue = req.body.value;
    const eventId = req.body.eventId;    
    console.log(`Distress value from request: ${distressValue}`);
    console.log(`Event ID from request: ${eventId}`);
  
    if (distressValue === undefined || !eventId) {
        console.log('Invalid data received.');
        res.sendStatus(400);
        return;
      }
      
    const queryText = 'UPDATE "user_event_entries" SET "distress_rating" = $1 WHERE "id" = $2;';
    pool
      .query(queryText, [distressValue, eventId])
      .then(() => res.sendStatus(200))
      .catch((err) => {
        console.log('Error completing UPDATE distress_rating query', err);
        res.sendStatus(500);
      });
  });
  
  router.put('/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `UPDATE "user_event_entries" SET "location" = $1 WHERE "id" = $2 AND "user_id" = $3;`;
    pool
      .query(queryText, [req.body.location, req.params.id, req.user.id])
      .then(() => res.sendStatus(200))
      .catch((err) => {
        console.log('Error completing UPDATE location query', err);
        res.sendStatus(500);
      });
  });
  
//   router.get("/distress-rating/:id", rejectUnauthenticated, (req, res) => {
//     const queryText = `SELECT "distress_rating" FROM "user_event_entries" WHERE "id" = $1 AND "user_id" = $2;`;
//     pool
//       .query(queryText, [req.params.id, req.user.id])
//       .then((result) => {
//         res.send(result.rows[0]);
//       })
//       .catch((err) => {
//         console.log("Error completing SELECT distress_rating query", err);
//         res.sendStatus(500);
//       });
//   });
  

module.exports = router;

// TODO: (If necessary) Update an event entry for the logged-in user
// router.put("/:id", rejectUnauthenticated, (req, res) => {
//   const updatedEntry = req.body;
//   const userId = req.user.id;
//   const eventId = req.params.id;
//   const queryValues = [
//     updatedEntry.location,
//     updatedEntry.date,
//     updatedEntry.time,
//     updatedEntry.intensity_rating,
//     eventId,
//     userId,
//   ];
//   pool
//     .query(UPDATE_ENTRY_QUERY, queryValues)
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .catch((error) => {
//       console.error(`Error updating event entry with id=${eventId}: `, error);
//       res.sendStatus(500);
//     });
// });

// TODO: (If necessary) Delete an event entry for the logged-in user
// router.delete("/:id", rejectUnauthenticated, (req, res) => { ... });

// Save distress rating for a specific event entry
// router.post("/distress-rating/:id", rejectUnauthenticated, (req, res) => {
//     const distressValue = req.body.distressValue;
//     pool
//       .query(UPDATE_DISTRESS_QUERY, [distressValue, req.user.id, req.params.id])
//       .then(() => {
//         res.sendStatus(201);
//       })
//       .catch((error) => {
//         console.error(`Error making distress rating query ${UPDATE_DISTRESS_QUERY}`, error);
//         res.sendStatus(500);
//       });
// });

// ** VERSION 2 **
// const express = require("express");
// const router = express.Router();
// const pool = require("../modules/pool");
// const {
//   rejectUnauthenticated,
// } = require("../modules/authentication-middleware");

// // Get all event entries for a particular user
// router.get("/", rejectUnauthenticated, (req, res) => {
//     let queryText = `SELECT * FROM "user_event_entries" WHERE "user_id"=$1;`;
//     pool.query(queryText, [req.user.id])
//     .then(result => {
//         res.send(result.rows);
//     })
//     .catch(error => {
//         console.log('Error in GET request for event entries: ', error);
//         res.sendStatus(500);
//     })
// });

// // Get specific event entry for a particular user
// router.get('/:id', rejectUnauthenticated, (req, res) => {
//     const queryText = `SELECT * FROM "user_event_entries" WHERE "id"=$1 AND "user_id"=$2;`;
//     pool.query(queryText, [req.params.id, req.user.id])
//     .then(result => {
//         res.send(result.rows);
//     })
//     .catch(error => {
//         console.log('Error completing SELECT event entry query', error);
//         res.sendStatus(500);
//     });
// });

// // Create new event entry for the logged-in user
// router.post("/", rejectUnauthenticated, (req, res) => {
//     const newEntry = req.body;
//     const userId = req.user.id;
//     const queryText = `
//       INSERT INTO "user_event_entries" ("location", "date", "time", "intensity_rating", "user_id")
//       VALUES ($1, $2, $3, $4, $5)
//     `;
//     const queryValues = [
//         newEntry.location,
//         newEntry.date,
//         newEntry.time,
//         newEntry.intensity_rating,
//         userId,
//     ]
//     pool
//       .query(queryText, queryValues)
//       .then(() => {
//         res.sendStatus(201);
//       })
//       .catch((error) => {
//         console.log(`Error making query ${queryText}`, error);
//         res.sendStatus(500);
//       });
// });

// // Save distress rating for a specific event entry
// router.post("/distress-rating/:id", rejectUnauthenticated, (req, res) => {
//     const distressValue = req.body.distressValue;
//     const queryText = `
//       UPDATE "user_event_entries"
//       SET "distress_rating" = $1
//       WHERE "user_id" = $2 AND "id" = $3;
//       `;

//     pool
//       .query(queryText, [distressValue, req.user.id, req.params.id])
//       .then(() => {
//         res.sendStatus(201);
//       })
//       .catch((error) => {
//         console.log(`Error making distress rating query ${queryText}`, error);
//         res.sendStatus(500);
//       });
// });

// // TODO: (If necessary) Update an event entry for the logged-in user
// router.put("/:id", rejectUnauthenticated, (req, res) => {
//     const updatedEntry = req.body;
//     const userId = req.user.id;
//     const eventId = req.params.id;
//     const queryText = `
//     UPDATE "user_event_entries"
//     SET "location" = $1, "date" = $2, "time" = $3, "intensity_rating" =$4
//     WHERE "id" = $5 AND "user_id" = $6;
//     `;
//     const queryValues = [
//         updatedEntry.location,
//         updatedEntry.date,
//         updatedEntry.time,
//         updatedEntry.intensity_rating,
//         eventId,
//         userId,
//     ]
//     pool
//     .query(queryText, queryValues)
//     .then(() => {
//         res.sendStatus(200);
//     })
//     .catch((error) => {
//         console.log(`Error updating event entry with id=${eventId}: `, error);
//         res.sendStatus(500);
//     });
// });

// // TODO: (If necessary) Delete an event entry for the logged-in user
// // router.delete("/:id", rejectUnauthenticated, (req, res) => { ... });

// module.exports = router;

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
