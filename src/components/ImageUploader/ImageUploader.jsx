import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedFile);
    dispatch({ type: 'UPLOAD_IMAGE', payload: formData });
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileUpload} />
      <button type="submit">Upload Image</button>
    </form>
  );
}

export default ImageUploader;
