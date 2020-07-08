import React from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './style.js';
import {RNCamera} from 'react-native-camera';
import Mask from 'react-native-barcode-mask';
import backpng from './back.png';
import AD from '../../tools/adaption.js';
import api from '../../api/index';
import tool from '../../core/tool.js';
import Tips from '../../components/Tips/index';

const {vw} = AD;

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

//检查是否已存在
const checkIfExist = (arr, obj) => {
  let result = arr.find(item => {
    return item.barcode === obj.barcode;
  });
  return new Promise((resolve, reject) => {
    resolve(result);
  });
};

class Default extends React.Component {
  state = {
    mode: 'code128', //"code128"/"qr"
  };

  componentDidMount() {}

  render() {
    const {mode} = this.state;
    return (
      <React.Fragment>
        <StatusBar hidden={true} />
        <View style={styles.container}>
          <View style={styles.cameraContainer}>
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
              barCodeTypes={[RNCamera.Constants.BarCodeType[mode]]}
              onBarCodeRead={this.onBarCodeRead}>
              {this.calcMsk(mode)}
            </RNCamera>
          </View>
          <View style={styles.topNavigator}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('scan-result', {
                  newDatabar: null,
                });
              }}>
              <Image style={styles.backBtn} alt="back" source={backpng} />
            </TouchableOpacity>
          </View>
          <View style={styles.modeSelectorContainer}>
            <TouchableOpacity
              onPress={() => {
                this.onSelect('code128');
              }}>
              <Text
                style={
                  mode === 'code128'
                    ? [styles.modeSelector, styles.active]
                    : styles.modeSelector
                }>
                条形码
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.onSelect('qr');
              }}>
              <Text
                style={
                  mode === 'qr'
                    ? [styles.modeSelector, styles.active]
                    : styles.modeSelector
                }>
                二维码
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Tips ref="tips" />
      </React.Fragment>
    );
  }

  //
  calcMsk = mode => {
    switch (mode) {
      case 'code128':
        return (
          <Mask width={80 * vw} height={20 * vw} showAnimatedLine={false} />
        );
      case 'qr':
        return (
          <Mask width={65 * vw} height={65 * vw} showAnimatedLine={false} />
        );
      default:
        return null;
    }
  };

  //
  onSelect = mode => {
    this.setState({mode});
  };

  //读到码之后
  onBarCodeRead = e => {
    const {
      navigation,
      navigation: {navigate},
      route: {
        params: {existDatabar},
      },
    } = this.props;
    const {data} = e;

    //条码格式验证通过
    if (tool.checkBarcodeIfqualified(data)) {
      api
        .checkBatchNo({strBarCode: data})
        .then(res => {
          const {CheckBatchNoResult} = res;

          //如果已拣配
          if (!CheckBatchNoResult) {
            this.refs.tips.show('该批次已经拣配装车，请勿重复选择！', () => {
              navigate('scan-result', {newDatabar: null});
            });
            return;
          }
          //如果未拣配
          else {
            //按规则解析条码
            decode(data).then(result => {
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
                  this.refs.tips.show('该批次已经选择，请勿重复选择！', () => {
                    navigate('scan-result', {newDatabar: null});
                  });
                  return;
                }
              });
            });
          }
        })
        .catch(err => {
          this.refs.tips.show('验证错误，请检查网络连接');
        });
    }
    //条码格式验证未通过
    else {
      this.refs.tips.show('对不起，此条码不符合规范', () => {
        navigate('scan-result', {newDatabar: null});
      });
      return;
    }
  };
}

export default Default;
