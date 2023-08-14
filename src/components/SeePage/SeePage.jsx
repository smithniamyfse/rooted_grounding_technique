import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import { Container, TextField, Box, Slide } from "@mui/material";
import { useHistory } from "react-router-dom";
import "./SeePage.css";

function SeePage() {
  const dispatch = useDispatch();
  const history = useHistory();

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
  const [slideIn, setSlideIn] = useState(false);

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

  const [eventCreated, setEventCreated] = useState(false);

  // Function to handle form submission
  const addSeeLog = (event) => {
    event.preventDefault();

    dispatch({
      type: "CREATE_NEW_EVENT",
      payload: { user_id: user.id },
    });

    setSlideIn(true); // Trigger the slide-down effect

    // Redirect after a short delay to allow the slide effect to complete
    setTimeout(() => {
      history.push("/vertical-steps");
    }, 1500);
  };

  useEffect(() => {
    if (currentEventId && eventCreated) {
      dispatch({
        type: "ADD_SEE_DATA",
        payload: { ...seeLog, userId: user.id, eventId: currentEventId },
      });
      clearSeeInputs();
      setEventCreated(false);
    }
  }, [currentEventId, eventCreated, dispatch, seeLog, history]);

  useEffect(() => {
    dispatch({ type: "FETCH_EVENT_ENTRIES" });
  }, [dispatch]);

  return (
    <Slide direction="down" in={!slideIn} timeout={1500}>
    <main className="see-first-page-container">
      <section className="see-headings">
        <div className="see-headings-wrapper">
          <h1 className="see-h1">
            Rooted in sight
            <br />
            <span className="see-span1">SEE</span>
            <br />
            <span className="see-span2">Name five items</span>
          </h1>
        </div>
      </section>
      <div className="see-form-container">
          <form onSubmit={addSeeLog}>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Item 1"
                variant="standard"
                name="see_item_1"
                value={seeLog.see_item_1}
                onChange={handleInputChange}
              />
            </Box>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Item 2"
                variant="standard"
                name="see_item_2"
                value={seeLog.see_item_2}
                onChange={handleInputChange}
              />
            </Box>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Item 3"
                variant="standard"
                name="see_item_3"
                value={seeLog.see_item_3}
                onChange={handleInputChange}
              />
            </Box>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Item 4"
                variant="standard"
                name="see_item_4"
                value={seeLog.see_item_4}
                onChange={handleInputChange}
              />
            </Box>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Item 5"
                variant="standard"
                name="see_item_5"
                value={seeLog.see_item_5}
                onChange={handleInputChange}
              />
            </Box>
            <button className="see-from-top-button" type="submit">
              Continue: Staying Present
            </button>
          </form>
      </div>
    </main>
    </Slide>
  );
}

export default SeePage;

// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import LogOutButton from "../LogOutButton/LogOutButton";
// import { Container, TextField, Box, Fade } from "@mui/material";
// import { useHistory } from "react-router-dom";
// import "./SeePage.css";

// function SeePage() {
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const user = useSelector((store) => store.user);
//   const currentEventId = useSelector((store) => store.currentEventId);

//   const initialSeeValues = {
//     see_item_1: "",
//     see_item_2: "",
//     see_item_3: "",
//     see_item_4: "",
//     see_item_5: "",
//   };

//   const [seeLog, setSeeLog] = useState(initialSeeValues);
//   const [fade, setFade] = useState(true);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;

//     setSeeLog((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const clearSeeInputs = () => {
//     setSeeLog(initialSeeValues);
//   };

//   const [eventCreated, setEventCreated] = useState(false);

//   const addSeeLog = (event) => {
//     event.preventDefault();

//     dispatch({
//       type: "CREATE_NEW_EVENT",
//       payload: { user_id: user.id },
//     });

//     setEventCreated(true);
//     setFade(false); // Trigger the fade effect

//     // Redirect after a short delay to allow the fade effect to complete
//     setTimeout(() => {
//       history.push("/vertical-steps");
//     }, 500);
//   };

//   useEffect(() => {
//     if (currentEventId && eventCreated) {
//       dispatch({
//         type: "ADD_SEE_DATA",
//         payload: { ...seeLog, userId: user.id, eventId: currentEventId },
//       });
//       clearSeeInputs();
//       setEventCreated(false);
//     }
//   }, [currentEventId, eventCreated, dispatch, seeLog, history]);

//   useEffect(() => {
//     dispatch({ type: "FETCH_EVENT_ENTRIES" });
//   }, [dispatch]);

//   return (
//     <Fade in={fade} timeout={500}>
//       <main className="see-first-page-container">
//         <section className="see-headings">
//           <div className="see-headings-wrapper">
//             <h1 className="see-h1">
//               Rooted in sight
//               <br />
//               <span className="see-span1">SEE</span>
//               <br />
//               <span className="see-span2">Name five items</span>
//             </h1>
//           </div>
//         </section>
//         <div className="see-form-container">
//           <form onSubmit={addSeeLog}>
//             <Box mb={3}>
//               <TextField
//                 fullWidth
//                 label="Item 1"
//                 variant="standard"
//                 name="see_item_1"
//                 value={seeLog.see_item_1}
//                 onChange={handleInputChange}
//               />
//             </Box>
//             <Box mb={3}>
//               <TextField
//                 fullWidth
//                 label="Item 2"
//                 variant="standard"
//                 name="see_item_2"
//                 value={seeLog.see_item_2}
//                 onChange={handleInputChange}
//               />
//             </Box>
//             <Box mb={3}>
//               <TextField
//                 fullWidth
//                 label="Item 3"
//                 variant="standard"
//                 name="see_item_3"
//                 value={seeLog.see_item_3}
//                 onChange={handleInputChange}
//               />
//             </Box>
//             <Box mb={3}>
//               <TextField
//                 fullWidth
//                 label="Item 4"
//                 variant="standard"
//                 name="see_item_4"
//                 value={seeLog.see_item_4}
//                 onChange={handleInputChange}
//               />
//             </Box>
//             <Box mb={3}>
//               <TextField
//                 fullWidth
//                 label="Item 5"
//                 variant="standard"
//                 name="see_item_5"
//                 value={seeLog.see_item_5}
//                 onChange={handleInputChange}
//               />
//             </Box>
//             {/* ... other TextFields ... */}
//             <button className="see-from-top-button" type="submit">
//               Continue: Staying Present
//             </button>
//           </form>
//         </div>
//       </main>
//     </Fade>
//   );
// }

// export default SeePage;

// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import LogOutButton from "../LogOutButton/LogOutButton";
// import { Container, TextField, Box, Fade} from "@mui/material";
// import {
//   HashRouter as Router,
//   Route,
//   Link,
//   useHistory,
// } from "react-router-dom";
// import "./SeePage.css";

// function SeePage() {
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const user = useSelector((store) => store.user);
//   const currentEventId = useSelector((store) => store.currentEventId);

//   const initialSeeValues = {
//     see_item_1: "",
//     see_item_2: "",
//     see_item_3: "",
//     see_item_4: "",
//     see_item_5: "",
//   };

//   const [seeLog, setSeeLog] = useState(initialSeeValues);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;

//     setSeeLog((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const clearSeeInputs = () => {
//     setSeeLog(initialSeeValues);
//   };

//   const [eventCreated, setEventCreated] = useState(false);
//   const [fade, setFade] = useState(true);

//   const addSeeLog = (event) => {
//     event.preventDefault();

//     dispatch({
//       type: "CREATE_NEW_EVENT",
//       payload: { user_id: user.id },
//     });

//     setEventCreated(true);
//   };

//   useEffect(() => {
//     if (currentEventId && eventCreated) {
//       dispatch({
//         type: "ADD_SEE_DATA",
//         payload: { ...seeLog, userId: user.id, eventId: currentEventId },
//       });
//       clearSeeInputs();
//       setEventCreated(false);
//       history.push("/vertical-steps"); // Redirect here
//     }
//   }, [currentEventId, eventCreated, dispatch, seeLog, history]);

//   useEffect(() => {
//     dispatch({ type: "FETCH_EVENT_ENTRIES" });
//   }, [dispatch]);

//   return (
//     <>
//       <main className="see-first-page-container">
//         <section className="see-headings">
//           <div className="see-headings-wrapper">
//             <h1 className="see-h1">
//               Rooted in sight
//               <br />
//               <span className="see-span1">SEE</span>
//               <br />
//               <span className="see-span2">Name five items</span>
//             </h1>
//           </div>
//         </section>
//         <div className="see-form-container">
//           <form onSubmit={addSeeLog}>
//             <Box mb={3}>
//               <TextField
//                 fullWidth
//                 label="Item 1"
//                 variant="standard"
//                 name="see_item_1"
//                 value={seeLog.see_item_1}
//                 onChange={handleInputChange}
//               />
//             </Box>
//             <Box mb={3}>
//               <TextField
//                 fullWidth
//                 label="Item 2"
//                 variant="standard"
//                 name="see_item_2"
//                 value={seeLog.see_item_2}
//                 onChange={handleInputChange}
//               />
//             </Box>
//             <Box mb={3}>
//               <TextField
//                 fullWidth
//                 label="Item 3"
//                 variant="standard"
//                 name="see_item_3"
//                 value={seeLog.see_item_3}
//                 onChange={handleInputChange}
//               />
//             </Box>
//             <Box mb={3}>
//               <TextField
//                 fullWidth
//                 label="Item 4"
//                 variant="standard"
//                 name="see_item_4"
//                 value={seeLog.see_item_4}
//                 onChange={handleInputChange}
//               />
//             </Box>
//             <Box mb={3}>
//               <TextField
//                 fullWidth
//                 label="Item 5"
//                 variant="standard"
//                 name="see_item_5"
//                 value={seeLog.see_item_5}
//                 onChange={handleInputChange}
//               />
//             </Box>
//             <button className="see-from-top-button" type="submit">Continue: Staying Present</button>
//           </form>
//         </div>
//       </main>
//     </>
//   );
// }

// export default SeePage;

// ** WORKING VERSION 1 *****
// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import LogOutButton from "../LogOutButton/LogOutButton";
// import { Container, TextField, Box } from "@mui/material";
// import {
//   HashRouter as Router,
//   Route,
//   Link,
//   useHistory,
// } from "react-router-dom";

// import "./SeePage.css";

// /* .css-1k94av6-MuiContainer-root {
//     padding-top: 20px;
//     padding-bottom: 20px;
// } */

// /* <Slider
//   defaultValue={30}
//   sx={{
//     width: 300,
//     color: 'success.main',
//     '& .MuiSlider-thumb': {
//       borderRadius: '1px',
//     },
//   }}
// /> */

// // const theme = createTheme({
// //   components: {
// //     MuiContainer: {
// //       styleOverrides: {
// //         root: {
// //           paddingTop: "20px",
// //           paddingBottom: "20px",
// //         },
// //       },
// //     },
// //   },
// // });

// function SeePage() {
//   // useDispatch to send data to the store
//   const dispatch = useDispatch();

//   const history = useHistory();

//   // useSelector for user and user's event entries
//   const user = useSelector((store) => store.user);
//   const currentEventId = useSelector((store) => store.currentEventId);

//   const initialSeeValues = {
//     see_item_1: "",
//     see_item_2: "",
//     see_item_3: "",
//     see_item_4: "",
//     see_item_5: "",
//   };

//   const [seeLog, setSeeLog] = useState(initialSeeValues);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;

//     setSeeLog((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const clearSeeInputs = () => {
//     setSeeLog(initialSeeValues);
//   };

//   const [eventCreated, setEventCreated] = useState(false); // Add this state variable

//   const addSeeLog = (event) => {
//     event.preventDefault();

//     // Dispatch action to create a new event entry
//     dispatch({
//       type: "CREATE_NEW_EVENT",
//       payload: { user_id: user.id },
//     });

//     setEventCreated(true); // Set eventCreated to true
//   };

//   useEffect(() => {
//     if (currentEventId && eventCreated) {
//       // Check if eventCreated is true
//       dispatch({
//         type: "ADD_SEE_DATA",
//         payload: { ...seeLog, userId: user.id, eventId: currentEventId },
//       });
//       clearSeeInputs();
//       setEventCreated(false); // Reset eventCreated to false
//     }
//   }, [currentEventId, eventCreated, dispatch, seeLog]); // Add eventCreated to the dependency array

//   const goToVerticalSteps = () => {
//     history.push("/vertical-steps");
//   };

//   // Dispatch action to fetch event entries when component mounts
//   useEffect(() => {
//     dispatch({ type: "FETCH_EVENT_ENTRIES" });
//   }, [dispatch]);

//   return (
//     <>
//         <main className="see-first-page-container">
//           <section className="see-headings">
//             <div className="see-headings-wrapper">
//               <h1 className="see-h1">
//                 Rooted in sight
//                 <br />
//                 <span className="see-span1">SEE</span>
//                 <br />
//                 <span className="see-span2">Name five items</span>
//               </h1>
//             </div>
//           </section>
//           <div className="see-form-container">
//             <form onSubmit={addSeeLog}>
//               <Box mb={3}>
//                 <TextField
//                   fullWidth
//                   label="Item 1"
//                   variant="standard"
//                   name="see_item_1"
//                   value={seeLog.see_item_1}
//                   onChange={handleInputChange}
//                 />
//               </Box>
//               <Box mb={3}>
//                 <TextField
//                   fullWidth
//                   label="Item 2"
//                   variant="standard"
//                   name="see_item_2"
//                   value={seeLog.see_item_2}
//                   onChange={handleInputChange}
//                 />
//               </Box>
//               <Box mb={3}>
//                 <TextField
//                   fullWidth
//                   label="Item 3"
//                   variant="standard"
//                   name="see_item_3"
//                   value={seeLog.see_item_3}
//                   onChange={handleInputChange}
//                 />
//               </Box>
//               <Box mb={3}>
//                 <TextField
//                   fullWidth
//                   label="Item 4"
//                   variant="standard"
//                   name="see_item_4"
//                   value={seeLog.see_item_4}
//                   onChange={handleInputChange}
//                 />
//               </Box>
//               <Box mb={3}>
//                 <TextField
//                   fullWidth
//                   label="Item 5"
//                   variant="standard"
//                   name="see_item_5"
//                   value={seeLog.see_item_5}
//                   onChange={handleInputChange}
//                 />
//               </Box>
//               <button type="submit">Submit What You See</button>
//             </form>
//           </div>
//           <br />
//           <button onClick={goToVerticalSteps}>Go To Vertical Steps</button>
//         </main>
//         <footer className="see-footer-container">
//           <LogOutButton className="btn" />
//         </footer>
//     </>
//   );
// }

// export default SeePage;

// ********************** END 1 ***********************************
