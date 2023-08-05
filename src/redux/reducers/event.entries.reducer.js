const eventEntriesReducer = (state = [], action) => {
    switch (action.type) {
      case "SET_EVENT_ENTRIES":
        return action.payload;
      case "ADD_EVENT_ENTRY":
        return [...state, action.payload];
      case "UPDATE_EVENT_ENTRY_SUCCESS":
        // Find the index of the entry with the id of the updated entry
        const index = state.findIndex((entry) => entry.id === action.payload.id);
        if (index !== -1) {
          // Replace the old entry with the updated entry in the state
          return [
            ...state.slice(0, index),
            action.payload,
            ...state.slice(index + 1),
          ];
        }
        return state;
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


