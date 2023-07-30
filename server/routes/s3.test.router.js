const axios = require('axios');
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.post('/api/s3', async (req, res) => {
  try {
    const bucketName = 'rfw-user-images'; 
    const fileName = 'your-file-name';  // replace with actual file name or dynamically generate file name

    const response = await axios.put(`https://12ghcjyj66.execute-api.us-east-2.amazonaws.com/dev/${bucketName}/${fileName}`, req.body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


module.exports = router;