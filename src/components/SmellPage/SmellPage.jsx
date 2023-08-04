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

function SmellPage() {
  // useDispatch to send data to the store
  const dispatch = useDispatch();

  const history = useHistory();

  // useSelector for user and user's event entries
  const user = useSelector((store) => store.user);
  const currentEventId = useSelector((store) => store.currentEventId); // get currentEventId from the store
  const eventEntry = useSelector((store) =>
    store.eventEntries.find((entry) => entry.id === currentEventId)
  ); // find the entry that matches currentEventId

  const initialSmellValues = {
    smell_item_1: "",
    smell_item_2: "",
  };

  const [smellLog, setSmellLog] = useState(initialSmellValues);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setSmellLog((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const clearSmellInputs = () => {
    setSmellLog(initialSmellValues);
  };

  const addSmellLog = (event) => {
    event.preventDefault();
    // Include current entry eventId
    if (eventEntry && eventEntry.id) {
      dispatch({
        type: "ADD_SMELL_DATA",
        payload: { ...smellLog, userId: user.id, eventId: eventEntry.id },
      });
    } else {
      console.log("No event entry selected.");
    }
    // Call clearSmellInputs() and then log the state
    clearSmellInputs();
    console.log("Call clearSmellInputs(): ", smellLog);
  };

  const goToTaste = () => {
    history.push("/fifth-taste");
  };

  // Dispatch action to fetch event entries and component mounts
  useEffect(() => {
    dispatch({ type: "FETCH_EVENT_ENTRIES" });
  }, [dispatch]);

  return (
    <>
      <main className="smell-fourth-page-container">
        <h2>What 2 Things Can You Smell</h2>
        <div className="smell-form-container">
          <form onSubmit={addSmellLog}>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Item 1"
                variant="outlined"
                name="smell_item_1"
                value={smellLog.smell_item_1}
                onChange={handleInputChange}
              />
            </Box>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Item 2"
                variant="outlined"
                name="smell_item_2"
                value={smellLog.smell_item_2}
                onChange={handleInputChange}
              />
            </Box>
            <button type="submit">Submit What You Smell</button>
          </form>
        </div>
        <br />
        <button onClick={goToTaste}>Go To Taste</button>
      </main>
      <footer className="smell-footer-container">
        <LogOutButton className="btn" />
      </footer>
    </>
  );
}

export default SmellPage;
