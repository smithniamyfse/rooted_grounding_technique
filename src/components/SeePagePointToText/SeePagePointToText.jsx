import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  HashRouter as Router,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import PointToTextImage from "../PointToTextImage/PointToTextImage";
import LogOutButton from "../LogOutButton/LogOutButton";

function SeePagePoint() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((store) => store.user);

  const goToTouch = () => {
    history.push("/second-touch");
  };

  useEffect(() => {
    dispatch({ type: "FETCH_USER_IMAGE" });
  }, [dispatch]);

  return (
    <>
      <main className="see-first-point-container">
        <h1>Welcome, {user.username}</h1>
        <h1>Take 2 deep breaths...</h1>
        <h2>5 things can you SEE</h2>
        <div className="image-text-container">
          <PointToTextImage />
        </div>
        <br />
        <button onClick={goToTouch}>Go To Touch</button>
      </main>
      <footer className="see-point-footer-container">
        <LogOutButton className="btn" />
      </footer>
    </>
  );
}

export default SeePagePoint;

// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   HashRouter as Router,
//   Route,
//   Link,
//   useHistory,
// } from "react-router-dom";
// import PointToTextImage from "../PointToTextImage/PointToTextImage";
// import LogOutButton from "../LogOutButton/LogOutButton";

// function SeePagePoint() {
//   // useDispatch to send data to the store
//   const dispatch = useDispatch();
//   const history = useHistory();

//   // useSelector for user and user's event entries
//   const user = useSelector((store) => store.user);
//   const imageUrl = useSelector((store) => store.image.imageUrl);

//   const goToTouch = () => {
//     history.push("/second-touch");
//   };

//   return (
//     <>
//       <main className="see-first-point-container">
//         <h1>Welcome, {user.username}</h1>
//         <h1>Take 2 deep breaths...</h1>
//         <h2>5 things can you SEE</h2>
//         <div className="image-text-container">
//           <PointToTextImage imageUrl={imageUrl} />
//         </div>
//         <br />
//         <button onClick={goToTouch}>Go To Touch</button>
//       </main>
//       <footer className="see-point-footer-container">
//         <LogOutButton className="btn" />
//       </footer>
//     </>
//   );
// }

// export default SeePagePoint;

// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   HashRouter as Router,
//   Route,
//   Link,
//   useHistory,
// } from "react-router-dom";
// import PointToTextImage from "../PointToTextImage/PointToTextImage";
// import LogOutButton from "../LogOutButton/LogOutButton";

// function SeePagePoint() {
//   // useDispatch to send data to the store
//   const dispatch = useDispatch();
//   const history = useHistory();

//   // useSelector for user and user's event entries
//   const user = useSelector((store) => store.user);
//   const imageUrl = useSelector((store) => store.image.imageUrl);

//   const goToTouch = () => {
//     history.push("/second-touch");
//   };

//   useEffect(() => {
//     dispatch({ type: "FETCH_EVENT_ENTRIES" });
//   }, [dispatch]);

//   return (
//     <>
//       <main className="see-first-point-container">
//         <h1>Welcome, {user.username}</h1>
//         <h1>Take 2 deep breaths...</h1>
//         <h2>5 things can you SEE</h2>
//         <div className="image-text-container">
//           <PointToTextImage imageUrl={imageUrl} />
//         </div>
//         <br />
//         <button onClick={goToTouch}>Go To Touch</button>
//       </main>
//       <footer className="see-point-footer-container">
//         <LogOutButton className="btn" />
//       </footer>
//     </>
//   );
// }

// export default SeePagePoint;
