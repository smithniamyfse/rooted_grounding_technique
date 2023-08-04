import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* addLocationData(action) {
    try {
      const response = yield axios.put(`/api/event-entries/${action.payload.eventId}`, action.payload);
      yield put({ type: "UPDATE_EVENT_ENTRY_SUCCESS", payload: response.data });
    } catch (error) {
      console.log("Error updating location data:", error);
    }
  }
  
  function* locationSaga() {
    yield takeLatest("ADD_LOCATION_DATA", addLocationData);
  }
  
  export default locationSaga;