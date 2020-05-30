import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  DeviceEventEmitter,
  NativeModules,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {Modal} from '@ant-design/react-native';
import storage from '../../core/storage.js';
import api from '../../api/index.js';
import Tips from '../../components/Tips/index';
import Toast from '../../components/ToastModule/index';
import tool from '../../core/tool.js';
import {connect} from 'react-redux';
import {login} from '../../redux/actions.js';
import config from '../../config.js';
import HoneywellBarcodeReader from '../../components/Honeywell/index.js';

const {RNBroadCast} = NativeModules;
const TAG = 'TAIJI';

const uri = 'file:///android_asset/h5/scan-result/index.html';

//解码规则
const decode = (barcode) => {
  let arr = barcode.split('');
  //企业代码 三位
  const qiyedaima = arr.slice(0, 3).join('');
  //产品类别代码 二位
  const chanpinleibie = arr.slice(3, 5).join('');
  //产品等级代码 二位
  const chanpindengji = arr.slice(5, 7).join('');
  //生产日期代码 六位
  const shengchanriqi = arr.slice(7, 13).join('');
  //产品批号 四位
  const chanpinpihao = arr.slice(13, 17).join('');
  //捆序号 三位
  const kunxuhao = arr.slice(17, 20).join('');
  //捆净重代码 五位
  const kunjingzhong = arr.slice(20, 24).join('') + `.` + arr[24];

  return new Promise((resolve, reject) => {
    resolve({
      barcode,
      qiyedaima,
      chanpinleibie,
      chanpindengji,
      shengchanriqi,
      chanpinpihao,
      kunxuhao,
      kunjingzhong,
    });
  });
};

//检查是否已存在
const checkIfExist = (arr, obj) => {
  let result = arr.find((item) => {
    return item.barcode === obj.barcode;
  });
  return new Promise((resolve, reject) => {
    resolve(result);
  });
};

const takeItout = (arr, item) => {
  let resultIndex = arr.findIndex((_item) => {
    return _item.barcode === item.barcode;
  });
  //将之剔除出去
  arr.splice(resultIndex, 1);
};

class Default extends React.Component {
  state = {
    isHoneywell: false,
    existDatabar: [],
    showConfirm: false,
    yijianWeight: 0,

    showTips: false,
    showTips2: false,
    // tipsTitle: '',
    tipsText: '',
  };

  arrangeBarcode = (existDatabar, data) => {
    //条码格式验证通过
    if (tool.checkBarcodeIfqualified(data)) {
      return api
        .checkBatchNo({strBarCode: data})
        .then((res) => {
          const {CheckBatchNoResult} = res;

          //如果已拣配
          if (!CheckBatchNoResult) {
            this.refs.tips.show('该批次已经拣配装车，请勿重复选择！');
            return;
          }
          //如果未拣配
          else {
            //按规则解析条码
            decode(data).then((result) => {
              let date = result.shengchanriqi,
                number = result.kunxuhao,
                barcode = result.barcode,
                weight = result.kunjingzhong;
              let databar = {date, number, barcode, weight};
              checkIfExist(existDatabar, databar).then((exist) => {
                if (!exist) {
                  return databar;
                } else if (exist) {
                  this.refs.tips.show('该批次已经选择，请勿重复选择！');
                  return;
                }
              });
            });
          }
        })
        .catch((err) => {
          this.refs.tips.show('验证错误，请检查网络连接');
        });
    }
    //条码格式验证未通过
    else {
      this.refs.tips.show('对不起，此条码不符合规范');
      return new Promise((resolve, reject) => {
        reject('not ruled');
      });
    }
  };

  componentWillUnmount() {
    // if (this.state.isHoneywell) HoneywellBarcodeReader.stopReader();
    if (this.hell) this.hell.remove();
  }

  componentDidMount() {
    const {navigation} = this.props;
    const {logout} = this.props;
    navigation.addListener('focus', () => {
      this.timeoutKey = setTimeout(() => {
        logout();
        Toast.show('因长时间停留此页面，您已登出');
      }, config.scanningTimeout);
    });

    navigation.addListener('blur', () => {
      if (this.timeoutKey) {
        clearTimeout(this.timeoutKey);
      }
    });

    let isHoneywell = HoneywellBarcodeReader.isCompatible;
    let _this = this;
    if (isHoneywell) {
      this.setState({isHoneywell: true});
      // //初始化Honey系统
      // HoneywellBarcodeReader.startReader().then(result => {
      //   HoneywellBarcodeReader.onBarcodeReadSuccess(res => {
      //     const {data} = res;
      //     const {existDatabar} = _this.state;
      //     //
      //     _this.arrangeBarcode(existDatabar, data).then(databar => {
      //       if (databar) {
      //         let newDataArr = [...existDatabar, databar];
      //         _this.calcData(newDataArr);
      //       }
      //     });
      //   });
      // });

      //直接监听扫码事件
      RNBroadCast.receiveEvent('com.codes.intent.action.' + TAG);
      _this.hell = DeviceEventEmitter.addListener(
        'com.codes.intent.action.' + TAG,
        (res) => {
          // alert(JSON.stringify(res));
          const {data} = res;
          const {existDatabar} = _this.state;
          //
          _this.arrangeBarcode(existDatabar, data).then((databar) => {
            if (databar) {
              let newDataArr = [...existDatabar, databar];
              _this.calcData(newDataArr);
            }
          });
        },
      );

      setTimeout(() => {
        Toast.show('检测到您正在使用霍尼韦尔设备');
      }, 0);
    } else {
      const {navigation} = this.props;
      //订阅的回退监测事件
      navigation.addListener('focus', (e) => {
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

  calcData = (dataArr) => {
    const {
      route: {
        params: {yingjian},
      },
    } = this.props;
    //记录
    this.setState({
      existDatabar: dataArr,
    });

    let yij1 = dataArr.map((item) => {
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
    storage.getData('smapp_userName').then((userName) => {
      //
      let condition = {};

      //带过来的发货单号
      condition.strDeliveryNo = fahuodanhao;
      //条码数组
      condition.strBarcodes = existDatabar
        .map((item) => {
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
      api.uploadBarcodes(condition).then((res) => {
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

  postMessage = (obj) => {
    this.refs.webview.postMessage(JSON.stringify(obj));
  };

  onReceive = (event) => {
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
      const {isHoneywell} = this.state;
      if (isHoneywell) {
        // HoneywellBarcodeReader.reading();
        Toast.show('请您按扫描键');
      } else {
        navigate('scanning', {existDatabar});
      }
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

const mapDispatchToProps = (dispatch, props) => {
  return {
    logout: () => {
      dispatch(login(false));
    },
  };
};

export default connect(null, mapDispatchToProps)(Default);
