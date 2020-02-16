
export const getCurrentTime = (state) => state.audioState.currentTime;
export const getIsPlaying = (state) => state.audioState.isPlaying;
export const getVolumeLevel = (state) => state.audioState.volumeLevel;

export const getCurrentTrackId = (state) => state.audioState.playlist[state.audioState.currentTrackIndex];
