import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  HashRouter as Router,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import CaptureLocationPage from "../CaptureLocationPage/CaptureLocationPage";
import LogOutButton from "../LogOutButton/LogOutButton";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  return (
    <>
      <div className="container">
        <h2>Welcome, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
        <CaptureLocationPage />
      </div>
      <footer className="user-page-footer-container">
        <LogOutButton className="btn" />
      </footer>
    </>
  );
}

export default UserPage;


// ** ORIGINAL WITH CaptureLocationPage first **
// import React, { useEffect } from "react";
// import CaptureLocationPage from "../CaptureLocationPage/CaptureLocationPage";
// import LogOutButton from "../LogOutButton/LogOutButton";
// import { useSelector, useDispatch } from "react-redux";

// function UserPage() {
//   // this component doesn't do much to start, just renders some user reducer info to the DOM
//   const user = useSelector((store) => store.user);

//   return (
//     <>
//       <div className="container">
//         <h2>Welcome, {user.username}!</h2>
//         <p>Your ID is: {user.id}</p>
//         <CaptureLocationPage />
//       </div>
//       <footer className="user-page-footer-container">
//         <LogOutButton className="btn" />
//       </footer>
//     </>
//   );
// }

// // this allows us to use <App /> in index.js
// export default UserPage;