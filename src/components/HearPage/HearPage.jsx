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

function HearPage() {
  // useDispatch to send data to the store
  const dispatch = useDispatch();

  const history = useHistory();

  // useSelector for user and user's event entries
  const user = useSelector((store) => store.user);
  const currentEventId = useSelector((store) => store.currentEventId); // get currentEventId from the store
  const eventEntry = useSelector((store) =>
    store.eventEntries.find((entry) => entry.id === currentEventId)
  ); // find the entry that matches currentEventId

  const initialHearValues = {
    hear_item_1: "",
    hear_item_2: "",
    hear_item_3: "",
  };

  const [hearLog, setHearLog] = useState(initialHearValues);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setHearLog((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const clearHearInputs = () => {
    setHearLog(initialHearValues);
  };

  const addHearLog = (event) => {
    event.preventDefault();
    // Include current entry eventId
    if (eventEntry && eventEntry.id) {
      dispatch({
        type: "ADD_HEAR_DATA",
        payload: { ...hearLog, userId: user.id, eventId: eventEntry.id },
      });
    } else {
      console.log("No event entry selected.");
    }
    // Call clearHearInputs() and then log the state
    clearHearInputs();
    console.log("Call clearHearInputs(): ", hearLog);
  };

  const goToSmell = () => {
    history.push("/fourth-smell");
  };

  // Dispatch action to fetch event entries when component mounts
  useEffect(() => {
    dispatch({ type: "FETCH_EVENT_ENTRIES" });
  }, [dispatch]);

  return (
    <>
      <main className="hear-third-page-container">
        <h2>What 3 Things Can You Hear</h2>
        <div className="hear-form-container">
          <form onSubmit={addHearLog}>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Item 1"
                variant="outlined"
                name="hear_item_1"
                value={hearLog.hear_item_1}
                onChange={handleInputChange}
              />
            </Box>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Item 2"
                variant="outlined"
                name="hear_item_2"
                value={hearLog.hear_item_2}
                onChange={handleInputChange}
              />
            </Box>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Item 3"
                variant="outlined"
                name="hear_item_3"
                value={hearLog.hear_item_3}
                onChange={handleInputChange}
              />
            </Box>
            <button type="submit">Submit What You Hear</button>
          </form>
        </div>
        <br />
        <button onClick={goToSmell}>Go To Smell</button>
      </main>
      <footer className="hear-footer-container">
        <LogOutButton className="btn" />
      </footer>
    </>
  );
}

export default HearPage;
