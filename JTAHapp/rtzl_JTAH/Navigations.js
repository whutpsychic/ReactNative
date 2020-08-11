import React, {Fragment} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {connect} from 'react-redux';
import ImageIcon from './navigation-styles/imageIcon.js';
import styles from './navigation-styles/style.js';
import config from './config/index';
// ===================================== //
import Logo from './pages/logo/index';
import Login from './pages/login/index';
// -------------------------------------------
import Home from './pages/main-home/index';
import Fix from './pages/main-fix/index';
import Query from './pages/main-query/index';
import Video from './pages/main-video/index';
import Mine from './pages/main-mine/index';
import Nav from './pages/nav/index';
// -------------------------------------------
import Stxfxx from './pages/stxfxx/index';
import Xfgl from './pages/xfgl/index';
import Yhpczl from './pages/yhpczl/index';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      tabBarOptions={{
        labelStyle: styles.menuLabel,
        style: {
          height: config.bottomTabHeight,
          paddingTop: config.bottomTabPaddingVertical,
          paddingBottom: config.bottomTabPaddingVertical,
        },
        activeTintColor: styles.menuTabActiveTintColor,
        activeBackgroundColor: styles.menuTabActiveBackgroundColor,
      }}>
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: '首页',
          tabBarIcon: ({focused}) => {
            return <ImageIcon name="home" focused={focused} badgeName="m1" />;
          },
        }}
      />
      <Tab.Screen
        name="fix"
        component={Fix}
        options={{
          tabBarLabel: '信息维护',
          tabBarIcon: ({focused}) => {
            return <ImageIcon name="fix" focused={focused} badgeName="m2" />;
          },
        }}
      />
      <Tab.Screen
        name="query"
        component={Query}
        options={{
          tabBarLabel: '信息查询',
          tabBarIcon: ({focused}) => {
            return <ImageIcon name="query" focused={focused} badgeName="m3" />;
          },
        }}
      />
      <Tab.Screen
        name="video"
        component={Video}
        options={{
          tabBarLabel: '视频监测',
          tabBarIcon: ({focused}) => {
            return <ImageIcon name="video" focused={focused} badgeName="m4" />;
          },
        }}
      />
      <Tab.Screen
        name="mine"
        component={Mine}
        options={{
          tabBarLabel: '个人中心',
          tabBarIcon: ({focused}) => {
            return <ImageIcon name="mine" focused={focused} badgeName="m5" />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

class App extends React.Component {
  render() {
    const {initializing, isLogin} = this.props;
    return (
      <NavigationContainer>
        <StatusBar translucent={false} />
        <Stack.Navigator initialRouteName="nav" headerMode="none">
          {initializing ? (
            <Stack.Screen name="logo" component={Logo} />
          ) : isLogin ? (
            <Fragment>
              <Stack.Screen name="nav" component={Nav} />
              <Stack.Screen name="main" component={BottomTabs} />
              <Stack.Screen name="stxfxx" component={Stxfxx} />
              <Stack.Screen name="xfgl" component={Xfgl} />
              <Stack.Screen name="yhpczl" component={Yhpczl} />
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
