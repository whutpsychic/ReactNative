import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {WebView} from 'react-native-webview';
import tool from '../../core/tool.js';
import api from '../../api/index.js';
import Tips from '../../components/Tips/index';

const uri = 'file:///android_asset/h5/shoudong-negative/index.html';

//检查是否已存在
const checkIfExist = (arr, obj) => {
  let result = arr.find(item => {
    return item.barcode === obj.barcode;
  });
  return new Promise((resolve, reject) => {
    resolve(result);
  });
};

//解码规则
const decode = barcode => {
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
    console.log(receivedData);
    //查询及跳转
    if (receivedData.etype === 'query') {
      const {picihao, bianhao} = receivedData;
      //没写完整
      if (!picihao || !bianhao) {
        this.refs.tips.show('请完整填写批次号和编号');
        return;
      }
      //
      let condition = {};
      condition.strBatchno = bianhao + `-` + picihao;
      api.getBarcodeByPB(condition).then(barcode => {
        //强制清空
        if (!barcode) {
          barcode = ' ';
          this.refs.tips.show('抱歉没有查询到相关条码');
        }

        //发送给web
        this.postMessage({
          etype: 'data',
          value: barcode,
        });
      });
    } else if (receivedData.etype === 'confirm') {
      let {barcode} = receivedData;
      //去除空格操作
      barcode = barcode.replace(/\s/g, ``);
      //格式规范的话
      if (tool.checkBarcodeIfqualified(barcode)) {
        api
          .checkBatchNo({strBarCode: barcode})
          .then(res => {
            const {CheckBatchNoResult} = res;

            //如果已拣配
            if (!CheckBatchNoResult) {
              this.refs.tips.show('该批次已经拣配装车，请勿重复选择！');
              return;
            }
            //如果未拣配
            else {
              const {
                route: {
                  params: {existDatabar},
                },
              } = this.props;
              //按规则解析条码
              decode(barcode).then(result => {
                let date = result.shengchanriqi,
                  number = result.kunxuhao,
                  barcode = result.barcode,
                  weight = result.kunjingzhong;
                let databar = {date, number, barcode, weight};
                checkIfExist(existDatabar, databar).then(exist => {
                  if (!exist) {
                    //回退至结果页并告知新条目
                    navigate('scan-result', {newDatabar: databar});
                    return;
                  } else if (exist) {
                    this.refs.tips.show(
                      '该批次已经选择，请勿重复选择！',
                      () => {
                        navigate('scan-result', {newDatabar: null});
                      },
                    );
                    return;
                  }
                });
              });
            }
          })
          .catch(err => {
            console.log(err);
            this.refs.tips.show('验证错误，请检查网络连接');
          });
      }
      //条码格式验证未通过
      else {
        this.refs.tips.show('对不起，此条码不符合规范');
        return;
      }
    } else if (receivedData.etype === 'cancel') {
      navigate('scan-result', {newDatabar: null});
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
