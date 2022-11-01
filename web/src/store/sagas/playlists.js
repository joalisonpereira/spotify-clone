import { call, put } from 'redux-saga/effects';
import api from '../../services/api';

import { Creators as PlaylistsActions } from '../ducks/playlists';
import { Creators as ErrorsActions } from '../ducks/errors';

export function* getPlaylists() {
  try {
    const { data } = yield call(api.get, '/playlists')
    yield put(PlaylistsActions.getPlaylistsSuccess(data))
  } catch (error) {
    yield put(ErrorsActions.setError('Falha na operação'))
  }
}