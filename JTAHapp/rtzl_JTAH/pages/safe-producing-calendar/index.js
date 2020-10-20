import React from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import api from '../../api/index';
import moment from 'moment';

const pageUri = 'file:///android_asset/h5/safe-producing-calendar/index.html';

const transType = (type) => {
  switch (type) {
    case 'H':
      return 1;
    case 'N':
      return 2;
    default:
      return 0;
  }
};

class Default extends React.Component {
  state = {
    currYear: null,
  };

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
      const year = moment().year();
      this.query(year);
      this.setState({
        currYear: year,
      });
    }
    // 改变日期触发查询
    else if (etype === 'onChangeDate') {
      const {year} = receivedData;
      const {currYear} = this.state;
      //
      if (year != currYear) {
        this.setState({
          currYear: year,
        });
        this.query(year);
      }
    }
    //
    else if (etype === 'back-btn') {
      navigation.goBack();
    }
  };

  query = (year) => {
    this.postMessage({
      etype: 'data',
      pageLoading: true,
    });
    api.getSafeCalendarData({year}).then((res) => {
      const {errcode, errmsg, data} = res;
      // 成功
      if (!errcode) {
        const {list} = data;
        let arr = [];
        for (let i in list) {
          arr.push({
            date: list[i].date,
            info: list[i].tooltip,
            state: transType(list[i].type),
          });
        }
        this.postMessage({
          etype: 'data',
          pageLoading: false,
          data: arr,
        });
      }

      // 超时
      else if (errcode === 504) {
        Toast.show('请求超时！');
        this.postMessage({
          etype: 'data',
          pageLoading: false,
        });
        return;
      }
      // 失败
      else {
        Toast.show(`请求失败！${errmsg}`);
        this.postMessage({
          etype: 'data',
          pageLoading: false,
        });
        return;
      }
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Default;
