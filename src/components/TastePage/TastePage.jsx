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

function TastePage() {
  // useDispatch to send data to store
  const dispatch = useDispatch();

  const history = useHistory();

  // useSelector for user and user's event entries
  const user = useSelector((store) => store.user);
  const eventEntries = useSelector((store) => store.eventEntries[0]);

  const initialTasteValues = {
    taste_item_1: "",
  };

  const [tasteLog, setTasteLog] = useState(initialTasteValues);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setTasteLog((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const clearTasteInputs = () => {
    setTasteLog(initialTasteValues);
  };

  const addTasteLog = (event) => {
    event.preventDefault();
    // Include eventId and userId
    if (eventEntries && eventEntries.id) {
      dispatch({
        type: "ADD_TASTE_DATA",
        payload: { ...tasteLog, userId: user.id, eventId: eventEntries.id },
      });
    } else {
      console.log("No event entry selected.");
    }
    // Call clearTasteInputs() and then log the state
    clearTasteInputs();
    console.log("Call clearTasteInputs(): ", tasteLog);
  };

  const goToUserPage = () => {
    history.push("/user");
  };

  // Dispatch action to fetch event entries and component mounts
  useEffect(() => {
    dispatch({ type: "FETCH_EVENT_ENTRIES" });
  }, [dispatch]);

  return (
    <>
      <main className="taste-fifth-page-container">
        <h2>1 Thing You Can You Taste</h2>
        <div className="taste-form-container">
          <form onSubmit={addTasteLog}>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Item 1"
                variant="outlined"
                name="taste_item_1"
                value={tasteLog.taste_item_1}
                onChange={handleInputChange}
              />
            </Box>
            <button type="submit">Submit What You Taste</button>
          </form>
        </div>
        <br />
        <button onClick={goToUserPage}>Go To User Page</button>
      </main>
      <footer className="taste-footer-container">
        <LogOutButton className="btn" />
      </footer>
    </>
  );
}

export default TastePage;