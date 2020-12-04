import 'react-native-gesture-handler'; //U have to do this
import React from 'react';
import {Provider as AntdProvider} from '@ant-design/react-native';
import {Provider} from 'react-redux';
import store from './redux/store.js';

import Navigations from './Navigations.js';
import storage from './core/storage.js';
// import moment from 'moment';
// import 'moment/locale/zh-cn';
// moment.locale('zh-cn');

//////////////////初始化逻辑/////////////////////
//////////////////初始化逻辑/////////////////////

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <AntdProvider>
        <Navigations />
      </AntdProvider>
    </Provider>
  );
};

export default App;
