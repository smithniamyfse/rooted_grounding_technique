const seeItemsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_SEE_ITEMS':
        return action.payload;
      default:
        return state;
    }
  };
  
export default seeItemsReducer; 
  