const eventEntriesReducer = (state = [], action) => {
    switch (action.type) {
      case "SET_EVENT_ENTRIES":
        return action.payload;
      case "ADD_EVENT_ENTRY":
        return [...state, action.payload];
      case "REMOVE_EVENT_ENTRY":
        return state.filter((entry) => entry.id !== action.payload);
      default:
        return state;
    }
  };
  
  // reducer to handle the current event id
  const currentEventIdReducer = (state = null, action) => {
    switch (action.type) {
      case "SET_CURRENT_EVENT_ID":
        return action.payload;
      default:
        return state;
    }
  };
  
  export { eventEntriesReducer, currentEventIdReducer };

  
// ** WORKING VERSION 1 ** 
// const eventEntriesReducer = (state = [], action) => {
//   switch (action.type) {
//     case "SET_EVENT_ENTRIES":
//       return action.payload;
//     case "ADD_EVENT_ENTRY":
//       return [...state, action.payload];
//     case "REMOVE_EVENT_ENTRY":
//       return state.filter((entry) => entry.id !== action.payload);
//     default:
//       return state;
//   }
// };

// export default eventEntriesReducer;
