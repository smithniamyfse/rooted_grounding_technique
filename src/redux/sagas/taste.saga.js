import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchTasteItems() {
  try {
    const response = yield axios.get("/api/taste-inputs");
    yield put({ type: "SET_TASTE_DATA", payload: response.data });
  } catch (error) {
    console.log("Error in taste items GET request: ", error);
  }
}

function* addTasteData(action) {
  try {
    console.log(
      "Dispatching add taste data action with payload: ",
      action.payload
    );
    yield axios.post("/api/taste-inputs", action.payload);
    yield put({ type: "FETCH_TASTE_ITEMS" });
  } catch (error) {
    console.log("Error in adding taste data: ", error);
  }
}

function* tasteInputsSaga() {
  yield takeLatest("FETCH_TASTE_ITEMS", fetchTasteItems);
  yield takeLatest("ADD_TASTE_DATA", addTasteData);
}

export default tasteInputsSaga;