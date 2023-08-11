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

function SeePage() {
    // useDispatch to send data to the store
    const dispatch = useDispatch();
  
    const history = useHistory();
  
    // useSelector for user and user's event entries
    const user = useSelector((store) => store.user);
    const currentEventId = useSelector((store) => store.currentEventId);
  
    const initialSeeValues = {
      see_item_1: "",
      see_item_2: "",
      see_item_3: "",
      see_item_4: "",
      see_item_5: "",
    };
  
    const [seeLog, setSeeLog] = useState(initialSeeValues);
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
  
      setSeeLog((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const clearSeeInputs = () => {
      setSeeLog(initialSeeValues);
    };
  
    const [eventCreated, setEventCreated] = useState(false); // Add this state variable

  const addSeeLog = (event) => {
    event.preventDefault();

    // Dispatch action to create a new event entry
    dispatch({
      type: "CREATE_NEW_EVENT",
      payload: { user_id: user.id },
    });

    setEventCreated(true); // Set eventCreated to true
  };

  useEffect(() => {
    if (currentEventId && eventCreated) { // Check if eventCreated is true
      dispatch({
        type: "ADD_SEE_DATA",
        payload: { ...seeLog, userId: user.id, eventId: currentEventId },
      });
      clearSeeInputs();
      setEventCreated(false); // Reset eventCreated to false
    }
  }, [currentEventId, eventCreated, dispatch, seeLog]); // Add eventCreated to the dependency array


  const goToVerticalSteps = () => {
    history.push("/vertical-steps");
  };

  // Dispatch action to fetch event entries when component mounts
  useEffect(() => {
    dispatch({ type: "FETCH_EVENT_ENTRIES" });
  }, [dispatch]);

  return (
    <>
      <main className="see-first-page-container">
        <h1>Welcome, {user.username}</h1>
        <h1>Take 2 deep breaths...</h1>
        <h2>5 things can you SEE</h2>
        <div className="see-form-container">
          <form onSubmit={addSeeLog}>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Item 1"
                variant="outlined"
                name="see_item_1"
                value={seeLog.see_item_1}
                onChange={handleInputChange}
              />
            </Box>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Item 2"
                variant="outlined"
                name="see_item_2"
                value={seeLog.see_item_2}
                onChange={handleInputChange}
              />
            </Box>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Item 3"
                variant="outlined"
                name="see_item_3"
                value={seeLog.see_item_3}
                onChange={handleInputChange}
              />
            </Box>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Item 4"
                variant="outlined"
                name="see_item_4"
                value={seeLog.see_item_4}
                onChange={handleInputChange}
              />
            </Box>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Item 5"
                variant="outlined"
                name="see_item_5"
                value={seeLog.see_item_5}
                onChange={handleInputChange}
              />
            </Box>
            <button type="submit">Submit What You See</button>
          </form>
        </div>
        <br />
        <button onClick={goToVerticalSteps}>Go To Vertical Steps</button>
      </main>
      <footer className="see-footer-container">
        <LogOutButton className="btn" />
      </footer>
    </>
  );
}

export default SeePage;
