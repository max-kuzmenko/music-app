import { createAction } from 'store/utils';

import * as types from './actionTypes';


export const setIsPlayingAction = isPlaying => createAction(types.SET_IS_PALYING, isPlaying);
export const setPlayingFromPercentAction = playingFrom => createAction(types.SET_PLAYING_FROM, playingFrom);
export const setUpNextTracksAction = playingFrom => createAction(types.SET_UP_NEXT_TRACKS, playingFrom);

export const playTrackAction = trackId => createAction(types.PLAY_TRACK, trackId);
export const nextTrackAction = () => createAction(types.NEXT_TRACK);
