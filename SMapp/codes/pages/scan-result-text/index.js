// ****************
// 此页暂时无用
// ****************

import React from 'react';
import {View, Text, Image, StatusBar, TouchableOpacity} from 'react-native';
import styles from './style.js';
import {RNCamera} from 'react-native-camera';
import Mask from 'react-native-barcode-mask';
import backpng from './back.png';
import AD from '../../tools/adaption.js';

const {vw} = AD;

class Default extends React.Component {
  state = {
    mode: 'code128', //"code128"/"qr"
  };

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
                this.props.navigation.goBack();
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
      </React.Fragment>
    );
  }

  //
  calcMsk = mode => {
    switch (mode) {
      case 'code128':
        return <Mask width={80 * vw} height={20 * vw} />;
      case 'qr':
        return <Mask width={65 * vw} height={65 * vw} />;
      default:
        return null;
    }
  };

  //
  onSelect = mode => {
    this.setState({mode});
  };

  //
  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  onBarCodeRead = e => {
    let {data} = e;
    const {navigation} = this.props;
    navigation.navigate('scan-result', {data});
  };
}

export default Default;
