import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchEventEntries() {
  try {
    const response = yield axios.get("/api/event-entries");
    yield put({ type: "SET_EVENT_ENTRIES", payload: response.data });
  } catch (error) {
    console.log("Error fetching event entries:", error);
  }
}

function* createNewEvent() {
  try {
    const response = yield axios.post("/api/event_entries/new");
    yield put({ type: "SET_CURRENT_EVENT_ID", payload: response.data.id });
  } catch (error) {
    console.error("Error creating new event:", error);
  }
}

function* addEventEntry(action) {
  try {
    const response = yield axios.post("/api/event-entries", action.payload);
    yield put({ type: "ADD_EVENT_ENTRY", payload: response.data });

    // Assuming that the server response contains the new entry's id, dispatch an action to set the current event id
    yield put({ type: "SET_CURRENT_EVENT_ID", payload: response.data.id });
  } catch (error) {
    console.log("Error adding event entry:", error);
  }
}

function* updateEventEntry(action) {
  try {
    yield axios.put(`/api/event-entries/${action.payload.id}`, action.payload);
    yield put({ type: "UPDATE_EVENT_ENTRY_SUCCESS", payload: action.payload });
  } catch (error) {
    console.log("Error updating event entry: ", error);
    yield put({ type: "UPDATE_EVENT_ENTRY_FAIL", error });
  }
}

function* removeEventEntry(action) {
  try {
    yield axios.delete(`/api/event-entries/${action.payload}`);
    yield put({ type: "REMOVE_EVENT_ENTRY", payload: action.payload });
  } catch (error) {
    console.log("Error removing event entry:", error);
  }
}

function* fetchTopTriggers() {
  try {
    const response = yield axios.get("/api/event-entries/top-triggers");
    console.log("Data from saga:", response.data);
    yield put({ type: "SET_TOP_TRIGGERS", payload: response.data });
  } catch (error) {
    console.log("Error fetching top triggers:", error);
  }
}

function* fetchSeeItems() {
  try {
    const response = yield axios.get("/api/event-entries/top-see-items");
    yield put({ type: "SET_SEE_ITEMS", payload: response.data });
  } catch (error) {
    console.log("Error fetching see items:", error);
  }
}

function* eventEntriesSaga() {
  yield takeLatest("FETCH_EVENT_ENTRIES", fetchEventEntries);
  yield takeLatest("CREATE_NEW_EVENT", createNewEvent);
  yield takeLatest("ADD_EVENT_ENTRY", addEventEntry);
  yield takeLatest("UPDATE_EVENT_ENTRY", updateEventEntry);
  yield takeLatest("REMOVE_EVENT_ENTRY", removeEventEntry);
  yield takeLatest("FETCH_TOP_TRIGGERS", fetchTopTriggers);
  yield takeLatest("FETCH_SEE_ITEMS", fetchSeeItems);
}

export default eventEntriesSaga;
