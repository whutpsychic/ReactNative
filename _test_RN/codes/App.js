import React from 'react';
import {View, TextInput} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {Button, WhiteSpace} from '@ant-design/react-native';

// ============================================
import HoneywellBarcodeReader from './NativeModule.js';
import KeyEvent from 'react-native-keyevent';
// ============================================

const pageUri = 'file:///android_asset/h5/plustest/index.html';

class Default extends React.Component {
  componentDidMount() {
    alert(HoneywellBarcodeReader.isCompatible);
    HoneywellBarcodeReader.startReader().then(result => {
      alert('初始化结果为' + result);
    });

    HoneywellBarcodeReader.onBarcodeReadSuccess(data => {
      alert(JSON.stringify(data));
    });

    // if you want to react to keyDown
    KeyEvent.onKeyDownListener(keyEvent => {
      // alert(`onKeyDown keyCode: ${keyEvent.keyCode}`);

      let {keyCode} = keyEvent;

      if (keyCode == 288 || keyCode == 289 || keyCode == 290) {
        HoneywellBarcodeReader.reading();
      }
    });

    // if you want to react to keyUp
    KeyEvent.onKeyUpListener(keyEvent => {
      console.log(`onKeyUp keyCode: ${keyEvent.keyCode}`);
      console.log(`Action: ${keyEvent.action}`);
      console.log(`Key: ${keyEvent.pressedKey}`);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <WhiteSpace />
        <Button type="primary" onPress={this.onPressBtn1}>
          btn1
        </Button>
        <WhiteSpace />
        <Button type="primary" onPress={this.onPressBtn2}>
          btn2
        </Button>
        <WhiteSpace />
        <Button type="primary" onPress={this.onPressBtn3}>
          btn3
        </Button>
        <WhiteSpace />
        <TextInput style={{width: '100%', height: 30}} />
      </View>
    );
  }

  onPressBtn1 = () => {
    alert('btn`1');
  };

  onPressBtn2 = () => {
    alert('btn`2');
  };

  onPressBtn3 = () => {
    alert('btn`3');
    HoneywellBarcodeReader.reading();
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Default;
