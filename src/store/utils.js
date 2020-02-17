
const STORE_KEY = 'app_state';

export const restoreState = () => {
    try {
        const restoredStateJSON = localStorage.getItem(STORE_KEY);
        if(restoredStateJSON === null) return undefined;
        return JSON.parse(restoredStateJSON);
    } catch (e) {
        return undefined;
    }
}

export const saveState = (state) => {
    try {
        const stateJSON = JSON.stringify(state);
        localStorage.setItem(STORE_KEY, stateJSON);
    } catch (e) {
        console.error(e);
    }
}

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

export const uniq = arr => {
    return arr.reduce((result, item) => {
        if(result.includes(item)) return result;
        return result.concat(item)
    }, []);
}

export const createAction = (type, payload) => ({
    type,
    payload,
})
