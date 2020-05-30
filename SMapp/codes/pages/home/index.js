import React from 'react';
import {
  AppState,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {WebView} from 'react-native-webview';
import storage from '../../core/storage.js';
import {Provider, Modal} from '@ant-design/react-native';
import {connect} from 'react-redux';
import {login} from '../../redux/actions.js';
import moment from 'moment';

const uri = 'file:///android_asset/h5/home/index.html';

class Default extends React.MyPage {
  constructor() {
    super();
  }

  state = {
    showConfirm: false,
  };

  componentWillUnmount() {}

  onLoad() {}

  render() {
    const footerButtons = [
      {text: '取消', onPress: this.onCancel},
      {text: '确定', onPress: this.onConfirm},
    ];
    return (
      <React.Fragment>
        <StatusBar barStyle={'dark-content'} />
        <View style={styles.container}>
          <WebView
            ref="webview"
            style={{flex: 1}}
            originWhitelist={['*']}
            source={{uri}}
            // injectedJavaScript={patchPostMessageJsCode}
            onMessage={this.onReceive}
          />
        </View>
        <Modal
          transparent
          visible={this.state.showConfirm}
          footer={footerButtons}>
          <View style={{paddingVertical: 20}}>
            <Text style={{fontSize: 18, textAlign: 'center'}}>
              确认退出登录？
            </Text>
          </View>
        </Modal>
      </React.Fragment>
    );
  }

  onCancel = () => {
    this.setState({
      showConfirm: false,
    });
  };

  onConfirm = () => {
    //清除登录痕迹
    //清除登录状态
    let p1 = storage.setData('smapp_isLoggin', false),
      //清除用户ID，用户名
      p2 = storage.setData('smapp_userId', null);
    // p3 = storage.setData('userName', null),
    //密码
    // p4 = storage.setData('psw', null);

    Promise.all([p1, p2]).then(() => {
      const {
        navigation: {navigate},
        logout,
      } = this.props;
      logout();
      //关闭对话框
      this.setState(
        {
          showConfirm: false,
        },
        () => {
          //回退
          navigate('login');
        },
      );
    });
  };

  //监听页面事件变化
  onReceive = (e) => {
    const {
      navigation: {navigate},
    } = this.props;
    let receivedData = JSON.parse(e.nativeEvent.data);
    console.log(receivedData);
    //页面初始加载完毕时
    if (
      receivedData.etype === 'pageState' &&
      receivedData.info === 'componentDidMount'
    ) {
      //初始化加入用户名和时间
      storage.getData('smapp_userName').then((uname) => {
        let time = moment().format('YYYY年MM月DD日 HH:MM:SS');
        this.postMessage({
          etype: 'data',
          user: uname,
          time,
        });
      });
    }
    //点击拣配按钮
    else if (receivedData.etype === 'jianpei') {
      // alert('您点击了拣配按钮');
      navigate('chukudan-query');
    }
    //点击查询拣配单
    else if (receivedData.etype === 'jianpeidanQuery') {
      navigate('jianpeidan-query');
    }
    //点击退出登录
    else if (receivedData.etype === 'cancelLogin') {
      //确认？
      this.setState({
        showConfirm: true,
      });
    }
  };

  //往页面传数据
  postMessage = (obj) => {
    this.refs.webview.postMessage(JSON.stringify(obj));
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btn: {
    width: 100,
    height: 40,
    backgroundColor: '#389edc',
    marginTop: 40,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
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

const mapDispatchToProps = (dispatch, props) => {
  return {
    logout: () => {
      dispatch(login(false));
    },
  };
};

export default connect(null, mapDispatchToProps)(Default);
