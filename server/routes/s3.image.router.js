const multer = require('multer');
const multerS3 = require('multer-s3');  
const express = require('express');
const router = express.Router();
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
            cb(null, file.originalname);  // use file original name as key
        }
    })
});

router.post('/upload', rejectUnauthenticated, upload.single('image'), async (req, res) => {
    try {
        const imageUrl = req.file.location;  // get the URL from uploaded image
        const userId = req.user.id;  // get the id of logged-in user

        // query to insert image URL and user id to the database
        const queryText = `
            INSERT INTO "user_images" ("image_url", "user_id")
            VALUES ($1, $2);
        `;
        const queryParams = [imageUrl, userId];

        // execute the query
        await pool.query(queryText, queryParams);

        res.json({fileUrl: imageUrl});  // send the image URL as response
    } catch (error) {
        console.error(error);
        res.sendStatus(500);  // send error status if there's an error
    }
});

module.exports = router;




// const multer = require('multer');
// const multerS3 = require('multer-s3');  
// const express = require('express');
// const router = express.Router();
// const { S3 } = require("@aws-sdk/client-s3");

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

// router.post('/upload', upload.single('image'), (req, res, next) => {
//     res.json({fileUrl: req.file.location});
// });

// module.exports = router;
