import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* uploadImageSaga(action) {
  try {
    const { userId, file } = action.payload;
    const formData = new FormData();
    formData.append("image", file);
    const response = yield call(axios.post, `/api/image/upload/${userId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    yield put({ type: "UPLOAD_IMAGE_SUCCESS", payload: response.data.fileUrl });
  } catch (error) {
    yield put({ type: "UPLOAD_IMAGE_ERROR", payload: error.message });
  }
}

function* fetchImagesSaga(action) {
    try {
      const response = yield call(axios.get, `/api/image/user/${action.payload}`);
      yield put({ type: "SET_IMAGES", payload: response.data });
    } catch (error) {
      yield put({ type: "FETCH_IMAGES_ERROR", payload: error.message });
    }
  }
  

function* fetchImageSaga(action) {
  try {
    const response = yield call(axios.get, `/api/image/view/${action.payload}`);
    yield put({ type: "FETCH_IMAGE_SUCCESS", payload: response.data });
  } catch (error) {
    yield put({ type: "FETCH_IMAGE_ERROR", payload: error.message });
  }
}

function* imageSaga() {
  yield takeLatest("FETCH_IMAGES", fetchImagesSaga);
  yield takeLatest("UPLOAD_IMAGE_REQUEST", uploadImageSaga);
  yield takeLatest("FETCH_IMAGE", fetchImageSaga);
}

export default imageSaga;







// import { call, put, takeLatest } from "redux-saga/effects";
// import axios from "axios";



// function* uploadImageSaga(action) {
//   try {
//     const { userId, file } = action.payload;
//     const formData = new FormData();
//     formData.append("image", file);
//     const response = yield call(axios.post, `/api/image/upload/${userId}`, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     yield put({ type: "UPLOAD_IMAGE_SUCCESS", payload: response.data.fileUrl });
//   } catch (error) {
//     yield put({ type: "UPLOAD_IMAGE_ERROR", payload: error.message });
//   }
// }


// function* fetchImagesSaga(action) {
//   try {
//     const response = yield call(axios.get, `/api/image/user/${action.payload}`);
//     yield put({ type: "SET_IMAGES", payload: response.data });
//   } catch (error) {
//     yield put({ type: "FETCH_IMAGES_ERROR", payload: error.message });
//   }
// }



// function* fetchImageSaga(action) {
//     try {
//       const response = yield call(axios.get, `/api/image/view/${action.payload}`, { responseType: 'blob' });
//       const url = URL.createObjectURL(response.data);
//       yield put({ type: "FETCH_IMAGE_SUCCESS", payload: url });
//     } catch (error) {
//       yield put({ type: "FETCH_IMAGE_ERROR", payload: error.message });
//     }
//   }



// function* imageSaga() {
//   yield takeLatest("FETCH_IMAGES", fetchImagesSaga);
//   yield takeLatest("UPLOAD_IMAGE_REQUEST", uploadImageSaga);
//   yield takeLatest("FETCH_IMAGE", fetchImageSaga);
// }

// export default imageSaga;






// import { call, put, takeLatest } from "redux-saga/effects";
// import axios from "axios";


// function* fetchImageSaga(action) {
//     try {
//       const response = yield call(axios.get, `/api/image/view/${action.payload}`);
//       yield put({ type: "SET_IMAGE", payload: response.data });
//     } catch (error) {
//       yield put({ type: "IMAGE_ERROR", payload: error.message });
//     }
//   }

// function* uploadImageSaga(action) {
//     try {
//       // assuming action.payload contains the user's ID or name and the file
//       const { userId, file } = action.payload;
//       const formData = new FormData();
//       formData.append("image", file);
//       const response = yield call(axios.post, `/api/image/upload/${userId}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       yield put({ type: "UPLOAD_IMAGE_SUCCESS", payload: response.data.fileUrl });
//     } catch (error) {
//       yield put({ type: "UPLOAD_IMAGE_ERROR", payload: error.message });
//     }
//   }
  
//   function* fetchImagesSaga(action) {
//     try {
//       const response = yield call(axios.get, `/api/image/user/${action.payload}`);
//       yield put({ type: "SET_IMAGES", payload: response.data });
//     } catch (error) {
//       yield put({ type: "UPLOAD_IMAGE_ERROR", payload: error.message });
//     }
//   }
  

// function* imageSaga() {
//   yield takeLatest("FETCH_IMAGES", fetchImagesSaga);
//   yield takeLatest("UPLOAD_IMAGE_REQUEST", uploadImageSaga);
//   yield takeLatest("FETCH_IMAGE", fetchImageSaga);
// }

// export default imageSaga;

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
