import React, { useState } from 'react';
import axios from 'axios';

const TestFileUpload = () => {
  const [selectedFile, setSelectedFile] = useState();

  // Handle the file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle the file upload
  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }
    
    const fileBlob = new Blob([selectedFile], { type: selectedFile.type });
    let formData = new FormData();
    formData.append('file', fileBlob);
  
    try {
      const response = await axios.post('/api/s3', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log(response.data);
      alert("File uploaded successfully");
    } catch (error) {
      console.error(error);
      alert("File upload failed");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default TestFileUpload;



/*
const fileInput = document.querySelector('#your-file-input-id');
fileInput.addEventListener('change', handleFileUpload);

async function handleFileUpload(event) {
  const file = event.target.files[0];
  
  const fileBlob = new Blob([file], { type: file.type });

  let formData = new FormData();
  formData.append('file', fileBlob);

  // Send a POST request to your server-side endpoint
  try {
    const response = await axios.post('/api/s3', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
*/

/*

Replace 

API Gateway URL
'https://your-api-gateway-url' 

your endpoint
'/your-api-endpoint'

your file input ID
'#your-file-input-id' with your actual

*/