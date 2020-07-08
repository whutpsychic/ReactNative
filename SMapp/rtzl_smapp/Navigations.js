import React, {Fragment} from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
// =====================================
import Logo from './pages/logo/index';
import Login from './pages/login/index';
import Scanning from './pages/scanning/index';
import Chukudan_detail from './pages/chukudan-detail/index';
import Chukudan_query from './pages/chukudan-query/index';
import Chukudan_result from './pages/chukudan-result/index';
import Home from './pages/home/index';
import Jianpeidan_detail from './pages/jianpeidan-detail/index';
import Jianpeidan_query from './pages/jianpeidan-query/index';
import Jianpeidan_result from './pages/jianpeidan-result/index';
import Scan_result from './pages/scan-result/index';
import Scan_result_text from './pages/scan-result-text/index';
import Xuanzechehao from './pages/xuanzechehao/index';
import Shoudong_negative from './pages/shoudong-negative/index';
// =====================================

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    const {initializing, isLogin} = this.props;
    return (
      <Fragment>
        <StatusBar backgroundColor={'transparent'} translucent={false} />
        <Stack.Navigator initialRouteName="home" headerMode="none">
          {initializing ? (
            <Stack.Screen name="logo" component={Logo} />
          ) : isLogin ? (
            <Fragment>
              <Stack.Screen name="home" component={Home} />
              <Stack.Screen
                name="chukudan-detail"
                component={Chukudan_detail}
              />
              <Stack.Screen name="chukudan-query" component={Chukudan_query} />
              <Stack.Screen
                name="chukudan-result"
                component={Chukudan_result}
              />
              <Stack.Screen
                name="jianpeidan-detail"
                component={Jianpeidan_detail}
              />
              <Stack.Screen
                name="jianpeidan-query"
                component={Jianpeidan_query}
              />
              <Stack.Screen
                name="jianpeidan-result"
                component={Jianpeidan_result}
              />
              <Stack.Screen name="scan-result-text" component={Scan_result_text} />
              <Stack.Screen name="scan-result" component={Scan_result} />
              <Stack.Screen name="xuanzechehao" component={Xuanzechehao} />
              <Stack.Screen name="scanning" component={Scanning} />
              <Stack.Screen name="shoudong-negative" component={Shoudong_negative} />
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
