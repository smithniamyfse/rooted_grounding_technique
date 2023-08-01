const imageReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_USER_IMAGE":
      return [...state, action.payload];
    case "SET_USER_IMAGE":
      return action.payload;
    case "CLEAR_IMAGES":
      return [];
    default:
      return state;
  }
};

export default imageReducer;
