import { createReducer, createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  setError: ['message'],
  hideError: []
}, { prefix: 'errors/' });

const INITIAL_STATE = {
  message: null,
  visible: false
};

const setError = (state = INITIAL_STATE, action) => ({
  ...state, visible: true, message: action.message
});

const hideError = (state = INITIAL_STATE, action) => ({
  ...state, visible: false
});

export default createReducer(INITIAL_STATE, {
  [Types.SET_ERROR]: setError,
  [Types.HIDE_ERROR]: hideError
});
