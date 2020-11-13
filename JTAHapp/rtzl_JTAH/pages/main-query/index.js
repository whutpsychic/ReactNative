import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import api from '../../api/index';

const pageUri = 'file:///android_asset/h5/main-query/index.html';

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
        pageLoading: true,
      });
      api.getMainQueryMenuList().then((res) => {
        this.postMessage({
          etype: 'data',
          pageLoading: false,
          data: res,
        });
      });
    }
    //
    else if (etype === 'navigate') {
      const {position} = receivedData;
      navigate(position);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Default;
