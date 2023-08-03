import React, { useEffect } from "react";
import LocationPage from "../LocationPage/LocationPage";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  return (
    <>
      <div className="container">
        <h2>Welcome, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
        <LocationPage />
      </div>
      <footer className="location-footer-container">
        <LogOutButton className="btn" />
      </footer>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
