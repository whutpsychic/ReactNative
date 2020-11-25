import React, {Fragment} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
// ===================================== //
import Logo from './pages/logo/index';
// -------------------------------------------
import Nav from './pages/nav/index';
import nav_web from './pages/nav_web/index';
import nav_rn from './pages/nav_rn/index';

// web-components
import web_TopTitle from './pages/web_TopTitle/index';
import web_ListView from './pages/web_ListView/index';
import web_List from './pages/web_List/index';

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    const {initializing} = this.props;
    return (
      <NavigationContainer>
        <StatusBar translucent={false} />
        <Stack.Navigator initialRouteName="home" headerMode="none">
          {initializing ? (
            <Stack.Screen name="logo" component={Logo} />
          ) : (
            <Fragment>
              <Stack.Screen name="nav" component={Nav} />
              <Stack.Screen name="web" component={nav_web} />
              <Stack.Screen name="rn" component={nav_rn} />
              <Stack.Screen name="web_TopTitle" component={web_TopTitle} />
              <Stack.Screen name="web_ListView" component={web_ListView} />
              <Stack.Screen name="web_List" component={web_List} />
            </Fragment>
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
