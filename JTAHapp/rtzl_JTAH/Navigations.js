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
import Fix from './pages/main-fix/index';
import Home from './pages/main-home/index';
import Mine from './pages/main-mine/index';
import Query from './pages/main-query/index';
import Video from './pages/main-video/index';
import Nav from './pages/nav/index';
// -------------------------------------------
import danger_screening_administer from './pages/danger-screening-administer/index';
import dt_environment_protection_reports_list from './pages/dt-environment-protection-reports-list/index';
import ecology_repair_info from './pages/ecology-repair-info/index';
import fire_control_data_list from './pages/fire-control-data-list/index';
import fire_control_manage from './pages/fire-control-manage/index';
import safe_env_info_publish from './pages/safe-env-info-publish/index';
import safe_env_info_publish_adding from './pages/safe-env-info-publish-adding/index';
import safe_env_target_statistic from './pages/safe-env-target-statistic/index';
import safe_producing_calendar from './pages/safe-producing-calendar/index';
import news_approval from './pages/news-approval/index';
import news_overview from './pages/news-overview/index';

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
              <Stack.Screen
                name="danger_screening_administer"
                component={danger_screening_administer}
              />
              <Stack.Screen
                name="dt_environment_protection_reports_list"
                component={dt_environment_protection_reports_list}
              />
              <Stack.Screen
                name="ecology_repair_info"
                component={ecology_repair_info}
              />
              <Stack.Screen
                name="fire_control_data_list"
                component={fire_control_data_list}
              />
              <Stack.Screen
                name="fire_control_manage"
                component={fire_control_manage}
              />
              <Stack.Screen
                name="safe_env_info_publish"
                component={safe_env_info_publish}
              />
              <Stack.Screen
                name="safe_env_info_publish_adding"
                component={safe_env_info_publish_adding}
              />
              <Stack.Screen
                name="safe_env_target_statistic"
                component={safe_env_target_statistic}
              />
              <Stack.Screen
                name="safe_producing_calendar"
                component={safe_producing_calendar}
              />
              <Stack.Screen name="news_approval" component={news_approval} />
              <Stack.Screen name="news_overview" component={news_overview} />
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
