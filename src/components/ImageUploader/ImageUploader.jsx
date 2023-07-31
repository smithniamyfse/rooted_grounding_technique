import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);
  const inputFile = useRef(null)

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedFile);
    dispatch({ type: 'UPLOAD_IMAGE', payload: formData });
    // Clear the file input field
    inputFile.current.value = '';
    // Clear the selectedFile state
    setSelectedFile(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileUpload} ref={inputFile} />
      <button type="submit">Upload Image</button>
    </form>
  );
}

export default ImageUploader;
