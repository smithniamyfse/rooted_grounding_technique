import React, { useEffect } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";

function UserProfile() {
  const user = useSelector((store) => store.user);

  return (
    <>
      <div className="container">
        <h2>Welcome Back, {user.username}!</h2>
      </div>
      <footer className="location-footer-container">
        <LogOutButton className="btn" />
      </footer>
    </>
  );
}

export default UserProfile;
