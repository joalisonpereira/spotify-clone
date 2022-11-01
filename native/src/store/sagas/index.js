import { all } from 'redux-saga/effects';
import podcasts from './podcasts';
import player from './player';

export default function* rootSaga() {
  yield all([
    ...player,
    ...podcasts,
  ]);
}
