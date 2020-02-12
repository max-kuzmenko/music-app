import { takeEvery, put, call, all } from 'redux-saga/effects';
import { fetchTracksByArtistId } from 'api/deezer/tracks'

import { fetchedTracksByArtistIdAction } from './actions';

import * as types from './actionTypes';


function* fetchTracksByArtistIdSaga(action) {
    try {
        const artistId = action.payload;
        const tracks = yield call(fetchTracksByArtistId, artistId);
        yield put(fetchedTracksByArtistIdAction({ artistId, tracks }));
    } catch (e) {
        console.log(e);
    }
}

function* sagas() {
    yield all([
        takeEvery(types.FETCH_TRACKS_BY_ARTIST, fetchTracksByArtistIdSaga),
    ])
}

export default sagas;
