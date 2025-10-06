import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import HomeScreen from './src/screens/Home';

const App = () => (
  <Provider store={store}>
    <HomeScreen />
  </Provider>
);

export default App;
