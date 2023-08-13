import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
  Link,
} from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";

function NavSidebar() {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpen(open);
  };

  //   const user = useSelector((store) => store.user);

  //   const [isOpen, setIsOpen] = useState(true);

  //   const closeDrawer = () => {
  //     setIsOpen(false);
  //   };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" }); // Dispatching logout action
    history.push("/home"); // Redirecting to the home page
  };

  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      //   onClick={toggleDrawer(false)}
      //   onKeyDown={toggleDrawer(false)}
    >
      <List>
        <Link to="/home">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
              <ListItemText primary="Rooted From Within" />
            </ListItemButton>
          </ListItem>
        </Link>
        {!user.id && (
          <Link to="/login">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
                <ListItemText primary="Login / Register" />
              </ListItemButton>
            </ListItem>
          </Link>
        )}
        {user.id && (
          <>
            <Link to="/user">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
                  <ListItemText primary="Begin: Rooted in Sight" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to="/user-profile">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
                  <ListItemText primary="User Profile" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to="/view-all">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
                  <ListItemText primary="View All" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to="/info">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
                  <ListItemText primary="Info Page" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to="/about">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
                  <ListItemText primary="About" />
                </ListItemButton>
              </ListItem>
            </Link>
            <ListItem disablePadding onClick={handleLogout}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
          </>
        )}
        {/* {user.id ? (
          <ListItem disablePadding onClick={handleLogout}>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
               ) : (

        )} */}
      </List>
    </Box>
  );

  return <>{list}</>;
}

export default NavSidebar;

// import React, { useState } from "react";
// import { useSelector } from "react-redux"; // Assuming you are using react-redux
// import { Link } from "react-router-dom";
// import Box from "@mui/material/Box";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import LogoutIcon from "@mui/icons-material/Logout";

// // function NavSidebar({ open, setOpen }) {
// //   const user = useSelector((store) => store.user);
// //   const handleCloseSidebar = () => setOpen(false);

// function NavSidebar({ open, setOpen }) {
//     const user = useSelector((store) => store.user);
//     const handleCloseSidebar = () => setOpen(false);

//   const list = (
//     <Box
//       sx={{ width: 250 }}
//       role="presentation"
//       onClick={handleCloseSidebar} // Close sidebar when clicked
//     >
//       <List>
//         <Link to="/home">
//           <ListItem disablePadding>
//             <ListItemButton>
//               <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//               <ListItemText primary="Rooted From Within" />
//             </ListItemButton>
//           </ListItem>
//         </Link>
//         {!user.id && (
//           <Link to="/login">
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                 <ListItemText primary="Login / Register" />
//               </ListItemButton>
//             </ListItem>
//           </Link>
//         )}
//         {user.id && (
//           <>
//             <Link to="/user">
//               <ListItem disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                   <ListItemText primary="Begin: Rooted in Sight" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//             <Link to="/user-profile">
//               <ListItem disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                   <ListItemText primary="User Profile" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//             <Link to="/view-all">
//               <ListItem disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                   <ListItemText primary="View All" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//             <Link to="/info">
//               <ListItem disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                   <ListItemText primary="Info Page" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//             <Link to="/logout">
//               <ListItem disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>
//                     <LogoutIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Logout" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//             <Link to="/about">
//               <ListItem disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                   <ListItemText primary="About" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//           </>
//         )}
//       </List>
//     </Box>
//   );

//   return (
//     <>
//       {list}
//       </>
//   );
// }

// export default NavSidebar;

// import React from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import Box from "@mui/material/Box";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import LogoutIcon from "@mui/icons-material/Logout";

// function NavSidebar({ closeSidebar, collapseSidebar, isCollapsed }) {
//   const user = useSelector((store) => store.user);

//   const handleClick = () => {
//     closeSidebar(); // Close the sidebar when a link is clicked
//   };

//   return (
//     <Box
//       onClick={handleClick}
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         // justifyContent: {
//         //   xs: "space-between", // Show menu icon on mobile
//         //   sm: "flex-end", // Hide menu icon on tablet and desktop
//         // },
//         // gap: 2,
//         // px: 2,
//         // flex: 1,
//       }}
//     >
//       <List>
//         <Link to="/home">
//           <ListItem disablePadding>
//             <ListItemButton>
//               <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//               <ListItemText primary="Rooted From Within" />
//             </ListItemButton>
//           </ListItem>
//         </Link>
//         <Link to="/about">
//           <ListItem disablePadding>
//             <ListItemButton>
//               <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//               <ListItemText primary="About" />
//             </ListItemButton>
//           </ListItem>
//         </Link>
//         {!user.id && (
//           <Link to="/login">
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                 <ListItemText primary="Login / Register" />
//               </ListItemButton>
//             </ListItem>
//           </Link>
//         )}
//         {user.id && (
//           <>
//             <Link to="/user">
//               <ListItem disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                   <ListItemText primary="Begin: Rooted in Sight" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//             <Link to="/user-profile">
//               <ListItem disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                   <ListItemText primary="User Profile" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//             <Link to="/view-all">
//               <ListItem disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                   <ListItemText primary="View All" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//             <Link to="/info">
//               <ListItem disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                   <ListItemText primary="Info Page" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//             {/* ... other user-specific list items ... */}
//             <Link to="/logout">
//               <ListItem disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>
//                     <LogoutIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Logout" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//           </>
//         )}
//       </List>
//     </Box>
//   );
// }

// export default NavSidebar;

// ** REST OF CODE TO REFERENCE IF UPDATES FUCKED
// import React, { useState } from "react";
// import { useSelector } from "react-redux"; // Assuming you are using react-redux
// import { Link } from "react-router-dom";
// import Box from "@mui/material/Box";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import LogoutIcon from "@mui/icons-material/Logout";

// function NavSidebar() {
//   const user = useSelector((store) => store.user);

//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDrawer = (open) => (event) => {
//     if (
//       event.type === "keydown" &&
//       (event.key === "Tab" || event.key === "Shift")
//     ) {
//       return;
//     }

//     setIsOpen(open);
//   };

//   //   const user = useSelector((store) => store.user);

//   //   const [isOpen, setIsOpen] = useState(true);

//   //   const closeDrawer = () => {
//   //     setIsOpen(false);
//   //   };

//   const list = (
//     <Box
//       sx={{ width: 250 }}
//       role="presentation"
//       onClick={toggleDrawer(false)}
//       onKeyDown={toggleDrawer(false)}
//     >
//       <List>
//         <Link to="/home" onClick={toggleDrawer(false)}>
//           <ListItem disablePadding>
//             <ListItemButton>
//               <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//               <ListItemText primary="Rooted From Within" />
//             </ListItemButton>
//           </ListItem>
//         </Link>
//         {!user.id && (
//           <Link to="/login" onClick={toggleDrawer(false)}>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                 <ListItemText primary="Login / Register" />
//               </ListItemButton>
//             </ListItem>
//           </Link>
//         )}
//         {user.id && (
//           <>

//           </>
//         )}
//       </List>
//     </Box>
//   );

//   return (
//     <>
//       {list}
//     </>
//   );
// }

// export default NavSidebar;

// ** VERSION 2: Renders the menus correctly based on screen size
// ** Attempting to update the code (based on screen size)
// ** so when links and icons are clicked, the menu collapses accordingly
// import React, { useState } from "react";
// import { useSelector } from "react-redux"; // Assuming you are using react-redux
// import { Link } from "react-router-dom";
// import Box from "@mui/material/Box";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import LogoutIcon from "@mui/icons-material/Logout";

// function NavSidebar() {
//   const user = useSelector((store) => store.user);

//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDrawer = (open) => (event) => {
//     if (
//       event.type === "keydown" &&
//       (event.key === "Tab" || event.key === "Shift")
//     ) {
//       return;
//     }

//     setIsOpen(open);
//   };

//   //   const user = useSelector((store) => store.user);

//   //   const [isOpen, setIsOpen] = useState(true);

//   //   const closeDrawer = () => {
//   //     setIsOpen(false);
//   //   };

//   const list = (
//     <Box
//       sx={{ width: 250 }}
//       role="presentation"
//       onClick={toggleDrawer(false)}
//       onKeyDown={toggleDrawer(false)}
//     >
//       <List>
//         <Link to="/home" onClick={toggleDrawer(false)}>
//           <ListItem disablePadding>
//             <ListItemButton>
//               <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//               <ListItemText primary="Rooted From Within" />
//             </ListItemButton>
//           </ListItem>
//         </Link>
//         {!user.id && (
//           <Link to="/login" onClick={toggleDrawer(false)}>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                 <ListItemText primary="Login / Register" />
//               </ListItemButton>
//             </ListItem>
//           </Link>
//         )}
//         {user.id && (
//           <>
//             <Link to="/user" onClick={toggleDrawer(false)}>
//               <ListItem disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                   <ListItemText primary="Begin: Rooted in Sight" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//             <Link to="/user-profile" onClick={toggleDrawer(false)}>
//               <ListItem disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                   <ListItemText primary="User Profile" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//             <Link to="/view-all" onClick={toggleDrawer(false)}>
//               <ListItem disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                   <ListItemText primary="View All" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//             <Link to="/info" onClick={toggleDrawer(false)}>
//               <ListItem disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                   <ListItemText primary="Info Page" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//             <Link to="/logout" onClick={toggleDrawer(false)}>
//               <ListItem disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>
//                     <LogoutIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Logout" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//             <Link to="/about" onClick={toggleDrawer(false)}>
//               <ListItem disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                   <ListItemText primary="About" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//           </>
//         )}
//       </List>
//     </Box>
//   );

//   return (
//     <>
//       {list}
//     </>
//   );
// }

// export default NavSidebar;

// *****************

// import React, { useState } from 'react';
// import { useSelector } from 'react-redux'; // Assuming you are using react-redux
// import { Link } from 'react-router-dom';
// import Box from '@mui/material/Box';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Button from '@mui/material/Button';
// import LogoutIcon from '@mui/icons-material/Logout';

// function NavSidebar() {
//   const user = useSelector((store) => store.user);

//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDrawer = (open) => (event) => {
//     if (
//       event.type === 'keydown' &&
//       (event.key === 'Tab' || event.key === 'Shift')
//     ) {
//       return;
//     }

//     setIsOpen(open);
//   };

//   const list = (
//     <Box
//       sx={{ width: 250 }}
//       role="presentation"
//       onClick={toggleDrawer(false)}
//       onKeyDown={toggleDrawer(false)}
//     >
//       <List>
//         <Link to="/home" onClick={toggleDrawer(false)}>
//           <ListItem disablePadding>
//             <ListItemButton>
//               <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//               <ListItemText primary="Rooted From Within" />
//             </ListItemButton>
//           </ListItem>
//         </Link>
//         {!user.id && (
//           <Link to="/login" onClick={toggleDrawer(false)}>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                 <ListItemText primary="Login / Register" />
//               </ListItemButton>
//             </ListItem>
//           </Link>
//         )}
//         {user.id && (
//           <>
//             <Link to="/user" onClick={toggleDrawer(false)}>
//               <ListItem disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                   <ListItemText primary="Begin: Rooted in Sight" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//             <Link to="/user-profile" onClick={toggleDrawer(false)}>
//               <ListItem disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                   <ListItemText primary="User Profile" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//             <Link to="/view-all" onClick={toggleDrawer(false)}>
//               <ListItem disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                   <ListItemText primary="View All" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//             <Link to="/info" onClick={toggleDrawer(false)}>
//               <ListItem disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                   <ListItemText primary="Info Page" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//             <Link to="/logout" onClick={toggleDrawer(false)}>
//               <ListItem disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>
//                     <LogoutIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Logout" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//             <Link to="/about" onClick={toggleDrawer(false)}>
//               <ListItem disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                   <ListItemText primary="About" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//           </>
//         )}
//       </List>
//     </Box>
//   );

//   return (
//     <div>
//       <Button onClick={toggleDrawer(true)}>Open Sidebar</Button>
//       {isOpen && list}
//     </div>
//   );
// }

// export default NavSidebar;

// import React, { useState } from 'react';
// import { useSelector } from 'react-redux'; // Assuming you are using react-redux
// import { Link } from 'react-router-dom';
// import Box from '@mui/material/Box';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Button from '@mui/material/Button';
// import Drawer from '@mui/material/Drawer';
// import LogoutIcon from '@mui/icons-material/Logout';

// function NavSidebar() {
//   const user = useSelector((store) => store.user);

//   const [state, setState] = useState({
//     top: false,
//     left: false,
//     bottom: false,
//     right: false,
//   });

//   const toggleDrawer = (anchor, open) => (event) => {
//     if (
//       event.type === 'keydown' &&
//       (event.key === 'Tab' || event.key === 'Shift')
//     ) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

//   const closeAndLog = () => {
//     console.log("Closing sidebar...");
//     toggleDrawer('left', false)(); // Closing the left sidebar
//   };

//   const list = (anchor) => (
//     <Box
//       sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
//       <List>
//         <Link to="/home" onClick={toggleDrawer(anchor, false)}>
//           <ListItem disablePadding>
//             <ListItemButton>
//               <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//               <ListItemText primary="Rooted From Within" />
//             </ListItemButton>
//           </ListItem>
//         </Link>
//         {!user.id && (
//           <Link to="/login" onClick={toggleDrawer(anchor, false)}>
//             <ListItem disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                 <ListItemText primary="Login / Register" />
//               </ListItemButton>
//             </ListItem>
//           </Link>
//         )}
//         {user.id && (
//           <>
//             <Link to="/user" onClick={toggleDrawer(anchor, false)}>
//               <ListItem disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                   <ListItemText primary="Begin: Rooted in Sight" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//             <Link to="/user-profile" onClick={toggleDrawer(anchor, false)}>
//               <ListItem disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                   <ListItemText primary="User Profile" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//             <Link to="/view-all" onClick={toggleDrawer(anchor, false)}>
//               <ListItem disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                   <ListItemText primary="View All" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//             <Link to="/info" onClick={toggleDrawer(anchor, false)}>
//               <ListItem disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                   <ListItemText primary="Info Page" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//             <Link to="/logout" onClick={toggleDrawer(anchor, false)}>
//               <ListItem disablePadding>
//                 <ListItemButton>
//                   <ListItemIcon>
//                     <LogoutIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Logout" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//           </>
//         )}
//         {/* <Link to="/about" onClick={toggleDrawer(anchor, false)}> */}
//         <Link to="/about" >
//           <ListItem disablePadding>
//             <ListItemButton>
//               <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//               <ListItemText primary="About" />
//             </ListItemButton>
//           </ListItem>
//         </Link>
//       </List>
//     </Box>
//   );

// //   return (
// //     <div>
// //       {['left', 'right', 'top', 'bottom'].map((anchor) => (
// //         <React.Fragment key={anchor}>
// //           <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
// //           <Drawer
// //             anchor={anchor}
// //             open={state[anchor]}
// //             onClose={toggleDrawer(anchor, false)}
// //           >
// //             {list(anchor)}
// //           </Drawer>
// //         </React.Fragment>
// //       ))}
// //     </div>
// //   );
// // }
// //   return (
// //     <div>
// //       {['left', 'right', 'top', 'bottom'].map((anchor) => (
// //         <React.Fragment key={anchor}>
// //           <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
// //           <Drawer
// //             anchor={anchor}
// //             open={state[anchor]}
// //             onClose={toggleDrawer(anchor, false)}
// //           >
// //             {list(anchor)}
// //           </Drawer>
// //         </React.Fragment>
// //       ))}
// //     </div>
// //   );

//   return (
//     <>
//       {list('left')} {/* Rendering the list for the left sidebar */}
//     </>
//   );
// }

// export default NavSidebar;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Divider from "@mui/material/Divider";
// import Box from "@mui/material/Box";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// // import ListItemText from "@mui/material/ListItemText";
// // import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import LogoutIcon from "@mui/icons-material/Logout"; // Import the icon you want to use
// // import ListItemButton from '@mui/material/ListItemButton';
// // import ListItemIcon from '@mui/material/ListItemIcon';
// // import ListItemText from '@mui/material/ListItemText';
// // import InboxIcon from '@mui/icons-material/MoveToInbox';
// // import MailIcon from '@mui/icons-material/Mail';

// // // **** START TEMPLATE [
// // // export default function TemporaryDrawer() {
// //   const [state, setState] = useState({
// //     top: false,
// //     left: false,
// //     bottom: false,
// //     right: false,
// //   });

// //   const toggleDrawer = (anchor, open) => (event) => {
// //     if (
// //       event.type === 'keydown' &&
// //       (event.key === 'Tab' || event.key === 'Shift')
// //     ) {
// //       return;
// //     }

// //     setState({ ...state, [anchor]: open });
// //   };

// //   const list = (anchor) => (
// //     <Box
// //       sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
// //       role="presentation"
// //       onClick={toggleDrawer(anchor, false)}
// //       onKeyDown={toggleDrawer(anchor, false)}
// //     >
// //       <List>
// //         {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
// //           <ListItem key={text} disablePadding>
// //             <ListItemButton>
// //               <ListItemIcon>
// //                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
// //               </ListItemIcon>
// //               <ListItemText primary={text} />
// //             </ListItemButton>
// //           </ListItem>
// //         ))}
// //       </List>
// //       <Divider />
// //       <List>
// //         {['All mail', 'Trash', 'Spam'].map((text, index) => (
// //           <ListItem key={text} disablePadding>
// //             <ListItemButton>
// //               <ListItemIcon>
// //                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
// //               </ListItemIcon>
// //               <ListItemText primary={text} />
// //             </ListItemButton>
// //           </ListItem>
// //         ))}
// //       </List>
// //     </Box>
// //   );

// //   return (
// //     <div>
// //       {['left', 'right', 'top', 'bottom'].map((anchor) => (
// //         <React.Fragment key={anchor}>
// //           <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
// //           <Drawer
// //             anchor={anchor}
// //             open={state[anchor]}
// //             onClose={toggleDrawer(anchor, false)}
// //           >
// //             {list(anchor)}
// //           </Drawer>
// //         </React.Fragment>
// //       ))}
// //     </div>
// //   );
// // // }
// // // **** END FUNCTION TEMPLATE ]

// // ///
// // const list = (anchor: Anchor) => (
// //     <Box
// //       sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
// //       role="presentation"
// //       onClick={toggleDrawer(anchor, false)} // This line here
// //       onKeyDown={toggleDrawer(anchor, false)}
// //     >
// //       {/* Rest of the content */}
// //     </Box>
// //   );

// // ///
// //   const toggleDrawer = (anchor, open) => (event) => {
// //     if (
// //       event.type === 'keydown' &&
// //       (event.key === 'Tab' || event.key === 'Shift')
// //     ) {
// //       return;
// //     }
// //     // Rest of the code...
// //   };

// //   ////

// function NavSidebar() {
// //   const closeAndLog = () => {
// //     console.log("Closing sidebar...");
// //     closeSidebar();
// //   };
//   const user = useSelector((store) => store.user);

// //   const toggleDrawer =
// //     (anchor: Anchor, open: boolean) =>
// //     (event: React.KeyboardEvent | React.MouseEvent) => {
// //       if (
// //         event.type === 'keydown' &&
// //         ((event as React.KeyboardEvent).key === 'Tab' ||
// //           (event as React.KeyboardEvent).key === 'Shift')
// //       ) {
// //         return;
// //       }

//   const [state, setState] = useState({
//     top: false,
//     left: false,
//     bottom: false,
//     right: false,
//   });

//   const toggleDrawer = (anchor, open) => (event) => {
//     if (
//       event.type === 'keydown' &&
//       (event.key === 'Tab' || event.key === 'Shift')
//     ) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

// return (
//     <>
// const list = (anchor) =>  {
//     // const list = (anchor) => (
//         // const list = (anchor) => (
//         <Box
//           sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
//           role="presentation"
//           onClick={toggleDrawer(anchor, false)}
//           onKeyDown={toggleDrawer(anchor, false)}
//         >
//       <List>
//         <Link to="/home" onClick={closeAndLog}>
//         <ListItem key={text} disablePadding>
//           <ListItemButton>
//             <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//             <ListItemText primary="Rooted From Within" />
//             </ListItemButton>
//           </ListItem>
//         </Link>
//         {!user.id && (
//           <Link to="/login" onClick={closeSidebar}>
//             <ListItem key={text} disablePadding>
//           <ListItemButton>
//               <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//               <ListItemText primary="Login / Register" />
//               </ListItemButton>
//             </ListItem>
//           </Link>
//         )}
//         {user.id && (
//           <>
//             <Link to="/user" onClick={closeAndLog}>
//             <ListItem key={text} disablePadding>
//           <ListItemButton>
//                 <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                 <ListItemText primary="Begin: Rooted in Sight" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//             <Link to="/user-profile" onClick={closeAndLog}>
//               <ListItem key={text} disablePadding>
//           <ListItemButton>
//                 <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                 <ListItemText primary="User Profile" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//             <Link to="/view-all" onClick={closeAndLog}>
//             <ListItem key={text} disablePadding>
//           <ListItemButton>
//                 <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                 <ListItemText primary="View All" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//             <Link to="/info" onClick={closeAndLog}>
//             <ListItem key={text} disablePadding>
//           <ListItemButton>
//                 <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//                 <ListItemText primary="Info Page" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//             <Link to="/logout" onClick={closeAndLog}>
//             <ListItem key={text} disablePadding>
//           <ListItemButton>
//                 <ListItemIcon>
//                   <LogoutIcon />
//                 </ListItemIcon>
//                 <ListItemText primary="Logout" />
//                 </ListItemButton>
//               </ListItem>
//             </Link>
//           </>
//         )}
//         <Link to="/about" onClick={closeAndLog}>
//         <ListItem key={text} disablePadding>
//           <ListItemButton>
//             <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
//             <ListItemText primary="About" />
//             </ListItemButton>
//           </ListItem>
//         </Link>
//         </List>
//     </Box>
// }
// </>
//   );
// }

// export default NavSidebar;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import Divider from '@mui/material/Divider';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemIcon from '@mui/material/ListItemIcon';

// // Create shapes as React functional components
// const Circle = () => (
//   <div
//     style={{
//       width: 24,
//       height: 24,
//       borderRadius: '50%',
//       backgroundColor: '#e0e0e0',
//     }}
//   />
// );

// // Helper function
// const randomBetween = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1)) + min;

// const IconList = ({ count = 4, links }) => (
//   <>
//     {Array.from({ length: count }, (_, index) => (
//       <ListItem key={index} component={Link} to={links[index].path}>
//         <ListItemIcon>
//           <Circle />
//         </ListItemIcon>
//         <ListItemText primary={links[index].name} />
//       </ListItem>
//     ))}
//   </>
// );

// function NavSidebar() {
//     const user = useSelector((store) => store.user); // Retrieve the user object from the store
//   const loggedInLinks = [
//     { path: '/user', name: 'Root to Present' },
//     { path: '/info', name: 'Info Page' },
//   ];
//   const loggedOutLinks = [
//     { path: '/login', name: 'Login / Register' },
//   ];
//   const commonLinks = [{ path: '/home', name: 'Rooted From Within' }, { path: '/about', name: 'About' }];

//   return (
//     <>
//       <List>
//         <IconList count={2} links={commonLinks} />
//       </List>
//       <Divider />
//       <List>
//         {user.id ? (
//           <IconList count={loggedInLinks.length} links={loggedInLinks} />
//         ) : (
//           <IconList count={loggedOutLinks.length} links={loggedOutLinks} />
//         )}
//       </List>
//     </>
//   );
// }

// export default NavSidebar;

// ** VERSION 1: TEMPLATE **
// import React from "react";
// import Divider from "@mui/material/Divider";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import ListItemIcon from "@mui/material/ListItemIcon";

// // Create shapes as React functional components
// const Circle = () => (
//   <div
//     style={{
//       width: 24,
//       height: 24,
//       borderRadius: "50%",
//       backgroundColor: "#e0e0e0",
//     }}
//   />
// );
// const Pill = (props) => (
//   <div
//     style={{
//       height: 16,
//       width: props.width,
//       borderRadius: 1,
//       backgroundColor: "#e0e0e0",
//     }}
//   />
// );

// // Helper function
// const randomBetween = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1)) + min;

// const IconList = ({ count = 4 }) => (
//   <>
//     {Array.from({ length: count }, (_, index) => (
//       <ListItem key={index}>
//         <ListItemIcon>
//           <Circle />
//         </ListItemIcon>
//         <ListItemText primary={<Pill width={randomBetween(56, 136)} />} />
//       </ListItem>
//     ))}
//   </>
// );

// const InsetList = ({ count = 4 }) => (
//   <>
//     {Array.from({ length: count }, (_, index) => (
//       <ListItem key={index}>
//         <ListItemText inset primary={<Pill width={randomBetween(56, 136)} />} />
//       </ListItem>
//     ))}
//   </>
// );

// function NavSidebar() {
//   return (
//     <>
//       <List>
//         <IconList count={2} />
//       </List>
//       <Divider />
//       <List>
//         <IconList count={1} />
//         <InsetList count={2} />
//       </List>
//       <Divider />
//       <List>
//         <IconList count={1} />
//         <InsetList count={2} />
//       </List>
//     </>
//   );
// }

// export default NavSidebar;

// export { NavSidebarMockup, InsetList, IconList };
