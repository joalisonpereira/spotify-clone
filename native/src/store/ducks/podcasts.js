import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  fetchPodcasts: [],
  fetchPodcastsSuccess: ['podcasts'],
  fetchPodcastsError: [],
}, { prefix: 'podcasts/' });

const INITIAL_STATE = {
  data: []
};

const fetchPodcasts = (state, action) => ({
  ...state
})

const fetchPodcastsSuccess = (state, action) => ({
  ...state, data: action.podcasts
})

const fetchPodcastsError = (state, action) => ({
  ...state
})

export default createReducer(INITIAL_STATE, {
  [Types.FETCH_PODCASTS]: fetchPodcasts,
  [Types.FETCH_PODCASTS_SUCCESS]: fetchPodcastsSuccess,
  [Types.FETCH_PODCASTS_ERROR]: fetchPodcastsError,
});
