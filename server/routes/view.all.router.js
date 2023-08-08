const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const fs = require("fs");
const cfUtil = require("aws-cloudfront-sign");

const privateKeyString = fs.readFileSync(
  process.env.CLOUDFRONT_PRIVATE_KEY_PATH,
  "utf8"
);

// GET: Retrieve all entries from the user_event_entries table and the image urls from the user_images table
// Filter the results by user ID
router.get("/", rejectUnauthenticated, async (req, res) => {
  const queryText = `
    SELECT "user_event_entries".*, "user_images"."image_url"
    FROM "user_event_entries"
    LEFT JOIN "user_images"
    ON "user_event_entries"."id" = "user_images"."user_event_id"
    WHERE "user_event_entries"."user_id" = $1
    ORDER BY "user_event_entries"."date" DESC
    `;
  try {
    const result = await pool.query(queryText, [req.user.id]);
    const signedEntries = result.rows.map((row) => {
      if (row.image_url) {
        const key = row.image_url.split(".com/")[1];
        const cfUrl = `https://${process.env.CLOUDFRONT_DISTRIBUTION_ID}.cloudfront.net/${key}`;

        const options = {
            keypairId: process.env.CLOUDFRONT_KEY_PAIR_ID,
            privateKeyString,
            // URL expires in 7 days
            expireTime: Date.now() + 1000 * 60 * 60 * 24 * 7,
          };

        row.image_url = cfUtil.getSignedUrl(cfUrl, options);
      }
      return row;
    });

    res.send(signedEntries);
  } catch (error) {
    console.log("Error in GETting entries from /api/view-all: ", error);
    res.sendStatus(500);
  }
});

// PUT: Update the date and time of a specific entry
router.put("/", rejectUnauthenticated, (req, res) => {
  const updatedDateTime = req.body;

  const queryText = `
  UPDATE "user_event_entries"
  SET "date" = $1,
  "time" = $2
  WHERE id = $3;
`;

  const queryValues = [
    updatedDateTime.date,
    updatedDateTime.time,
    updatedDateTime.id,
  ];

  pool
    .query(queryText, queryValues)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error PUTting updated date and time", error);
      res.sendStatus(500);
    });
});

router.delete("/:id", rejectUnauthenticated, async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN"); // Start transaction

    const deleteInputsQueries = [
      'DELETE FROM "see_inputs" WHERE "user_event_id" = $1;',
      'DELETE FROM "touch_inputs" WHERE "user_event_id" = $1;',
      'DELETE FROM "hear_inputs" WHERE "user_event_id" = $1;',
      'DELETE FROM "smell_inputs" WHERE "user_event_id" = $1;',
      'DELETE FROM "taste_inputs" WHERE "user_event_id" = $1;',
      'DELETE FROM "user_images" WHERE "user_event_id" = $1;',
    ];

    for (let query of deleteInputsQueries) {
      await client.query(query, [req.params.id]);
    }

    const deleteUserEventEntriesQuery =
      'DELETE FROM "user_event_entries" WHERE "id" = $1;';
    await client.query(deleteUserEventEntriesQuery, [req.params.id]);

    await client.query("COMMIT"); // Commit transaction

    res.sendStatus(200);
  } catch (error) {
    await client.query("ROLLBACK"); // Rollback transaction in case of error
    console.log("Error deleting specific event entry", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

module.exports = router;



// ** VERSION FUCKED UP NOTHING WORKS WITH S3 or DATABASE
//   const express = require("express");
//   const router = express.Router();
//   const pool = require("../modules/pool");
//   const {
//     rejectUnauthenticated,
//   } = require("../modules/authentication-middleware");
//   const fs = require("fs");
//   const cfUtil = require("aws-cloudfront-sign");
//   const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
//   require("dotenv").config();
  
//   const s3 = new S3Client({
//     region: process.env.AWS_REGION,
//     credentials: {
//       accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     },
//   });
  
//   // GET: Retrieve all entries from the user_event_entries table and the image urls from the user_images table
//   // Filter the results by user ID
//   router.get("/", rejectUnauthenticated, async (req, res) => {
//     const queryText = `
//       SELECT "user_event_entries".*, "user_images"."image_url"
//       FROM "user_event_entries"
//       LEFT JOIN "user_images"
//       ON "user_event_entries"."id" = "user_images"."user_event_id"
//       WHERE "user_event_entries"."user_id" = $1
//       ORDER BY "user_event_entries"."date" DESC
//       `;
//     try {
//       const result = await pool.query(queryText, [req.user.id]);
//       const signedEntries = result.rows.map((row) => {
//         if (row.image_url) {
//           const key = row.image_url.split(".com/")[1];
//           const cfUrl = `https://${process.env.CLOUDFRONT_DISTRIBUTION_ID}.cloudfront.net/${key}`;
  
//           const options = {
//             keypairId: process.env.CLOUDFRONT_KEY_PAIR_ID,
//             privateKeyString,
//             // URL expires in 7 days
//             expireTime: Date.now() + 1000 * 60 * 60 * 24 * 7,
//           };
  
//           row.image_url = cfUtil.getSignedUrl(cfUrl, options);
//         }
//         return row;
//       });
  
//       res.send(signedEntries);
//     } catch (error) {
//       console.log("Error in GETting entries from /api/view-all: ", error);
//       res.sendStatus(500);
//     }
//   });
  
//   // PUT: Update the date and time of a specific entry
//   router.put("/", rejectUnauthenticated, (req, res) => {
//     const updatedDateTime = req.body;
  
//     const queryText = `
//     UPDATE "user_event_entries" 
//     SET "date" = $1,
//     "time" = $2
//     WHERE id = $3;
//   `;
  
//     const queryValues = [
//       updatedDateTime.date,
//       updatedDateTime.time,
//       updatedDateTime.id,
//     ];
  
//     pool
//       .query(queryText, queryValues)
//       .then(() => {
//         res.sendStatus(200);
//       })
//       .catch((error) => {
//         console.log("Error PUTting updated date and time", error);
//         res.sendStatus(500);
//       });
//   });
  
//   // router.delete("/:id", rejectUnauthenticated, async (req, res) => {
//   //     const client = await pool.connect();
    
//   //     try {
//   //       await client.query("BEGIN"); // Step 1: Starts a transaction
    
//   //       // Step 2: Retrieves the image_url of the user image to be deleted
//   //       const imageUrlQuery =
//   //         'SELECT "image_url" FROM "user_images" WHERE "user_event_id" = $1;';
//   //       const imageUrlResult = await client.query(imageUrlQuery, [req.params.id]);
    
//   //       // Step 3: If there is an associated image, delete it from the S3 bucket
//   //       if (imageUrlResult.rows.length > 0) {
//   //         const imageUrl = imageUrlResult.rows[0].image_url;
//   //         const bucketName = process.env.S3_BUCKET_NAME;
//   //         const key = imageUrl.split(
//   //           `${bucketName}.s3.us-east-2.amazonaws.com/`
//   //         )[1];
    
//   //         const params = {
//   //           Bucket: bucketName,
//   //           Key: key,
//   //         };
    
//   //         try {
//   //           const data = await s3.send(new DeleteObjectCommand(params));
//   //           console.log("Success, image deleted", data);
//   //         } catch (err) {
//   //           console.log("Error", err);
//   //         }
//   //       }
    
//   //       // Step 4: Deletes all the data related to the event entry in various tables
//   //       const deleteInputsQueries = [
//   //         'DELETE FROM "see_inputs" WHERE "user_event_id" = $1;',
//   //         'DELETE FROM "touch_inputs" WHERE "user_event_id" = $1;',
//   //         'DELETE FROM "hear_inputs" WHERE "user_event_id" = $1;',
//   //         'DELETE FROM "smell_inputs" WHERE "user_event_id" = $1;',
//   //         'DELETE FROM "taste_inputs" WHERE "user_event_id" = $1;',
//   //         'DELETE FROM "user_images" WHERE "user_event_id" = $1;',
//   //       ];
    
//   //       for (let query of deleteInputsQueries) {
//   //         await client.query(query, [req.params.id]);
//   //       }
    
//   //       // Step 5: Deletes the event entry from the user_event_entries table
//   //       const deleteUserEventEntriesQuery =
//   //         'DELETE FROM "user_event_entries" WHERE "id" = $1;';
//   //       await client.query(deleteUserEventEntriesQuery, [req.params.id]);
    
//   //       // Step 6: Commits the transaction if everything was successful
//   //       await client.query("COMMIT"); 
//   //       res.sendStatus(200);
//   //     } catch (error) {
//   //       // If there was an error, roll back the transaction
//   //       await client.query("ROLLBACK"); 
//   //       console.log("Error deleting specific event entry", error);
//   //       res.sendStatus(500);
//   //     } finally {
//   //       client.release();
//   //     }
//   //   });
  
//   router.delete("/:id", rejectUnauthenticated, async (req, res) => {
//       const client = await pool.connect();
  
//       try {
//         console.log("Deleting event entry with id:", req.params.id);
//         await client.query("BEGIN"); // Start transaction
  
//         // Retrieve the image_url of the user image to be deleted
//         const imageUrlQuery =
//           'SELECT "image_url" FROM "user_images" WHERE "user_event_id" = $1;';
//         const imageUrlResult = await client.query(imageUrlQuery, [req.params.id]);
  
//         // If there is an associated image, delete it from the S3 bucket
//         if (imageUrlResult.rows.length > 0) {
//           const imageUrl = imageUrlResult.rows[0].image_url;
//           console.log("Deleting image with URL:", imageUrl);
          
//           const bucketName = process.env.S3_BUCKET_NAME;
//           const key = imageUrl.split(
//             `${bucketName}.s3.us-east-2.amazonaws.com/`
//           )[1];
  
//           console.log("Deleting image with key:", key);
//           const params = {
//             Bucket: bucketName,
//             Key: key,
//           };
  
//           console.log("Delete parameters:", params);
//           try {
//             const data = await s3.send(new DeleteObjectCommand(params));
//             console.log("Success, image deleted", data);
//           } catch (err) {
//             console.log("Error deleting image from S3:", err);
//           }
//         }
  
//         // Delete all the data related to the event entry in various tables
//         const deleteInputsQueries = [
//           'DELETE FROM "see_inputs" WHERE "user_event_id" = $1;',
//           'DELETE FROM "touch_inputs" WHERE "user_event_id" = $1;',
//           'DELETE FROM "hear_inputs" WHERE "user_event_id" = $1;',
//           'DELETE FROM "smell_inputs" WHERE "user_event_id" = $1;',
//           'DELETE FROM "taste_inputs" WHERE "user_event_id" = $1;',
//           'DELETE FROM "user_images" WHERE "user_event_id" = $1;',
//         ];
  
//         for (let query of deleteInputsQueries) {
//           const result = await client.query(query, [req.params.id]);
//           console.log(`Deleted ${result.rowCount} rows using query: ${query}`);
//         }
  
//         // Delete the event entry from the user_event_entries table
//         const deleteUserEventEntriesQuery =
//           'DELETE FROM "user_event_entries" WHERE "id" = $1;';
//         const result = await client.query(deleteUserEventEntriesQuery, [req.params.id]);
//         console.log(`Deleted ${result.rowCount} rows from user_event_entries`);
  
//         await client.query("COMMIT"); // Commit transaction
//         console.log("Transaction committed successfully");
//         res.sendStatus(200);
//       } catch (error) {
//         await client.query("ROLLBACK"); // Rollback transaction in case of error
//         console.log("Error deleting specific event entry", error);
//         res.sendStatus(500);
//       } finally {
//         client.release();
//         console.log("Database connection released");
//       }
//   });
  
    
//     module.exports = router;
  
  // ***** END VERSION FUCKED UP

// router.delete("/:id", rejectUnauthenticated, async (req, res) => {
//   const client = await pool.connect();

//   try {
//     await client.query("BEGIN"); // Start transaction

//     // Retrieve the image_url of the user image to be deleted
//     const imageUrlQuery =
//       'SELECT "image_url" FROM "user_images" WHERE "user_event_id" = $1;';
//     const imageUrlResult = await client.query(imageUrlQuery, [req.params.id]);

//     // If there is an associated image, delete it from the S3 bucket
//     if (imageUrlResult.rows.length > 0) {
//         const imageUrl = imageUrlResult.rows[0].image_url;
//         const bucketName = process.env.S3_BUCKET_NAME;
//         const key = imageUrl.split(
//           `${bucketName}.s3.us-east-2.amazonaws.com/`
//         )[1];
    
//         const params = {
//           Bucket: bucketName,
//           Key: key,
//         };
    
//         try {
//           const data = await s3.send(new DeleteObjectCommand(params));
//           console.log("Success, image deleted", data);
//         } catch (err) {
//           console.log("Error", err);
//         }
//       }
//     const deleteInputsQueries = [
//       'DELETE FROM "see_inputs" WHERE "user_event_id" = $1;',
//       'DELETE FROM "touch_inputs" WHERE "user_event_id" = $1;',
//       'DELETE FROM "hear_inputs" WHERE "user_event_id" = $1;',
//       'DELETE FROM "smell_inputs" WHERE "user_event_id" = $1;',
//       'DELETE FROM "taste_inputs" WHERE "user_event_id" = $1;',
//       'DELETE FROM "user_images" WHERE "user_event_id" = $1;',
//     ];

//     for (let query of deleteInputsQueries) {
//       await client.query(query, [req.params.id]);
//     }

//     const deleteUserEventEntriesQuery =
//       'DELETE FROM "user_event_entries" WHERE "id" = $1;';
//     await client.query(deleteUserEventEntriesQuery, [req.params.id]);

//     await client.query("COMMIT"); // Commit transaction

//     res.sendStatus(200);
//   } catch (error) {
//     await client.query("ROLLBACK"); // Rollback transaction in case of error
//     console.log("Error deleting specific event entry", error);
//     res.sendStatus(500);
//   } finally {
//     client.release();
//   }
// });

// router.delete("/:id", rejectUnauthenticated, async (req, res) => {
//     const client = await pool.connect();

//     try {
//       await client.query("BEGIN"); // Start transaction

//       // Retrieve the image_url of the user image to be deleted
//       const imageUrlQuery = 'SELECT "image_url" FROM "user_images" WHERE "user_event_id" = $1;';
//       const imageUrlResult = await client.query(imageUrlQuery, [req.params.id]);

//       // If there is an associated image, delete it from the S3 bucket

//       if (imageUrlResult.rows.length > 0) {
//         const imageUrl = imageUrlResult.rows[0].image_url;
//         const bucketName = process.env.S3_BUCKET_NAME;
//         const key = imageUrl.split(`${bucketName}/`)[1];

//         const params = {
//           Bucket: bucketName,
//           Key: key
//         };

//         s3.deleteObject(params, function(err, data) {
//           if (err) console.log(err, err.stack); // an error occurred
//           else console.log(data); // successful response
//         });
//       }

//       const deleteInputsQueries = [
//         'DELETE FROM "see_inputs" WHERE "user_event_id" = $1;',
//         'DELETE FROM "touch_inputs" WHERE "user_event_id" = $1;',
//         'DELETE FROM "hear_inputs" WHERE "user_event_id" = $1;',
//         'DELETE FROM "smell_inputs" WHERE "user_event_id" = $1;',
//         'DELETE FROM "taste_inputs" WHERE "user_event_id" = $1;',
//         'DELETE FROM "user_images" WHERE "user_event_id" = $1;',
//       ];

//       for (let query of deleteInputsQueries) {
//         await client.query(query, [req.params.id]);
//       }

//       const deleteUserEventEntriesQuery =
//         'DELETE FROM "user_event_entries" WHERE "id" = $1;';
//       await client.query(deleteUserEventEntriesQuery, [req.params.id]);

//       await client.query("COMMIT"); // Commit transaction

//       res.sendStatus(200);
//     } catch (error) {
//       await client.query("ROLLBACK"); // Rollback transaction in case of error
//       console.log("Error deleting specific event entry", error);
//       res.sendStatus(500);
//     } finally {
//       client.release();
//     }
//   });


// ** WORKING VERSION 2 - BEFORE DELETE FROM S3 BUCKET **
// const express = require("express");
// const router = express.Router();
// const pool = require("../modules/pool");
// const {
//   rejectUnauthenticated,
// } = require("../modules/authentication-middleware");
// const fs = require("fs");
// const cfUtil = require("aws-cloudfront-sign");

// const privateKeyString = fs.readFileSync(
//   process.env.CLOUDFRONT_PRIVATE_KEY_PATH,
//   "utf8"
// );

// // GET: Retrieve all entries from the user_event_entries table and the image urls from the user_images table
// // Filter the results by user ID
// router.get("/", rejectUnauthenticated, async (req, res) => {
//   const queryText = `
//     SELECT "user_event_entries".*, "user_images"."image_url"
//     FROM "user_event_entries"
//     LEFT JOIN "user_images"
//     ON "user_event_entries"."id" = "user_images"."user_event_id"
//     WHERE "user_event_entries"."user_id" = $1
//     ORDER BY "user_event_entries"."date" DESC
//     `;
//   try {
//     const result = await pool.query(queryText, [req.user.id]);
//     const signedEntries = result.rows.map((row) => {
//       if (row.image_url) {
//         const key = row.image_url.split(".com/")[1];
//         const cfUrl = `https://${process.env.CLOUDFRONT_DISTRIBUTION_ID}.cloudfront.net/${key}`;

//         const options = {
//             keypairId: process.env.CLOUDFRONT_KEY_PAIR_ID,
//             privateKeyString,
//             // URL expires in 7 days
//             expireTime: Date.now() + 1000 * 60 * 60 * 24 * 7,
//           };

//         row.image_url = cfUtil.getSignedUrl(cfUrl, options);
//       }
//       return row;
//     });

//     res.send(signedEntries);
//   } catch (error) {
//     console.log("Error in GETting entries from /api/view-all: ", error);
//     res.sendStatus(500);
//   }
// });

// // PUT: Update the date and time of a specific entry
// router.put("/", rejectUnauthenticated, (req, res) => {
//   const updatedDateTime = req.body;

//   const queryText = `
//   UPDATE "user_event_entries"
//   SET "date" = $1,
//   "time" = $2
//   WHERE id = $3;
// `;

//   const queryValues = [
//     updatedDateTime.date,
//     updatedDateTime.time,
//     updatedDateTime.id,
//   ];

//   pool
//     .query(queryText, queryValues)
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .catch((error) => {
//       console.log("Error PUTting updated date and time", error);
//       res.sendStatus(500);
//     });
// });

// router.delete("/:id", rejectUnauthenticated, async (req, res) => {
//   const client = await pool.connect();

//   try {
//     await client.query("BEGIN"); // Start transaction

//     const deleteInputsQueries = [
//       'DELETE FROM "see_inputs" WHERE "user_event_id" = $1;',
//       'DELETE FROM "touch_inputs" WHERE "user_event_id" = $1;',
//       'DELETE FROM "hear_inputs" WHERE "user_event_id" = $1;',
//       'DELETE FROM "smell_inputs" WHERE "user_event_id" = $1;',
//       'DELETE FROM "taste_inputs" WHERE "user_event_id" = $1;',
//       'DELETE FROM "user_images" WHERE "user_event_id" = $1;',
//     ];

//     for (let query of deleteInputsQueries) {
//       await client.query(query, [req.params.id]);
//     }

//     const deleteUserEventEntriesQuery =
//       'DELETE FROM "user_event_entries" WHERE "id" = $1;';
//     await client.query(deleteUserEventEntriesQuery, [req.params.id]);

//     await client.query("COMMIT"); // Commit transaction

//     res.sendStatus(200);
//   } catch (error) {
//     await client.query("ROLLBACK"); // Rollback transaction in case of error
//     console.log("Error deleting specific event entry", error);
//     res.sendStatus(500);
//   } finally {
//     client.release();
//   }
// });

// module.exports = router;

// ** WORKING VERSION 1 - BEFORE TROUBLESHOOTING URL TIMEOUT **
// const express = require("express");
// const router = express.Router();
// const pool = require("../modules/pool");
// const {
//   rejectUnauthenticated,
// } = require("../modules/authentication-middleware");
// const fs = require("fs");
// const cfUtil = require("aws-cloudfront-sign");

// const privateKeyString = fs.readFileSync(
//   process.env.CLOUDFRONT_PRIVATE_KEY_PATH,
//   "utf8"
// );

// // GET: Retrieve all entries from the user_event_entries table and the image urls from the user_images table
// // Filter the results by user ID
// router.get("/", rejectUnauthenticated, async (req, res) => {
//   const queryText = `
//     SELECT "user_event_entries".*, "user_images"."image_url"
//     FROM "user_event_entries"
//     LEFT JOIN "user_images"
//     ON "user_event_entries"."id" = "user_images"."user_event_id"
//     WHERE "user_event_entries"."user_id" = $1
//     ORDER BY "user_event_entries"."date" DESC
//     `;
//   try {
//     const result = await pool.query(queryText, [req.user.id]);
//     const signedEntries = result.rows.map((row) => {
//       if (row.image_url) {
//         const key = row.image_url.split(".com/")[1];
//         const cfUrl = `https://${process.env.CLOUDFRONT_DISTRIBUTION_ID}.cloudfront.net/${key}`;

//         const options = {
//           keypairId: process.env.CLOUDFRONT_KEY_PAIR_ID,
//           privateKeyString,
//           expireTime: Date.now() + 60 * 60 * 1000, // URL expires in 1 hour
//         };

//         row.image_url = cfUtil.getSignedUrl(cfUrl, options);
//       }
//       return row;
//     });

//     res.send(signedEntries);
//   } catch (error) {
//     console.log("Error in GETting entries from /api/view-all: ", error);
//     res.sendStatus(500);
//   }
// });

// // PUT: Update the date and time of a specific entry
// router.put("/", rejectUnauthenticated, (req, res) => {
//   const updatedDateTime = req.body;

//   const queryText = `
//   UPDATE "user_event_entries"
//   SET "date" = $1,
//   "time" = $2
//   WHERE id = $3;
// `;

//   const queryValues = [
//     updatedDateTime.date,
//     updatedDateTime.time,
//     updatedDateTime.id,
//   ];

//   pool
//     .query(queryText, queryValues)
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .catch((error) => {
//       console.log("Error PUTting updated date and time", error);
//       res.sendStatus(500);
//     });
// });

// router.delete("/:id", rejectUnauthenticated, async (req, res) => {
//   const client = await pool.connect();

//   try {
//     await client.query("BEGIN"); // Start transaction

//     const deleteInputsQueries = [
//       'DELETE FROM "see_inputs" WHERE "user_event_id" = $1;',
//       'DELETE FROM "touch_inputs" WHERE "user_event_id" = $1;',
//       'DELETE FROM "hear_inputs" WHERE "user_event_id" = $1;',
//       'DELETE FROM "smell_inputs" WHERE "user_event_id" = $1;',
//       'DELETE FROM "taste_inputs" WHERE "user_event_id" = $1;',
//       'DELETE FROM "user_images" WHERE "user_event_id" = $1;',
//     ];

//     for (let query of deleteInputsQueries) {
//       await client.query(query, [req.params.id]);
//     }

//     const deleteUserEventEntriesQuery =
//       'DELETE FROM "user_event_entries" WHERE "id" = $1;';
//     await client.query(deleteUserEventEntriesQuery, [req.params.id]);

//     await client.query("COMMIT"); // Commit transaction

//     res.sendStatus(200);
//   } catch (error) {
//     await client.query("ROLLBACK"); // Rollback transaction in case of error
//     console.log("Error deleting specific event entry", error);
//     res.sendStatus(500);
//   } finally {
//     client.release();
//   }
// });

// module.exports = router;
