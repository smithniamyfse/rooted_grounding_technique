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

const upload = multer({
    storage: multerS3({
      s3: s3Client,
      bucket: process.env.S3_BUCKET_NAME,
      key: function (req, file, cb) {
        cb(null, `${req.user.id}/${file.originalname}`);
      }
    })
});

const privateKeyString = fs.readFileSync(process.env.CLOUDFRONT_PRIVATE_KEY_PATH, 'utf8');

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

// ** VERSION 5 - FUUUUUUUCK **
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
// const { CreatePresignedPostCommand } = require("@aws-sdk/s3-presigned-post");
// const { rejectUnauthenticated } = require('../modules/authentication-middleware');
// const pool = require('../modules/pool');
// const fs = require('fs');
// const cfUtil = require('aws-cloudfront-sign');
// require('dotenv').config();

// const s3Client = new S3Client({
//     region: process.env.S3_REGION,
//     credentials: {
//       accessKeyId: process.env.AWS_ACCESS_KEY,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//     }
// });

// const upload = multer({
//     storage: multerS3({
//       s3: s3Client,
//       bucket: process.env.S3_BUCKET_NAME,
//       key: function (req, file, cb) {
//         // prefix the filename with the user ID
//         cb(null, `${req.user.id}/${file.originalname}`);
//       }
//     })
// });

// const privateKeyString = fs.readFileSync(process.env.CLOUDFRONT_PRIVATE_KEY_PATH, 'utf8');

// router.post('/upload', rejectUnauthenticated, upload.single('image'), async (req, res) => {
//   try {
//     const imageUrl = req.file.location;
//     const userId = req.user.id;
  
//     const queryText = `
//     INSERT INTO "user_images" ("image_url", "user_id")
//     VALUES ($1, $2);
//     `;
//     const queryParams = [imageUrl, userId];
  
//     await pool.query(queryText, queryParams);
  
//     res.json({fileUrl: imageUrl});
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(500);
//   }
// });

// router.get('/:imageId', rejectUnauthenticated, async (req, res) => {
//   const userId = req.user.id;
//   const imageId = req.params.imageId;
//   const key = `${userId}/${imageId}`;

//   const cfUrl = `https://${process.env.CLOUDFRONT_DISTRIBUTION_ID}.cloudfront.net/${key}`; 

//   const options = {
//     keypairId: process.env.CLOUDFRONT_KEY_PAIR_ID,
//     privateKeyString,
//     expireTime: Date.now() + (60 * 60 * 1000) // URL expires in 1 hour
//   };

//   try {
//     const signedUrl = cfUtil.getSignedUrl(cfUrl, options);
//     res.json({ url: signedUrl });
//   } catch (error) {
//     console.error('Error in GET /:imageId: ', error);
//     res.sendStatus(500);
//   }
// });

// router.get('/', rejectUnauthenticated, async (req, res) => {
//   const userId = req.user.id;

//   const queryText = `
//     SELECT "image_url" FROM "user_images" WHERE "user_id" = $1;
//   `;

//   try {
//     const result = await pool.query(queryText, [userId]);
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error in GET /:id: ', error);
//     res.sendStatus(500);
//   }
// });

// module.exports = router;


// ** VERSION 4 - v2?? **
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
// const { CloudFrontClient } = require('@aws-sdk/client-cloudfront');
// const { CreatePresignedPostCommand } = require("@aws-sdk/s3-presigned-post");
// const { rejectUnauthenticated } = require('../modules/authentication-middleware');
// const pool = require('../modules/pool');
// const fs = require('fs');
// require('dotenv').config();

// const s3Client = new S3Client({
//     region: 'us-east-2',
//     credentials: {
//       accessKeyId: process.env.AWS_ACCESS_KEY,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//     }
// });

// const upload = multer({
//     storage: multerS3({
//       s3: s3Client,
//       bucket: 'rfw-user-images',
//       key: function (req, file, cb) {
//         // prefix the filename with the user ID
//         cb(null, `${req.user.id}/${file.originalname}`);
//       }
//     })
// });

// const cloudFrontPrivateKey = fs.readFileSync(process.env.CLOUDFRONT_PRIVATE_KEY_PATH); // replace with path to your private key file
// const cloudFrontClient = new CloudFrontClient({ region: "us-east-1" }); // Changed for AWS SDK V3

// router.post('/upload', rejectUnauthenticated, upload.single('image'), async (req, res) => {
//   try {
//     const imageUrl = req.file.location;
//     const userId = req.user.id;
  
//     const queryText = `
//     INSERT INTO "user_images" ("image_url", "user_id")
//     VALUES ($1, $2);
//     `;
//     const queryParams = [imageUrl, userId];
  
//     await pool.query(queryText, queryParams);
  
//     res.json({fileUrl: imageUrl});
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(500);
//   }
// });

// router.get('/:imageId', rejectUnauthenticated, async (req, res) => {
//   const userId = req.user.id;
//   const imageId = req.params.imageId;
//   const key = `${userId}/${imageId}`;

//   const cloudFrontUrl = `https://${process.env.CLOUDFRONT_DISTRIBUTION_ID}.cloudfront.net/${key}`; // replace E1XUMY0BRP53MM with your CloudFront distribution ID

//   const options = {
//     url: cloudFrontUrl,
//     expires: Math.floor((Date.now() / 1000) + (60 * 60)) // URL expires in 1 hour
//   };

//   try {
//     const signedUrl = cloudFrontClient.getSignedUrl(options);
//     res.json({ url: signedUrl });
//   } catch (error) {
//     console.error('Error in GET /:imageId: ', error);
//     res.sendStatus(500);
//   }
// });

// router.get('/', rejectUnauthenticated, async (req, res) => {
//   const userId = req.user.id;

//   const queryText = `
//     SELECT "image_url" FROM "user_images" WHERE "user_id" = $1;
//   `;

//   try {
//     const result = await pool.query(queryText, [userId]);
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error in GET /:id: ', error);
//     res.sendStatus(500);
//   }
// });

// module.exports = router;


// ** VERSION 3 **
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3"); // Changed for AWS SDK V3
// const { fromIni } = require("@aws-sdk/credential-providers"); // Changed for AWS SDK V3
// const { CloudFrontClient, CreateDistributionCommand } = require("@aws-sdk/client-cloudfront"); // Changed for AWS SDK V3
// const { rejectUnauthenticated } = require('../modules/authentication-middleware');
// const pool = require('../modules/pool');
// const fs = require('fs');
// require('dotenv').config();

// const s3Client = new S3Client({
//     region: 'us-east-2',
//     credentials: fromIni({ profile: "default" }) // Changed for AWS SDK V3
// });

// const upload = multer({
//     storage: multerS3({
//       s3: s3Client, // Changed for AWS SDK V3
//       bucket: 'rfw-user-images',
//       key: function (req, file, cb) {
//         // prefix the filename with the user ID
//         cb(null, `${req.user.id}/${file.originalname}`);
//       }
//     })
// });

// const cloudFrontPrivateKey = fs.readFileSync(process.env.CLOUDFRONT_PRIVATE_KEY_PATH); // replace with path to your private key file
// const cloudFrontClient = new CloudFrontClient({ region: "us-east-2" }); // Changed for AWS SDK V3


// router.post('/upload', rejectUnauthenticated, upload.single('image'), async (req, res) => {
//   try {
//     const imageUrl = req.file.location;
//     const userId = req.user.id;
  
//     const queryText = `
//     INSERT INTO "user_images" ("image_url", "user_id")
//     VALUES ($1, $2);
//     `;
//     const queryParams = [imageUrl, userId];
  
//     await pool.query(queryText, queryParams);
  
//     res.json({fileUrl: imageUrl});
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(500);
//   }
// });

// router.get('/:imageId', rejectUnauthenticated, async (req, res) => {
//   const userId = req.user.id;
//   const imageId = req.params.imageId;
//   const key = `${userId}/${imageId}`;

//   const cloudFrontUrl = `https://${process.env.CLOUDFRONT_DISTRIBUTION_ID}.cloudfront.net/${key}`; // replace E1XUMY0BRP53MM with your CloudFront distribution ID

//   const options = {
//     url: cloudFrontUrl,
//     expires: Math.floor((Date.now() / 1000) + (60 * 60)) // URL expires in 1 hour
//   };

//   try {
//     const signedUrl = signer.getSignedUrl(options);
//     res.json({ url: signedUrl });
//   } catch (error) {
//     console.error('Error in GET /:imageId: ', error);
//     res.sendStatus(500);
//   }
// });

// router.get('/', rejectUnauthenticated, async (req, res) => {
//   const userId = req.user.id;

//   const queryText = `
//     SELECT "image_url" FROM "user_images" WHERE "user_id" = $1;
//   `;

//   try {
//     const result = await pool.query(queryText, [userId]);
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error in GET /:id: ', error);
//     res.sendStatus(500);
//   }
// });

// module.exports = router;



// ** VERSION 2 **
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const { S3, GetObjectCommand } = require("@aws-sdk/client-s3");
// const { rejectUnauthenticated } = require('../modules/authentication-middleware');
// const pool = require('../modules/pool');

// const s3 = new S3({
//     region: 'us-east-2',
//     credentials: {
//       accessKeyId: process.env.AWS_ACCESS_KEY,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//     }
// });

// const upload = multer({
//     storage: multerS3({
//       s3: s3,
//       bucket: 'rfw-user-images',
//       key: function (req, file, cb) {
//         // prefix the filename with the user ID
//         cb(null, `${req.user.id}/${file.originalname}`);
//       }
//     })
// });

// router.post('/upload', rejectUnauthenticated, upload.single('image'), async (req, res) => {
//   try {
//     const imageUrl = req.file.location;
//     const userId = req.user.id;
  
//     const queryText = `
//     INSERT INTO "user_images" ("image_url", "user_id")
//     VALUES ($1, $2);
//   `;
//     const queryParams = [imageUrl, userId];
  
//     await pool.query(queryText, queryParams);
  
//     res.json({fileUrl: imageUrl});
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(500);
//   }
// });

// router.get('/:imageId', rejectUnauthenticated, async (req, res) => {
//   const userId = req.user.id;
//   const imageId = req.params.imageId;
//   const key = `${userId}/${imageId}`;

//   const command = new GetObjectCommand({
//     Bucket: 'rfw-user-images',
//     Key: key,
//   });

//   try {
//     const data = await s3.send(command);
//     const image = await new Promise((resolve, reject) => {
//       const chunks = [];
//       data.Body.on('data', (chunk) => chunks.push(chunk));
//       data.Body.on('error', reject);
//       data.Body.on('end', () => resolve(Buffer.concat(chunks)));
//     });
//     res.set('Content-Type', 'image/jpeg');
//     res.send(image);
//   } catch (error) {
//     console.error('Error in GET /:imageId: ', error);
//     res.sendStatus(500);
//   }
// });

// router.get('/', rejectUnauthenticated, async (req, res) => {
//   const userId = req.user.id;

//   const queryText = `
//     SELECT "image_url" FROM "user_images" WHERE "user_id" = $1;
//   `;

//   try {
//     const result = await pool.query(queryText, [userId]);
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error in GET /:id: ', error);
//     res.sendStatus(500);
//   }
// });

// module.exports = router;



/// ** VERSION 1 **
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const { S3 } = require("@aws-sdk/client-s3");
// const { rejectUnauthenticated } = require('../modules/authentication-middleware');
// const pool = require('../modules/pool');

// const s3 = new S3({
//     region: 'us-east-2',
//     credentials: {
//       accessKeyId: process.env.AWS_ACCESS_KEY,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//     }
// });

// const upload = multer({
//     storage: multerS3({
//       s3: s3,
//       bucket: 'rfw-user-images',
//       key: function (req, file, cb) {
//         cb(null, file.originalname);
//       }
//     })
// });

// router.post('/upload', rejectUnauthenticated, upload.single('image'), async (req, res) => {
//   try {
//     const imageUrl = req.file.location;
//     const userId = req.user.id;
  
//     const queryText = `
//     INSERT INTO "user_images" ("image_url", "user_id")
//     VALUES ($1, $2);
//   `;
//     const queryParams = [imageUrl, userId];
  
//     await pool.query(queryText, queryParams);
  
//     res.json({fileUrl: imageUrl});
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(500);
//   }
// });


// router.get('/', rejectUnauthenticated, async (req, res) => {
//   const userId = req.user.id;

//   const queryText = `
//     SELECT "image_url" FROM "user_images" WHERE "user_id" = $1;
//   `;

//   try {
//     const result = await pool.query(queryText, [userId]);
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error in GET /:id: ', error);
//     res.sendStatus(500);
//   }
// });

// module.exports = router;




