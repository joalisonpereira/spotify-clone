import { combineReducers } from 'redux';
import podcasts from './podcasts';
import player from './player';

const reducers = combineReducers({
  podcasts,
  player
});

export default reducers;
