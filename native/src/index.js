import './config/Reactotron';
import './config/StatusBar';

import React from 'react';
import { Provider } from 'react-redux';
import Player from './components/Player';
import Router from './routes';
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <Router />
      <Player />
    </Provider>
  );
}
