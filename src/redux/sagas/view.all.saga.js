import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// Saga for handling a new action type (e.g., 'FETCH_ALL_ENTRIES')
// When this action is dispatched, the saga will send a GET request to /api/view-all,
// then dispatch another action to save the response data in the Redux store.
function* fetchViewAllEntries() {
  try {
    const response = yield axios.get("/api/view-all");
    console.log("In fetchViewAllEntries, GET Server response: ", response.data);
    yield put({ type: "SET_VIEW_ALL_ENTRIES", payload: response.data });
  } catch (error) {
    console.log("Error GETting view all entries in saga: ", error);
  }
}

function* fetchEntryDetails(action) {
  console.log(
    "Fetch entry details dispatched with the following action: ",
    action
  );
  try {
    const response = yield axios.get(`/api/view-all/${action.payload}`);
    // If the entry data is sent within an array (even if it's a single item array - one entry),
    // the first item of the array needs to be accessed `response.data[0]`
    yield put({ type: "SET_ENTRY_DETAILS", payload: response.data[0] });
  } catch (error) {
    console.log("Error fetching details of an entry: ", error);
  }
}

function* updateDateTime(action) {
  try {
    yield axios.put("/api/view-all", action.payload);
    yield put({ type: "FETCH_ENTRY_DETAILS", payload: action.payload.id });
  } catch (error) {
    console.log("Error updating date and time of specific entry: ", error);
  }
}

function* deleteEntry(action) {
    try {
        yield axios.delete(`/api/-view-all${action.payload}`);
        yield put({ type: "FETCH_VIEW_ALL_ENTRIES" }) // Fetch the updated list of entries
    } catch (error) {
        console.log("Error with deleting entry: ", error);
    }
}

// Listen for specific actions and trigger corresponding sagas
function* viewAllEntriesSaga() {
  yield takeLatest("FETCH_VIEW_ALL_ENTRIES", fetchViewAllEntries);
  yield takeLatest("FETCH_ENTRY_DETAILS", fetchEntryDetails);
  yield takeLatest("UPDATE_DATE_TIME", updateDateTime);
  yield takeLatest("DELETE_ENTRY", deleteEntry); 
}

export default viewAllEntriesSaga;
