const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3 } = require("@aws-sdk/client-s3");
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

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

router.post('/upload', rejectUnauthenticated, upload.single('image'), async (req, res) => {
  try {
    const imageUrl = req.file.location;
    const userId = req.user.id;
  
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


router.get('/', rejectUnauthenticated, async (req, res) => {
  const userId = req.user.id;

  const queryText = `
    SELECT "image_url" FROM "user_images" WHERE "user_id" = $1;
  `;

  try {
    const result = await pool.query(queryText, [userId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error in GET /:id: ', error);
    res.sendStatus(500);
  }
});

module.exports = router;




