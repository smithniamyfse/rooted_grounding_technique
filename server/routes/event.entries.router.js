const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// Queries
const ALL_ENTRIES_QUERY = `SELECT * FROM "user_event_entries" WHERE "user_id"=$1;`;
const SPECIFIC_ENTRY_QUERY = `SELECT * FROM "user_event_entries" WHERE "id"=$1 AND "user_id"=$2;`;
const INSERT_ENTRY_QUERY = `
    INSERT INTO "user_event_entries" ("location", "date", "time", "intensity_rating", "user_id")
    VALUES ($1, $2, $3, $4, $5)
    RETURNING "id";
`;
const SEE_ITEMS_QUERY = `
    SELECT item, COUNT(*) as count, AVG(distress_rating) as avg_distress
    FROM (
        SELECT see_item_1 as item, distress_rating FROM see_inputs JOIN user_event_entries ON see_inputs.user_event_id = user_event_entries.id WHERE user_event_entries.user_id = $1
        UNION ALL
        SELECT see_item_2, distress_rating FROM see_inputs JOIN user_event_entries ON see_inputs.user_event_id = user_event_entries.id WHERE user_event_entries.user_id = $1
        UNION ALL
        SELECT see_item_3, distress_rating FROM see_inputs JOIN user_event_entries ON see_inputs.user_event_id = user_event_entries.id WHERE user_event_entries.user_id = $1
        UNION ALL
        SELECT see_item_4, distress_rating FROM see_inputs JOIN user_event_entries ON see_inputs.user_event_id = user_event_entries.id WHERE user_event_entries.user_id = $1
        UNION ALL
        SELECT see_item_5, distress_rating FROM see_inputs JOIN user_event_entries ON see_inputs.user_event_id = user_event_entries.id WHERE user_event_entries.user_id = $1
    ) AS items
    GROUP BY item
`;

// Routes
// Get all event entries for a particular user
router.get("/", rejectUnauthenticated, async (req, res) => {
  try {
    const result = await pool.query(ALL_ENTRIES_QUERY, [req.user.id]);
    res.send(result.rows);
  } catch (error) {
    console.error("Error in GET request for event entries: ", error);
    res.sendStatus(500);
  }
});

// Route to create a new event entry
router.post("/new", rejectUnauthenticated, async (req, res) => {
  const userId = req.user.id;
  const queryText = `
    INSERT INTO "user_event_entries" ("location", "date", "time", "distress_rating", "user_id") 
    VALUES (NULL, CURRENT_DATE, CURRENT_TIME, NULL, $1) RETURNING "id";
    `;
  try {
    const result = await pool.query(queryText, [userId]);
    res.json({ id: result.rows[0].id });
  } catch (error) {
    console.error("Error creating new event:", error);
    res.sendStatus(500);
  }
});

// This route fetches the top 'see' items for a user
router.get("/top-see-items", rejectUnauthenticated, async (req, res) => {
  try {
    const topSeeItems = await getTopSeeItems(req.user.id);
    res.json(topSeeItems);
  } catch (error) {
    console.error("Error getting top see items:", error);
    res.sendStatus(500);
  }
});

// This route should come first because it's more specific
router.get("/top-triggers", rejectUnauthenticated, async (req, res) => {
  try {
    const topTriggers = await getTopThreeTriggers(req.user.id);
    res.json(topTriggers);
  } catch (error) {
    console.error("Error getting top triggers:", error);
    res.sendStatus(500);
  }
});

// Get specific event entry for a particular user
// This route is more general, so it should come after all other GET routes
router.get("/:id", rejectUnauthenticated, async (req, res) => {
  try {
    const result = await pool.query(SPECIFIC_ENTRY_QUERY, [
      req.params.id,
      req.user.id,
    ]);
    res.send(result.rows);
  } catch (error) {
    console.error("Error completing SELECT event entry query", error);
    res.sendStatus(500);
  }
});

router.put("/:id", rejectUnauthenticated, async (req, res) => {
  const queryText =
    'UPDATE "user_event_entries" SET "location" = $1 WHERE "id" = $2 AND "user_id" = $3;';
  try {
    await pool.query(queryText, [
      req.body.location,
      req.params.id,
      req.user.id,
    ]);
    res.sendStatus(200);
  } catch (err) {
    console.log("Error completing UPDATE location query", err);
    res.sendStatus(500);
  }
});

router.put("/distress-rating", rejectUnauthenticated, async (req, res) => {
  const distressValue = req.body.value;
  const eventId = req.body.eventId;
  if (distressValue === undefined || !eventId) {
    res.sendStatus(400);
    return;
  }
  const queryText =
    'UPDATE "user_event_entries" SET "distress_rating" = $1 WHERE "id" = $2;';
  try {
    await pool.query(queryText, [distressValue, eventId]);
    res.sendStatus(200);
  } catch (err) {
    console.log("Error completing UPDATE distress_rating query", err);
    res.sendStatus(500);
  }
});

// This function calculates the top three triggers for a user
const getTopThreeTriggers = async (userId) => {
  const locationQuery = `
        SELECT location, COUNT(*) as count, AVG(distress_rating) as avg_distress
        FROM user_event_entries 
        WHERE user_id = $1
        GROUP BY location
    `;
  const locationResult = await pool.query(locationQuery, [userId]);
  const allTriggers = [...locationResult.rows];
  allTriggers.forEach((trigger) => {
    trigger.score = parseFloat(
      (Number(trigger.count) * trigger.avg_distress).toFixed(2)
    );
  });
  allTriggers.sort((a, b) => b.score - a.score);
  return allTriggers.slice(0, 3);
};

const getTopSeeItems = async (userId) => {
  const result = await pool.query(SEE_ITEMS_QUERY, [userId]);
  const allSeeItems = [...result.rows];
  allSeeItems.forEach((item) => {
    item.score = item.count * item.avg_distress;
  });
  allSeeItems.sort((a, b) => b.score - a.score);
  return allSeeItems.slice(0, 3);
};

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const pool = require("../modules/pool");
// const {
//   rejectUnauthenticated,
// } = require("../modules/authentication-middleware");

// const ALL_ENTRIES_QUERY = `SELECT * FROM "user_event_entries" WHERE "user_id"=$1;`;
// const SPECIFIC_ENTRY_QUERY = `SELECT * FROM "user_event_entries" WHERE "id"=$1 AND "user_id"=$2;`;
// const INSERT_ENTRY_QUERY = `
//   INSERT INTO "user_event_entries" ("location", "date", "time", "intensity_rating", "user_id")
//   VALUES ($1, $2, $3, $4, $5)
//   RETURNING "id";
// `;

// const SEE_ITEMS_QUERY = `
//   SELECT item, COUNT(*) as count, AVG(distress_rating) as avg_distress
//   FROM (
//     SELECT see_item_1 as item, distress_rating FROM see_inputs JOIN user_event_entries ON see_inputs.user_event_id = user_event_entries.id WHERE user_event_entries.user_id = $1
//     UNION ALL
//     SELECT see_item_2, distress_rating FROM see_inputs JOIN user_event_entries ON see_inputs.user_event_id = user_event_entries.id WHERE user_event_entries.user_id = $1
//     UNION ALL
//     SELECT see_item_3, distress_rating FROM see_inputs JOIN user_event_entries ON see_inputs.user_event_id = user_event_entries.id WHERE user_event_entries.user_id = $1
//     UNION ALL
//     SELECT see_item_4, distress_rating FROM see_inputs JOIN user_event_entries ON see_inputs.user_event_id = user_event_entries.id WHERE user_event_entries.user_id = $1
//     UNION ALL
//     SELECT see_item_5, distress_rating FROM see_inputs JOIN user_event_entries ON see_inputs.user_event_id = user_event_entries.id WHERE user_event_entries.user_id = $1
//   ) AS items
//   GROUP BY item
// `;

// // Get all event entries for a particular user
// router.get("/", rejectUnauthenticated, (req, res) => {
//   pool
//     .query(ALL_ENTRIES_QUERY, [req.user.id])
//     .then((result) => {
//       res.send(result.rows);
//     })
//     .catch((error) => {
//       console.error("Error in GET request for event entries: ", error);
//       res.sendStatus(500);
//     });
// });

// // Route to create a new event entry
// router.post("/new", rejectUnauthenticated, async (req, res) => {
//   const userId = req.user.id;

//   const queryText = `
//       INSERT INTO "user_event_entries" ("location", "date", "time", "user_id")
//       VALUES (NULL, CURRENT_DATE, CURRENT_TIME, $1)
//       RETURNING "id";
//     `;

//   try {
//     const result = await pool.query(queryText, [userId]);
//     res.json({ id: result.rows[0].id });
//   } catch (error) {
//     console.error("Error creating new event:", error);
//     res.sendStatus(500);
//   }
// });

// // This route should come first because it's more specific
// router.get("/top-triggers", rejectUnauthenticated, async (req, res) => {
//   try {
//     const topTriggers = await getTopThreeTriggers(req.user.id);
//     res.json(topTriggers);
//   } catch (error) {
//     console.error("Error getting top triggers:", error);
//     res.sendStatus(500);
//   }
// });

// // This route fetches the top 'see' items for a user
// router.get("/top-see-items", rejectUnauthenticated, async (req, res) => {
//   try {
//     const topSeeItems = await getTopSeeItems(req.user.id);
//     res.json(topSeeItems);
//   } catch (error) {
//     console.error("Error getting top see items:", error);
//     res.sendStatus(500);
//   }
// });

// // Get specific event entry for a particular user
// // This route is more general, so it should come after all other GET routes
// router.get("/:id", rejectUnauthenticated, (req, res) => {
//   pool
//     .query(SPECIFIC_ENTRY_QUERY, [req.params.id, req.user.id])
//     .then((result) => {
//       res.send(result.rows);
//     })
//     .catch((error) => {
//       console.error("Error completing SELECT event entry query", error);
//       res.sendStatus(500);
//     });
// });

// // Create new event entry for the logged-in user
// router.post("/", rejectUnauthenticated, (req, res) => {
//   const newEntry = req.body;
//   const userId = req.user.id;
//   const queryValues = [
//     newEntry.location,
//     newEntry.date,
//     newEntry.time,
//     newEntry.distress_rating,
//     userId,
//   ];
//   pool
//     .query(INSERT_ENTRY_QUERY, queryValues)
//     .then((result) => {
//       // Send the id of the new entry in the response
//       res.status(201).json({ id: result.rows[0].id });
//     })
//     .catch((error) => {
//       console.error(`Error making query ${INSERT_ENTRY_QUERY}`, error);
//       res.sendStatus(500);
//     });
// });

// router.put("/distress-rating", rejectUnauthenticated, (req, res) => {
//   const distressValue = req.body.value;
//   const eventId = req.body.eventId;
//   if (distressValue === undefined || !eventId) {
//     res.sendStatus(400);
//     return;
//   }
//   const queryText =
//     'UPDATE "user_event_entries" SET "distress_rating" = $1 WHERE "id" = $2;';
//   pool
//     .query(queryText, [distressValue, eventId])
//     .then(() => res.sendStatus(200))
//     .catch((err) => {
//       console.log("Error completing UPDATE distress_rating query", err);
//       res.sendStatus(500);
//     });
// });

// router.put("/:id", rejectUnauthenticated, (req, res) => {
//   const queryText = `UPDATE "user_event_entries" SET "location" = $1 WHERE "id" = $2 AND "user_id" = $3;`;
//   pool
//     .query(queryText, [req.body.location, req.params.id, req.user.id])
//     .then(() => res.sendStatus(200))
//     .catch((err) => {
//       console.log("Error completing UPDATE location query", err);
//       res.sendStatus(500);
//     });
// });

// // This function calculates the top three triggers for a user
// const getTopThreeTriggers = async (userId) => {
//   const locationQuery = `
//       SELECT location, COUNT(*) as count, AVG(distress_rating) as avg_distress
//       FROM user_event_entries
//       WHERE user_id = $1
//       GROUP BY location
//     `;
//   const locationResult = await pool.query(locationQuery, [userId]);
//   const allTriggers = [...locationResult.rows];
//   allTriggers.forEach((trigger) => {
//     trigger.score = parseFloat(
//       (Number(trigger.count) * trigger.avg_distress).toFixed(2)
//     );
//   });
//   allTriggers.sort(function (a, b) {
//     return b.score - a.score;
//   });
//   return allTriggers.slice(0, 3);
// };

// const getTopSeeItems = async (userId) => {
//   const result = await pool.query(SEE_ITEMS_QUERY, [userId]);
//   const allSeeItems = [...result.rows];
//   allSeeItems.forEach((item) => {
//     item.score = item.count * item.avg_distress;
//   });
//   allSeeItems.sort((a, b) => b.score - a.score);
//   return allSeeItems.slice(0, 3);
// };

// module.exports = router;
