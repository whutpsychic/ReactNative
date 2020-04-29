import 'react-native-gesture-handler'; //U have to do this
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as AntdProvider} from '@ant-design/react-native';
import {Provider} from 'react-redux';
import store from './redux/store.js';

import Navigations from './Navigations.js';
import storage from './core/storage.js';

//////////////////初始化逻辑/////////////////////
//////////////////初始化逻辑/////////////////////

const App: () => React$Node = () => {
	return (
		<Provider store={store}>
			<AntdProvider>
				<NavigationContainer>
					<Navigations />
				</NavigationContainer>
			</AntdProvider>
		</Provider>
	);
};

export default App;
