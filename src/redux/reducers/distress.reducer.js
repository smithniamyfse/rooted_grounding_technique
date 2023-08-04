const distressReducer = (state = { distressValue: 0 }, action) => {
    switch (action.type) {
      case 'SET_DISTRESS_VALUE':
        console.log('Setting distress value in Redux state:', action.payload);
        return {
          ...state,
          distressValue: action.payload,
        };
      default:
        return state;
    }
  };
  
export default distressReducer;

  
  
  

// ** VERSION 1 **
// const initialState = {
//   distressValue: 0,
// };

// const distressReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "SET_DISTRESS_VALUE":
//       return {
//         ...state,
//         distressValue: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default distressReducer;
