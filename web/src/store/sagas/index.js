import { all, takeLatest } from 'redux-saga/effects';
import { Types as PlaylistsTypes } from '../ducks/playlists';
import { Types as PlaylistTypes } from '../ducks/playlist';
import * as PlaylistsSagas from './playlists';
import * as PlaylistSagas from './playlist';

export default function* rootSaga() {
  yield all([
    takeLatest(PlaylistsTypes.GET_PLAYLISTS, PlaylistsSagas.getPlaylists),
    takeLatest(PlaylistTypes.GET_PLAYLIST, PlaylistSagas.getPlaylist)
  ]);
}
