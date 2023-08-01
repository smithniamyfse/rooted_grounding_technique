const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const fs = require('fs');
const cfUtil = require('aws-cloudfront-sign');
require('dotenv').config();

const s3Client = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});



// const upload = multer({
//     storage: multerS3({
//       s3: s3Client,
//       bucket: process.env.S3_BUCKET_NAME,
//       key: function (req, file, cb) {
//         cb(null, `${req.user.id}/${file.originalname}`);
//       },
//     }),
//   });
  
const upload = multer({
    storage: multerS3({
      s3: s3Client,
      bucket: process.env.S3_BUCKET_NAME,
      key: function (req, file, cb) {
        cb(null, `${req.user.id}/${Date.now()}.png`); // Save with a .png extension and a unique name
      },
    }),
});


const privateKeyString = fs.readFileSync(process.env.CLOUDFRONT_PRIVATE_KEY_PATH, 'utf8');


router.post('/upload', rejectUnauthenticated, (req, res, next) => {
    upload.single('image')(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.error('Multer error: ', err);
        return res.status(500).json(err);
      } else if (err) {
        // An unknown error occurred when uploading.
        console.error('Unknown error: ', err);
        return res.status(500).json(err);
      }
      
      // Everything went fine and multer is done with the file.
      // Log the file and body for debugging:
      console.log('Request file', req.file); 
      console.log('Request body', req.body);
      
      // Continue to the next middleware:
      next();
    });
  }, async (req, res) => {
    try {
      console.log(req.file);  // Add logging here
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



router.get('/:imageId', rejectUnauthenticated, async (req, res) => {
    console.log('req.user: ', req.user); 
  const userId = req.user.id;
  const imageId = req.params.imageId;
  const key = `${userId}/${imageId}`;
  console.log('CLOUDFRONT_DISTRIBUTION_ID: ', process.env.CLOUDFRONT_DISTRIBUTION_ID);
  const cfUrl = `https://${process.env.CLOUDFRONT_DISTRIBUTION_ID}.cloudfront.net/${key}`; 

  const options = {
    keypairId: process.env.CLOUDFRONT_KEY_PAIR_ID,
    privateKeyString,
    expireTime: Date.now() + (60 * 60 * 1000) // URL expires in 1 hour
  };

  try {
    const signedUrl = cfUtil.getSignedUrl(cfUrl, options);
    res.json({ url: signedUrl });
  } catch (error) {
    console.error('Error in GET /:imageId: ', error);
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
    const signedUrls = result.rows.map(row => {
      const key = row.image_url.split('.com/')[1];
      const cfUrl = `https://${process.env.CLOUDFRONT_DISTRIBUTION_ID}.cloudfront.net/${key}`; 

      const options = {
        keypairId: process.env.CLOUDFRONT_KEY_PAIR_ID,
        privateKeyString,
        expireTime: Date.now() + (60 * 60 * 1000) // URL expires in 1 hour
      };

      return cfUtil.getSignedUrl(cfUrl, options);
    });

    res.json(signedUrls);
  } catch (error) {
    console.error('Error in GET /:id: ', error);
    res.sendStatus(500);
  }
});

module.exports = router;

