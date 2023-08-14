import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Box, Button } from "@mui/material"; // Added Button

function Location({ onSubmit }) {
  const dispatch = useDispatch();
  const currentEventId = useSelector((store) => store.currentEventId);
  const initialLocationValue = { location: "" };
  const [locationLog, setLocationLog] = useState(initialLocationValue);

  const handleLocationInputChange = (event) => {
    const { name, value } = event.target;
    setLocationLog((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const clearLocationInput = () => {
    setLocationLog(initialLocationValue);
  };

  const addLocationLog = (event) => {
    event.preventDefault();
    if (currentEventId) {
      dispatch({
        type: "ADD_LOCATION_DATA",
        payload: { ...locationLog, eventId: currentEventId },
      });
    } else {
      console.log("No event entry selected.");
    }
    clearLocationInput();
    onSubmit(); // Call the callback when finished
  };

  return (
    <>
      <section className="location-container">
        <h2>Enter Your Location</h2>
        <div className="location-form-container">
          <form onSubmit={addLocationLog}>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Location"
                variant="outlined"
                name="location"
                value={locationLog.location}
                onChange={handleLocationInputChange}
              />
              <Button type="submit" variant="contained">Finish</Button>
            </Box>
          </form>
        </div>
      </section>
    </>
  );
}

export default Location;



// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { TextField, Box, Button } from "@mui/material";

// function Location({ onSubmit }) {
//   const dispatch = useDispatch();
//   const currentEventId = useSelector((store) => store.currentEventId);

//   const initialLocationValue = {
//     location: "",
//   };

//   const [locationLog, setLocationLog] = useState(initialLocationValue);

//   const handleLocationInputChange = (event) => {
//     const { name, value } = event.target;
//     setLocationLog((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const clearLocationInput = () => {
//     setLocationLog(initialLocationValue);
//   };

//   const addLocationLog = (event) => {
//     event.preventDefault();
//     if (currentEventId) {
//       dispatch({
//         type: "ADD_LOCATION_DATA",
//         payload: { ...locationLog, eventId: currentEventId },
//       });
//     } else {
//       console.log("No event entry selected.");
//     }
//     clearLocationInput();
//     onSubmit(); // Call the callback when finished
//   };

//   return (
//     <>
//       <section className="location-container">
//         <h2>Enter Your Location</h2>
//         <div className="location-form-container">
//           <form onSubmit={addLocationLog}>
//             <Box mb={3}>
//               <TextField
//                 fullWidth
//                 label="Location"
//                 variant="outlined"
//                 name="location"
//                 value={locationLog.location}
//                 onChange={handleLocationInputChange}
//               />
//               <Button type="submit" variant="contained">Finish</Button>
//             </Box>

//           </form>
//         </div>
//       </section>
//     </>
//   );
// }

// export default Location;

// function Location({ onSubmit }) {
//     const dispatch = useDispatch();
//     const currentEventId = useSelector((store) => store.currentEventId); // get currentEventId from the store
  
//     const initialLocationValue = {
//       location: "",
//     };
  
//     const [locationLog, setLocationLog] = useState(initialLocationValue);
  
//     const handleLocationInputChange = (event) => {
//       const { name, value } = event.target;
  
//       setLocationLog((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }));
//     };
  
//     const clearLocationInput = () => {
//       setLocationLog(initialLocationValue);
//     };
  
  
//     const addLocationLog = (event) => {
//       event.preventDefault();
//       if (currentEventId) {
//         dispatch({
//           type: "ADD_LOCATION_DATA",
//           payload: { ...locationLog, eventId: currentEventId },
//         });
//       } else {
//         console.log("No event entry selected.");
//       }
//       clearLocationInput();
//       onSubmit(); // Call the callback when finished
//     };
  
//     return (
//       <>
//         <section className="location-container">
//           <h2>Enter Your Location</h2>
//           <div className="location-form-container">
//             <form onSubmit={addLocationLog}>
//               <Box mb={3}>
//                 <TextField
//                   fullWidth
//                   label="Location"
//                   variant="outlined"
//                   name="location"
//                   value={locationLog.location}
//                   onChange={handleLocationInputChange}
//                 />
//               </Box>
//               {/* Removed the submit button from here */}
//             </form>
//           </div>
//         </section>
//       </>
//     );
//   }
  
//   export default Location;
  





// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { TextField, Box } from "@mui/material";

// function Location({ onFinish }) {
//   const dispatch = useDispatch();
//   const currentEventId = useSelector((store) => store.currentEventId); // get currentEventId from the store

//   const initialLocationValue = {
//     location: "",
//   };

//   const [locationLog, setLocationLog] = useState(initialLocationValue);

//   const handleLocationInputChange = (event) => {
//     const { name, value } = event.target;

//     setLocationLog((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const clearLocationInput = () => {
//     setLocationLog(initialLocationValue);
//   };

//   const addLocationLog = (event) => {
//     event.preventDefault();
//     if (currentEventId) {
//       dispatch({
//         type: "ADD_LOCATION_DATA",
//         payload: { ...locationLog, eventId: currentEventId },
//       });
//     } else {
//       console.log("No event entry selected.");
//     }
//     clearLocationInput();
//     onFinish(); // Call the callback when finished
//   };

//   return (
//     <>
//       <section className="location-container">
//         <h2>Enter Your Location</h2>
//         <div className="location-form-container">
//           <form onSubmit={addLocationLog}>
//             <Box mb={3}>
//               <TextField
//                 fullWidth
//                 label="Location"
//                 variant="outlined"
//                 name="location"
//                 value={locationLog.location}
//                 onChange={handleLocationInputChange}
//               />
//             </Box>
//             <button type="submit">Submit Your Location</button>
//           </form>
//         </div>
//       </section>
//     </>
//   );
// }

// export default Location;



// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { TextField, Box } from "@mui/material";

// function Location({ onSubmit }) {
//   const dispatch = useDispatch();
//   const currentEventId = useSelector((store) => store.currentEventId);

//   const initialLocationValue = {
//     location: "",
//   };

//   const [locationLog, setLocationLog] = useState(initialLocationValue);

//   const handleLocationInputChange = (event) => {
//     const { name, value } = event.target;
//     setLocationLog((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const clearLocationInput = () => {
//     setLocationLog(initialLocationValue);
//   };

//   const addLocationLog = (event) => {
//     event.preventDefault();
//     if (currentEventId) {
//       dispatch({
//         type: "ADD_LOCATION_DATA",
//         payload: { ...locationLog, eventId: currentEventId },
//       });
//     } else {
//       console.log("No event entry selected.");
//     }
//     clearLocationInput();
//     onSubmit(); // Call the callback when finished
//   };

//   return (
//     <>
//       <section className="location-container">
//         <h2>Enter Your Location</h2>
//         <div className="location-form-container">
//           <form onSubmit={addLocationLog}>
//             <Box mb={3}>
//               <TextField
//                 fullWidth
//                 label="Location"
//                 variant="outlined"
//                 name="location"
//                 value={locationLog.location}
//                 onChange={handleLocationInputChange}
//               />
//             </Box>
//           </form>
//         </div>
//       </section>
//     </>
//   );
// }

// export default Location;



/*
// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { TextField, Box } from "@mui/material";

// function Location({ onContinue }) {
//   const currentEventId = useSelector((store) => store.currentEventId);
//   const dispatch = useDispatch();

//   const initialLocationValue = {
//     location: "",
//   };

//   const [locationLog, setLocationLog] = useState(initialLocationValue);

//   const handleLocationInputChange = (event) => {
//     const { name, value } = event.target;

//     setLocationLog((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const clearLocationInput = () => {
//     setLocationLog(initialLocationValue);
//   };

//   const handleContinue = () => {
//     if (currentEventId) {
//       dispatch({
//         type: "ADD_LOCATION_DATA",
//         payload: { ...locationLog, eventId: currentEventId },
//       });
//     } else {
//       console.log("No event entry selected.");
//     }
//     clearLocationInput();
//   };

//   useEffect(() => {
//     if (onContinue) {
//       onContinue(handleContinue);
//     }
//   }, [onContinue]);

//   return (
//     <>
//       <section className="location-container">
//         <h2>Enter Your Location</h2>
//         <div className="location-form-container">
//           <Box mb={3}>
//             <TextField
// //               fullWidth
//               label="Location"
//               variant="outlined"
//               name="location"
//               value={locationLog.location}
//               onChange={handleLocationInputChange}
//             />
//           </Box>
//         </div>
//       </section>
//     </>
//   );
// }

// export default Location;

*/

// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { TextField, Box } from "@mui/material";

// function Location({ onContinue }) {
//   const currentEventId = useSelector((store) => store.currentEventId); // get current event ID from the store
//   const dispatch = useDispatch();

//   const initialLocationValue = {
//     location: "",
//   };

//   const [locationLog, setLocationLog] = useState(initialLocationValue);

//   const handleLocationInputChange = (event) => {
//     const { name, value } = event.target;

//     setLocationLog((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const clearLocationInput = () => {
//     setLocationLog(initialLocationValue);
//   };

//   const handleContinue = () => {
//     if (currentEventId) {
//       dispatch({
//         type: "ADD_LOCATION_DATA",
//         payload: { ...locationLog, eventId: currentEventId },
//       });
//     } else {
//       console.log("No event entry selected.");
//     }
//     clearLocationInput();
//   };

//   useEffect(() => {
//     if (onContinue) {
//       onContinue(handleContinue);
//     }
//   }, [onContinue]);

//   return (
//     <>
//       <section className="location-container">
//         <h2>Enter Your Location</h2>
//         <div className="location-form-container">
//           <Box mb={3}>
//             <TextField
//               fullWidth
//               label="Location"
//               variant="outlined"
//               name="location"
//               value={locationLog.location}
//               onChange={handleLocationInputChange}
//             />
//           </Box>
//         </div>
//       </section>
//     </>
//   );
// }

// export default Location;



// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { TextField, Box } from "@mui/material";

// function Location({ onContinue }) {
//   const currentEventId = useSelector((store) => store.currentEventId); // get current event ID from the store
//   const dispatch = useDispatch();

//   const initialLocationValue = {
//     location: "",
//   };

//   const [locationLog, setLocationLog] = useState(initialLocationValue);

//   const handleLocationInputChange = (event) => {
//     const { name, value } = event.target;

//     setLocationLog((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const clearLocationInput = () => {
//     setLocationLog(initialLocationValue);
//   };

//   const handleContinue = () => {
//     if (currentEventId) {
//       dispatch({
//         type: "ADD_LOCATION_DATA",
//         payload: { ...locationLog, eventId: currentEventId },
//       });
//     } else {
//       console.log("No event entry selected.");
//     }
//     clearLocationInput();
//   };

//   // Call the provided onContinue function when the component is mounted
//   useEffect(() => {
//     if (onContinue) {
//       onContinue(handleContinue);
//     }
//   }, [onContinue]);

//   return (
//     <>
//       <section className="location-container">
//         <h2>Enter Your Location</h2>
//         <div className="location-form-container">
//           <Box mb={3}>
//             <TextField
//               fullWidth
//               label="Location"
//               variant="outlined"
//               name="location"
//               value={locationLog.location}
//               onChange={handleLocationInputChange}
//             />
//           </Box>
//         </div>
//       </section>
//     </>
//   );
// }

// export default Location;





// ********** LOCATION
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

// function Location() {
//   // useDispatch to send data to store
//   const dispatch = useDispatch();

//   const currentEventId = useSelector((store) => store.currentEventId); // get currentEventId from the store

//   const initialLocationValue = {
//     location: "",
//   };

//   const [locationLog, setLocationLog] = useState(initialLocationValue);

//   const handleLocationInputChange = (event) => {
//     const { name, value } = event.target;

//     setLocationLog((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const clearLocationInput = () => {
//     setLocationLog(initialLocationValue);
//   };

//   const addLocationLog = (event) => {
//     event.preventDefault();
//     console.log(`Submitting location: ${locationLog}`);
//     // Include current entry eventId
//     if (currentEventId) {
//       dispatch({
//         type: "ADD_LOCATION_DATA",
//         payload: { ...locationLog, eventId: currentEventId },
//       });
//     } else {
//       console.log("No event entry selected.");
//     }
//     // Call clearLocationInput() and then log the state
//     clearLocationInput();
//     console.log("Call clearLocationInput(): ", locationLog);
//   };

//   //   // Dispatch action to fetch event entries and component mounts
//   //   useEffect(() => {
//   //     dispatch({ type: "FETCH_EVENT_ENTRIES" });
//   //   }, [dispatch]);

//   return (
//     <>
//       <section className="location-container">
//         <h2>Enter Your Location</h2>
//         <div className="location-form-container">
//           <form onSubmit={addLocationLog}>
//             <Box mb={3}>
//               <TextField
//                 fullWidth
//                 label="Location"
//                 variant="outlined"
//                 name="location"
//                 value={locationLog.location}
//                 onChange={handleLocationInputChange}
//               />
//             </Box>
//             <button type="submit">Submit Your Location</button>
//           </form>
//         </div>
//       </section>
//     </>
//   );
// }

// export default Location;




// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { TextField, Box } from "@mui/material";

// function Location({ onSubmit }) {
//   const dispatch = useDispatch();
//   const currentEventId = useSelector((store) => store.currentEventId);

//   const initialLocationValue = {
//     location: "",
//   };

//   const [locationLog, setLocationLog] = useState(initialLocationValue);

//   const handleLocationInputChange = (event) => {
//     const { name, value } = event.target;
//     setLocationLog((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const clearLocationInput = () => {
//     setLocationLog(initialLocationValue);
//   };

//   const addLocationLog = (event) => {
//     event.preventDefault();
//     if (currentEventId) {
//       dispatch({
//         type: "ADD_LOCATION_DATA",
//         payload: { ...locationLog, eventId: currentEventId },
//       });
//     } else {
//       console.log("No event entry selected.");
//     }
//     clearLocationInput();
//     onSubmit(); // Call the callback when finished
//   };

//   return (
//     <>
//       <section className="location-container">
//         <h2>Enter Your Location</h2>
//         <div className="location-form-container">
//           <form onSubmit={addLocationLog}>
//             <Box mb={3}>
//               <TextField
//                 fullWidth
//                 label="Location"
//                 variant="outlined"
//                 name="location"
//                 value={locationLog.location}
//                 onChange={handleLocationInputChange}
//               />
//             </Box>
//           </form>
//         </div>
//       </section>
//     </>
//   );
// }

// export default Location;








// *********** /// 

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

// function Location() {
//   // useDispatch to send data to store
//   const dispatch = useDispatch();

//   const currentEventId = useSelector((store) => store.currentEventId); // get currentEventId from the store

//   const initialLocationValue = {
//     location: "",
//   };

//   const [locationLog, setLocationLog] = useState(initialLocationValue);

//   const handleLocationInputChange = (event) => {
//     const { name, value } = event.target;

//     setLocationLog((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const clearLocationInput = () => {
//     setLocationLog(initialLocationValue);
//   };

//   const addLocationLog = (event) => {
//     event.preventDefault();
//     console.log(`Submitting location: ${locationLog}`);
//     // Include current entry eventId
//     if (currentEventId) {
//       dispatch({
//         type: "ADD_LOCATION_DATA",
//         payload: { ...locationLog, eventId: currentEventId },
//       });
//     } else {
//       console.log("No event entry selected.");
//     }
//     // Call clearLocationInput() and then log the state
//     clearLocationInput();
//     console.log("Call clearLocationInput(): ", locationLog);
//   };

//   //   // Dispatch action to fetch event entries and component mounts
//   //   useEffect(() => {
//   //     dispatch({ type: "FETCH_EVENT_ENTRIES" });
//   //   }, [dispatch]);

//   return (
//     <>
//       <section className="location-container">
//         <h2>Enter Your Location</h2>
//         <div className="location-form-container">
//           <form onSubmit={addLocationLog}>
//             <Box mb={3}>
//               <TextField
//                 fullWidth
//                 label="Location"
//                 variant="outlined"
//                 name="location"
//                 value={locationLog.location}
//                 onChange={handleLocationInputChange}
//               />
//             </Box>
//             <button type="submit">Submit Your Location</button>
//           </form>
//         </div>
//       </section>
//     </>
//   );
// }

// export default Location;


/// *********** ////