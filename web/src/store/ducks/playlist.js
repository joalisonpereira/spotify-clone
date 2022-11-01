import { createReducer, createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getPlaylist: ['id'],
  getPlaylistSuccess: ['data']
}, { prefix: 'playlist/' });

const INITIAL_STATE = {
  data: {},
  loading: false
};

const getPlaylist = (state = INITIAL_STATE, action) => ({
  ...state, loading: true
});

const getPlaylistSuccess = (state = INITIAL_STATE, action) => ({
  ...state, loading: false, data: action.data
});

export default createReducer(INITIAL_STATE, {
  [Types.GET_PLAYLIST]: getPlaylist,
  [Types.GET_PLAYLIST_SUCCESS]: getPlaylistSuccess
});
