const initialState = {
    seeData: [],
    error: null,
  };
  
  const seeReducer = (state = initialState, action) => {
    console.log("Inside see reducer with action:", action);
    switch (action.type) {
      case "FORM_SUBMIT_SUCCESS":
        if (action.payload.formName === "see") {
          return {
            ...state,
            seeData: action.payload.data,
          };
        }
        return state;
      case "FORM_SUBMIT_FAILURE":
        return {
          ...state,
          error: action.payload.error,
        };
      case "ADD_SEE_DATA":
        return {
          ...state,
          seeData: [...state.seeData, action.payload],
        };
      case "SET_SEE_DATA":
        return {
          ...state,
          seeData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default seeReducer;
  