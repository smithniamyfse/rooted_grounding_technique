import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

function PointToTextImage() {
  const [clicks, setClicks] = useState([]);
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const imageUrl = useSelector((state) => state.image.imageUrl);
  const currentEventId = useSelector((store) => store.currentEventId);
  const eventEntry = useSelector((store) =>
    store.eventEntries.find((entry) => entry.id === currentEventId)
  );

  const initialSeeValues = {
    see_item_1: "",
    see_item_2: "",
    see_item_3: "",
    see_item_4: "",
    see_item_5: "",
  };

  const [seeLog, setSeeLog] = useState(initialSeeValues);
  const widthRef = useRef(null);

  const handleInputChange = (event, index) => {
    const newClicks = [...clicks];
    newClicks[index].label = event.target.value;
    setClicks(newClicks);
  };
  

  const handleImageClick = (event) => {
    if (clicks.length >= 5) {
      return;
    }

    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;

    setClicks([...clicks, { x, y, label: "", width: "auto" }]);
  };

  const handleBlur = (event, index) => {
    const newClicks = [...clicks];
    newClicks[index].label = event.target.value;
    newClicks[index].width = `${widthRef.current.offsetWidth}px`;
    setClicks(newClicks);

    const updatedSeeLog = { ...seeLog };
    updatedSeeLog[`see_item_${index + 1}`] = event.target.value;
    setSeeLog(updatedSeeLog);
  };

  const clearSeeInputs = () => {
    setClicks([]);
    setSeeLog(initialSeeValues);
  };

  const addSeeLog = (event) => {
    event.preventDefault();
    if (eventEntry && eventEntry.id) {
      dispatch({
        type: "ADD_SEE_DATA",
        payload: { ...seeLog, userId: user.id, eventId: eventEntry.id },
      });
    } else {
      console.log("No event entry selected.");
    }
    clearSeeInputs();
    console.log("Call clearSeeInputs(): ", seeLog);
  };

  useEffect(() => {
    dispatch({ type: "FETCH_EVENT_ENTRIES" });
  }, [dispatch]);

  return (
    <div className="image-labeler">
      <form onSubmit={addSeeLog}>
        <div style={{ position: "relative" }}>
          <img
            src={imageUrl[imageUrl.length - 1]}
            onClick={handleImageClick}
            alt="Captured"
          />
          {clicks.map((click, index) => (
            <input
              key={index}
              style={{
                position: "absolute",
                left: click.x,
                top: click.y,
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                width: `${
                  click.label.length > 0 ? click.label.length * 8 : 20
                }px`,
              }}
              onBlur={(event) => handleBlur(event, index)}
              value={click.label}
              onChange={(event) => handleInputChange(event, index)}
            />
          ))}

          <span
            style={{ visibility: "hidden", whiteSpace: "nowrap" }}
            ref={widthRef}
          >
            {clicks.length > 0 ? clicks[clicks.length - 1].label : ""}
          </span>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PointToTextImage;

// ** WORKING VERSION BUT LENGTH OF INPUT IS RESTRICTED TO ONE SIZE **
// import React, { useState, useEffect, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";

// function PointToTextImage() {
//   const [clicks, setClicks] = useState([]);
//   const dispatch = useDispatch();

//   const user = useSelector((store) => store.user);
//   const imageUrl = useSelector(state => state.image.imageUrl);
//   const currentEventId = useSelector((store) => store.currentEventId);
//   const eventEntry = useSelector((store) =>
//     store.eventEntries.find((entry) => entry.id === currentEventId)
//   );

//   const initialSeeValues = {
//     see_item_1: "",
//     see_item_2: "",
//     see_item_3: "",
//     see_item_4: "",
//     see_item_5: "",
//   };

//   const [seeLog, setSeeLog] = useState(initialSeeValues);
//   const widthRef = useRef(null);

//   const handleImageClick = (event) => {
//     if (clicks.length >= 5) {
//       return;
//     }

//     const x = event.nativeEvent.offsetX;
//     const y = event.nativeEvent.offsetY;

//     setClicks([...clicks, { x, y, label: '', width: 'auto' }]);
//   };

//   const handleBlur = (event, index) => {
//     const newClicks = [...clicks];
//     newClicks[index].label = event.target.value;
//     newClicks[index].width = `${widthRef.current.offsetWidth}px`;
//     setClicks(newClicks);

//     const updatedSeeLog = {...seeLog};
//     updatedSeeLog[`see_item_${index + 1}`] = event.target.value;
//     setSeeLog(updatedSeeLog);
//   };

//   const clearSeeInputs = () => {
//     setClicks([]);
//     setSeeLog(initialSeeValues);
//   };

//   const addSeeLog = (event) => {
//     event.preventDefault();
//     if (eventEntry && eventEntry.id) {
//       dispatch({
//         type: "ADD_SEE_DATA",
//         payload: { ...seeLog, userId: user.id, eventId: eventEntry.id },
//       });
//     } else {
//       console.log("No event entry selected.");
//     }
//     clearSeeInputs();
//     console.log("Call clearSeeInputs(): ", seeLog);
//   };

//   useEffect(() => {
//     dispatch({ type: "FETCH_EVENT_ENTRIES" });
//   }, [dispatch]);

//   return (
//     <div className="image-labeler">
//       <form onSubmit={addSeeLog}>
//         <div style={{ position: 'relative' }}>
//           <img src={imageUrl[imageUrl.length - 1]} onClick={handleImageClick} alt="Captured" />
//           {clicks.map((click, index) => (
//             <input
//               key={index}
//               style={{ position: 'absolute', left: click.x, top: click.y, width: click.width, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
//               onBlur={(event) => handleBlur(event, index)}
//               defaultValue={click.label}
//             />
//           ))}
//           <span style={{ visibility: 'hidden', whiteSpace: 'nowrap' }} ref={widthRef}>{clicks.length > 0 ? clicks[clicks.length - 1].label : ''}</span>
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default PointToTextImage;

// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";

// function PointToTextImage() {
//   const [clicks, setClicks] = useState([]);
//   const dispatch = useDispatch();

//   const user = useSelector((store) => store.user);
//   const imageUrl = useSelector(state => state.image.imageUrl);
//   const currentEventId = useSelector((store) => store.currentEventId);
//   const eventEntry = useSelector((store) =>
//     store.eventEntries.find((entry) => entry.id === currentEventId)
//   );

//   const initialSeeValues = {
//     see_item_1: "",
//     see_item_2: "",
//     see_item_3: "",
//     see_item_4: "",
//     see_item_5: "",
//   };

//   const [seeLog, setSeeLog] = useState(initialSeeValues);

//   const handleImageClick = (event) => {
//     if (clicks.length >= 5) {
//       return;
//     }

//     const x = event.nativeEvent.offsetX;
//     const y = event.nativeEvent.offsetY;

//     setClicks([...clicks, { x, y, label: '' }]);
//   };

//   const handleBlur = (event, index) => {
//     const newClicks = [...clicks];
//     newClicks[index].label = event.target.value;
//     setClicks(newClicks);

//     const updatedSeeLog = {...seeLog};
//     updatedSeeLog[`see_item_${index + 1}`] = event.target.value;
//     setSeeLog(updatedSeeLog);
//   };

//   const clearSeeInputs = () => {
//     setClicks([]);
//     setSeeLog(initialSeeValues);
//   };

//   const addSeeLog = (event) => {
//     event.preventDefault();
//     if (eventEntry && eventEntry.id) {
//       dispatch({
//         type: "ADD_SEE_DATA",
//         payload: { ...seeLog, userId: user.id, eventId: eventEntry.id },
//       });
//     } else {
//       console.log("No event entry selected.");
//     }
//     clearSeeInputs();
//     console.log("Call clearSeeInputs(): ", seeLog);
//   };

//   useEffect(() => {
//     dispatch({ type: "FETCH_EVENT_ENTRIES" });
//   }, [dispatch]);

//   return (
//     <div className="image-labeler">
//       <form onSubmit={addSeeLog}>
//         <div style={{ position: 'relative' }}>
//           <img src={imageUrl[imageUrl.length - 1]} onClick={handleImageClick} alt="Captured" />
//           {clicks.map((click, index) => (
//             <input
//               key={index}
//               style={{ position: 'absolute', left: click.x, top: click.y, backgroundColor: 'transparent' }}
//               onBlur={(event) => handleBlur(event, index)}
//             />
//           ))}
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default PointToTextImage;

// ** WORKING VERSION THAT ADDS TEXT INPUT VALUES & SENDS TO DB - BUT WHITE BG **
// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";

// function PointToTextImage() {
//   const [clicks, setClicks] = useState([]);
//   const dispatch = useDispatch();

//   const user = useSelector((store) => store.user);
//   const imageUrl = useSelector(state => state.image.imageUrl);
//   const currentEventId = useSelector((store) => store.currentEventId);
//   const eventEntry = useSelector((store) =>
//     store.eventEntries.find((entry) => entry.id === currentEventId)
//   );

//   const initialSeeValues = {
//     see_item_1: "",
//     see_item_2: "",
//     see_item_3: "",
//     see_item_4: "",
//     see_item_5: "",
//   };

//   const [seeLog, setSeeLog] = useState(initialSeeValues);

//   const handleImageClick = (event) => {
//     const x = event.nativeEvent.offsetX;
//     const y = event.nativeEvent.offsetY;

//     setClicks([...clicks, { x, y, label: '' }]);
//   };

//   const handleBlur = (event, index) => {
//     const newClicks = [...clicks];
//     newClicks[index].label = event.target.value;
//     setClicks(newClicks);

//     const updatedSeeLog = {...seeLog};
//     updatedSeeLog[`see_item_${index + 1}`] = event.target.value;
//     setSeeLog(updatedSeeLog);
//   };

//   const clearSeeInputs = () => {
//     setSeeLog(initialSeeValues);
//   };

//   const addSeeLog = (event) => {
//     event.preventDefault();
//     if (eventEntry && eventEntry.id) {
//       dispatch({
//         type: "ADD_SEE_DATA",
//         payload: { ...seeLog, userId: user.id, eventId: eventEntry.id },
//       });
//     } else {
//       console.log("No event entry selected.");
//     }
//     clearSeeInputs();
//     console.log("Call clearSeeInputs(): ", seeLog);
//   };

//   useEffect(() => {
//     dispatch({ type: "FETCH_EVENT_ENTRIES" });
//   }, [dispatch]);

//   return (
//     <div className="image-labeler">
//       <form onSubmit={addSeeLog}>
//         <div style={{ position: 'relative' }}>
//           <img src={imageUrl[imageUrl.length - 1]} onClick={handleImageClick} alt="Captured" />
//           {clicks.map((click, index) => (
//             <input
//               key={index}
//               style={{ position: 'absolute', left: click.x, top: click.y }}
//               onBlur={(event) => handleBlur(event, index)}
//             />
//           ))}
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default PointToTextImage;

// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";

// function PointToTextImage() {
//   const [clicks, setClicks] = useState([]);
//   const dispatch = useDispatch();

//   const user = useSelector((store) => store.user);
//   const imageUrl = useSelector(state => state.image.imageUrl);
//   const currentEventId = useSelector((store) => store.currentEventId);
//   const eventEntry = useSelector((store) =>
//     store.eventEntries.find((entry) => entry.id === currentEventId)
//   );

//   const initialSeeValues = {
//     see_item_1: "",
//     see_item_2: "",
//     see_item_3: "",
//     see_item_4: "",
//     see_item_5: "",
//   };

//   const [seeLog, setSeeLog] = useState(initialSeeValues);

// //   const handleImageClick = (event) => {
// //     const rect = event.target.getBoundingClientRect();
// //     const x = event.clientX - rect.left;
// //     const y = event.clientY - rect.top;

// //     setClicks([...clicks, { x, y, label: '' }]);
// //   };

// const handleImageClick = (event) => {
//     const x = event.offsetX;
//     const y = event.offsetY;

//     setClicks([...clicks, { x, y, label: '' }]);
//   };

//   const handleBlur = (event, index) => {
//     const newClicks = [...clicks];
//     newClicks[index].label = event.target.value;
//     setClicks(newClicks);

//     const updatedSeeLog = {...seeLog};
//     updatedSeeLog[`see_item_${index + 1}`] = event.target.value;
//     setSeeLog(updatedSeeLog);
//   };

//   const clearSeeInputs = () => {
//     setSeeLog(initialSeeValues);
//   };

//   const addSeeLog = (event) => {
//     event.preventDefault();
//     if (eventEntry && eventEntry.id) {
//       dispatch({
//         type: "ADD_SEE_DATA",
//         payload: { ...seeLog, userId: user.id, eventId: eventEntry.id },
//       });
//     } else {
//       console.log("No event entry selected.");
//     }
//     clearSeeInputs();
//     console.log("Call clearSeeInputs(): ", seeLog);
//   };

//   useEffect(() => {
//     dispatch({ type: "FETCH_EVENT_ENTRIES" });
//   }, [dispatch]);

//   return (
//     <div className="image-labeler">
//       <form onSubmit={addSeeLog}>
//         <img src={imageUrl[imageUrl.length - 1]} onClick={handleImageClick} alt="Captured" />
//         {clicks.map((click, index) => (
//           <input
//             key={index}
//             style={{ position: 'absolute', left: click.x, top: click.y }}
//             onBlur={(event) => handleBlur(event, index)}
//           />
//         ))}
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default PointToTextImage;

// ** VALUES DON'T WORK WHEN SUBMITTING
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

// function PointToTextImage() {
//   const [clicks, setClicks] = useState([]);
//   const dispatch = useDispatch();  // Add useDispatch

//   const user = useSelector((store) => store.user);
//   const imageUrl = useSelector(state => state.image.imageUrl);
//   const currentEventId = useSelector((store) => store.currentEventId); // get currentEventId from the store
//   const eventEntry = useSelector((store) =>
//     store.eventEntries.find((entry) => entry.id === currentEventId)
//   ); // find the entry that matches currentEventId

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

//   const addSeeLog = (event) => {
//     event.preventDefault();
//     // Include current entry eventId
//     if (eventEntry && eventEntry.id) {
//       dispatch({
//         type: "ADD_SEE_DATA",
//         payload: { ...seeLog, userId: user.id, eventId: eventEntry.id },
//       });
//     } else {
//       console.log("No event entry selected.");
//     }

//     // Call clearSeeInputs() and then log the state
//     clearSeeInputs();
//     console.log("Call clearSeeInputs(): ", seeLog);
//   };

//   const handleImageClick = (event) => {
//     const rect = event.target.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;

//     setClicks([...clicks, { x, y, label: '' }]);
//   };

//   const handleBlur = (event, index) => {
//     const newClicks = [...clicks];
//     newClicks[index].label = event.target.value;

//     setClicks(newClicks);
//   };

// //   // New function to handle form submission
// //   const handleSubmit = (event) => {
// //     event.preventDefault();
// //     dispatch({ type: 'SAVE_IMAGE_LABELS', payload: clicks });
// //   };

//   // Dispatch action to fetch event entries when component mounts
//   useEffect(() => {
//     dispatch({ type: "FETCH_EVENT_ENTRIES" });
//   }, [dispatch]);

//   return (
//     <div className="image-labeler">
//       <form onSubmit={addSeeLog}>  {/* Add onSubmit to form */}
//         <img src={imageUrl[imageUrl.length - 1]} onClick={handleImageClick} alt="Captured" />
//         {clicks.map((click, index) => (
//           <input
//             key={index}
//             // style={{ position: 'absolute', left: click.x, top: click.y }}
//             style={{ position: 'absolute', left: click.x, top: click.y }}
//             onBlur={(event) => handleBlur(event, index)}
//             onChange={handleInputChange}
//           />
//         ))}
//         <button type="submit">Submit</button>  {/* Add submit button */}
//       </form>
//     </div>
//   );
// };

// export default PointToTextImage;

// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// function PointToTextImage() {
//   const [clicks, setClicks] = useState([]);
//   const dispatch = useDispatch();  // Add useDispatch

//   const imageUrl = useSelector(state => state.image.imageUrl);

//   const handleImageClick = (event) => {
//     const rect = event.target.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;

//     setClicks([...clicks, { x, y, label: '' }]);
//   };

//   const handleBlur = (event, index) => {
//     const newClicks = [...clicks];
//     newClicks[index].label = event.target.value;

//     setClicks(newClicks);
//   };

//   // New function to handle form submission
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     dispatch(saveImageLabels(clicks));
//   };

//   return (
//     <div className="image-labeler">
//       <form onSubmit={handleSubmit}>  {/* Add onSubmit to form */}
//         <img src={imageUrl} onClick={handleImageClick} />
//         {clicks.map((click, index) => (
//           <input
//             key={index}
//             style={{ position: 'absolute', left: click.x, top: click.y }}
//             onBlur={(event) => handleBlur(event, index)}
//           />
//         ))}
//         <button type="submit">Submit</button>  {/* Add submit button */}
//       </form>
//     </div>
//   );
// };

// export default PointToTextImage;

// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// function PointToTextImage() {
//   const [clicks, setClicks] = useState([]);
//   const dispatch = useDispatch();  // Add useDispatch

//   const imageUrl = useSelector(state => state.image.imageUrl);
//   const user = useSelector((store) => store.user);

// //   const eventEntry = useSelector((store) =>
// //     store.eventEntries.find((entry) => entry.id === store.currentEventId)
// //   );

//   const currentEventId = useSelector((store) => store.currentEventId); // get currentEventId from the store
//   const eventEntry = useSelector((store) =>
//     store.eventEntries.find((entry) => entry.id === currentEventId)
//   ); // find the entry that matches currentEventId

//   const saveImageLabels = (labels) => {
//     return {
//       type: 'SAVE_IMAGE_LABELS',
//       payload: labels,
//     };
//   }

//   const handleImageClick = (event) => {
//     const rect = event.target.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;

//     setClicks([...clicks, { x, y, label: '' }]);
//   };

//   const handleBlur = (event, index) => {
//     const newClicks = [...clicks];
//     newClicks[index].label = event.target.value;

//     setClicks(newClicks);
//   };

//   // New function to handle form submission
//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // In handleSubmit...
//     const labels = clicks.map(click => click.label);
//     const payload = {
//       see_item_1: labels[0] || '',
//       see_item_2: labels[1] || '',
//       see_item_3: labels[2] || '',
//       see_item_4: labels[3] || '',
//       see_item_5: labels[4] || '',
//       userId: user.id,
//       eventId: eventEntry.id
//     };

//     dispatch({
//       type: "ADD_SEE_DATA",
//       payload: payload
//     });
//   };

// console.log('eventEntries:', useSelector((store) => store.eventEntries));
// console.log('currentEventId:', useSelector((store) => store.currentEventId));

//   return (
//     <div className="image-labeler">
//       <form onSubmit={handleSubmit}>  {/* Add onSubmit to form */}
//         <img src={imageUrl} onClick={handleImageClick} />
//         {clicks.map((click, index) => (
//           <input
//             key={index}
//             style={{ position: 'absolute', left: click.x, top: click.y }}
//             onBlur={(event) => handleBlur(event, index)}
//           />
//         ))}
//         <button type="submit">Submit</button>  {/* Add submit button */}
//       </form>
//     </div>
//   );
// };

// export default PointToTextImage;
