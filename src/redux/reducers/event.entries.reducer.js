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

export default eventEntriesReducer;
