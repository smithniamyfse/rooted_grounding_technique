import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

function NavSidebar() {
  const user = useSelector((store) => store.user);

  return (
    <>
      <List>
        <Link to="/home">
          <ListItem>
            <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
            <ListItemText primary="Rooted From Within" />
          </ListItem>
        </Link>
        {!user.id && (
          <Link to="/login">
            <ListItem>
              <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
              <ListItemText primary="Login / Register" />
            </ListItem>
          </Link>
        )}
        {user.id && (
          <>
            <Link to="/user">
              <ListItem>
                <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <Link to="/info">
              <ListItem>
                <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
                <ListItemText primary="Info Page" />
              </ListItem>
            </Link>
            {/* LogOutButton can be added here */}
          </>
        )}
        <Link to="/about">
          <ListItem>
            <ListItemIcon>{/* Icon goes here */}</ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
        </Link>
      </List>
    </>
  );
}

export default NavSidebar;

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
