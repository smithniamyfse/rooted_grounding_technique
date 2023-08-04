const topTriggersReducer = (state = [], action) => {
    switch (action.type) {
      case "SET_TOP_TRIGGERS":
        console.log("Data in reducer:", action.payload);
        return action.payload;
      default:
        return state;
    }
  };
  
  export default topTriggersReducer;
