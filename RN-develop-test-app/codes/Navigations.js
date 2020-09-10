import React, {Fragment} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';

import config from './pages/config.js';
import web from './pages/web.js';

const Stack = createStackNavigator();

const options = {
  header: ({scene, previous, navigation}) => {
    return null;
  },
};

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <StatusBar translucent={false} />
        <Stack.Navigator>
          <Stack.Screen name="config" component={config} options={options} />
          <Stack.Screen name="web" component={web} options={options} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state, props) => {
  return state;
};

export default connect(mapStateToProps)(App);
