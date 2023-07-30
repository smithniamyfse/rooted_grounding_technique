const multer = require('multer');
const multerS3 = require('multer-s3');  
const express = require('express');
const router = express.Router();
const { S3 } = require("@aws-sdk/client-s3");

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

router.post('/upload', upload.single('image'), (req, res, next) => {
    res.json({fileUrl: req.file.location});
});

module.exports = router;
