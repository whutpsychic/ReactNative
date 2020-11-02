import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import api from '../../api/index';
import Toast from '../../components/Toast/index';

const pageUri = 'file:///android_asset/h5/main-video/index.html';

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
      api.getMapData().then((res) => {
        //如果查询失败
        const failed = () => {
          Toast.show('数据查询失败了!');
          this.postMessage({
            etype: 'data',
            pageLoading: false,
          });
        };
        const {data} = res;
        if (!data || !data.list) {
          failed();
          return;
        }
        const {list} = data;
        if (!list.monitors) {
          failed();
          return;
        }
        const {monitors} = list;
        // console.log(JSON.stringify(monitors));
        //
        this.postMessage({
          etype: 'data',
          pageLoading: false,
          data: monitors.map((item) => {
            if (item.name === '德兴铜矿') {
              item.points = [
                {label: 'xxxx1', value: 1},
                {label: 'xxxx2', value: 2},
                {label: 'xxxx3', value: 3},
              ];
            }
            return item;
          }),
        });
      });
    }
    //
    else if (etype === 'onClickPoint') {
      const {
        result: {points},
      } = receivedData;
      this.postMessage({
        etype: 'event',
        event: 'select',
      });
      this.postMessage({
        etype: 'data',
        selectData: !points.length ? [{label: '无'}] : points,
      });
    } else if (etype === 'selectPicker') {
      const {result} = receivedData;
      if (!result) return;
      if (result) {
        const {value} = result;
        console.log(value);
      }
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Default;
