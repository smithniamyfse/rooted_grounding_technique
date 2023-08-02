import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchTriggers() {
    try {
        const response = yield axios.get('/api/triggers');
        yield put({ type: 'SET_TRIGGERS', payload: response.data });
    } catch (error) {
        console.log('Error fetching triggers:', error);
    }
}

function* addTrigger(action) {
    try {
        const response = yield axios.post('/api/triggers', action.payload);
        yield put({ type: 'ADD_TRIGGER', payload: response.data });
    } catch (error) {
        console.log('Error adding trigger:', error);
    }
}

function* removeTrigger(action) {
    try {
        yield axios.delete(`/api/triggers/${action.payload}`);
        yield put({ type: 'REMOVE_TRIGGER', payload: action.payload });
    } catch (error) {
        console.log('Error removing trigger:', error);
    }
}

function* triggersSaga() {
    yield takeEvery('FETCH_TRIGGERS', fetchTriggers);
    yield takeEvery('ADD_TRIGGER', addTrigger);
    yield takeEvery('REMOVE_TRIGGER', removeTrigger);
}

export default triggersSaga;
