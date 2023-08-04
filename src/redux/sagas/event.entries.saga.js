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
  

// function* addEventEntry(action) {
//   try {
//     const response = yield axios.post("/api/event-entries", action.payload);
//     yield put({ type: "ADD_EVENT_ENTRY", payload: response.data });
//   } catch (error) {
//     console.log("Error adding event entry:", error);
//   }
// }

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

function* eventEntriesSaga() {
  // 'FETCH_EVENT_ENTRIES': This will activate a GET REQUEST to /api/event-entries to fetch all the event-entries.
  // The event entries will then be stored in the state via a 'SET_EVENT_ENTRIES' action.
  yield takeLatest("FETCH_EVENT_ENTRIES", fetchEventEntries);

  // 'ADD_EVENT_ENTRY': This will activate a POST REQUEST to /api/event-entries to add a new event-entry.
  // The new event-entry will be added to the state via an 'ADD_EVENT_ENTRY' action.
  yield takeLatest("ADD_EVENT_ENTRY", addEventEntry);

  // 'UPDATE_EVENT_ENTRY': This will activate a PUT REQUEST to /api/event-entries/:id to update an existing event-entry.
  // The updated event-entry data will be reflected in the state via an 'UPDATE_EVENT_ENTRY_SUCCESS' action.
  yield takeLatest("UPDATE_EVENT_ENTRY", updateEventEntry);

  // 'REMOVE_EVENT_ENTRY': This will activate a DELETE REQUEST to /api/event-entries/:id to remove an entry.
  // The entry will be removed from the state via a 'REMOVE_EVENT_ENTRY' action.
  yield takeLatest("REMOVE_EVENT_ENTRY", removeEventEntry);
}

export default eventEntriesSaga;

// import { put, takeEvery } from 'redux-saga/effects';
// import axios from 'axios';

// function* fetchTriggers() {
//     try {
//         const response = yield axios.get('/api/triggers');
//         yield put({ type: 'SET_TRIGGERS', payload: response.data });
//     } catch (error) {
//         console.log('Error fetching triggers:', error);
//     }
// }

// function* addTrigger(action) {
//     try {
//         const response = yield axios.post('/api/triggers', action.payload);
//         yield put({ type: 'ADD_TRIGGER', payload: response.data });
//     } catch (error) {
//         console.log('Error adding trigger:', error);
//     }
// }

// function* removeTrigger(action) {
//     try {
//         yield axios.delete(`/api/triggers/${action.payload}`);
//         yield put({ type: 'REMOVE_TRIGGER', payload: action.payload });
//     } catch (error) {
//         console.log('Error removing trigger:', error);
//     }
// }

// function* triggersSaga() {
//     // 'FETCH_TRIGGERS': This will activate a GET REQUEST to /api/triggers to fetch all the triggers.
//         // The triggers will then be stored in the state via a 'SET_TRIGGERS' action.
//     yield takeEvery('FETCH_TRIGGERS', fetchTriggers);

//     // 'ADD_TRIGGER': This will activate a POST REQUEST to /api/triggers to add a new trigger.
//         // The new trigger will be added to the state via an 'ADD_TRIGGER' action.
//     yield takeEvery('ADD_TRIGGER', addTrigger);

//     // 'REMOVE_TRIGGER': This will activate a DELETE REQUEST to /api/triggers/:id to remove a trigger.
//         // The trigger will be removed from the state via a 'REMOVE_TRIGGER' action.
//     yield takeEvery('REMOVE_TRIGGER', removeTrigger);
// }

// export default triggersSaga;
