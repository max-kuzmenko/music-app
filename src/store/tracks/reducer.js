import { createReducer, keyBy } from 'store/utils';

import * as types from './actionTypes';


const initialState = {
    byId: {},
    trackIdsByArtistId: {},
    loadingByArtistId: {},
};

const reduceObj = {
    [types.FETCH_TRACKS_BY_ARTIST]: (state, artistId) => ({
        loadingByArtistId: {
            ...state.loadingByArtistId,
            [artistId]: true,
        }
    }),
    [types.FETCHED_TRACKS_BY_ARTIST]: (state, { tracks, artistId }) => ({
        loadingByArtistId: {
            ...state.loadingByArtistId,
            [artistId]: false,
        },
        trackIdsByArtistId: {
            ...state.trackIdsByArtistId,
            [artistId]: tracks.map(({ id }) => id).concat(state.trackIdsByArtistId[artistId] || []),
        },
        byId: {
            ...state.byId,
            ...keyBy(tracks, 'id'),
        }
    }),
};

export default createReducer(reduceObj, initialState);
