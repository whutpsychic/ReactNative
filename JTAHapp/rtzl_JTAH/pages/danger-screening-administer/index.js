import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

const pageUri = 'file:///android_asset/h5/danger-screening-administer/index.html';

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
        boardData: [
          {
            text: '国庆节前专项检查通知',
            date: '2019-06-12',
          },
          {text: '高温酷暑专项检查通知', date: '2019-06-14'},
          {
            text: '危险化学品专项检查通知',
            date: '2019-06-15',
          },
          {
            text: '年终专项检查通知',
            date: '2019-06-15',
          },
        ],
        boardData2: [
          {
            text: '国庆节前专项检查通知',
            date: '2019-06-12',
          },
          {text: '高温酷暑专项检查通知', date: '2019-06-14'},
          {
            text: '危险化学品专项检查通知',
            date: '2019-06-15',
          },
          {
            text: '年终专项检查通知',
            date: '2019-06-15',
          },
        ],
        selectData1: [
          {label: '项目名1', value: 1},
          {label: '项目名2', value: 2},
          {label: '项目名3', value: 3},
          {label: '项目名4', value: 4},
          {label: '项目名5', value: 5},
          {label: '项目名6', value: 6},
          {label: '项目名7', value: 7},
          {label: '项目名8', value: 8},
          {label: '项目名9', value: 9},
        ],
        selectData2: [
          {label: '单位1', value: 1},
          {label: '单位2', value: 2},
          {label: '单位3', value: 3},
          {label: '单位4', value: 4},
          {label: '单位5', value: 5},
          {label: '单位6', value: 6},
          {label: '单位7', value: 7},
          {label: '单位8', value: 8},
          {label: '单位9', value: 9},
        ],
        tableData: [
          {string0: 1, string1: '德钢', string2: ''},
          {string0: 2, string1: '银山', string2: ''},
          {string0: 3, string1: '东同', string2: ''},
          {string0: 4, string1: '武钢', string2: ''},
          {string0: 5, string1: '德钢', string2: ''},
          {string0: 6, string1: '银山', string2: ''},
          {string0: 7, string1: '东同', string2: ''},
          {string0: 8, string1: '武钢', string2: ''},
        ],
      });
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
