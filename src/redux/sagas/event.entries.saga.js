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
    } catch (error) {
      console.log("Error adding event entry:", error);
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
  yield takeEvery("FETCH_EVENT_ENTRIES", fetchEventEntries);

  // 'ADD_EVENT_ENTRY': This will activate a POST REQUEST to /api/event-entries to add a new event-entry.
    // The new event-entry will be added to the state via an 'ADD_EVENT_ENTRY' action.
  yield takeEvery("ADD_EVENT_ENTRY", addEventEntry);

  // 'REMOVE_EVENT_ENTRY': This will activate a DELETE REQUEST to /api/event-entries/:id to remove an entry.
    // The entry will be removed from the state via a 'REMOVE_EVENT_ENTRY' action.
  yield takeEvery("REMOVE_EVENT_ENTRY", removeEventEntry);
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
