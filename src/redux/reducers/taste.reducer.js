const initialState = {
    tasteData: [],
    error: null,
};

const tasteReducer = (state = initialState, action) => {
    console.log("Inside taste reducer with action: ", action);
    switch (action.type) {
      case "FORM_SUBMIT_SUCCESS":
        if (action.payload.formName === "taste") {
          return {
            ...state,
            tasteData: action.payload.data,
          };
        }
        return state;
      case "FORM_SUBMIT_FAILURE":
        return {
          ...state,
          error: action.payload.error,
        };
      case "ADD_TASTE_DATA":
        return {
          ...state,
          tasteData: [...state.tasteData, action.payload],
        };
      case "SET_TASTE_DATA":
        return {
          ...state,
          tasteData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default tasteReducer;