import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

const pageUri = 'file:///android_asset/h5/stxfxx/index.html';

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
      this.postMessage({
        etype: 'data',
        selectData1: [
          {label: '名称1', value: 1},
          {label: '名称2', value: 2},
          {label: '名称3', value: 3},
          {label: '名称4', value: 4},
          {label: '名称5', value: 5},
        ],
        mainData: [
          {
            img: '',
            title: '银山矿业',
            subtitle: '修复面积:XXXX(公顷)',
            data: [{img: ''}, {img: ''}, {img: ''}],
          },
          {
            img: '',
            title: '永平铜矿',
            subtitle: '修复面积:XXXX(公顷)',
            data: [{img: ''}, {img: ''}, {img: ''}],
          },
          {
            img: '',
            title: '银山矿业',
            subtitle: '修复面积:XXXX(公顷)',
            data: [{img: ''}, {img: ''}, {img: ''}],
          },
          {
            img: '',
            title: '永平铜矿',
            subtitle: '修复面积:XXXX(公顷)',
            data: [{img: ''}, {img: ''}, {img: ''}],
          },
          {
            img: '',
            title: '银山矿业',
            subtitle: '修复面积:XXXX(公顷)',
            data: [{img: ''}, {img: ''}, {img: ''}],
          },
          {
            img: '',
            title: '永平铜矿',
            subtitle: '修复面积:XXXX(公顷)',
            data: [{img: ''}, {img: ''}, {img: ''}],
          },
          {
            img: '',
            title: '银山矿业',
            subtitle: '修复面积:XXXX(公顷)',
            data: [{img: ''}, {img: ''}, {img: ''}],
          },
          {
            img: '',
            title: '永平铜矿',
            subtitle: '修复面积:XXXX(公顷)',
            data: [{img: ''}, {img: ''}, {img: ''}],
          },
        ],
      });
    }
    //
    else if (etype === 'xxxxxxxxxx') {
    }
    //
    else if (etype === 'back-btn') {
      navigation.goBack();
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Default;
