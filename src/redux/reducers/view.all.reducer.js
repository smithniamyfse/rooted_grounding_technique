// Reducer for handling a new action type (e.g., 'SET_VIEW_ALL_ENTRIES')
// When this action is dispatched, the reducer would update its state with the payload of the action.
const viewAllReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_VIEW_ALL_ENTRIES":
      return action.payload;
    default:
      return state;
  }
};

const selectedEntry = (state = {}, action) => {
    switch (action.type) {
      case "SET_EVENT_DETAILS":
        return action.payload;
      default:
        return state;
    }
  };

export { viewAllReducer, selectedEntry };
