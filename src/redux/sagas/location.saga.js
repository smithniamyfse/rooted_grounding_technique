import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* addLocationData(action) {
    try {
      console.log(`Location data being sent to the server: ${JSON.stringify(action.payload)}`);
      const response = yield axios.put(`/api/event-entries/${action.payload.eventId}`, action.payload);
      console.log(`Server response after updating location data: ${JSON.stringify(response.data)}`);
      yield put({ type: "UPDATE_EVENT_ENTRY_SUCCESS", payload: response.data });
    } catch (error) {
      console.log("Error updating location data:", error);
    }
  }
  
  function* locationSaga() {
    yield takeLatest("ADD_LOCATION_DATA", addLocationData);
  }
  
  export default locationSaga;
