const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// Get all entries from the user_event_entries table and the image urls from the user_images table
// Filter the results by user ID
router.get('/', rejectUnauthenticated, async (req, res) => {
    try {
        const queryText = `
        SELECT "user_event_entries".*, "user_images"."image_url"
        FROM "user_event_entries"
        LEFT JOIN "user_images"
        ON "user_event_entries"."id" = "user_images"."user_event_id"
        WHERE "user_event_entries"."user_id" = $1;
        `;
        const result = await pool.query(queryText, [req.user.id]);
        res.send(result.rows);
    } catch (error) {
        console.log('Error in GETting entries from /api/view-all: ', error);
        res.sendStatus(500);
    }
});

module.exports = router; 