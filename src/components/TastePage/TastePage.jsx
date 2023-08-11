import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Box } from "@mui/material";

function TastePage({ onContinue }) {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const currentEventId = useSelector((store) => store.currentEventId);
  const eventEntry = useSelector((store) =>
    store.eventEntries.find((entry) => entry.id === currentEventId)
  );

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

  const handleContinue = () => {
    if (eventEntry && eventEntry.id) {
      dispatch({
        type: "ADD_TASTE_DATA",
        payload: { ...tasteLog, userId: user.id, eventId: eventEntry.id },
      });
    } else {
      console.log("No event entry selected.");
    }
    clearTasteInputs();
  };

  // Call the provided onContinue function when the component is mounted
  useEffect(() => {
    if (onContinue) {
      onContinue(handleContinue);
    }
  }, [onContinue]);

  // Dispatch action to fetch event entries when component mounts
  useEffect(() => {
    dispatch({ type: "FETCH_EVENT_ENTRIES" });
  }, [dispatch]);

  return (
    <>
      <main className="taste-fifth-page-container">
        <h2>1 thing you can TASTE</h2>
        <div className="taste-form-container">
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
        </div>
      </main>
    </>
  );
}

export default TastePage;




// *******
// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import LogOutButton from "../LogOutButton/LogOutButton";
// import { TextField, Box } from "@mui/material";
// import {
//   HashRouter as Router,
//   Route,
//   Link,
//   useHistory,
// } from "react-router-dom";

// function TastePage() {
//   // useDispatch to send data to store
//   const dispatch = useDispatch();

//   const history = useHistory();

//   // useSelector for user and user's event entries
//   const user = useSelector((store) => store.user);
//   const currentEventId = useSelector((store) => store.currentEventId); // get currentEventId from the store
//   const eventEntry = useSelector((store) =>
//     store.eventEntries.find((entry) => entry.id === currentEventId)
//   ); // find the entry that matches currentEventId

//   const initialTasteValues = {
//     taste_item_1: "",
//   };

//   const [tasteLog, setTasteLog] = useState(initialTasteValues);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;

//     setTasteLog((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const clearTasteInputs = () => {
//     setTasteLog(initialTasteValues);
//   };

//   const addTasteLog = (event) => {
//     event.preventDefault();
//     // Include current entry eventId
//     if (eventEntry && eventEntry.id) {
//       dispatch({
//         type: "ADD_TASTE_DATA",
//         payload: { ...tasteLog, userId: user.id, eventId: eventEntry.id },
//       });
//     } else {
//       console.log("No event entry selected.");
//     }
//     // Call clearTasteInputs() and then log the state
//     clearTasteInputs();
//     console.log("Call clearTasteInputs(): ", tasteLog);
//   };

//   const goToDistressRating = () => {
//     history.push("/distress-rating");
//   };

//   // Dispatch action to fetch event entries and component mounts
//   useEffect(() => {
//     dispatch({ type: "FETCH_EVENT_ENTRIES" });
//   }, [dispatch]);

//   return (
//     <>
//       <main className="taste-fifth-page-container">
//         <h2>1 thing you can TASTE</h2>
//         <div className="taste-form-container">
//           <form onSubmit={addTasteLog}>
//             <Box mb={3}>
//               <TextField
//                 fullWidth
//                 label="Item 1"
//                 variant="outlined"
//                 name="taste_item_1"
//                 value={tasteLog.taste_item_1}
//                 onChange={handleInputChange}
//               />
//             </Box>
//             <button type="submit">Submit What You Taste</button>
//           </form>
//         </div>
//         <br />
//         <button onClick={goToDistressRating}>Go To Distress Rating</button>
//       </main>
//       <footer className="taste-footer-container">
//         {/* <LogOutButton className="btn" /> */}
//       </footer>
//     </>
//   );
// }

// export default TastePage;
