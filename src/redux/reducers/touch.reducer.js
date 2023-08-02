const initialState = {
  touchData: [],
  error: null,
};

const touchReducer = (state = initialState, action) => {
  console.log("Inside touch reducer with action: ", action);
  switch (action.type) {
    case "FORM_SUBMIT_SUCCESS":
      if (action.payload.formName === "touch") {
        return {
          ...state,
          touchData: action.payload.data,
        };
      }
      return state;
    case "FORM_SUBMIT_FAILURE":
      return {
        ...state,
        error: action.payload.error,
      };
    case "ADD_TOUCH_DATA":
      return {
        ...state,
        touchData: [...state.touchData, action.payload],
      };
    case "SET_TOUCH_DATA":
      return {
        ...state,
        touchData: action.payload,
      };
    default:
      return state;
  }
};

export default touchReducer;
