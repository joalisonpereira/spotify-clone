import { combineReducers } from 'redux';

import playlists from './playlists';
import playlist from './playlist';
import player from './player';
import errors from './errors';

const reducers = combineReducers({
  playlists,
  playlist,
  player,
  errors
});

export default reducers;
