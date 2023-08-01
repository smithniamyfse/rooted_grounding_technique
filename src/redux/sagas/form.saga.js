import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* submitForm(action) {
    try {
        const response = yield axios.post(`/api/forms/${action.payload.formName}`, action.payload.data);
        yield put({ type: 'FORM_SUBMIT_SUCCESS', payload: { formName: action.payload.formName, data: response.data } });
    } catch (error) {
        yield put({ type: 'FORM_SUBMIT_FAILURE', payload: { formName: action.payload.formName, error: error.message } });
    }
}

// function* formSaga() {
//     yield takeEvery('SUBMIT_FORM', submitForm);
// }

function* formSaga() {
    yield takeLatest('SUBMIT_FORM', submitForm);
}

export default formSaga;