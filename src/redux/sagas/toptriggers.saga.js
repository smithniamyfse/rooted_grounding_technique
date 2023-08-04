// function* fetchTopTriggers() {
//     try {
//       const response = yield axios.get('/api/event-entries/top-triggers');
//       yield put({ type: 'SET_TOP_TRIGGERS', payload: response.data });
//     } catch (error) {
//       console.error('Error fetching top triggers:', error);
//     }
//   }
  
  
//   function* userEventEntriesSaga() {
//     yield takeEvery('FETCH_TOP_TRIGGERS', fetchTopTriggers);
//   }
  
