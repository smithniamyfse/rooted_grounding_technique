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
    // 'FETCH_TRIGGERS': This will activate a GET REQUEST to /api/triggers to fetch all the triggers. 
        // The triggers will then be stored in the state via a 'SET_TRIGGERS' action. 
    yield takeEvery('FETCH_TRIGGERS', fetchTriggers);

    // 'ADD_TRIGGER': This will activate a POST REQUEST to /api/triggers to add a new trigger.
        // The new trigger will be added to the state via an 'ADD_TRIGGER' action. 
    yield takeEvery('ADD_TRIGGER', addTrigger);

    // 'REMOVE_TRIGGER': This will activate a DELETE REQUEST to /api/triggers/:id to remove a trigger.
        // The trigger will be removed from the state via a 'REMOVE_TRIGGER' action. 
    yield takeEvery('REMOVE_TRIGGER', removeTrigger);
}

export default triggersSaga;
