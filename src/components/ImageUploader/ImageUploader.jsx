import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);
  const imageUrls = useSelector((state) => state.image);
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

  useEffect(() => {
    dispatch({ type: 'FETCH_IMAGES' }); // Fetches all the images for the user
  }, [dispatch]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileUpload} ref={inputFile} />
        <button type="submit">Upload Image</button>
      </form>
      {/* Display the uploaded images */}
      {imageUrls.map((url, i) => (
        <img key={i} src={url} alt="Uploaded" />
      ))}
    </div>
  );
}

export default ImageUploader;
