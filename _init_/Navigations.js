import React, {Fragment} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
// ===================================== //
import Logo from './pages/logo/index';
import Login from './pages/login/index';
// -------------------------------------------
import Home from './pages/home/index';
import xxxxxxxxxxxxxxxxxxx from './pages/xxxxxxxxxxxxxxxxxxx/index';

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    const {initializing, isLogin} = this.props;
    return (
      <NavigationContainer>
        <StatusBar translucent={false} />
        <Stack.Navigator initialRouteName="home" headerMode="none">
          {initializing ? (
            <Stack.Screen name="logo" component={Logo} />
          ) : isLogin ? (
            <Fragment>
              <Stack.Screen name="home" component={Home} />
              <Stack.Screen name="page1" component={Page1} />
            </Fragment>
          ) : (
            <Stack.Screen name="login" component={Login} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state, props) => {
  return state;
};

export default connect(mapStateToProps)(App);
