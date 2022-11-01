import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import './config/reactotron';

import GlobalStyle from './styles/global';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import ErrorBox from './components/ErrorBox';
import { Wrapper, Container, Content } from './styles/components';
import Router from './routes';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <Wrapper>
          <Container>
            <Sidebar />
            <Content>
              <ErrorBox />
              <Header />
              <Router />
            </Content>
          </Container>
          <Player />
        </Wrapper>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
