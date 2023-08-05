import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import InfoPage from "../InfoPage/InfoPage";
import LandingPage from "../LandingPage/LandingPage";
// import LocationPage from "../LocationPage/LocationPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";

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
import ViewAllPage from '../ViewAllPage/ViewAllPage';


import "./App.css";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;
