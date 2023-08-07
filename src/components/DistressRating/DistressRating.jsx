import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Location from "../Location/Location";
import LogOutButton from "../LogOutButton/LogOutButton";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 6,
    label: "6",
  },
  {
    value: 7,
    label: "7",
  },
  {
    value: 8,
    label: "8",
  },
  {
    value: 9,
    label: "9",
  },
  {
    value: 10,
    label: "10",
  },
];



function DistressRating() {
  const distressValue =
    useSelector((store) => store.distress.distressValue) || 0;
  const currentEventId = useSelector((store) => store.currentEventId);

  console.log(`Current distress value from Redux state: ${distressValue}`);
  console.log(`Current event ID from Redux state: ${currentEventId}`);

  function preventHorizontalKeyboardNavigation(event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
    }
  }

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (event, newValue) => {
    dispatch({ type: "SET_DISTRESS_VALUE", payload: newValue });
  };



const submitDistressRating = (event) => {
    event.preventDefault();
    console.log('Dispatching SUBMIT_DISTRESS_VALUE with payload:', { value: distressValue, eventId: currentEventId });
    dispatch({
      type: "SUBMIT_DISTRESS_VALUE",
      payload: { value: distressValue, eventId: currentEventId },
    });
  };
  

  
  const goToUserProfile = () => {
    history.push("/user-profile");
  };

  return (
    <>
      <main className="distress-rating-container">
        <h2>On a scale of 0 - 10, rate your level of distress</h2>
        <div className="distress-slider-form-container">
          <form onSubmit={submitDistressRating}>
            <Stack
              sx={{ height: 350, display: "flex", justifyContent: "center" }}
              spacing={1}
              direction="row"
            >
              <Slider
                sx={{
                  width: "15px",
                  '& input[type="range"]': {
                    WebkitAppearance: "slider-vertical",
                  },
                }}
                // sx={{ width: "15px" }}
                orientation="vertical"
                aria-label="DistressRating"
                value={distressValue}
                onChange={handleChange}
                valueLabelDisplay="on"
                onKeyDown={preventHorizontalKeyboardNavigation}
                defaultValue={0}
                step={1}
                min={0}
                max={10}
                marks={marks}
              />
            </Stack>
            <br />
            <button type="submit">Submit Your Distress Rating</button>
          </form>
        </div>
        <br />
        <div className="location-input-container">
          <Location />
        </div>
        <br />
        <button onClick={goToUserProfile}>Go To User Profile</button>
      </main>
      <footer className="taste-footer-container">
        <LogOutButton className="btn" />
      </footer>
    </>
  );
}

export default DistressRating;