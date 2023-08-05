import axios from 'axios';
import { put, takeLatest } from "redux-saga/effects";

// Saga for handling a new action type (e.g., 'FETCH_ALL_ENTRIES')
// When this action is dispatched, the saga will send a GET request to /api/view-all, 
// then dispatch another action to save the response data in the Redux store.
function* fetchViewAllEntries() {
    try {
        const response = yield axios.get('/api/view-all');
        yield put({ type: 'SET_VIEW_ALL_ENTRIES', payload: response.data });
    } catch (error) {
        console.log('Error GETting view all entries in saga: ', error);
    }
}

function* viewAllEntriesSaga() {
    yield takeLatest('FETCH_VIEW_ALL_ENTRIES', fetchViewAllEntries);
}

export default viewAllEntriesSaga;