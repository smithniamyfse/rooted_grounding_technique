import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchHearItems() {
  try {
    const response = yield axios.get("/api/hear-inputs");
    yield put({ type: "SET_HEAR_DATA", payload: response.data });
  } catch (error) {
    console.log("Error in hear items GET request: ", error);
  }
}

function* addHearData(action) {
  try {
    console.log(
      "Dispatching add hear data action with payload: ",
      action.payload
    );
    yield axios.post("/api/hear-inputs", action.payload);
    yield put({ type: "FETCH_HEAR_ITEMS" });
  } catch (error) {
    console.log("Error in adding hear data: ", error);
  }
}

function* hearInputsSaga() {
  yield takeLatest("FETCH_HEAR_ITEMS", fetchHearItems);
  yield takeLatest("ADD_HEAR_DATA", addHearData);
}

export default hearInputsSaga;
