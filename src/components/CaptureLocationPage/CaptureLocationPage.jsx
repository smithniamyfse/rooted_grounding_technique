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

  const currentEventId = useSelector(
    (store) => store.eventEntries.currentEventId
  );

  // Dispatch the action to create a new event when the page loads
  useEffect(() => {
    dispatch({ type: "CREATE_NEW_EVENT" });
  }, [dispatch]);

  const goToSee = () => {
    // If there's no current event ID when starting the grounding technique, create a new event entry
    if (!currentEventId) {
      dispatch({ type: "CREATE_NEW_EVENT" });
    }
    history.push("/first-see");
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
          <button onClick={goToSee}>Go To See</button>
        </div>
      </main>
    </>
  );
}

export default CaptureLocationPage;
