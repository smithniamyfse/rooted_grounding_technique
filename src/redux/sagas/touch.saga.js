import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchTouchItems() {
  try {
    const response = yield axios.get("/api/touch-inputs");
    yield put({ type: "SET_TOUCH_DATA", payload: response.data });
  } catch (error) {
    console.log("Error in touch items GET request: ", error);
  }
}

function* addTouchData(action) {
  try {
    console.log("Dispatching add touch data with payload: ", action.payload);
    yield axios.post("/api/touch-inputs", action.payload);
    yield put({ type: "FETCH_TOUCH_ITEMS" });
  } catch (error) {
    console.log("Error in adding touch data:", error);
  }
}

function* touchInputsSaga() {
  yield takeLatest("FETCH_TOUCH_ITEMS", fetchTouchItems);
  yield takeLatest("ADD_TOUCH_DATA", addTouchData);
}

export default touchInputsSaga;
