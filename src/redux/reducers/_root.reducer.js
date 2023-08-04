import { combineReducers } from "redux";
import errors from "./errors.reducer";
import user from "./user.reducer";
import image from "./image.reducer";
import seeReducer from "./see.reducer";
import touchReducer from "./touch.reducer";
import hearReducer from "./hear.reducer";
import smellReducer from "./smell.reducer";
import tasteReducer from "./taste.reducer";
import distress from "./distress.reducer";
import eventEntries from "./event.entries.reducer";

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  image, // will have image uploading related states
  seeReducer,
  hearReducer,
  touchReducer,
  smellReducer,
  tasteReducer,
  distress,
  eventEntries, // store event entries
});

export default rootReducer;
