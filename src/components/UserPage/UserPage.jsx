import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import ImageUploader from '../ImageUploader/ImageUploader';
import {useSelector, useDispatch} from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const images = useSelector((store) => store.image);

  // This will run once after component load
  useEffect(()=>{
    dispatch({type: 'FETCH_USER_IMAGE'});
  }, [dispatch]);

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <ImageUploader />
      {/* Mapping through the images array */}
      {/* {images.map((image, index) => (
        <img src={image.image_url} alt={`user upload ${index}`} key={index} />
      ))} */}
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
