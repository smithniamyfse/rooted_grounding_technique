import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchImagesSaga(action) {
  try {
    const response = yield call(axios.get, `/api/image/user/${action.payload}`);
    yield put({ type: "SET_IMAGES", payload: response.data });
  } catch (error) {
    yield put({ type: "UPLOAD_IMAGE_ERROR", payload: error.message });
  }
}

function* uploadImageSaga(action) {
    try {
      const formData = new FormData();
      formData.append("image", action.payload.file);  // Adjust this line
      const response = yield call(axios.post, "/api/image/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      yield put({ type: "UPLOAD_IMAGE_SUCCESS", payload: response.data.fileUrl });
    } catch (error) {
      yield put({ type: "UPLOAD_IMAGE_ERROR", payload: error.message });
    }
  }
  

function* imageSaga() {
  yield takeLatest("FETCH_IMAGES", fetchImagesSaga);
  yield takeLatest("UPLOAD_IMAGE_REQUEST", uploadImageSaga);
}

export default imageSaga;

// import { call, put, takeEvery } from 'redux-saga/effects';
// import axios from 'axios';

// function* uploadImageSaga(action) {
//   try {
//     const formData = new FormData();
//     formData.append('image', action.payload);
//     const response = yield call(axios.post, '/api/image/upload', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });
//     yield put({ type: 'UPLOAD_IMAGE_SUCCESS', payload: response.data.fileUrl });
//   } catch (error) {
//     yield put({ type: 'UPLOAD_IMAGE_ERROR', payload: error.message });
//   }
// }

// // Similarly, this function can be named watchImageUploadSaga for better clarity.
// function* watchImageUploadSaga() {
//   yield takeEvery('UPLOAD_IMAGE_REQUEST', uploadImageSaga);
// }

// export default watchImageUploadSaga;
