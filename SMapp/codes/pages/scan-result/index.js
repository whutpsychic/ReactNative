import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {Modal} from '@ant-design/react-native';
import storage from '../../core/storage.js';
import api from '../../api/index.js';
import Tips from '../../components/Tips/index';

const uri = 'file:///android_asset/h5/scan-result/index.html';

const takeItout = (arr, item) => {
  let resultIndex = arr.findIndex(_item => {
    return _item.barcode === item.barcode;
  });
  //将之剔除出去
  arr.splice(resultIndex, 1);
};

class Default extends React.Component {
  state = {
    existDatabar: [],
    showConfirm: false,
    yijianWeight: 0,

    showTips: false,
    showTips2: false,
    // tipsTitle: '',
    tipsText: '',
  };

  componentDidMount() {
    const {navigation} = this.props;
    //订阅的回退监测事件
    navigation.addListener('focus', e => {
      if (e.preventDefault) e.preventDefault();
      const {existDatabar} = this.state;
      //
      const {route} = this.props;
      if (route && route.params) {
        const {
          route: {
            params: {newDatabar},
          },
        } = this.props;
        //如果有新扫描到的有效数据时
        if (newDatabar) {
          let newDataArr = [...existDatabar, newDatabar];
          this.calcData(newDataArr);
        }
      }
    });
  }

  render() {
    const footerButtons = [
      {text: '取消', onPress: this.onCancel},
      {text: '确定', onPress: this.onConfirm},
    ];
    const footerButton2 = [
      {
        text: '好的',
        onPress: () => {
          this.setState({showTips: false});
        },
      },
    ];
    const footerButton3 = [
      {
        text: 'ok',
        onPress: () => {
          this.setState({showTips2: false});
          this.props.navigation.navigate('chukudan-result');
        },
      },
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
          // title={this.state.tipsTitle}
          transparent
          visible={this.state.showTips}
          footer={footerButton2}>
          <View style={{paddingVertical: 20}}>
            <Text style={{fontSize: 18, textAlign: 'center'}}>
              {this.state.tipsText}
            </Text>
          </View>
        </Modal>
        <Modal
          transparent
          onClose={this.onClose}
          visible={this.state.showConfirm}
          footer={footerButtons}>
          <View style={{paddingVertical: 20}}>
            <Text style={{fontSize: 18, textAlign: 'center'}}>
              确认扫描完成？
            </Text>
          </View>
        </Modal>
        <Modal
          transparent
          onClose={this.onClose}
          visible={this.state.showTips2}
          footer={footerButton3}>
          <View style={{paddingVertical: 20}}>
            <Text style={{fontSize: 18, textAlign: 'center'}}>拣配成功！</Text>
          </View>
        </Modal>
        <Tips ref="tips" />
      </React.Fragment>
    );
  }

  calcData = dataArr => {
    const {
      route: {
        params: {yingjian},
      },
    } = this.props;
    //记录
    this.setState({
      existDatabar: dataArr,
    });

    let yij1 = dataArr.map(item => {
      return parseFloat(item.weight);
    });

    yij1 = dataArr.length
      ? (
          yij1.reduce((prev, next) => {
            return prev + next;
          }) / 1000
        ).toFixed(4)
      : 0;

    let ques = (parseFloat(yingjian) - yij1).toFixed(4);

    if (ques < 0) {
      this.refs.tips.show('请求数量过多！');
    }

    //记录已拣重量
    this.setState(
      {
        yijianWeight: yij1,
      },
      //最终执行
      () => {
        //向web发送
        this.postMessage({
          etype: 'data',
          data: dataArr, //表格数据
          yij1,
          yij2: dataArr.length || 0,
          ques,
        });
      },
    );
  };

  showTips = ({tipsTitle, tipsText}) => {
    this.setState({
      showTips: true,
      tipsTitle,
      tipsText,
    });
  };

  onCancel = () => {
    this.setState({
      showConfirm: false,
    });
  };

  //确认扫描
  onConfirm = () => {
    this.setState({
      showConfirm: false,
    });

    const {
      route: {
        params: {fahuodanhao, chehao, chengfang, danjuhao},
      },
      navigation: {navigate},
    } = this.props;

    const {existDatabar, yijianWeight} = this.state;

    //获取本地存储的登录名
    storage.getData('smapp_userName').then(userName => {
      //
      let condition = {};

      //带过来的发货单号
      condition.strDeliveryNo = fahuodanhao;
      //条码数组
      condition.strBarcodes = existDatabar
        .map(item => {
          return item.barcode + ',';
        })
        .join('');
      //已拣总重量
      condition.strSuttle = yijianWeight;
      //登录系统的用户名
      condition.strUser = userName;
      //车号
      condition.strTruckNo = chehao || '';
      //秤房
      condition.weighthousename = chengfang || '';
      //单据
      // condition.id = danjuhao || '';
      condition.id = '';
      //
      api.uploadBarcodes(condition).then(res => {
        const {result, strMsg} = res;
        //错误
        if (!result) {
          this.showTips({tipsText: strMsg || '未知的错误'});
          return;
        }
        //成功
        else {
          this.setState({showTips2: true});
          return;
        }
      });
    });
  };

  postMessage = obj => {
    this.refs.webview.postMessage(JSON.stringify(obj));
  };

  onReceive = event => {
    const {
      navigation,
      navigation: {navigate},
    } = this.props;
    const receivedData = JSON.parse(event.nativeEvent.data);
    const {existDatabar} = this.state;
    //查询及跳转
    if (
      receivedData.etype === 'pageState' &&
      receivedData.info === 'componentDidMount'
    ) {
      const {
        route: {
          params: {yingjian},
        },
      } = this.props;
      //初始仅一次
      this.postMessage({
        etype: 'data',
        yingj: yingjian,
        yij1: 0,
        yij2: 0,
        ques: yingjian,
      });
    }
    //确认按钮
    if (receivedData.etype === 'confirm') {
      this.setState({
        showConfirm: true,
      });
    }
    //手动按钮
    else if (receivedData.etype === 'shoudong') {
      const {existDatabar} = this.state;
      navigate('shoudong-negative', {existDatabar});
    }
    //剔除按钮
    else if (receivedData.etype === 'tichu') {
      if (!receivedData.currentLine) {
        this.showTips({tipsText: '请选择一条要删除的数据'});
      } else {
        //将之删除出去
        const {existDatabar} = this.state;
        let newExistDatabarArr = [...existDatabar];
        takeItout(newExistDatabarArr, receivedData.currentLine);
        //记录
        this.setState({
          existDatabar: newExistDatabarArr,
        });

        //向web发送
        this.postMessage({
          etype: 'data',
          data: newExistDatabarArr,
        });

        //重新计算
        this.calcData(newExistDatabarArr);
      }
    } else if (receivedData.etype === 'scan') {
      navigate('scanning', {existDatabar});
    } else if (
      receivedData.etype === 'event' &&
      receivedData.target === 'backBtn'
    ) {
      navigation.goBack();
    }
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
