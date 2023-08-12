import React from "react";
import {
  HashRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

function HeaderRooted({ trigger, sx, ...props }) {
  const user = useSelector((store) => store.user);
  return (
    <AppBar position="static">
      <Box
        {...props}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: {
            xs: "space-between",
            sm: "flex-end",
          },
          gap: 2,
          px: 2,
          flex: 1,
          ...sx,
        }}
      >
        {trigger}
        <div className="nav">
          <Link to="/home">
            <h2 className="nav-title">Rooted From Within</h2>
          </Link>
        </div>
      </Box>
    </AppBar>
  );
}

export default HeaderRooted;

// ** VERSION 1 **
// import React from "react";
// import {
//   HashRouter as Router,
//   Link,
//   Redirect,
//   Route,
//   Switch,
//   useHistory,
// } from "react-router-dom";
// import { useSelector } from "react-redux";
// import AppBar from "@mui/material/AppBar";
// import Avatar from "@mui/material/Avatar";
// import Box from "@mui/material/Box";

// const Pill = () => (
//   <div
//     style={{
//       width: "56px",
//       height: "24px",
//       backgroundColor: "#e0e0e0",
//       borderRadius: "20px",
//     }}
//   />
// );

// const Square = () => (
//   <div
//     style={{
//       width: "1em",
//       height: "1em",
//       fontSize: "40px",
//       backgroundColor: "#e0e0e0",
//       borderRadius: "4px",
//       flexShrink: 0,
//     }}
//   />
// );

// function HeaderRooted({ trigger, sx, ...props }) {

//   const user = useSelector((store) => store.user);
//   return (
//         <AppBar position="static">
//         <Box
//           {...props}
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: {
//               xs: "space-between",
//               sm: "flex-start",
//             },
//             gap: 2,
//             px: 2,
//             flex: 1,
//             ...sx,
//           }}
//         >
//           {trigger}
//           <Square />
//           <Box
//             ml="auto"
//             sx={{
//               display: {
//                 xs: "none",
//                 sm: "flex",
//               },
//               alignItems: "center",
//               gap: {
//                 xs: 2,
//                 md: 3,
//               },
//             }}
//           >
//             <Pill />
//             <Pill />
//             <Pill />
//             <Pill />
//           </Box>
//           <Avatar
//             sx={{
//               width: 32,
//               height: 32,
//               ml: {
//                 xs: 0,
//                 sm: 2,
//               },
//             }}
//           />
//           <div className="nav">
//             <Link to="/home">
//               <h2 className="nav-title">Rooted From Within</h2>
//             </Link>
//           </div>
//         </Box>
//       </AppBar>
//   );
// }

// export default HeaderRooted;
