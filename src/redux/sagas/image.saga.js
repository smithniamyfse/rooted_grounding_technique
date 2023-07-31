import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* uploadImage(action) {
    try {
      const response = yield axios.post(`/api/image/upload`, action.payload);
      yield put({ type: 'FETCH_USER_IMAGE' });
    } catch (error) {
      console.log('Error uploading image:', error);
    }
  }

function* fetchUserImage(action) {
  try {
    const response = yield axios.get(`/api/image`);
    yield put({ type: 'SET_USER_IMAGE', payload: response.data });
  } catch (error) {
    console.log('Error fetching user image:', error);
  }
}

function* imageSaga() {
  yield takeLatest('UPLOAD_IMAGE', uploadImage);
  yield takeLatest('FETCH_USER_IMAGE', fetchUserImage);
}

export default imageSaga;
