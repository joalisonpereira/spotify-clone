import { createReducer, createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getPlaylists: [],
  getPlaylistsSuccess: ['data']
}, { prefix: 'playlists/' });

const INITIAL_STATE = {
  data: [],
  loading: false
};

const getPlaylists = (state = INITIAL_STATE, action) => ({
  ...state, loading: true
});

const getPlaylistsSuccess = (state = INITIAL_STATE, action) => ({
  ...state, loading: false, data: action.data
});

export default createReducer(INITIAL_STATE, {
  [Types.GET_PLAYLISTS]: getPlaylists,
  [Types.GET_PLAYLISTS_SUCCESS]: getPlaylistsSuccess
});
