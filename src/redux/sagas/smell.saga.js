import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchSmellItems() {
  try {
    const response = yield axios.get("/api/smell-inputs");
    yield put({ type: "SET_SMELL_DATA", payload: response.data });
  } catch (error) {
    console.log("Error in smell items GET request: ", error);
  }
}

function* addSmellData(action) {
  try {
    console.log(
      "Dispatching add smell data action with payload: ",
      action.payload
    );
    yield axios.post("/api/smell-inputs", action.payload);
    yield put({ type: "FETCH_SMELL_ITEMS" });
  } catch (error) {
    console.log("Error in adding smell data: ", error);
  }
}

function* smellInputsSaga() {
  yield takeLatest("FETCH_SMELL_ITEMS", fetchSmellItems);
  yield takeLatest("ADD_SMELL_DATA", addSmellData);
}

export default smellInputsSaga;