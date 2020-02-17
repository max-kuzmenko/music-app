import { createStore, combineReducers, applyMiddleware } from 'redux';
import { all } from 'redux-saga/effects';

import createSagaMiddleware from 'redux-saga';

import { saveState, restoreState } from 'store/utils';

import tracksReducer from './tracks/reducer';
import audioStateReducer from './audioState/reducer';
import artistsReducer from './artists/reducer';

import tracksSagas from './tracks/sagas';


const reducer = combineReducers({
    tracks: tracksReducer,
    artists: artistsReducer,
    audioState: audioStateReducer,
})

const sagaMiddleware = createSagaMiddleware();
const restoredState = restoreState();

const store = createStore(
    reducer,
    restoredState,
    applyMiddleware(sagaMiddleware),
);

store.subscribe(() => saveState(store.getState()));

function* rootSaga() {
    yield all([
        tracksSagas(),
    ])
}

sagaMiddleware.run(rootSaga)

export default store;
