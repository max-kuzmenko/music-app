import { createReducer } from 'store/utils';

import * as types from './actionTypes';


const initialState = {
    isPlaying: false,
    currentTrackId: null,
    playingFromPercent: 0,
    upNextTracks: [],
};

const reduceObj = {
    [types.SET_IS_PALYING]: (state, isPlaying) => ({ isPlaying }),
    [types.SET_UP_NEXT_TRACKS]: (state, upNextTracks) => ({ upNextTracks }),
    [types.SET_PLAYING_FROM]: (state, playingFromPercent) => ({ playingFromPercent }),

    [types.PLAY_TRACK]: (state, trackId) => ({
        currentTrackId: trackId,
        isPlaying: true,
        playingFromPercent: 0
    }),
    [types.NEXT_TRACK]: (state) => {
        const currentTrackId = state.upNextTracks[0];
        if(!currentTrackId) return { isPlaying: false };

        const upNextTracks = state.upNextTracks.slice(1);

        return {
            currentTrackId,
            upNextTracks,
            playingFromPercent: 0,
        };
    }
};

export default createReducer(reduceObj, initialState);
