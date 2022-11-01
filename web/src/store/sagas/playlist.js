import { call, put } from 'redux-saga/effects';
import api from '../../services/api';

import { Creators as PlaylistActions } from '../ducks/playlist';
import { Creators as ErrorsActions } from '../ducks/errors';

export function* getPlaylist(action) {
  try {
    const { data } = yield call(api.get, `/playlists/${action.id}?_embed=songs`)
    yield put(PlaylistActions.getPlaylistSuccess(data))
  } catch (error) {
    yield put(ErrorsActions.setError('Falha na operação'))
  }
}