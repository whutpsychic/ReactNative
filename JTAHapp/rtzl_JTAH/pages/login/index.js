import React from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {connect} from 'react-redux';
import {login} from '../../redux/actions.js';
import Toast from '../../components/Toast/index';
import storage from '../../core/storage.js';
import api from '../../api/index';

const pageUri = 'file:///android_asset/h5/login/index.html';

class Default extends React.Component {
  state = {};

  componentDidMount() {}

  postMessage = (obj) => {
    this.refs.webview.postMessage(JSON.stringify(obj));
  };

  render() {
    return (
      <View style={styles.container}>
        <WebView
          ref="webview"
          source={{uri: pageUri}}
          onMessage={this.onReceive}
        />
      </View>
    );
  }

  onReceive = (event) => {
    const {
      navigation,
      navigation: {navigate},
    } = this.props;
    const receivedData = JSON.parse(event.nativeEvent.data);
    const {etype} = receivedData;
    console.log(receivedData);
    //初始化完成之后互通消息然后放置数据
    if (etype === 'pageState' && receivedData.info === 'componentDidMount') {
      storage.getData('jtah_userName').then((name) => {
        if (name && name !== 'null')
          this.postMessage({
            etype: 'data',
            name,
          });
      });

      storage.getData('jtah_psw').then((psw) => {
        if (psw && psw !== 'null')
          this.postMessage({
            etype: 'data',
            psw,
          });
      });
    }
    //
    else if (etype === 'login') {
      const {name, psw, rememberPsw} = receivedData;
      if (!name) {
        Toast.show('请输入用户名');
        return;
      }
      if (!psw) {
        Toast.show('请输入密码');
        return;
      }
      this.login({name, psw, rememberPsw});
    }
  };

  login = ({name, psw, rememberPsw}) => {
    console.log(name, psw, rememberPsw);
    const {login} = this.props;

    let p1, p2;

    api.login(name, psw).then((res) => {
      console.log(res);
      const {errcode, data} = res;
      //成功
      if (!errcode && data) {
        // 记住身份
        if (rememberPsw) {
          p1 = storage.setData('jtah_userName', name);
          p2 = storage.setData('jtah_psw', psw);
        } else {
          p1 = storage.setData('jtah_userName', null);
          p2 = storage.setData('jtah_psw', null);
        }

        Promise.all([p1, p2]).then((resArr) => {
          Toast.show('登录成功');
          login(true);
          initialized();
          return;
        });
      }
      // 超时
      // else if (!ok && status === 504) {
      //   login(false);
      //   initialized();
      //   Toast.show('登录超时，请稍后重试');
      //   return;
      // }

      // 错误
      else {
        Toast.show('登录错误，请检查用户名密码是否正确');
        login(false);
        initialized();
        return;
      }
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    login: (bool) => {
      dispatch(login(bool));
    },
  };
};

export default connect(null, mapDispatchToProps)(Default);
