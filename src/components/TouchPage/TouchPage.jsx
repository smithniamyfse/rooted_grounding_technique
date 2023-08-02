import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import { TextField, Box } from "@mui/material";
import { HashRouter as Router, Route, Link, useHistory } from 'react-router-dom';

function TouchPage() {
  // useDispatch to send data to the store
  const dispatch = useDispatch();

  // useSelector for user and user's event entries
  const user = useSelector((store) => store.user);
  const eventEntries = useSelector((store) => store.eventEntries[0]);

  const initialTouchValues = {
    touch_item_1: "",
    touch_item_2: "",
    touch_item_3: "",
    touch_item_4: "",
  };

  const [touchLog, setTouchLog] = useState(initialTouchValues);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setTouchLog((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const clearTouchInputs = () => {
    setTouchLog(initialTouchValues);
  };

  const addTouchLog = (event) => {
    event.preventDefault();
    // Include eventId
    if (eventEntries && eventEntries.id) {
      dispatch({
        type: "ADD_TOUCH_DATA",
        payload: { ...touchLog, userId: user.id, eventId: eventEntries.id },
      });
    } else {
      console.log("No event entry selected.");
    }
    // Call clearTouchInputs() and then log the state
    clearTouchInputs();
    console.log("Call clearTouchInputs(): ", touchLog);
  };

  // Dispatch action to fetch event entries when component mounts
  useEffect(() => {
    dispatch({ type: "FETCH_EVENT_ENTRIES" });
  }, [dispatch]);

  const goToHear = () => {
    history.push("/third-hear");
  };

  return (
    <>
      <main className="touch-second-page-conatiner">
        <h2>4 Things You Can Touch</h2>
        <div className="touch-second-form-container">
          <form onSubmit={addTouchLog}>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Item 1"
                variant="outlined"
                name="touch_item_1"
                value={touchLog.touch_item_1}
                onChange={handleInputChange}
              />
            </Box>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Item 2"
                variant="outlined"
                name="touch_item_2"
                value={touchLog.touch_item_2}
                onChange={handleInputChange}
              />
            </Box>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Item 3"
                variant="outlined"
                name="touch_item_3"
                value={touchLog.touch_item_3}
                onChange={handleInputChange}
              />
            </Box>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Item 4"
                variant="outlined"
                name="touch_item_4"
                value={touchLog.touch_item_4}
                onChange={handleInputChange}
              />
            </Box>
            <button type="submit">Submit What You Can Touch</button>
          </form>
        </div>
        <br />
        <button onClick={goToHear}>Go To Hear</button>
      </main>
      <footer className="touch-footer-container">
        <LogOutButton className="btn" />
      </footer>
    </>
  );
}

export default TouchPage;
