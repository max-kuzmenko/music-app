import { createReducer, keyBy, uniq } from 'store/utils';

import * as types from './actionTypes';


const initialState = {
    byId: {},
    searchedArtistId: null,
    lastSearches: [],
};

const reduceObj = {
    [types.SET_SEARCHED_ARTIST]: (state, searchedArtistId) => ({
        lastSearches: uniq([searchedArtistId].concat(state.lastSearches)),
        searchedArtistId,
    }),
    [types.ADD_ARTISTS]: (state, artists) => ({
        byId: {
            ...state.byId,
            ...keyBy(artists, 'id'),
        }
    }),
};

export default createReducer(reduceObj, initialState);
