import { createSelector } from "reselect/lib/index";

export const getArtistsById = (state) => state.artists.byId;
export const getSearchedArtistId = (state) => state.artists.searchedArtistId;
export const getLastSearches = (state) => state.artists.lastSearches;

export const getLastSearchedArtists = createSelector(
    [getArtistsById, getLastSearches],
    (artistsById, lastSearches) => {
        return lastSearches.map(artistId => artistsById[artistId]);
    }
);
