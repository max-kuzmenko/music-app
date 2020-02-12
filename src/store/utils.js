
export const createReducer = (reduceObj, initialState) => {
    return (state = initialState, action) => {
        const actionHandler = reduceObj[action.type];
        if(actionHandler) return { ...state, ...actionHandler(state, action.payload) };
        return state;
    };
}

export const keyBy = (arr, prop) => {
    return arr.reduce((result, item) => {
        result[item[prop]] = item;
        return result;
    }, {});
}

export const createAction = (type, payload) => ({
    type,
    payload,
})
