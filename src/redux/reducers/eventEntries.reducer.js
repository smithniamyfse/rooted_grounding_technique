const eventEntriesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TRIGGERS':
            return action.payload;
        case 'ADD_TRIGGER':
            return [...state, action.payload];
        case 'REMOVE_TRIGGER':
            return state.filter(trigger => trigger.id !== action.payload);
        default:
            return state;
    }
};

export default eventEntriesReducer; 