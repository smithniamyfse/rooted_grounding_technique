import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchSeeItems() {
    try {
        const response = yield axios.get("/api/see-inputs");
        yield put ({ type: "SET_SEE_DATA", payload: response.data});
    } catch (error) {
        console.log("Error in see items GET request: ", error);
    }
}

function* addSeeItem(action) {
    try {
        console.log("Dispatching add see item action with payload:", action.payload);
        yield axios.post("/api/see-inputs", action.payload);
        yield put({ type: "FETCH_SEE_ITEMS" });
    } catch (error) {
        console.log("Error in adding see item: ", error);
    }
}

function* seeInputsSaga() {
    yield takeLatest("FETCH_SEE_ITEMS", fetchSeeItems);
    yield takeLatest("ADD_SEE_ITEM", addSeeItem);
}

export default seeInputsSaga;

