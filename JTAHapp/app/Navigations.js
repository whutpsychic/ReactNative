import React, {Fragment} from 'react';
import {StatusBar} from "react-native";
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
// =====================================
import Logo from './pages/logo/index';
import Login from './pages/login/index';
import Page1 from './pages/page1/index';
import Page2 from './pages/page2/index';
// =====================================

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    const {initializing, isLogin} = this.props;
    return (
      <Fragment>
        <StatusBar backgroundColor={'transparent'} translucent />
        <Stack.Navigator initialRouteName="page1" headerMode="none">
          {initializing ? (
            <Stack.Screen name="logo" component={Logo} />
          ) : isLogin ? (
            <Fragment>
              <Stack.Screen name="page1" component={Page1} />
              <Stack.Screen name="page2" component={Page2} />
            </Fragment>
          ) : (
            <Stack.Screen name="login" component={Login} />
          )}
        </Stack.Navigator>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return state;
};

export default connect(mapStateToProps)(App);
