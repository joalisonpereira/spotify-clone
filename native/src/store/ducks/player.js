import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  setPodcast: ['podcast', 'episodeId'],
  setPodcastSuccess: ['podcast'],
  setPodcastError: [],
  setCurrent: ['episodeId'],
  play: [],
  pause: [],
  next: [],
  prev: [],
  reset: []
}, { prefix: 'player/' });

const INITIAL_STATE = {
  podcast: null,
  current: null,
  playing: false
};

const setPodcast = (state, action) => ({
  ...state
})

const setPodcastSuccess = (state, action) => ({
  ...state,
  podcast: action.podcast,
  current: action.podcast.tracks[0].id,
})

const setPodcastError = (state, action) => ({
  ...state
})

const setCurrent = (state, action) => ({
  ...state, current: action.episodeId
})

const play = (state, action) => ({
  ...state, playing: true
})

const pause = (state, action) => ({
  ...state, playing: false
})

const next = (state, action) => ({
  ...state
})

const prev = (state, action) => ({
  ...state
})

const reset = (state, action) => ({
  ...INITIAL_STATE
})

export default createReducer(INITIAL_STATE, {
  [Types.SET_PODCAST]: setPodcast,
  [Types.SET_PODCAST_SUCCESS]: setPodcastSuccess,
  [Types.SET_PODCAST_ERROR]: setPodcastError,
  [Types.SET_CURRENT]: setCurrent,
  [Types.PLAY]: play,
  [Types.PAUSE]: pause,
  [Types.NEXT]: next,
  [Types.PREV]: prev,
  [Types.RESET]: reset
});
