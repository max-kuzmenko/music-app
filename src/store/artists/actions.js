import { createAction } from 'store/utils';

import * as types from './actionTypes';


export const addArtistsAction = artists => createAction(types.ADD_ARTISTS, artists);
export const setSearchedArtistAction = searchedArtistId => createAction(types.SET_SEARCHED_ARTIST, searchedArtistId);
