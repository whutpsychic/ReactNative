import 'react-native-gesture-handler'; //U have to do this
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import store from './redux/store.js';

import Navigations from './Navigations.js';

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <Navigations />
    </Provider>
  );
};

export default App;
