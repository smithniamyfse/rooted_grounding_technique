const initialState = {
  seeData: [],
  error: null,
};

const hearReducer = (state = initialState, action) => {
  console.log("Inside hear reducer with action: ", action);
  switch (action.type) {
    case "FORM_SUBMIT_SUCCESS":
      if (action.payload.formName === "hear") {
        return {
          ...state,
          hearData: action.payload.data,
        };
      }
      return state;
    case "FORM_SUBMIT_FAILURE":
      return {
        ...state,
        error: action.payload.error,
      };
    case "ADD_HEAR_DATA":
      return {
        ...state,
        hearData: [...state.hearData, action.payload],
      };
    case "SET_HEAR_DATA":
      return {
        ...state,
        hearData: action.payload,
      };
    default:
      return state;
  }
};

export default hearReducer;
