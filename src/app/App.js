import React from 'react';
import { Provider } from 'react-redux';
import ConfigureStore from '../Store';
import Router from './Router';
import './App.css';

const store = ConfigureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
