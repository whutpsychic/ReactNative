import React from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

const pageUri = 'file:///android_asset/h5/main-home/index.html';

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
      setTimeout(() => {
        this.postMessage({
          etype: 'data',
          loadingChart: false,
        });
        this.postMessage({
          etype: 'event',
          event: 'setChart',
          args: {
            legend: ['废水', '废气'],
            xAxis: ['10-16', '10-17', '10-18', '10-19'],
            data: [
              {name: '废水', type: 'line', data: [20, 92, 10, 84]},
              {name: '废气', type: 'line', data: [70, 32, 50, 34]},
            ],
          },
        });
      }, 1500);

      this.postMessage({
        etype: 'data',
        loadingChart: true,
        chartTitle: '工业废气PH日数据',
        boardInfoData: [
          {
            text: '开启智慧链新时代，全新智慧链震撼新智慧链震撼',
            date: '2019-06-12',
          },
          {text: '如何发布高质量五星级产品信息？', date: '2019-06-14'},
          {
            text: '询盘量和流量——秘密在商机里如何做新智慧链震撼',
            date: '2019-06-15',
          },
        ],
        selectData1: [
          {text: 'option1', value: 1},
          {text: 'option2dsssssssssdddd', value: 2},
          {text: 'option3d', value: 3},
          {text: 'option4', value: 4},
          {text: 'option5', value: 5},
          {text: 'option6', value: 6},
          {text: 'option7', value: 7},
          {text: 'option8', value: 8},
          {text: 'option9', value: 9},
        ],
        selectData2: [
          {text: 'option1', value: 1},
          {text: 'option2dsssssssssdddd', value: 2},
          {text: 'option3', value: 3},
          {text: 'option4', value: 4},
          {text: 'option5', value: 5},
          {text: 'option6', value: 6},
          {text: 'option7', value: 7},
          {text: 'option8', value: 8},
          {text: 'option9', value: 9},
        ],
      });
    }
    //
    else if (etype === 'xxxxxxxxxx') {
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Default;
