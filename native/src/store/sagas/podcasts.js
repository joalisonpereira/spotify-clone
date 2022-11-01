import { takeLatest, put, call } from 'redux-saga/effects';
import { Types, Creators } from '../ducks/podcasts';
import api from '../../services/api';

function* fetchPodcasts() {
  try {
    const { data } = yield call(api.get, 'podcasts');
    yield put(Creators.fetchPodcastsSuccess(data));
  } catch (err) {
    console.tron.log("Error fetchPodcasts")
  }
}

export default [
  takeLatest(Types.FETCH_PODCASTS, fetchPodcasts),
]