import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* uploadImage(action) {
  try {
    // Upload the image and retrieve metadata
    const response = yield axios.post("/api/image/upload", action.payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    // Dispatch action to add a new event entry
    yield put({ type: "ADD_EVENT_ENTRY", payload: response.data });
    yield put({ type: "FETCH_USER_IMAGE" });
  } catch (error) {
    console.log("Error uploading image:", error);
  }
}

function* fetchUserImage(action) {
  try {
    const response = yield axios.get("/api/image");
    yield put({ type: "SET_USER_IMAGE", payload: response.data });
  } catch (error) {
    console.log("Error fetching user image:", error);
  }
}

function* imageSaga() {
  yield takeLatest("UPLOAD_IMAGE", uploadImage);
  yield takeLatest("FETCH_USER_IMAGE", fetchUserImage);
}

export default imageSaga;
