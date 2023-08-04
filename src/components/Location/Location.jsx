import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import { TextField, Box } from "@mui/material";
import {
  HashRouter as Router,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

function Location() {
  // useDispatch to send data to store
  const dispatch = useDispatch();

  const currentEventId = useSelector((store) => store.currentEventId); // get currentEventId from the store

  const initialLocationValue = {
    location: "",
  };

  const [locationLog, setLocationLog] = useState(initialLocationValue);

  const handleLocationInputChange = (event) => {
    const { name, value } = event.target;

    setLocationLog((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const clearLocationInput = () => {
    setLocationLog(initialLocationValue);
  };

  const addLocationLog = (event) => {
    event.preventDefault();
    console.log(`Submitting location: ${locationLog}`);
    // Include current entry eventId
    if (currentEventId) {
      dispatch({
        type: "ADD_LOCATION_DATA",
        payload: { ...locationLog, eventId: currentEventId },
      });
    } else {
      console.log("No event entry selected.");
    }
    // Call clearLocationInput() and then log the state
    clearLocationInput();
    console.log("Call clearLocationInput(): ", locationLog);
  };

  //   // Dispatch action to fetch event entries and component mounts
  //   useEffect(() => {
  //     dispatch({ type: "FETCH_EVENT_ENTRIES" });
  //   }, [dispatch]);

  return (
    <>
      <section className="location-container">
        <h2>Enter Your Location</h2>
        <div className="location-form-container">
          <form onSubmit={addLocationLog}>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Location"
                variant="outlined"
                name="location"
                value={locationLog.location}
                onChange={handleLocationInputChange}
              />
            </Box>
            <button type="submit">Submit Your Location</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Location;
