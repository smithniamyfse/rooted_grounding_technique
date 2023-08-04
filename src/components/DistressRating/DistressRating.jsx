import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
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

// function valuetext(value) {
//   return `${value}`;
// }

function DistressRating() {
  const distressValue =
    useSelector((store) => store.distress.distressValue) || 0;
  const eventId = useSelector((store) => store.eventEntries[0]?.id);

  function preventHorizontalKeyboardNavigation(event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
    }
  }

  console.log(`Current distress value from Redux state: ${distressValue}`);
  console.log(`Current event ID from Redux state: ${eventId}`);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (event, newValue) => {
    console.log(`Slider value changed: ${newValue}`);
    dispatch({
      type: "SET_DISTRESS_VALUE",
      payload: newValue,
    });
  };

  const submitDistressRating = (event) => {
    event.preventDefault();
    console.log(`Submitting distress rating: ${distressValue}`);
    dispatch({
      type: "SUBMIT_DISTRESS_VALUE",
      payload: {
        value: distressValue,
        eventId: eventId,
      },
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
                  WebkitAppearance: 'slider-vertical',
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
        <button onClick={goToUserProfile}>Go To User Profile</button>
      </main>
      <footer className="taste-footer-container">
        <LogOutButton className="btn" />
      </footer>
    </>
  );
}

export default DistressRating;

// ** VERSION FUCKING WORKS 4 **
// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
// import LogOutButton from "../LogOutButton/LogOutButton";
// import Stack from "@mui/material/Stack";
// import Slider from "@mui/material/Slider";

// const marks = [
//   {
//     value: 0,
//     label: "0",
//   },
//   {
//     value: 1,
//     label: "1",
//   },
//   {
//     value: 2,
//     label: "2",
//   },
//   {
//     value: 3,
//     label: "3",
//   },
//   {
//     value: 4,
//     label: "4",
//   },
//   {
//     value: 5,
//     label: "5",
//   },
//   {
//     value: 6,
//     label: "6",
//   },
//   {
//     value: 7,
//     label: "7",
//   },
//   {
//     value: 8,
//     label: "8",
//   },
//   {
//     value: 9,
//     label: "9",
//   },
//   {
//     value: 10,
//     label: "10",
//   },
// ];

// function valuetext(value) {
//   return `${value}`;
// }

// function DistressRating() {
//   const distressValue =
//     useSelector((store) => store.distress.distressValue) || 0;
//   const eventId = useSelector((store) => store.eventEntries[0]?.id);

//   console.log(`Current distress value from Redux state: ${distressValue}`);
//   console.log(`Current event ID from Redux state: ${eventId}`);

//   const dispatch = useDispatch();
//   const history = useHistory();

//   const handleChange = (event, newValue) => {
//     console.log(`Slider value changed: ${newValue}`);
//     dispatch({
//       type: "SET_DISTRESS_VALUE",
//       payload: newValue,
//     });
//   };

//   const submitDistressRating = (event) => {
//     event.preventDefault();
//     console.log(`Submitting distress rating: ${distressValue}`);
//     dispatch({
//       type: "SUBMIT_DISTRESS_VALUE",
//       payload: {
//         value: distressValue,
//         eventId: eventId,
//       },
//     });
//   };

//   const goToUserProfile = () => {
//     history.push("/user-profile");
//   };

//   return (
//     <>
//       <main className="distress-rating-container">
//         <h2>On a scale of 0 - 10, rate your level of distress</h2>
//         <div className="distress-slider-form-container">
//           <form onSubmit={submitDistressRating}>
//             <Stack
//               sx={{ height: 300, display: "flex", justifyContent: "center" }}
//               spacing={1}
//               direction="row"
//             >
//               <Slider
//                 sx={{ width: "80%", height: "10px" }}
//                 aria-label="DistressRating"
//                 value={distressValue}
//                 onChange={handleChange}
//                 valueLabelDisplay="on"
//                 defaultValue={0}
//                 step={1}
//                 min={0}
//                 max={10}
//                 marks={marks}
//               />
//             </Stack>
//             <br />
//             <button type="submit">Submit Your Distress Rating</button>
//           </form>
//         </div>
//         <br />
//         <button onClick={goToUserProfile}>Go To User Profile</button>
//       </main>
//       <footer className="taste-footer-container">
//         <LogOutButton className="btn" />
//       </footer>
//     </>
//   );
// }

// export default DistressRating;

// ** VERSION 3 **
// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   HashRouter as Router,
//   Route,
//   Link,
//   useHistory,
// } from "react-router-dom";
// import Stack from "@mui/material/Stack";
// import Slider from "@mui/material/Slider";

// function DistressRating() {
//   const marks = [
//     {
//       value: 0,
//       label: "0",
//     },
//     {
//       value: 1,
//       label: "1",
//     },
//     {
//       value: 2,
//       label: "2",
//     },
//     {
//       value: 3,
//       label: "3",
//     },
//     {
//       value: 4,
//       label: "4",
//     },
//     {
//       value: 5,
//       label: "5",
//     },
//     {
//       value: 6,
//       label: "6",
//     },
//     {
//       value: 7,
//       label: "7",
//     },
//     {
//       value: 8,
//       label: "8",
//     },
//     {
//       value: 9,
//       label: "9",
//     },
//     {
//       value: 10,
//       label: "10",
//     },
//   ];

//   function valuetext(value) {
//     return `${value}`;
//   }

//   const distressValue =
//     useSelector((store) => store.distress.distressValue) || 0;
//   const eventId = useSelector((store) => store.distress.eventId);

//   const dispatch = useDispatch();
//   const history = useHistory();

//   const handleChange = (event, newValue) => {
//     console.log(`Slider value changed: ${newValue}`);
//     dispatch({
//       type: "SET_DISTRESS_VALUE",
//       payload: {
//         value: newValue,
//         eventId: eventId,
//       },
//     });
//   };

//   const submitDistressRating = (event) => {
//     event.preventDefault();
//     console.log(`Submitting distress rating: ${distressValue}`);
//     dispatch({
//       type: "SUBMIT_DISTRESS_VALUE",
//       payload: {
//         value: distressValue,
//         eventId: eventId,
//       },
//     });
//     history.push("/user-profile");
//   };

//   return (
//     <main className="distress-rating-container">
//       <form onSubmit={submitDistressRating}>
//         <Stack
//           sx={{ display: "flex", justifyContent: "center" }}
//           spacing={1}
//           direction="row"
//         >
//           <Slider
//             sx={{ width: "80%", height: "10px" }}
//             aria-label="DistressRating"
//             defaultValue={0}
//             valueLabelDisplay="on"
//             getAriaValueText={valuetext}
//             step={1}
//             marks={marks}
//             min={0}
//             max={10}
//           />
//           {/* <Slider
//             sx={{ width: "90%" }}  // Change this to adjust the width of the slider
//             aria-label="DistressRating"
//             value={distressValue}
//             onChange={handleChange}
//             valueLabelDisplay="on"
//             defaultValue={0}
//             step={1}
//             min={0}
//             max={10}
//             marks={marks}
//           /> */}
//         </Stack>
//         <br />
//         <button type="submit">Go To Your Profile</button>
//       </form>
//     </main>
//   );
// }

// export default DistressRating;

// ** VERSION 2 **
// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   HashRouter as Router,
//   Route,
//   Link,
//   useHistory,
// } from "react-router-dom";
// import Stack from "@mui/material/Stack";
// import Slider from "@mui/material/Slider";

// const marks = Array.from({ length: 11 }, (_, i) => ({
//   value: i,
//   label: String(i),
// }));

// function DistressRating() {
//     const distressValue = useSelector((store) => store.distress.distressValue); // Corrected: Read distressValue from the correct path
//     const eventId = useSelector((store) => store.distress.eventId); // Corrected: Read eventId from the correct path

//     const dispatch = useDispatch();
//     const history = useHistory();

//     const handleChange = (event, newValue) => {
//         dispatch({
//           type: "SET_DISTRESS_VALUE",
//           payload: newValue,
//         });
//       };

//       const submitDistressRating = (event) => {
//         event.preventDefault();
//         history.push("/user-profile");
//       };

//       return (
//         <main className="distress-rating-container">
//           <form onSubmit={submitDistressRating}>
//         <Stack
//           sx={{ height: 300, display: "flex", justifyContent: "center" }}
//           spacing={1}
//           direction="row"
//         >
//           <Slider
//             sx={{ width: "10px" }}
//             aria-label="DistressRating"
//             orientation="vertical"
//             value={distressValue}
//             onChange={handleChange}
//             valueLabelDisplay="on"
//             defaultValue={0}
//             step={1}
//             min={0}
//             max={10}
//             marks={marks}
//           />
//         </Stack>
//         <br />
//         <button type="submit">Go To Your Profile</button>
//       </form>
//     </main>
//   );
// }

// export default DistressRating;

// ** VERSION 1 **
// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   HashRouter as Router,
//   Route,
//   Link,
//   useHistory,
// } from "react-router-dom";
// import Stack from "@mui/material/Stack";
// import Slider from "@mui/material/Slider";

// const marks = Array.from({ length: 11 }, (_, i) => ({
//   value: i,
//   label: String(i),
// }));

// function DistressRating() {
//     const distressValue = useSelector((store) => store.distress.distressValue);
//     const eventId = useSelector((store) => store.distress.eventId);

//   const dispatch = useDispatch();
//   const history = useHistory();

//   const handleChange = (event, newValue) => {
//     dispatch({
//       type: "SET_DISTRESS_VALUE",
//       payload: { eventId: eventId, value: newValue },
//     });
//   };

//   const submitDistressRating = (event) => {
//     event.preventDefault();
//     history.push("/user-profile");
//   };

//   return (
//     <main className="distress-rating-container">
//       <form onSubmit={submitDistressRating}>
//         <Stack
//           sx={{ height: 300, display: "flex", justifyContent: "center" }}
//           spacing={1}
//           direction="row"
//         >
//           <Slider
//             sx={{ width: "10px" }}
//             aria-label="DistressRating"
//             orientation="vertical"
//             value={distressValue}
//             onChange={handleChange}
//             valueLabelDisplay="on"
//             defaultValue={0}
//             step={1}
//             min={0}
//             max={10}
//             marks={marks}
//           />
//         </Stack>
//         <br />
//         <button type="submit">Go To Your Profile</button>
//       </form>
//     </main>
//   );
// }

// export default DistressRating;
