import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Slide from "@mui/material/Slide";
import ButtonBase from "@mui/material/ButtonBase";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";

import {
  Root,
  Header,
  EdgeTrigger,
  EdgeSidebar,
  SidebarContent,
  Content,
  Footer,
  getStandardScheme,
  getFixedScheme,
  getContentBasedScheme,
  getCozyScheme,
} from "@mui-treasury/layout";

import Menu from "@mui/icons-material/Menu";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

// TODO: ALIGN WITH TEMPLATE
import Nav from "../Nav/Nav";
import FooterRooted from "../Footer/Footer";
// import HeaderRooted from "../HeaderRooted/HeaderRooted";

import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import InfoPage from "../InfoPage/InfoPage";
import LandingPage from "../LandingPage/LandingPage";
// import LocationPage from "../LocationPage/LocationPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";

// Import capture image location
import CaptureLocationPage from "../CaptureLocationPage/CaptureLocationPage";

// Import each sensory step in the grounding process
import SeePage from "../SeePage/SeePage";
import TouchPage from "../TouchPage/TouchPage";
import HearPage from "../HearPage/HearPage";
import SmellPage from "../SmellPage/SmellPage";
import TastePage from "../TastePage/TastePage";

// Import distress rating component to help users assess their level of distress
import DistressRating from "../DistressRating/DistressRating";

// Import user profile page which provides the user an overview of their events and top 3 triggers
import UserProfile from "../UserProfile/UserProfile";

// Import view all page which provides the user with all of their past event entries
import ViewAllPage from "../ViewAllPage/ViewAllPage";

// Import see page point for users who input 5 see values via an image map
import SeePagePoint from "../SeePagePointToText/SeePagePointToText";

// Import drawer for users to access the menu icons
import DrawerMiniVariant from "../DrawerMiniVariant/DrawerMiniVariant";

// Import header component for responsive view
import HeaderRooted from "../HeaderRooted/HeaderRooted";

import NavSidebar from "../NavSidebar/NavSidebar";

import SideNavUserInfo from "../SideNavUserInfo/SideNavUserInfo";

import VerticalStepsSenses from "../VerticalStepsSenses/VerticalStepsSenses";
import EditSeeItem from "../SeePage/EditSeeItem";

import "./App.css";

// const theme = createTheme({
//   components: {
//     MuiContainer: {
//       styleOverrides: {
//         root: {
//           paddingTop: "20px",
//           paddingBottom: "20px",
//         },
//       },
//     },
//   },
// });

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const [preset, setPreset] = useState(`createStandardLayout`);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [data, setData] = useState({
    header: true,
    nav: true,
    content: true,
    footer: true,
  });

  const presets = {
    createStandardLayout: getStandardScheme(),
    createFixedLayout: getFixedScheme(),
    createContentBasedLayout: getContentBasedScheme(),
    createCozyLayout: getCozyScheme(),
  };

  const trigger = (open, setOpen) => (
    <IconButton onClick={() => setOpen(!open)} edge="end">
      {open ? <KeyboardArrowLeft /> : <Menu />}
    </IconButton>
  );

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    // <ThemeProvider theme={theme}>
    <>
      <Root scheme={presets[preset]}>
        <Router>
          <CssBaseline />
          <HeaderRooted
            trigger={
              <EdgeTrigger target={{ anchor: "left", field: "open" }}>
                {(open, setOpen) => (
                  <IconButton onClick={() => setOpen(!open)} edge="end">
                    {open ? <KeyboardArrowLeft /> : <Menu />}
                  </IconButton>
                )}
              </EdgeTrigger>
            }
          />
          <EdgeSidebar anchor="left" open={isSidebarOpen}>
            {({ state }) => (
              <>
                <SidebarContent>
                  <NavSidebar />
                </SidebarContent>
                <SideNavUserInfo collapsed={state.leftEdgeSidebar?.collapsed} />
                <EdgeTrigger target={{ anchor: "left", field: "collapsed" }}>
                  {(collapsed, setCollapsed) => (
                    <ButtonBase
                      onClick={() => setCollapsed(!collapsed)}
                      sx={{ flexGrow: 1, height: 48 }}
                    >
                      {collapsed ? (
                        <KeyboardArrowRight />
                      ) : (
                        <KeyboardArrowLeft />
                      )}
                    </ButtonBase>
                  )}
                </EdgeTrigger>
              </>
            )}
          </EdgeSidebar>
          <Content>
            <Container maxWidth="md" sx={{ py: 5 }}>
              <div>
                <Switch>
                  {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
                  <Redirect exact from="/" to="/home" />

                  {/* Visiting localhost:3000/about will show the about page. */}
                  <Route
                    // shows AboutPage at all times (logged in or not)
                    exact
                    path="/about"
                  >
                    <AboutPage />
                  </Route>

                  {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
                  <ProtectedRoute
                    // logged in shows UserPage else shows LoginPage
                    exact
                    path="/user"
                  >
                    <UserPage />
                  </ProtectedRoute>

                  <ProtectedRoute
                    // logged in shows CaptureLocationPage else shows LoginPage
                    exact
                    path="/capture-location"
                  >
                    <CaptureLocationPage />
                  </ProtectedRoute>

                  <ProtectedRoute
                    // logged in shows InfoPage else shows LoginPage
                    exact
                    path="/info"
                  >
                    <InfoPage />
                  </ProtectedRoute>

                  <ProtectedRoute
                    // logged in shows SeePage
                    exact
                    path="/first-see"
                  >
                    <SeePage />
                  </ProtectedRoute>

                  <ProtectedRoute
                    // logged in shows SeePage
                    exact
                    path="/first-see-point"
                  >
                    <SeePagePoint />
                  </ProtectedRoute>

                  <ProtectedRoute
                    // logged in shows VerticalStepsSenses
                    exact
                    path="/vertical-steps"
                  >
                    <VerticalStepsSenses />
                  </ProtectedRoute>

                  <ProtectedRoute
                    // logged in shows EditSeeItem
                    exact
                    path="/edit-see-item"
                    //   component={EditSeeItem}
                  ></ProtectedRoute>

                  <ProtectedRoute
                    // logged in shows TouchPage
                    exact
                    path="/second-touch"
                  >
                    <TouchPage />
                  </ProtectedRoute>

                  <ProtectedRoute
                    // logged in shows HearPage
                    exact
                    path="/third-hear"
                  >
                    <HearPage />
                  </ProtectedRoute>

                  <ProtectedRoute
                    // logged in shows SmellPage
                    exact
                    path="/fourth-smell"
                  >
                    <SmellPage />
                  </ProtectedRoute>

                  <ProtectedRoute
                    // logged in shows TastePage
                    exact
                    path="/fifth-taste"
                  >
                    <TastePage />
                  </ProtectedRoute>

                  <ProtectedRoute
                    // logged in shows DistressRating
                    exact
                    path="/distress-rating"
                  >
                    <DistressRating />
                  </ProtectedRoute>

                  <ProtectedRoute
                    // logged in shows UserProfile
                    exact
                    path="/user-profile"
                  >
                    <UserProfile />
                  </ProtectedRoute>

                  <ProtectedRoute
                    // logged in shows ViewAllPage
                    exact
                    path="/view-all"
                  >
                    <ViewAllPage />
                  </ProtectedRoute>

                  <Route exact path="/login">
                    {user.id ? (
                      // If the user is already logged in,
                      // redirect to the /user page
                      <Redirect to="/user" />
                    ) : (
                      // Otherwise, show the login page
                      <LoginPage />
                    )}
                  </Route>

                  <Route exact path="/registration">
                    {user.id ? (
                      // If the user is already logged in,
                      // redirect them to the /user page
                      <Redirect to="/user" />
                    ) : (
                      // Otherwise, show the registration page
                      <RegisterPage />
                    )}
                  </Route>

                  <Route exact path="/home">
                    {user.id ? (
                      // If the user is already logged in,
                      // redirect them to the /user page
                      <Redirect to="/user" />
                    ) : (
                      // Otherwise, show the Landing page
                      <LandingPage />
                    )}
                  </Route>

                  {/* If none of the other routes matched, we will show a 404. */}
                  <Route>
                    <h1>404</h1>
                  </Route>
                </Switch>
              </div>
            </Container>
          </Content>
          {/* <FooterRooted /> */}
        </Router>
      </Root>
    </>
  );
}

export default App;

// import React, { useState, useEffect } from "react";
// import {
//   HashRouter as Router,
//   Redirect,
//   Route,
//   Switch,
//   useHistory,
// } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import ButtonBase from "@mui/material/ButtonBase";
// import CssBaseline from "@mui/material/CssBaseline";
// import Container from "@mui/material/Container";
// import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";

// import {
//   Root,
//   Header,
//   EdgeTrigger,
//   EdgeSidebar,
//   SidebarContent,
//   Content,
//   Footer,
//   getStandardScheme,
//   getFixedScheme,
//   getContentBasedScheme,
//   getCozyScheme,
// } from "@mui-treasury/layout";

// import Menu from "@mui/icons-material/Menu";
// import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

// // TODO: ALIGN WITH TEMPLATE
// import Nav from "../Nav/Nav";
// import FooterRooted from "../Footer/Footer";
// // import HeaderRooted from "../HeaderRooted/HeaderRooted";

// import AboutPage from "../AboutPage/AboutPage";
// import UserPage from "../UserPage/UserPage";
// import InfoPage from "../InfoPage/InfoPage";
// import LandingPage from "../LandingPage/LandingPage";
// // import LocationPage from "../LocationPage/LocationPage";
// import LoginPage from "../LoginPage/LoginPage";
// import RegisterPage from "../RegisterPage/RegisterPage";

// // Import capture image location
// import CaptureLocationPage from "../CaptureLocationPage/CaptureLocationPage";

// // Import each sensory step in the grounding process
// import SeePage from "../SeePage/SeePage";
// import TouchPage from "../TouchPage/TouchPage";
// import HearPage from "../HearPage/HearPage";
// import SmellPage from "../SmellPage/SmellPage";
// import TastePage from "../TastePage/TastePage";

// // Import distress rating component to help users assess their level of distress
// import DistressRating from "../DistressRating/DistressRating";

// // Import user profile page which provides the user an overview of their events and top 3 triggers
// import UserProfile from "../UserProfile/UserProfile";

// // Import view all page which provides the user with all of their past event entries
// import ViewAllPage from "../ViewAllPage/ViewAllPage";

// // Import see page point for users who input 5 see values via an image map
// import SeePagePoint from "../SeePagePointToText/SeePagePointToText";

// // Import drawer for users to access the menu icons
// import DrawerMiniVariant from "../DrawerMiniVariant/DrawerMiniVariant";

// // Import header component for responsive view
// import HeaderRooted from "../HeaderRooted/HeaderRooted";

// import NavSidebar from "../NavSidebar/NavSidebar";

// import SideNavUserInfo from "../SideNavUserInfo/SideNavUserInfo";

// import VerticalStepsSenses from "../VerticalStepsSenses/VerticalStepsSenses";
// import EditSeeItem from "../SeePage/EditSeeItem";

// import "./App.css";

// // const theme = createTheme({
// //     transitions: {
// //       duration: {
// //         standard: 700, // this value is in milliseconds, so 500 = 0.5 seconds
// //       },
// //     },
// //   });

// function App() {
//   const dispatch = useDispatch();

//   const user = useSelector((store) => store.user);

//   const [preset, setPreset] = useState(`createStandardLayout`);

//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [collapsed, setCollapsed] = useState(false);

//   // Function to toggle the sidebar's open/close state
//   const handleSidebarToggle = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const [data, setData] = useState({
//     header: true,
//     nav: true,
//     content: true,
//     footer: true,
//   });

//   const presets = {
//     createStandardLayout: getStandardScheme(),
//     createFixedLayout: getFixedScheme(),
//     createContentBasedLayout: getContentBasedScheme(),
//     createCozyLayout: getCozyScheme(),
//   };

//   const trigger = (open, setOpen) => (
//     <IconButton onClick={() => setOpen(!open)} edge="end">
//       {open ? <KeyboardArrowLeft /> : <Menu />}
//     </IconButton>
//   );

//   useEffect(() => {
//     dispatch({ type: "FETCH_USER" });
//   }, [dispatch]);

//   return (
//     // <ThemeProvider theme={theme}>
//     <>
//       <Root scheme={presets[preset]}>
//         <Router>
//           <CssBaseline />
//           <HeaderRooted
//                 trigger={
//                     <IconButton onClick={handleSidebarToggle} edge="end">
//                       {isSidebarOpen ? <KeyboardArrowLeft /> : <Menu />}
//                     </IconButton>
//                   }
//             //   <EdgeTrigger target={{ anchor: "left", field: "open" }}>
//             //     {(open, setOpen) => (
//             //       <IconButton onClick={() => setOpen(!open)} edge="end">
//             //         {open ? <KeyboardArrowLeft /> : <Menu />}
//             //       </IconButton>
//             //     )}
//             //   </EdgeTrigger>
//             // }
//           />
//           {/* <EdgeSidebar anchor="left" open={isSidebarOpen}>
//             {({ state }) => (
//               <>
//                 <SidebarContent>
//                   <NavSidebar
//                   />
//                 </SidebarContent> */}
//                      {/* Replace EdgeSidebar with NavSidebar */}
//                      <NavSidebar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
//     <SideNavUserInfo collapsed={collapsed} />

//     {(collapsed, setCollapsed) => (
//       <ButtonBase
//         onClick={() => setCollapsed(!collapsed)}
//         sx={{ flexGrow: 1, height: 48 }}
//       >
//         {collapsed ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
//       </ButtonBase>
//     )}
//                 {/* </EdgeTrigger>
//               </> */}
//             {/* )} */}
//           {/* </EdgeSidebar> */}
//           <Content>
//             <Container maxWidth="md" sx={{ py: 5 }}>
//               <div>
//                 <Switch>
//                   {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
//                   <Redirect exact from="/" to="/home" />

//                   {/* Visiting localhost:3000/about will show the about page. */}
//                   <Route
//                     // shows AboutPage at all times (logged in or not)
//                     exact
//                     path="/about"
//                   >
//                     <AboutPage />
//                   </Route>

//                   {/* For protected routes, the view could show one of several things on the same route.
//             Visiting localhost:3000/user will show the UserPage if the user is logged in.
//             If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
//             Even though it seems like they are different pages, the user is always on localhost:3000/user */}
//                   <ProtectedRoute
//                     // logged in shows UserPage else shows LoginPage
//                     exact
//                     path="/user"
//                   >
//                     <UserPage />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows CaptureLocationPage else shows LoginPage
//                     exact
//                     path="/capture-location"
//                   >
//                     <CaptureLocationPage />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows InfoPage else shows LoginPage
//                     exact
//                     path="/info"
//                   >
//                     <InfoPage />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows SeePage
//                     exact
//                     path="/first-see"
//                   >
//                     <SeePage />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows SeePage
//                     exact
//                     path="/first-see-point"
//                   >
//                     <SeePagePoint />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows VerticalStepsSenses
//                     exact
//                     path="/vertical-steps"
//                   >
//                     <VerticalStepsSenses />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows EditSeeItem
//                     exact
//                     path="/edit-see-item"
//                     //   component={EditSeeItem}
//                   ></ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows TouchPage
//                     exact
//                     path="/second-touch"
//                   >
//                     <TouchPage />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows HearPage
//                     exact
//                     path="/third-hear"
//                   >
//                     <HearPage />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows SmellPage
//                     exact
//                     path="/fourth-smell"
//                   >
//                     <SmellPage />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows TastePage
//                     exact
//                     path="/fifth-taste"
//                   >
//                     <TastePage />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows DistressRating
//                     exact
//                     path="/distress-rating"
//                   >
//                     <DistressRating />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows UserProfile
//                     exact
//                     path="/user-profile"
//                   >
//                     <UserProfile />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows ViewAllPage
//                     exact
//                     path="/view-all"
//                   >
//                     <ViewAllPage />
//                   </ProtectedRoute>

//                   <Route exact path="/login">
//                     {user.id ? (
//                       // If the user is already logged in,
//                       // redirect to the /user page
//                       <Redirect to="/user" />
//                     ) : (
//                       // Otherwise, show the login page
//                       <LoginPage />
//                     )}
//                   </Route>

//                   <Route exact path="/registration">
//                     {user.id ? (
//                       // If the user is already logged in,
//                       // redirect them to the /user page
//                       <Redirect to="/user" />
//                     ) : (
//                       // Otherwise, show the registration page
//                       <RegisterPage />
//                     )}
//                   </Route>

//                   <Route exact path="/home">
//                     {user.id ? (
//                       // If the user is already logged in,
//                       // redirect them to the /user page
//                       <Redirect to="/user" />
//                     ) : (
//                       // Otherwise, show the Landing page
//                       <LandingPage />
//                     )}
//                   </Route>

//                   {/* If none of the other routes matched, we will show a 404. */}
//                   <Route>
//                     <h1>404</h1>
//                   </Route>
//                 </Switch>
//                 {/* <Footer /> */}
//               </div>
//             </Container>
//           </Content>
//           {/* <Footer> */}
//           <FooterRooted />
//           {/* </Footer> */}
//         </Router>
//       </Root>
//       {/* // </ThemeProvider> */}
//     </>
//   );
// }

// export default App;

// import React, { useState, useEffect } from "react";
// import {
//   HashRouter as Router,
//   Redirect,
//   Route,
//   Switch,
//   useHistory,
// } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import ButtonBase from "@mui/material/ButtonBase";
// import CssBaseline from "@mui/material/CssBaseline";
// import Container from "@mui/material/Container";
// import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";

// import {
//   Root,
//   Header,
//   EdgeTrigger,
//   EdgeSidebar,
//   SidebarContent,
//   Content,
//   Footer,
//   getStandardScheme,
//   getFixedScheme,
//   getContentBasedScheme,
//   getCozyScheme,
// } from "@mui-treasury/layout";

// import Menu from "@mui/icons-material/Menu";
// import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

// // TODO: ALIGN WITH TEMPLATE
// import Nav from "../Nav/Nav";
// import FooterRooted from "../Footer/Footer";
// // import HeaderRooted from "../HeaderRooted/HeaderRooted";

// import AboutPage from "../AboutPage/AboutPage";
// import UserPage from "../UserPage/UserPage";
// import InfoPage from "../InfoPage/InfoPage";
// import LandingPage from "../LandingPage/LandingPage";
// // import LocationPage from "../LocationPage/LocationPage";
// import LoginPage from "../LoginPage/LoginPage";
// import RegisterPage from "../RegisterPage/RegisterPage";

// // Import capture image location
// import CaptureLocationPage from "../CaptureLocationPage/CaptureLocationPage";

// // Import each sensory step in the grounding process
// import SeePage from "../SeePage/SeePage";
// import TouchPage from "../TouchPage/TouchPage";
// import HearPage from "../HearPage/HearPage";
// import SmellPage from "../SmellPage/SmellPage";
// import TastePage from "../TastePage/TastePage";

// // Import distress rating component to help users assess their level of distress
// import DistressRating from "../DistressRating/DistressRating";

// // Import user profile page which provides the user an overview of their events and top 3 triggers
// import UserProfile from "../UserProfile/UserProfile";

// // Import view all page which provides the user with all of their past event entries
// import ViewAllPage from "../ViewAllPage/ViewAllPage";

// // Import see page point for users who input 5 see values via an image map
// import SeePagePoint from "../SeePagePointToText/SeePagePointToText";

// // Import drawer for users to access the menu icons
// import DrawerMiniVariant from "../DrawerMiniVariant/DrawerMiniVariant";

// // Import header component for responsive view
// import HeaderRooted from "../HeaderRooted/HeaderRooted";

// import NavSidebar from "../NavSidebar/NavSidebar";

// import SideNavUserInfo from "../SideNavUserInfo/SideNavUserInfo";

// import VerticalStepsSenses from "../VerticalStepsSenses/VerticalStepsSenses";
// import EditSeeItem from "../SeePage/EditSeeItem";

// import "./App.css";

// function App() {
//   const dispatch = useDispatch();
//   const user = useSelector((store) => store.user);

//   const [preset, setPreset] = useState(`createStandardLayout`);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

//   const presets = {
//     createStandardLayout: getStandardScheme(),
//     createFixedLayout: getFixedScheme(),
//     createContentBasedLayout: getContentBasedScheme(),
//     createCozyLayout: getCozyScheme(),
//   };

//   useEffect(() => {
//     dispatch({ type: "FETCH_USER" });
//   }, [dispatch]);

//   return (
//     <>
//       <Root scheme={presets[preset]}>
//         <Router>
//           <HeaderRooted
//             trigger={
//               <EdgeTrigger target={{ anchor: "left", field: "open" }}>
//                 {(open, setOpen) => (
//                   <IconButton
//                     onClick={() => setIsSidebarOpen(!isSidebarOpen)} // Toggle the sidebar state
//                     edge="end"
//                   >
//                     {open ? <KeyboardArrowLeft /> : <Menu />}
//                   </IconButton>
//                 )}
//               </EdgeTrigger>
//             }
//           />
//           <CssBaseline />
//           {/* <HeaderRooted
//             trigger={
//               <EdgeTrigger target={{ anchor: "left", field: "open" }}>
//                 {(open, setOpen) => (
//                   <IconButton onClick={() => setOpen(!open)} edge="end">
//                     {open ? <KeyboardArrowLeft /> : <Menu />}
//                   </IconButton>
//                 )}
//               </EdgeTrigger>
//             }
//           /> */}
//           <EdgeSidebar anchor="left" open={isSidebarOpen}>
//             {({ state }) => (
//               <>
//                 <SidebarContent>
//                   <NavSidebar
//                     closeSidebar={() => setIsSidebarOpen(false)}
//                     collapseSidebar={() => setIsSidebarCollapsed(true)}
//                     isCollapsed={isSidebarCollapsed}
//                   />
//                 </SidebarContent>
//                 <SideNavUserInfo collapsed={state.leftEdgeSidebar?.collapsed} />
//                 <EdgeTrigger target={{ anchor: "left", field: "collapsed" }}>
//                   {(collapsed, setCollapsed) => (
//                     <ButtonBase
//                       onClick={() => setCollapsed(!collapsed)}
//                       sx={{ flexGrow: 1, height: 48 }}
//                     >
//                       {collapsed ? (
//                         <KeyboardArrowRight />
//                       ) : (
//                         <KeyboardArrowLeft />
//                       )}
//                     </ButtonBase>
//                   )}
//                 </EdgeTrigger>
//               </>
//             )}
//           </EdgeSidebar>
//           <Content>
//             <Container maxWidth="md" sx={{ py: 5 }}>
//               <div>
//                 <Switch>
//                   {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
//                   <Redirect exact from="/" to="/home" />

//                   {/* Visiting localhost:3000/about will show the about page. */}
//                   <Route
//                     // shows AboutPage at all times (logged in or not)
//                     exact
//                     path="/about"
//                   >
//                     <AboutPage />
//                   </Route>

//                   {/* For protected routes, the view could show one of several things on the same route.
//             Visiting localhost:3000/user will show the UserPage if the user is logged in.
//             If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
//             Even though it seems like they are different pages, the user is always on localhost:3000/user */}
//                   <ProtectedRoute
//                     // logged in shows UserPage else shows LoginPage
//                     exact
//                     path="/user"
//                   >
//                     <UserPage />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows CaptureLocationPage else shows LoginPage
//                     exact
//                     path="/capture-location"
//                   >
//                     <CaptureLocationPage />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows InfoPage else shows LoginPage
//                     exact
//                     path="/info"
//                   >
//                     <InfoPage />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows SeePage
//                     exact
//                     path="/first-see"
//                   >
//                     <SeePage />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows SeePage
//                     exact
//                     path="/first-see-point"
//                   >
//                     <SeePagePoint />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows VerticalStepsSenses
//                     exact
//                     path="/vertical-steps"
//                   >
//                     <VerticalStepsSenses />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows EditSeeItem
//                     exact
//                     path="/edit-see-item"
//                     //   component={EditSeeItem}
//                   ></ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows TouchPage
//                     exact
//                     path="/second-touch"
//                   >
//                     <TouchPage />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows HearPage
//                     exact
//                     path="/third-hear"
//                   >
//                     <HearPage />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows SmellPage
//                     exact
//                     path="/fourth-smell"
//                   >
//                     <SmellPage />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows TastePage
//                     exact
//                     path="/fifth-taste"
//                   >
//                     <TastePage />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows DistressRating
//                     exact
//                     path="/distress-rating"
//                   >
//                     <DistressRating />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows UserProfile
//                     exact
//                     path="/user-profile"
//                   >
//                     <UserProfile />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows ViewAllPage
//                     exact
//                     path="/view-all"
//                   >
//                     <ViewAllPage />
//                   </ProtectedRoute>

//                   <Route exact path="/login">
//                     {user.id ? (
//                       // If the user is already logged in,
//                       // redirect to the /user page
//                       <Redirect to="/user" />
//                     ) : (
//                       // Otherwise, show the login page
//                       <LoginPage />
//                     )}
//                   </Route>

//                   <Route exact path="/registration">
//                     {user.id ? (
//                       // If the user is already logged in,
//                       // redirect them to the /user page
//                       <Redirect to="/user" />
//                     ) : (
//                       // Otherwise, show the registration page
//                       <RegisterPage />
//                     )}
//                   </Route>

//                   <Route exact path="/home">
//                     {user.id ? (
//                       // If the user is already logged in,
//                       // redirect them to the /user page
//                       <Redirect to="/user" />
//                     ) : (
//                       // Otherwise, show the Landing page
//                       <LandingPage />
//                     )}
//                   </Route>

//                   {/* If none of the other routes matched, we will show a 404. */}
//                   <Route>
//                     <h1>404</h1>
//                   </Route>
//                 </Switch>
//               </div>
//             </Container>
//           </Content>
//           <FooterRooted />
//         </Router>
//       </Root>
//     </>
//   );
// }

// export default App;

// ** PREVIOUS CODE TO REFERENCE IF UPDATED CODES SUCKS
// import React, { useState, useEffect } from "react";
// import {
//   HashRouter as Router,
//   Redirect,
//   Route,
//   Switch,
//   useHistory,
// } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import ButtonBase from "@mui/material/ButtonBase";
// import CssBaseline from "@mui/material/CssBaseline";
// import Container from "@mui/material/Container";
// import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";

// import {
//   Root,
//   Header,
//   EdgeTrigger,
//   EdgeSidebar,
//   SidebarContent,
//   Content,
//   Footer,
//   getStandardScheme,
//   getFixedScheme,
//   getContentBasedScheme,
//   getCozyScheme,
// } from "@mui-treasury/layout";

// import Menu from "@mui/icons-material/Menu";
// import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

// // TODO: ALIGN WITH TEMPLATE
// import Nav from "../Nav/Nav";
// import FooterRooted from "../Footer/Footer";
// // import HeaderRooted from "../HeaderRooted/HeaderRooted";

// import AboutPage from "../AboutPage/AboutPage";
// import UserPage from "../UserPage/UserPage";

// // const theme = createTheme({
// //     transitions: {
// //       duration: {
// //         standard: 700, // this value is in milliseconds, so 500 = 0.5 seconds
// //       },
// //     },
// //   });

// function App() {
//   const dispatch = useDispatch();

//   const user = useSelector((store) => store.user);

//   const [preset, setPreset] = useState(`createStandardLayout`);

//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

//   const [data, setData] = useState({
//     header: true,
//     nav: true,
//     content: true,
//     footer: true,
//   });

//   const presets = {
//     createStandardLayout: getStandardScheme(),
//     createFixedLayout: getFixedScheme(),
//     createContentBasedLayout: getContentBasedScheme(),
//     createCozyLayout: getCozyScheme(),
//   };

//   const trigger = (open, setOpen) => (
//     <IconButton onClick={() => setOpen(!open)} edge="end">
//       {open ? <KeyboardArrowLeft /> : <Menu />}
//     </IconButton>
//   );

//   useEffect(() => {
//     dispatch({ type: "FETCH_USER" });
//   }, [dispatch]);

//   return (
//     // <ThemeProvider theme={theme}>
//     <>
//       <Root scheme={presets[preset]}>
//         <Router>
//           <CssBaseline />
//   <HeaderRooted
//     trigger={
//       <EdgeTrigger target={{ anchor: "left", field: "open" }}>
//         {(open, setOpen) => (
//           <IconButton onClick={() => setOpen(!open)} edge="end">
//             {open ? <KeyboardArrowLeft /> : <Menu />}
//           </IconButton>
//         )}
//       </EdgeTrigger>
//     }
//   />
//           <EdgeSidebar anchor="left" open={isSidebarOpen}>
//             {({ state }) => (
//               <>
//                 <SidebarContent>
//                   <NavSidebar
//                   />
//                 </SidebarContent>
//                 <SideNavUserInfo collapsed={state.leftEdgeSidebar?.collapsed} />
//                 <EdgeTrigger target={{ anchor: "left", field: "collapsed" }}>
//                   {(collapsed, setCollapsed) => (
//                     <ButtonBase
//                       onClick={() => setCollapsed(!collapsed)}
//                       sx={{ flexGrow: 1, height: 48 }}
//                     >
//                       {collapsed ? (
//                         <KeyboardArrowRight />
//                       ) : (
//                         <KeyboardArrowLeft />
//                       )}
//                     </ButtonBase>
//                   )}
//                 </EdgeTrigger>
//               </>
//             )}
//           </EdgeSidebar>
//           <Content>
//             <Container maxWidth="md" sx={{ py: 5 }}>
//               <div>

//                 {/* <Footer /> */}
//               </div>
//             </Container>
//           </Content>
//           {/* <Footer> */}
//           <FooterRooted />
//           {/* </Footer> */}
//         </Router>
//       </Root>
//       {/* // </ThemeProvider> */}
//     </>
//   );
// }

// export default App;

// ** VERSION 2: Renders the menus correctly based on screen size
// ** Attempting to update the code (based on screen size)
// ** so when links and icons are clicked, the menu collapses accordingly
// import React, { useState, useEffect } from "react";
// import {
//   HashRouter as Router,
//   Redirect,
//   Route,
//   Switch,
//   useHistory,
// } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import ButtonBase from "@mui/material/ButtonBase";
// import CssBaseline from "@mui/material/CssBaseline";
// import Container from "@mui/material/Container";
// import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";

// import {
//   Root,
//   Header,
//   EdgeTrigger,
//   EdgeSidebar,
//   SidebarContent,
//   Content,
//   Footer,
//   getStandardScheme,
//   getFixedScheme,
//   getContentBasedScheme,
//   getCozyScheme,
// } from "@mui-treasury/layout";

// import Menu from "@mui/icons-material/Menu";
// import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

// // TODO: ALIGN WITH TEMPLATE
// import Nav from "../Nav/Nav";
// import FooterRooted from "../Footer/Footer";
// // import HeaderRooted from "../HeaderRooted/HeaderRooted";

// import AboutPage from "../AboutPage/AboutPage";
// import UserPage from "../UserPage/UserPage";
// import InfoPage from "../InfoPage/InfoPage";
// import LandingPage from "../LandingPage/LandingPage";
// // import LocationPage from "../LocationPage/LocationPage";
// import LoginPage from "../LoginPage/LoginPage";
// import RegisterPage from "../RegisterPage/RegisterPage";

// // Import capture image location
// import CaptureLocationPage from "../CaptureLocationPage/CaptureLocationPage";

// // Import each sensory step in the grounding process
// import SeePage from "../SeePage/SeePage";
// import TouchPage from "../TouchPage/TouchPage";
// import HearPage from "../HearPage/HearPage";
// import SmellPage from "../SmellPage/SmellPage";
// import TastePage from "../TastePage/TastePage";

// // Import distress rating component to help users assess their level of distress
// import DistressRating from "../DistressRating/DistressRating";

// // Import user profile page which provides the user an overview of their events and top 3 triggers
// import UserProfile from "../UserProfile/UserProfile";

// // Import view all page which provides the user with all of their past event entries
// import ViewAllPage from "../ViewAllPage/ViewAllPage";

// // Import see page point for users who input 5 see values via an image map
// import SeePagePoint from "../SeePagePointToText/SeePagePointToText";

// // Import drawer for users to access the menu icons
// import DrawerMiniVariant from "../DrawerMiniVariant/DrawerMiniVariant";

// // Import header component for responsive view
// import HeaderRooted from "../HeaderRooted/HeaderRooted";

// import NavSidebar from "../NavSidebar/NavSidebar";

// import SideNavUserInfo from "../SideNavUserInfo/SideNavUserInfo";

// import VerticalStepsSenses from "../VerticalStepsSenses/VerticalStepsSenses";
// import EditSeeItem from "../SeePage/EditSeeItem";

// import "./App.css";

// // const theme = createTheme({
// //     transitions: {
// //       duration: {
// //         standard: 700, // this value is in milliseconds, so 500 = 0.5 seconds
// //       },
// //     },
// //   });

// function App() {
//   const dispatch = useDispatch();

//   const user = useSelector((store) => store.user);

//   const [preset, setPreset] = useState(`createStandardLayout`);

//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const [data, setData] = useState({
//     header: true,
//     nav: true,
//     content: true,
//     footer: true,
//   });

//   const presets = {
//     createStandardLayout: getStandardScheme(),
//     createFixedLayout: getFixedScheme(),
//     createContentBasedLayout: getContentBasedScheme(),
//     createCozyLayout: getCozyScheme(),
//   };

//   const trigger = (open, setOpen) => (
//     <IconButton onClick={() => setOpen(!open)} edge="end">
//       {open ? <KeyboardArrowLeft /> : <Menu />}
//     </IconButton>
//   );

//   useEffect(() => {
//     dispatch({ type: "FETCH_USER" });
//   }, [dispatch]);

//   return (
//     // <ThemeProvider theme={theme}>
//     <>
//       <Root scheme={presets[preset]}>
//         <Router>
//           <CssBaseline />
//           <HeaderRooted
//             trigger={
//               <EdgeTrigger target={{ anchor: "left", field: "open" }}>
//                 {(open, setOpen) => (
//                   <IconButton onClick={() => setOpen(!open)} edge="end">
//                     {open ? <KeyboardArrowLeft /> : <Menu />}
//                   </IconButton>
//                 )}
//               </EdgeTrigger>
//             }
//           />
//           <EdgeSidebar anchor="left" open={isSidebarOpen}>
//             {({ state }) => (
//               <>
//                 <SidebarContent>
//                   <NavSidebar
//                   />
//                 </SidebarContent>
//                 <SideNavUserInfo collapsed={state.leftEdgeSidebar?.collapsed} />
//                 <EdgeTrigger target={{ anchor: "left", field: "collapsed" }}>
//                   {(collapsed, setCollapsed) => (
//                     <ButtonBase
//                       onClick={() => setCollapsed(!collapsed)}
//                       sx={{ flexGrow: 1, height: 48 }}
//                     >
//                       {collapsed ? (
//                         <KeyboardArrowRight />
//                       ) : (
//                         <KeyboardArrowLeft />
//                       )}
//                     </ButtonBase>
//                   )}
//                 </EdgeTrigger>
//               </>
//             )}
//           </EdgeSidebar>
//           <Content>
//             <Container maxWidth="md" sx={{ py: 5 }}>
//               <div>
//                 <Switch>
//                   {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
//                   <Redirect exact from="/" to="/home" />

//                   {/* Visiting localhost:3000/about will show the about page. */}
//                   <Route
//                     // shows AboutPage at all times (logged in or not)
//                     exact
//                     path="/about"
//                   >
//                     <AboutPage />
//                   </Route>

//                   {/* For protected routes, the view could show one of several things on the same route.
//             Visiting localhost:3000/user will show the UserPage if the user is logged in.
//             If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
//             Even though it seems like they are different pages, the user is always on localhost:3000/user */}
//                   <ProtectedRoute
//                     // logged in shows UserPage else shows LoginPage
//                     exact
//                     path="/user"
//                   >
//                     <UserPage />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows CaptureLocationPage else shows LoginPage
//                     exact
//                     path="/capture-location"
//                   >
//                     <CaptureLocationPage />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows InfoPage else shows LoginPage
//                     exact
//                     path="/info"
//                   >
//                     <InfoPage />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows SeePage
//                     exact
//                     path="/first-see"
//                   >
//                     <SeePage />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows SeePage
//                     exact
//                     path="/first-see-point"
//                   >
//                     <SeePagePoint />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows VerticalStepsSenses
//                     exact
//                     path="/vertical-steps"
//                   >
//                     <VerticalStepsSenses />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows EditSeeItem
//                     exact
//                     path="/edit-see-item"
//                     //   component={EditSeeItem}
//                   ></ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows TouchPage
//                     exact
//                     path="/second-touch"
//                   >
//                     <TouchPage />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows HearPage
//                     exact
//                     path="/third-hear"
//                   >
//                     <HearPage />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows SmellPage
//                     exact
//                     path="/fourth-smell"
//                   >
//                     <SmellPage />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows TastePage
//                     exact
//                     path="/fifth-taste"
//                   >
//                     <TastePage />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows DistressRating
//                     exact
//                     path="/distress-rating"
//                   >
//                     <DistressRating />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows UserProfile
//                     exact
//                     path="/user-profile"
//                   >
//                     <UserProfile />
//                   </ProtectedRoute>

//                   <ProtectedRoute
//                     // logged in shows ViewAllPage
//                     exact
//                     path="/view-all"
//                   >
//                     <ViewAllPage />
//                   </ProtectedRoute>

//                   <Route exact path="/login">
//                     {user.id ? (
//                       // If the user is already logged in,
//                       // redirect to the /user page
//                       <Redirect to="/user" />
//                     ) : (
//                       // Otherwise, show the login page
//                       <LoginPage />
//                     )}
//                   </Route>

//                   <Route exact path="/registration">
//                     {user.id ? (
//                       // If the user is already logged in,
//                       // redirect them to the /user page
//                       <Redirect to="/user" />
//                     ) : (
//                       // Otherwise, show the registration page
//                       <RegisterPage />
//                     )}
//                   </Route>

//                   <Route exact path="/home">
//                     {user.id ? (
//                       // If the user is already logged in,
//                       // redirect them to the /user page
//                       <Redirect to="/user" />
//                     ) : (
//                       // Otherwise, show the Landing page
//                       <LandingPage />
//                     )}
//                   </Route>

//                   {/* If none of the other routes matched, we will show a 404. */}
//                   <Route>
//                     <h1>404</h1>
//                   </Route>
//                 </Switch>
//                 {/* <Footer /> */}
//               </div>
//             </Container>
//           </Content>
//           {/* <Footer> */}
//           <FooterRooted />
//           {/* </Footer> */}
//         </Router>
//       </Root>
//       {/* // </ThemeProvider> */}
//     </>
//   );
// }

// export default App;

// *****************

// ** VERSION 1: SYNTAX ERROR AT THE END **
// import React, { useState, useEffect } from "react";
// import {
//   HashRouter as Router,
//   Redirect,
//   Route,
//   Switch,
//   useHistory,
// } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Box from "@mui/material/Box";
// import ButtonBase from "@mui/material/ButtonBase";
// import CssBaseline from "@mui/material/CssBaseline";
// import Container from "@mui/material/Container";
// import IconButton from "@mui/material/IconButton";

// import {
//   Root,
//   Header,
//   EdgeTrigger,
//   EdgeSidebar,
//   SidebarContent,
//   Content,
//   Footer,
//   getStandardScheme,
//   getFixedScheme,
//   getContentBasedScheme,
//   getCozyScheme,
// } from "@mui-treasury/layout";

// import Menu from "@mui/icons-material/Menu";
// import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

// // TODO: ALIGN WITH TEMPLATE
// import Nav from "../Nav/Nav";
// import FooterRooted from "../Footer/Footer";
// // import HeaderRooted from "../HeaderRooted/HeaderRooted";

// import AboutPage from "../AboutPage/AboutPage";
// import UserPage from "../UserPage/UserPage";
// import InfoPage from "../InfoPage/InfoPage";
// import LandingPage from "../LandingPage/LandingPage";
// // import LocationPage from "../LocationPage/LocationPage";
// import LoginPage from "../LoginPage/LoginPage";
// import RegisterPage from "../RegisterPage/RegisterPage";

// // Import capture image location
// import CaptureLocationPage from "../CaptureLocationPage/CaptureLocationPage";

// // Import each sensory step in the grounding process
// import SeePage from "../SeePage/SeePage";
// import TouchPage from "../TouchPage/TouchPage";
// import HearPage from "../HearPage/HearPage";
// import SmellPage from "../SmellPage/SmellPage";
// import TastePage from "../TastePage/TastePage";

// // Import distress rating component to help users assess their level of distress
// import DistressRating from "../DistressRating/DistressRating";

// // Import user profile page which provides the user an overview of their events and top 3 triggers
// import UserProfile from "../UserProfile/UserProfile";

// // Import view all page which provides the user with all of their past event entries
// import ViewAllPage from "../ViewAllPage/ViewAllPage";

// // Import see page point for users who input 5 see values via an image map
// import SeePagePoint from "../SeePagePointToText/SeePagePointToText";

// // Import drawer for users to access the menu icons
// import DrawerMiniVariant from "../DrawerMiniVariant/DrawerMiniVariant";

// // Import header component for responsive view
// import HeaderRooted from "../HeaderRooted/HeaderRooted";

// import NavSidebar from "../NavSidebar/NavSidebar";

// import SideNavUserInfo from "../SideNavUserInfo/SideNavUserInfo";

// import VerticalStepsSenses from "../VerticalStepsSenses/VerticalStepsSenses";
// import EditSeeItem from "../SeePage/EditSeeItem";

// import "./App.css";

// // const theme = createTheme({
// //     transitions: {
// //       duration: {
// //         standard: 700, // this value is in milliseconds, so 500 = 0.5 seconds
// //       },
// //     },
// //   });

// function App() {
//   const dispatch = useDispatch();

//   const user = useSelector((store) => store.user);

//   const [preset, setPreset] = useState("createStandardLayout");
//   const [data, setData] = useState({
//     header: true,
//     nav: true,
//     content: true,
//     footer: true,
//   });

//   const presets = {
//     createStandardLayout: getStandardScheme(),
//     createFixedLayout: getFixedScheme(),
//     createContentBasedLayout: getContentBasedScheme(),
//     createCozyLayout: getCozyScheme(),
//   };

//   const trigger = (open, setOpen) => (
//     <IconButton onClick={() => setOpen(!open)} edge="end">
//       {open ? <KeyboardArrowLeft /> : <Menu />}
//     </IconButton>
//   );

//   useEffect(() => {
//     dispatch({ type: "FETCH_USER" });
//   }, [dispatch]);

//   return (
//     // <ThemeProvider theme={theme}>
//     <>
//     <Root scheme={presets[preset]}>
//       <Router>
//         <CssBaseline />
//         <Header>
//           <EdgeTrigger target={{ anchor: "left", field: "open" }}>
//             {(open, setOpen) => trigger(open, setOpen)}
//           </EdgeTrigger>
//         </Header>
//           <HeaderRooted
//             trigger={
//               <EdgeTrigger target={{ anchor: "left", field: "open" }}>
//                 {(open, setOpen) => (
//                   <IconButton onClick={() => setOpen(!open)} edge="end">
//                     {open ? <KeyboardArrowLeft /> : <Menu />}
//                   </IconButton>
//                 )}
//               </EdgeTrigger>
//             }
//           />
//           </Header>
//         <EdgeSidebar anchor="left">
//           {({ state }) => (
//             <>
//               <SidebarContent>
//                 <NavSidebar />
//               </SidebarContent>
//               <SideNavUserInfo collapsed={state.leftEdgeSidebar?.collapsed} />
//               <EdgeTrigger target={{ anchor: "left", field: "collapsed" }}>
//                 {(collapsed, setCollapsed) => (
//                   <ButtonBase
//                     onClick={() => setCollapsed(!collapsed)}
//                     sx={{ flexGrow: 1, height: 48 }}
//                   >
//                     {collapsed ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
//                   </ButtonBase>
//                 )}
//               </EdgeTrigger>
//             </>
//           )}
//         </EdgeSidebar>
//         <Content>
//           <Container maxWidth="md" sx={{ py: 5 }}>
//             <div>
//               <Switch>
//                 {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
//                 <Redirect exact from="/" to="/home" />

//                 {/* Visiting localhost:3000/about will show the about page. */}
//                 <Route
//                   // shows AboutPage at all times (logged in or not)
//                   exact
//                   path="/about"
//                 >
//                   <AboutPage />
//                 </Route>

//                 {/* For protected routes, the view could show one of several things on the same route.
//             Visiting localhost:3000/user will show the UserPage if the user is logged in.
//             If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
//             Even though it seems like they are different pages, the user is always on localhost:3000/user */}
//                 <ProtectedRoute
//                   // logged in shows UserPage else shows LoginPage
//                   exact
//                   path="/user"
//                 >
//                   <UserPage />
//                 </ProtectedRoute>

//                 <ProtectedRoute
//                   // logged in shows CaptureLocationPage else shows LoginPage
//                   exact
//                   path="/capture-location"
//                 >
//                   <CaptureLocationPage />
//                 </ProtectedRoute>

//                 <ProtectedRoute
//                   // logged in shows InfoPage else shows LoginPage
//                   exact
//                   path="/info"
//                 >
//                   <InfoPage />
//                 </ProtectedRoute>

//                 <ProtectedRoute
//                   // logged in shows SeePage
//                   exact
//                   path="/first-see"
//                 >
//                   <SeePage />
//                 </ProtectedRoute>

//                 <ProtectedRoute
//                   // logged in shows SeePage
//                   exact
//                   path="/first-see-point"
//                 >
//                   <SeePagePoint />
//                 </ProtectedRoute>

//                 <ProtectedRoute
//                   // logged in shows VerticalStepsSenses
//                   exact
//                   path="/vertical-steps"
//                 >
//                   <VerticalStepsSenses />
//                 </ProtectedRoute>

//                 <ProtectedRoute
//                   // logged in shows EditSeeItem
//                   exact
//                   path="/edit-see-item"
//                 //   component={EditSeeItem}
//                 ></ProtectedRoute>

//                 <ProtectedRoute
//                   // logged in shows TouchPage
//                   exact
//                   path="/second-touch"
//                 >
//                   <TouchPage />
//                 </ProtectedRoute>

//                 <ProtectedRoute
//                   // logged in shows HearPage
//                   exact
//                   path="/third-hear"
//                 >
//                   <HearPage />
//                 </ProtectedRoute>

//                 <ProtectedRoute
//                   // logged in shows SmellPage
//                   exact
//                   path="/fourth-smell"
//                 >
//                   <SmellPage />
//                 </ProtectedRoute>

//                 <ProtectedRoute
//                   // logged in shows TastePage
//                   exact
//                   path="/fifth-taste"
//                 >
//                   <TastePage />
//                 </ProtectedRoute>

//                 <ProtectedRoute
//                   // logged in shows DistressRating
//                   exact
//                   path="/distress-rating"
//                 >
//                   <DistressRating />
//                 </ProtectedRoute>

//                 <ProtectedRoute
//                   // logged in shows UserProfile
//                   exact
//                   path="/user-profile"
//                 >
//                   <UserProfile />
//                 </ProtectedRoute>

//                 <ProtectedRoute
//                   // logged in shows ViewAllPage
//                   exact
//                   path="/view-all"
//                 >
//                   <ViewAllPage />
//                 </ProtectedRoute>

//                 <Route exact path="/login">
//                   {user.id ? (
//                     // If the user is already logged in,
//                     // redirect to the /user page
//                     <Redirect to="/user" />
//                   ) : (
//                     // Otherwise, show the login page
//                     <LoginPage />
//                   )}
//                 </Route>

//                 <Route exact path="/registration">
//                   {user.id ? (
//                     // If the user is already logged in,
//                     // redirect them to the /user page
//                     <Redirect to="/user" />
//                   ) : (
//                     // Otherwise, show the registration page
//                     <RegisterPage />
//                   )}
//                 </Route>

//                 <Route exact path="/home">
//                   {user.id ? (
//                     // If the user is already logged in,
//                     // redirect them to the /user page
//                     <Redirect to="/user" />
//                   ) : (
//                     // Otherwise, show the Landing page
//                     <LandingPage />
//                   )}
//                 </Route>

//                 {/* If none of the other routes matched, we will show a 404. */}
//                 <Route>
//                   <h1>404</h1>
//                 </Route>
//               </Switch>
//               {/* <Footer /> */}
//             </div>
//           </Container>
//         </Content>
//         {/* <Footer> */}
//         <FooterRooted />
//         {/* </Footer> */}
//       </Router>
//     </Root>
//     {/* // </ThemeProvider> */}
//     </>
//   );
// }

// export default App;
