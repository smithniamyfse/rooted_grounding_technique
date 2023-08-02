import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchTouchInputs() {
    try {
      const response = yield axios.get("/api/touch");
      yield put({ type: "SET_TOUCH_DATA", payload: response.data });
    } catch (error) {
      console.log("Error fetching touch inputs:", error);
    }
}
  
function* addTouchInput(action) {
    try {
      const response = yield axios.post("/api/touch", action.payload);
      yield put({ type: "ADD_TOUCH_INPUT", payload: response.data });
    } catch (error) {
      console.log("Error adding touch input:", error);
    }
}

function* touchInputsSaga() {
    yield takeEvery("FETCH_TOUCH_INPUTS", fetchTouchInputs);
    yield takeEvery("ADD_TOUCH_INPUT", addTouchInput);
}

export default touchInputsSaga;
