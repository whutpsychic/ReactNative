import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

const pageUri = 'file:///android_asset/h5/fire-control-manage/index.html';

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
          {label: '全部', value: 0},
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
            data: [
              {text: '设计审查', active: false},
              {text: '竣工验收', active: true},
              {text: '消防检查', active: false},
              {text: '设计维护', active: false},
              {text: '培训演练', active: false},
              {text: '其他', active: false},
            ],
          },
          {
            img: '',
            title: '永平铜矿',
            data: [
              {text: '设计审查', active: false},
              {text: '竣工验收', active: false},
              {text: '消防检查', active: false},
              {text: '设计维护', active: false},
              {text: '培训演练', active: false},
              {text: '其他', active: false},
            ],
          },
          {
            img: '',
            title: '银山矿业',
            data: [
              {text: '设计审查', active: false},
              {text: '竣工验收', active: true},
              {text: '消防检查', active: false},
              {text: '设计维护', active: false},
              {text: '培训演练', active: false},
              {text: '其他', active: false},
            ],
          },
          {
            img: '',
            title: '永平铜矿',
            data: [
              {text: '设计审查', active: false},
              {text: '竣工验收', active: false},
              {text: '消防检查', active: false},
              {text: '设计维护', active: false},
              {text: '培训演练', active: false},
              {text: '其他', active: false},
            ],
          },
          {
            img: '',
            title: '银山矿业',
            data: [
              {text: '设计审查', active: false},
              {text: '竣工验收', active: true},
              {text: '消防检查', active: false},
              {text: '设计维护', active: false},
              {text: '培训演练', active: false},
              {text: '其他', active: false},
            ],
          },
          {
            img: '',
            title: '永平铜矿',
            data: [
              {text: '设计审查', active: false},
              {text: '竣工验收', active: false},
              {text: '消防检查', active: false},
              {text: '设计维护', active: false},
              {text: '培训演练', active: false},
              {text: '其他', active: false},
            ],
          },
          {
            img: '',
            title: '银山矿业',
            data: [
              {text: '设计审查', active: false},
              {text: '竣工验收', active: true},
              {text: '消防检查', active: false},
              {text: '设计维护', active: false},
              {text: '培训演练', active: false},
              {text: '其他', active: false},
            ],
          },
          {
            img: '',
            title: '永平铜矿',
            data: [
              {text: '设计审查', active: false},
              {text: '竣工验收', active: false},
              {text: '消防检查', active: false},
              {text: '设计维护', active: false},
              {text: '培训演练', active: false},
              {text: '其他', active: false},
            ],
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
