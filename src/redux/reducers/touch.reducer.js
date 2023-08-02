const touchReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TOUCH_DATA':
            return action.payload;
        case 'ADD_TOUCH_INPUT':
            return [...state, action.payload];
        default:
            return state;
    }
};

export default touchReducer;
