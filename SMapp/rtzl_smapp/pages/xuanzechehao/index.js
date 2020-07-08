import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {WebView} from 'react-native-webview';
import Tips from '../../components/Tips/index';
import api from '../../api/index';
import tool from '../../core/tool.js';
import {connect} from 'react-redux';
import {login} from '../../redux/actions.js';

const uri = 'file:///android_asset/h5/xuanzechehao/index.html';

class Default extends React.MyPage {
  onLoad() {}

  render() {
    return (
      <React.Fragment>
        <StatusBar barStyle={'dark-content'} />
        <View style={styles.container}>
          <WebView
            ref="webview"
            style={{flex: 1}}
            originWhitelist={['*']}
            source={{uri}}
            onMessage={this.onReceive}
          />
        </View>
        <Tips ref="tips" />
      </React.Fragment>
    );
  }

  postMessage = (obj) => {
    this.refs.webview.postMessage(JSON.stringify(obj));
  };

  onReceive = (event) => {
    const {
      navigation,
      navigation: {navigate},
    } = this.props;
    const receivedData = JSON.parse(event.nativeEvent.data);
    console.log(receivedData);
    //初始化
    if (
      receivedData.etype === 'pageState' &&
      receivedData.info === 'componentDidMount'
    ) {
      //初始化查询一次(按前一天到今天查)
      let arr = [
        tool.transDate(new Date().getTime() - 24 * 60 * 60 * 1000),
        tool.transDate(new Date().getTime()),
      ];
      const condition = {};
      condition.strStart = arr[0] + ` 00:00:00`;
      condition.strEnd = arr[1] + ` 23:59:59`;
      this.query(condition);
    }
    //查询及跳转
    if (receivedData.etype === 'query') {
      const {date} = receivedData;
      if (!date) {
        this.refs.tips.show('请先选择日期');
        return;
      } else {
        const arr = date.replace(/\//g, `-`).split(' 至 ');
        const condition = {};
        condition.strStart = arr[0] + ` 00:00:00`;
        condition.strEnd = arr[1] + ` 23:59:59`;
        this.query(condition);
      }
    }
    //确认
    else if (receivedData.etype === 'confirm') {
      //如果没选
      if (!receivedData.currentLine) {
        this.refs.tips.show('请选择一行数据');
        return;
      } else {
        //传回选择的车号
        const {
          currentLine,
          currentLine: {danjuhao, chengfang},
        } = receivedData;
        navigation.navigate('chukudan-detail', {
          chehao: currentLine.number,
          danjuhao,
          chengfang,
        });
      }
    }
    //手动确认
    else if (receivedData.etype === 'sdconfirm') {
      const {inputValue} = receivedData;
      if (!inputValue) {
        this.refs.tips.show('请手工录入车号');
        return;
      } else {
        navigation.navigate('chukudan-detail', {
          chehao: inputValue,
          danjuhao: '',
          chengfang: '',
        });
      }
    } else if (receivedData.etype === 'backbtn') {
      navigation.goBack();
    }
  };

  query = (condition) => {
    console.log(condition);
    this.postMessage({
      etype: 'data',
      loading: true,
    });
    return api
      .chooseCHEHAO(condition)
      .then((res) => {
        //查询完毕
        if (!res.length) {
          this.refs.tips.show('未能查到任何数据');
          this.postMessage({
            etype: 'data',
            loading: false,
          });
        } else {
          this.postMessage({
            etype: 'data',
            loading: false,
            data: res,
          });
        }
      })
      .catch((err) => {
        this.postMessage({
          etype: 'data',
          loading: false,
        });
        this.refs.tips.show('查询错误，请检查您的网络连接');
      });
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
