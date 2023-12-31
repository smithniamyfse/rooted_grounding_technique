import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  HashRouter as Router,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import CaptureImage from "../CaptureImage/CaptureImage";

function CaptureLocationPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((store) => store.user);
  const images = useSelector((store) => store.image);

//   const goToSee = () => {
//     history.push("/first-see");
//   };

const goToPointImage = () => {
    history.push("/first-see-point");
};

  // This will run once after component load
  useEffect(() => {
    dispatch({ type: "FETCH_USER_IMAGE" });
  }, [dispatch]);

  return (
    <>
      <main className="capture-location-page-container">
        <h1>Welcome, {user.username}!</h1>
        <CaptureImage />
        <br />
        <div className="next-container">
          <button onClick={goToPointImage}>Go To Image Point Map</button>
        </div>
      </main>
    </>
  );
}

export default CaptureLocationPage;

