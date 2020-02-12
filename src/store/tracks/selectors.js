import { createSelector } from 'reselect';


export const getTracksById = state => state.tracks.byId;

export const getTrackIdsByArtistId = state => state.tracks.trackIdsByArtistId;

export const getLoadingArtistId = state => state.tracks.loadingByArtistId;

const isPresent = self => self;

export const getTracksByArtistId = createSelector(
    [getTracksById, getTrackIdsByArtistId],
    (tracksById, trackIdsByArtistId) => {
        return Object.entries(trackIdsByArtistId).reduce((result, [artistId, trackIds]) => {
            result[artistId] = trackIds.map((id) => tracksById[id]).filter(isPresent);
            return result
        }, {});
    }
)
