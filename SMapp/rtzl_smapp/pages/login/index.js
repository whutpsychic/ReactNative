import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
import {login} from '../../redux/actions.js';

import {WebView} from 'react-native-webview';
import {translate} from '../../tools/index.js';
import api from '../../api/index';
import storage from '../../core/storage.js';
import {Provider, Modal} from '@ant-design/react-native';
import Toast from '../../components/ToastModule/index';
import config from '../../config.js';

const url = 'file:///android_asset/h5/login/index.html';

class Default extends React.Component {
  state = {
    showTips: false,
    tipsText: '',
  };

  componentDidMount() {
    const debuging = config.mode == 'debug';

    if (debuging) {
      this.showTips({
        tipsText: '登陆中',
      });
      api
        .login({uname: config.test_username, pwd: config.test_psw})
        .then((res) => {
          alert(JSON.stringify(res));
          if (res.USER_ID) {
            //记录登录状态
            storage.setData('smapp_isLoggin', true);
            //记录用户ID，用户名
            storage.setData('smapp_userId', res.USER_ID);
            storage.setData('smapp_userName', res.USER_NAME);

            //跳转
            this.jumpToMain();
            Toast.show('登陆成功');
          } else {
            this.postMessage({etype: 'data', errmsg: '用户名或密码错误'});
          }
          this.setState({
            showTips: false,
          });
        })
        .catch((err) => {
          this.postMessage({etype: 'data', errmsg: '用户名或密码错误'});
          this.setState({
            showTips: false,
          });
        });
    }
  }

  render() {
    return (
      <React.Fragment>
        <StatusBar barStyle="light-content" translucent={true} />
        <WebView ref="webview" source={{uri: url}} onMessage={this.onReceive} />
        <Modal
          // title={this.state.tipsTitle}
          transparent
          visible={this.state.showTips}>
          <View style={{paddingVertical: 20}}>
            <Text style={{fontSize: 18, textAlign: 'center'}}>
              {this.state.tipsText}
            </Text>
          </View>
        </Modal>
      </React.Fragment>
    );
  }

  showTips = ({tipsTitle, tipsText}) => {
    this.setState({
      showTips: true,
      tipsTitle,
      tipsText,
    });
  };

  //监听页面事件变化
  onReceive = (e) => {
    let receivedData = JSON.parse(e.nativeEvent.data);
    //页面初始加载完毕时
    if (
      receivedData.etype === 'pageState' &&
      receivedData.info === 'componentDidMount'
    ) {
      //自动填写上次登陆的用户名密码
      // let p1 = storage.getData('smapp_userName');
      // let p2 = storage.getData('smapp_psw');
      // Promise.all([p1, p2]).then(res => {
      //   this.postMessage({etype: 'data', userName: res[0], psw: res[1]});
      // });
    } else if (receivedData.etype === 'cancel') {
      //强制报错退出
      alert(zbc);
    }
    //如果是点击登录按钮
    else if (receivedData.etype === 'login') {
      this.showTips({
        tipsText: '登陆中',
      });
      api
        .login({uname: receivedData.userName, pwd: receivedData.psw})
        .then((res) => {
          console.log(res);
          if (res.USER_ID) {
            //记录登录状态
            storage.setData('smapp_isLoggin', true);
            //记录用户ID，用户名
            storage.setData('smapp_userId', res.USER_ID);
            storage.setData('smapp_userName', res.USER_NAME);
            //记住密码
            storage.setData('smapp_psw', receivedData.psw);

            //跳转
            this.jumpToMain();
            Toast.show('登陆成功');
          } else {
            this.postMessage({etype: 'data', errmsg: '用户名或密码错误'});
          }
          this.setState({
            showTips: false,
          });
        })
        .catch((err) => {
          console.warn(err);
          this.postMessage({etype: 'data', errmsg: '用户名或密码错误'});
          this.setState({
            showTips: false,
          });
        });
    }
  };

  //往页面传数据
  postMessage = (obj) => {
    this.refs.webview.postMessage(JSON.stringify(obj));
  };

  jumpToMain = () => {
    const {login} = this.props;
    login();
  };
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    login: () => {
      dispatch(login(true));
    },
  };
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
  },
});

export default connect(null, mapDispatchToProps)(Default);
