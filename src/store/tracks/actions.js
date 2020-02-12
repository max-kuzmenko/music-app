import { createAction } from 'store/utils';

import * as types from './actionTypes';


export const fetchTracksByArtistIdAction = artistId =>
    createAction(types.FETCH_TRACKS_BY_ARTIST, artistId);

export const fetchedTracksByArtistIdAction = ({ artistId, tracks }) =>
    createAction(types.FETCHED_TRACKS_BY_ARTIST, { artistId, tracks });
