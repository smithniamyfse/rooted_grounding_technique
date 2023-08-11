import React, { useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import NotesIcon from "@mui/icons-material/Notes";

import CaptureLocationPage from "../CaptureLocationPage/CaptureLocationPage";
import SeePage from "../SeePage/SeePage";
import LogOutButton from "../LogOutButton/LogOutButton";

function UserPage() {
  const user = useSelector((store) => store.user);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <main className="user-page-container">
        <section className="user-page-select-tab-container">
          <Box sx={{ width: "100%" }}>
            <Tabs value={value} onChange={handleChange} arial-label="userpage-icon-tabs">
              <Tab icon={<AddAPhotoIcon />} aria-label="add-photo" />
              <Tab icon={<NotesIcon />} aria-label="notes" />
            </Tabs>
          </Box>
          {value === 0 && <CaptureLocationPage />}
          {value === 1 && <SeePage />}
        </section>
      </main>
      <footer className="user-page-footer-container">
        {/* <LogOutButton className="btn" /> */}
      </footer>
    </>
  );
}

export default UserPage;




// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   HashRouter as Router,
//   Switch,
//   Route,
//   Link,
//   useHistory,
//   useRouteMatch,
// } from "react-router-dom";

// import Box from "@mui/material/Box";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
// import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
// import TextFieldsIcon from "@mui/icons-material/TextFields";
// import ArticleIcon from "@mui/icons-material/Article";
// import NotesIcon from "@mui/icons-material/Notes";
// import TextSnippetIcon from "@mui/icons-material/TextSnippet";
// import StickyNote2Icon from "@mui/icons-material/StickyNote2";

// import CaptureLocationPage from "../CaptureLocationPage/CaptureLocationPage";
// import SeePage from "../SeePage/SeePage";
// import LogOutButton from "../LogOutButton/LogOutButton";

// function LinkTab(props) {
//   return (
//     <Tab
//       component="a"
//       onClick={(event) => {
//         event.preventDefault();
//       }}
//       {...props}
//     />
//   );
// }

// /*
// Use Relative Paths: You can create relative paths by using the useRouteMatch hook. 
// This way, the paths inside the UserPage will be relative to the route where the UserPage 
// component is rendered.

// Handle Initial Rendering: You can use the useEffect hook to push the initial path when 
// the component mounts, ensuring that the CaptureLocationPage is rendered by default.
// */


// function UserPage() {
//   // this component doesn't do much to start, just renders some user reducer info to the DOM
//   const user = useSelector((store) => store.user);
//   const [value, setValue] = useState(0);
//   const history = useHistory();

//   // Get the current path and URL
//   const { path, url } = useRouteMatch();

//   // Render the capture location page on load
//   useEffect(() => {
//     CaptureLocationPage
//   }, [history, url]);

//   const captureLocationTab = () => {
//     history.push("/capture-location");
//   };

//   const seeFirstTab = () => {
//     history.push("/first-see");
//   };

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//     if (newValue === 0) captureLocationTab();
//     if (newValue === 1) seeFirstTab();
//   };

//   return (
//     <>
//       <main className="user-page-container">
//       <section className="user-page-select-tab-container">
//           <h2>Welcome, {user.username}!</h2>
//           <Box sx={{ width: "100%" }}>
//             <Tabs
//               value={value}
//               onChange={handleChange}
//               arial-label="userpage-icon-tabs"
//             >
//               <Tab icon={<AddAPhotoIcon />} aria-label="add-photo" />
//               <Tab icon={<NotesIcon />} aria-label="notes" />
//             </Tabs>
//           </Box>
//           {/* Render the corresponding component below based on the value */}
//           {value === 0 && <CaptureLocationPage />}
//           {value === 1 && <SeePage />}
//         </section>
//         {/* <section className="user-page-select-tab-container">
//           <h2>Welcome, {user.username}!</h2>
//           {/* <CaptureLocationPage /> */}
//           {/* <Box sx={{ width: "100%" }}>
//             <Tabs
//               value={value}
//               onChange={handleChange}
//               arial-label="userpage-icon-tabs"
//             >
//               <LinkTab
//                 icon={<AddAPhotoIcon />}
//                 aria-label="add-photo"
//                 component={Link}
//                 to={"/capture-location"}
//               />
//               <LinkTab
//                 icon={<NotesIcon />}
//                 aria-label="notes"
//                 component={Link}
//                 to={"/first-see"}
//               />
//             </Tabs>
//           </Box> */}
//           {/* Render the corresponding component below based on the route */}
//           {/* <Switch>
//             <Route exact path={`${path}/capture-location`}>
//               <CaptureLocationPage />
//             </Route>
//             <Route exact path={`${path}/first-see`}>
//               <SeePage />
//             </Route>
//           </Switch>
//         </section> */}
//       </main>
//       <footer className="user-page-footer-container">
//         <LogOutButton className="btn" />
//       </footer>
//     </>
//   );
// }

// export default UserPage;

// ** WORKING VERSION BEFORE TAB CHOICES: CAMERA | TEXT FIELDS
// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   HashRouter as Router,
//   Route,
//   Link,
//   useHistory,
// } from "react-router-dom";
// import CaptureLocationPage from "../CaptureLocationPage/CaptureLocationPage";
// import LogOutButton from "../LogOutButton/LogOutButton";

// function UserPage() {
//   // this component doesn't do much to start, just renders some user reducer info to the DOM
//   const user = useSelector((store) => store.user);

//   return (
//     <>
//       <div className="container">
//         <h2>Welcome, {user.username}!</h2>
//         <p>Your ID is: {user.id}</p>
//         <CaptureLocationPage />
//       </div>
//       <footer className="user-page-footer-container">
//         <LogOutButton className="btn" />
//       </footer>
//     </>
//   );
// }

// export default UserPage;

// ** ORIGINAL WITH CaptureLocationPage first **
// import React, { useEffect } from "react";
// import CaptureLocationPage from "../CaptureLocationPage/CaptureLocationPage";
// import LogOutButton from "../LogOutButton/LogOutButton";
// import { useSelector, useDispatch } from "react-redux";

// function UserPage() {
//   // this component doesn't do much to start, just renders some user reducer info to the DOM
//   const user = useSelector((store) => store.user);

//   return (
//     <>
//       <div className="container">
//         <h2>Welcome, {user.username}!</h2>
//         <p>Your ID is: {user.id}</p>
//         <CaptureLocationPage />
//       </div>
//       <footer className="user-page-footer-container">
//         <LogOutButton className="btn" />
//       </footer>
//     </>
//   );
// }

// // this allows us to use <App /> in index.js
// export default UserPage;
