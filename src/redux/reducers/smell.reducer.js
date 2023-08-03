const initialState = {
    smellData: [],
    error: null,
};

const smellReducer = (state = initialState, action) => {
    console.log("Inside smell reducer with action: ", action);
    switch (action.type) {
      case "FORM_SUBMIT_SUCCESS":
        if (action.payload.formName === "smell") {
          return {
            ...state,
            smellData: action.payload.data,
          };
        }
        return state;
      case "FORM_SUBMIT_FAILURE":
        return {
          ...state,
          error: action.payload.error,
        };
      case "ADD_SMELL_DATA":
        return {
          ...state,
          smellData: [...state.smellData, action.payload],
        };
      case "SET_SMELL_DATA":
        return {
          ...state,
          smellData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default smellReducer;