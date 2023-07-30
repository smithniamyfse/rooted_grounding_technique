const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3 } = require("@aws-sdk/client-s3");
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

// configure AWS
const s3 = new S3({
  region: 'us-east-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'rfw-user-images',
    key: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
});

router.post('/upload/:id', rejectUnauthenticated, upload.single('image'), async (req, res) => {
    try {
        const imageUrl = req.file.location;
        const userId = req.params.id;

        const queryText = `
            INSERT INTO "user_images" ("image_url", "user_id")
            VALUES ($1, $2);
        `;
        const queryParams = [imageUrl, userId];

        await pool.query(queryText, queryParams);

        res.json({fileUrl: imageUrl});
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

router.get('/view/:imageId', rejectUnauthenticated, async (req, res) => {
  const { imageId } = req.params;
  const { id: userId } = req.user;

  const result = await pool.query(
    'SELECT 1 FROM "user_images" WHERE "id" = $1 AND "user_id" = $2',
    [imageId, userId]
  );

  if (result.rowCount === 0) {
    res.sendStatus(403);
    return;
  }

  const imageStream = s3
    .getObject({
      Bucket: 'rfw-user-images',
      Key: imageId,
    })
    .createReadStream();

  imageStream.pipe(res);
});

router.get('/user/:id', rejectUnauthenticated, async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  if (parseInt(id, 10) !== userId) {
    res.sendStatus(403);
    return;
  }

  const result = await pool.query(
    'SELECT "image_url" FROM "user_images" WHERE "user_id" = $1',
    [userId]
  );

  if (result.rowCount === 0) {
    res.sendStatus(404);
    return;
  }

  res.json(result.rows.map(row => row.image_url));
});

module.exports = router;






// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const { S3 } = require("@aws-sdk/client-s3");
// const { rejectUnauthenticated } = require('../modules/authentication-middleware');
// const pool = require('../modules/pool');

// // configure AWS
// const s3 = new S3({
//   region: 'us-east-2',
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//   }
// });

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'rfw-user-images',
//     key: function (req, file, cb) {
//       cb(null, file.originalname);
//     }
//   })
// });

// // existing POST /upload endpoint...
// router.post('/upload/:id', rejectUnauthenticated, upload.single('image'), async (req, res) => {
//   try {
//     const imageUrl = req.file.location;  // get the URL from uploaded image
//     const userId = req.params.id;  // get the id from url parameter

//     // query to insert image URL and user id to the database
//     const queryText = `
//       INSERT INTO "user_images" ("image_url", "user_id")
//       VALUES ($1, $2);
//     `;
//     const queryParams = [imageUrl, userId];

//     // execute the query
//     await pool.query(queryText, queryParams);

//     res.json({fileUrl: imageUrl});  // send the image URL as response
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(500);  // send error status if there's an error
//   }
// });

// router.get('/view/:imageId', rejectUnauthenticated, async (req, res) => {
//   const { imageId } = req.params;
//   const { id: userId } = req.user;

//   const result = await pool.query(
//     'SELECT 1 FROM "user_images" WHERE "id" = $1 AND "user_id" = $2',
//     [imageId, userId]
//   );

//   if (result.rowCount === 0) {
//     res.sendStatus(403);
//     return;
//   }

//   const imageStream = s3
//     .getObject({
//       Bucket: 'rfw-user-images',
//       Key: imageId,
//     })
//     .createReadStream();

//   imageStream.pipe(res);
// });

// router.get('/user/:id', rejectUnauthenticated, async (req, res) => {
//   const { id } = req.params;
//   const { id: userId } = req.user;

//   if (parseInt(id, 10) !== userId) {
//     res.sendStatus(403);
//     return;
//   }

//   const result = await pool.query(
//     'SELECT "id" FROM "user_images" WHERE "user_id" = $1',
//     [userId]
//   );

//   if (result.rowCount === 0) {
//     res.sendStatus(404);
//     return;
//   }

//   res.json(result.rows.map(row => row.id));
// });

// module.exports = router;




// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const { S3 } = require("@aws-sdk/client-s3");
// const { rejectUnauthenticated } = require('../modules/authentication-middleware');
// const pool = require('../modules/pool');

// // configure AWS
// const s3 = new S3({
//   region: 'us-east-2',
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//   }
// });

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'rfw-user-images',
//     key: function (req, file, cb) {
//       cb(null, file.originalname);
//     }
//   })
// });

// // existing POST /upload endpoint...
// router.post('/upload/:id', rejectUnauthenticated, upload.single('image'), async (req, res) => {
//     try {
//         const imageUrl = req.file.location;  // get the URL from uploaded image
//         const userId = req.params.id;  // get the id from url parameter

//         // query to insert image URL and user id to the database
//         const queryText = `
//             INSERT INTO "user_images" ("image_url", "user_id")
//             VALUES ($1, $2);
//         `;
//         const queryParams = [imageUrl, userId];

//         // execute the query
//         await pool.query(queryText, queryParams);

//         res.json({fileUrl: imageUrl});  // send the image URL as response
//     } catch (error) {
//         console.error(error);
//         res.sendStatus(500);  // send error status if there's an error
//     }
// });

// router.get('/view/:imageId', rejectUnauthenticated, async (req, res) => {
//   const { imageId } = req.params;
//   const { id: userId } = req.user;

//   const result = await pool.query(
//     'SELECT 1 FROM "user_images" WHERE "id" = $1 AND "user_id" = $2',
//     [imageId, userId]
//   );

//   if (result.rowCount === 0) {
//     res.sendStatus(403);
//     return;
//   }

//   const imageStream = s3
//     .getObject({
//       Bucket: 'rfw-user-images',
//       Key: imageId,
//     })
//     .createReadStream();

//   imageStream.pipe(res);
// });

// module.exports = router;




// const multer = require('multer');
// const multerS3 = require('multer-s3');  
// const express = require('express');
// const router = express.Router();
// const { S3 } = require("@aws-sdk/client-s3");
// const { rejectUnauthenticated } = require('../modules/authentication-middleware');
// const pool = require('../modules/pool');

// // configure AWS
// const s3 = new S3({ 
//     region: 'us-east-2',
//     credentials: {
//       accessKeyId: process.env.AWS_ACCESS_KEY,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//     }
// });

// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: 'rfw-user-images',
//         key: function (req, file, cb) {
//             cb(null, file.originalname);
//         }
//     })
// });


// router.post('/upload/:id', rejectUnauthenticated, upload.single('image'), async (req, res) => {
//     try {
//         const imageUrl = req.file.location;  // get the URL from uploaded image
//         const userId = req.params.id;  // get the id from url parameter

//         // query to insert image URL and user id to the database
//         const queryText = `
//             INSERT INTO "user_images" ("image_url", "user_id")
//             VALUES ($1, $2);
//         `;
//         const queryParams = [imageUrl, userId];

//         // execute the query
//         await pool.query(queryText, queryParams);

//         res.json({fileUrl: imageUrl});  // send the image URL as response
//     } catch (error) {
//         console.error(error);
//         res.sendStatus(500);  // send error status if there's an error
//     }
// });


// router.get('/user/:id', rejectUnauthenticated, async (req, res) => {
//     try {
//         const userId = req.params.id; 

//         // Make sure the logged in user can only access their own images
//         if (req.user.id != userId) {
//           res.sendStatus(403);
//           return;
//         }

//         const queryText = `
//           SELECT "image_url" FROM "user_images"
//           WHERE "user_id" = $1
//         `;

//         const result = await pool.query(queryText, [userId]);
//         res.json(result.rows.map(row => row.image_url));
//     } catch (error) {
//         console.error('Error in GET /api/image/user/:id', error);
//         res.sendStatus(500);
//     }
// });

// module.exports = router;
