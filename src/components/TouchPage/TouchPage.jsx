import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Box } from "@mui/material";
import { useHistory } from "react-router-dom";

function TouchPage({ onContinue }) {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTouchLog((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // useDispatch to send data to the store
  const dispatch = useDispatch();
  const history = useHistory();

  // useSelector for user and user's event entries
  const user = useSelector((store) => store.user);
  const currentEventId = useSelector((store) => store.currentEventId);
  const eventEntry = useSelector((store) =>
    store.eventEntries.find((entry) => entry.id === currentEventId)
  );

  const initialTouchValues = {
    touch_item_1: "",
    touch_item_2: "",
    touch_item_3: "",
    touch_item_4: "",
  };

  const [touchLog, setTouchLog] = useState(initialTouchValues);

  const handleContinue = () => {
    if (eventEntry && eventEntry.id) {
      dispatch({
        type: "ADD_TOUCH_DATA",
        payload: { ...touchLog, userId: user.id, eventId: eventEntry.id },
      });
    } else {
      console.log("No event entry selected.");
    }
    clearTouchInputs();
  };

  // Call the provided onContinue function when the component is mounted
  useEffect(() => {
    if (onContinue) {
      onContinue(handleContinue);
    }
  }, [onContinue]);

  const clearTouchInputs = () => {
    setTouchLog(initialTouchValues);
  };

  // Dispatch action to fetch event entries when component mounts
  useEffect(() => {
    dispatch({ type: "FETCH_EVENT_ENTRIES" });
  }, [dispatch]);

  return (
    <>
      <main className="touch-second-page-container">
        <h2>4 things you can TOUCH</h2>
        <div className="touch-form-container">
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
        </div>
      </main>
    </>
  );
}

export default TouchPage;
