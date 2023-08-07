import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* submitDistressValue(action) {
  try {
    yield axios.put(`/api/event-entries/distress-rating`, action.payload);
    yield put({ type: "SUBMIT_DISTRESS_VALUE_SUCCESS" });
  } catch (error) {
    console.log("Error submitting distress value: ", error);
    yield put({ type: "SUBMIT_DISTRESS_VALUE_FAIL", error });
  }
}

function* distressSaga() {
  yield takeLatest("SUBMIT_DISTRESS_VALUE", submitDistressValue);
}

export default distressSaga;







// ** VERSION 2 **
// import { takeLatest, put } from 'redux-saga/effects';
// import axios from 'axios';

// function* submitDistressValue(action) {
//     try {
//       console.log("Dispatched SUBMIT_DISTRESS_VALUE action");
//       yield axios.put(`/api/event-entries/distress-rating/${action.payload.eventId}`, {
//         value: action.payload.value,
//       });
//       console.log("Successfully sent distress value update request");
//     } catch (error) {
//       console.error("Error in submitting distress value", error);
//     }
//   }
  
//   function* setDistressValue(action) {
//     console.log("Dispatched SET_DISTRESS_VALUE action");
//     yield put({
//       type: "SET_DISTRESS_VALUE",
//       payload: action.payload.value,
//     });
//   }
  
//   function* distressRatingSaga() {
//     yield takeLatest("SUBMIT_DISTRESS_VALUE", submitDistressValue);
//     yield takeLatest("SET_DISTRESS_VALUE", setDistressValue);
//   }
  
//   export default distressRatingSaga;
  




// function* setDistressValue(action) {
//   try {
//     console.log(
//       "Dispatching setDistress value action with payload: ",
//       action.payload
//     );
//     yield axios.post(
//       `/api/event-entries/distress-rating/${action.payload.eventId}`,
//       {
//         distressValue: action.payload.value,
//         eventId: action.payload.eventId,
//       }
//     );
//   } catch (error) {
//     console.error("Error in setting distress value", error);
//   }
// }


// ** VERSION 1 **
// import { takeLatest } from "redux-saga/effects";
// import axios from "axios";

// function* submitDistressValue(action) {
//     try {
//       const response = yield axios.post("/api/event-entries/distress-rating", action.payload);
//       yield put({ type: 'SET_DISTRESS_VALUE', payload: action.payload.value });
//     } catch (error) {
//       console.log("Error in submitting distress value", error);
//     }
//   }

// function* setDistressValue(action) {
//     try {
//       console.log("Dispatching setDistress value action with payload: ", action.payload);
//       yield axios.post(`/api/event-entries/distress-rating/${action.payload.id}`, { distressValue: action.payload.value });
//     } catch (error) {
//       console.log("Error in setting distress value", error);
//     }
//   }

// function* distressRatingSaga() {
//     yield takeLatest('SUBMIT_DISTRESS_VALUE', submitDistressValue);
//     yield takeLatest('SET_DISTRESS_VALUE', setDistressValue);
// }

// export default distressRatingSaga;
