import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// worker Saga: will be fired on "FETCH_SEE_ITEMS" actions
function* fetchSeeItems() {
    try {
        const response = axios.get("/api/forms");
        yield put ({ type: "SET_SEE_DATA", payload: response.data});
    } catch (error) {
        console.log("Error in see items GET request: ", error);
    }
}

function* addSeeItem(action) {
    try {
        console.log("Dispatching add see item action with payload:", action.payload);
        // change the url here to match your router.post() url
        const seeItemToAdd = yield axios.post("/api/forms/see", action.payload); // <=== CHANGED HERE
        yield put({ type: "FETCH_SEE_ITEMS" });
    } catch (error) {
        console.log("Error in adding see item: ", error);
    }
}


function* submitForm(action) {
    console.log("Inside submitForm saga with action:", action);
    try {
        const response = yield axios.post(`/api/forms/${action.payload.formName}`, action.payload.data);
        console.log("Response from form submit POST request:", response);
        yield put({ type: 'FORM_SUBMIT_SUCCESS', payload: { formName: action.payload.formName, data: response.data } });
    } catch (error) {
        console.log("Error in form submit POST request:", error);
        yield put({ type: 'FORM_SUBMIT_FAILURE', payload: { formName: action.payload.formName, error: error.message } });
    }
}

// function* formSaga() {
//     yield takeEvery('SUBMIT_FORM', submitForm);
// }

function* formSaga() {
    yield takeLatest("FETCH_SEE_ITEMS", fetchSeeItems);
    yield takeLatest("ADD_SEE_ITEM", addSeeItem);
    yield takeEvery('SUBMIT_FORM', submitForm);
}

export default formSaga;