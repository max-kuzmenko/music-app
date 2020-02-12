import { createReducer, keyBy } from 'store/utils';

import * as types from './actionTypes';


const initialState = {
    byId: {},
    searchedArtistId: null,
};

const reduceObj = {
    [types.SET_SEARCHED_ARTIST]: (state, searchedArtistId) => ({ searchedArtistId }),
    [types.ADD_ARTISTS]: (state, artists) => ({
        byId: {
            ...state.byId,
            ...keyBy(artists, 'id'),
        }
    }),
};

export default createReducer(reduceObj, initialState);
