const initialState = {
    seeData: [],
    feelData: [],
    hearData: [],
    smellData: [],
    tasteData: [],
    intensityData: 0,
    error: null,
  };
  
  const inputsReducer = (state = initialState, action) => {
    console.log("Inside inputs reducer with action:", action);
    switch (action.type) {
      case "FORM_SUBMIT_SUCCESS":
        return {
          ...state,
          [action.payload.formName]: action.payload.data,
        };
      case "FORM_SUBMIT_FAILURE":
        return {
          ...state,
          error: action.payload.error,
        };
      case 'SET_SEE_DATA':
        return {
          ...state,
          seeData: action.payload,
        };
      case 'SET_FEEL_DATA':
        return {
          ...state,
          feelData: action.payload,
        };
      case 'SET_HEAR_DATA':
        return {
          ...state,
          hearData: action.payload,
        };
      case 'SET_SMELL_DATA':
        return {
          ...state,
          smellData: action.payload,
        };
      case 'SET_TASTE_DATA':
        return {
          ...state,
          tasteData: action.payload,
        };
      case 'SET_INTENSITY_DATA':
        return {
          ...state,
          intensityData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default inputsReducer;

