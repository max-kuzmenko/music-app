import { createReducer } from 'store/utils';

import * as types from './actionTypes';


const initialState = {
    isPlaying: false,
    currentTime: 0,
    volumeLevel: 50,
    currentTrackIndex: 0,
    playlist: [],
};

const reduceObj = {
    [types.SET_IS_PALYING]: (state, isPlaying) => ({ isPlaying }),
    [types.SET_PLAYLIST]: (state, playlist) => ({ playlist }),
    [types.SET_VOLUME_LEVEL]: (state, volumeLevel) => ({ volumeLevel }),
    [types.SET_PLAYING_FROM]: (state, currentTime) => ({ currentTime }),

    [types.PLAY_PLAYLIST_TRACK]: (state, currentTrackIndex) => ({
        currentTrackIndex,
        isPlaying: true,
        currentTime: 0
    }),
    [types.NEXT_TRACK]: (state) => {
        const nextTrackIndex = state.currentTrackIndex + 1;

        if(nextTrackIndex > state.playlist.length - 1) {
            return { isPlaying: false };
        }

        return {
            currentTrackIndex: nextTrackIndex,
            currentTime: 0,
        };
    },
    [types.PREV_TRACK]: (state) => {
        const nextTrackIndex = state.currentTrackIndex - 1;

        if(nextTrackIndex < 0) return null;

        return {
            currentTrackIndex: nextTrackIndex,
            currentTime: 0,
        };
    }
};

export default createReducer(reduceObj, initialState);
