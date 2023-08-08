import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchSeeItems() {
  try {
    const response = yield axios.get("/api/see-inputs");
    yield put({ type: "SET_SEE_DATA", payload: response.data });
  } catch (error) {
    console.log("Error in see items GET request: ", error);
  }
}

function* addSeeData(action) {
  try {
    console.log(
      "Dispatching add see data action with payload: ",
      action.payload
    );
    yield axios.post("/api/see-inputs", action.payload);
    yield put({ type: "FETCH_SEE_ITEMS" });
  } catch (error) {
    console.log("Error in adding see data: ", error);
  }
}

function* seeInputsSaga() {
  yield takeLatest("FETCH_SEE_ITEMS", fetchSeeItems);
  yield takeLatest("ADD_SEE_DATA", addSeeData);
}

export default seeInputsSaga;






// ** OG WORKING VERSION BEFORE THE IMAGE MAP **
// import { put, takeLatest } from "redux-saga/effects";
// import axios from "axios";

// function* fetchSeeItems() {
//   try {
//     const response = yield axios.get("/api/see-inputs");
//     yield put({ type: "SET_SEE_DATA", payload: response.data });
//   } catch (error) {
//     console.log("Error in see items GET request: ", error);
//   }
// }

// function* addSeeData(action) {
//   try {
//     console.log(
//       "Dispatching add see data action with payload: ",
//       action.payload
//     );
//     yield axios.post("/api/see-inputs", action.payload);
//     yield put({ type: "FETCH_SEE_ITEMS" });
//   } catch (error) {
//     console.log("Error in adding see data: ", error);
//   }
// }

// function* seeInputsSaga() {
//   yield takeLatest("FETCH_SEE_ITEMS", fetchSeeItems);
//   yield takeLatest("ADD_SEE_DATA", addSeeData);
// }

// export default seeInputsSaga;
