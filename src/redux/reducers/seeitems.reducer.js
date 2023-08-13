
const seeItemsReducer = (state = [], action) => {
    switch (action.type) {
      case "SET_SEE_ITEMS":
        return action.payload;
      default:
        return state;
    }
  };

// The single item object - which is being edited - is stored here.
const seeItemToEdit = (state = {}, action) => {
  if (action.type === "SET_EDIT_SEE_ITEM") {
    // Represents the single see item object
    return action.payload;
  }
  if (action.type === "EDIT_SEE_ITEM") {
    // action.payload { property: 'see_item_#', value: 'Updated Item Name' }
    return {
      ...state,
      [action.payload.property]: action.payload.value,
    };
  }
  return state;
};

export { seeItemsReducer, seeItemToEdit };
