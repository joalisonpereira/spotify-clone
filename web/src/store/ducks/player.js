import Sound from 'react-sound';
import { createReducer, createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  loadSong: ['song', 'songs'],
  play: [],
  pause: [],
  prev: [],
  next: [],
  playing: ['event'],
  handlePosition: ['percent'],
  setPosition: ['percent'],
  setVolume: ['volume']
}, { prefix: 'player/' });

export const INITIAL_STATE = {
  currentSong: null,
  list: [],
  status: Sound.status.PLAYING,
  position: null,
  positionShown: null,
  duration: null,
  volume: 70
};

const loadSong = (state = INITIAL_STATE, action) => ({
  ...state,
  currentSong: action.song,
  list: action.songs,
  status: Sound.status.PLAYING
})

const play = (state = INITIAL_STATE) => ({
  ...state, status: Sound.status.PLAYING
})

const pause = (state = INITIAL_STATE) => ({
  ...state, status: Sound.status.PAUSED
})

const prev = (state = INITIAL_STATE) => {
  const currentIndex = state.list.findIndex(song => song.id === state.currentSong.id);
  const prev = state.list[currentIndex - 1];
  return prev ? { ...state, currentSong: prev, status: Sound.status.PLAYING, position: 0 } : state;
}

const next = (state = INITIAL_STATE) => {
  const currentIndex = state.list.findIndex(song => song.id === state.currentSong.id);
  const next = state.list[currentIndex + 1];
  return next ? { ...state, currentSong: next, status: Sound.status.PLAYING, position: 0 } : state;
}

const playing = (state = INITIAL_STATE, action) => ({
  ...state, position: action.event.position, duration: action.event.duration
})

const handlePosition = (state = INITIAL_STATE, action) => ({
  ...state, positionShown: state.duration * action.percent
})

const setPosition = (state = INITIAL_STATE, action) => ({
  ...state, position: state.duration * action.percent, positionShown: null
})

const setVolume = (state = INITIAL_STATE, action) => ({
  ...state, volume: action.volume
})

export default createReducer(INITIAL_STATE, {
  [Types.LOAD_SONG]: loadSong,
  [Types.PLAY]: play,
  [Types.PAUSE]: pause,
  [Types.NEXT]: next,
  [Types.PREV]: prev,
  [Types.PLAYING]: playing,
  [Types.HANDLE_POSITION]: handlePosition,
  [Types.SET_POSITION]: setPosition,
  [Types.SET_VOLUME]: setVolume
});
