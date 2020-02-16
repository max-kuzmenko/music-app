import { createAction } from 'store/utils';

import * as types from './actionTypes';


export const setIsPlayingAction = isPlaying => createAction(types.SET_IS_PALYING, isPlaying);
export const setVolumeLevelAction = volumeLevel => createAction(types.SET_VOLUME_LEVEL, volumeLevel);
export const setCurrentTimeAction = currentTime => createAction(types.SET_PLAYING_FROM, currentTime);
export const setPlaylistAction = playList => createAction(types.SET_PLAYLIST, playList);

export const playPlaylistTrackAction = trackIndex => createAction(types.PLAY_PLAYLIST_TRACK, trackIndex);
export const nextTrackAction = () => createAction(types.NEXT_TRACK);
export const prevTrackAction = () => createAction(types.PREV_TRACK);
