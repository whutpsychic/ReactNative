import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {WebView} from 'react-native-webview';
import api from '../../api/index';
import Tips from '../../components/Tips/index';
import Toast from '../../components/ToastModule/index';

const uri = 'file:///android_asset/h5/chukudan-result/index.html';

class Default extends React.Component {
  componentDidMount() {}

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
            // injectedJavaScript={patchPostMessageJsCode}
            onMessage={this.onReceive}
          />
        </View>
        <Tips ref="tips" />
      </React.Fragment>
    );
  }

  postMessage = obj => {
    this.refs.webview.postMessage(JSON.stringify(obj));
  };

  onReceive = event => {
    const {
      navigation,
      navigation: {navigate},
    } = this.props;
    const receivedData = JSON.parse(event.nativeEvent.data);
    const {etype, info} = receivedData;
    if (etype === 'pageState' && info === 'componentDidMount') {
      //
      this.query();
    }
    //查询及跳转
    if (receivedData.etype === 'detail') {
      if (!receivedData.data) {
        this.refs.tips.show('您尚未选择一条有效数据');
        return;
      }
      navigate('chukudan-detail', {data: receivedData.data});
    } else if (receivedData.etype === 'refresh') {
      //再查询一遍
      this.postMessage({
        etype: 'data',
        loading: true,
      });
      this.query();
    } else if (receivedData.etype === 'backBtn') {
      navigation.goBack();
    }
  };

  //查询主表格
  query = () => {
    const {
      route: {params},
    } = this.props;

    //整理查询条件
    let _condition = {
      strStart: params.startDate,
      strEnd: params.endDate,
      strDeliveryNo: params.str,
      strStore: params.picker,
    };

    if (!params.str) _condition.strDeliveryNo = '';
    api
      .getCHUKUDAN(_condition)
      .then(res => {
        //
        if (res && res.length) {
          this.postMessage({
            etype: 'data',
            loading: false,
            data: res,
          });
        } else {
          this.postMessage({
            etype: 'data',
            loading: false,
          });
          // this.refs.tips.show('没有任何数据');
          Toast.show('没有任何数据');
        }
      })
      .catch(err => {
        console.log(err);
        //查询失败
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

export default Default;
