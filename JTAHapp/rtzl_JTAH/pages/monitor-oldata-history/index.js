import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import api from '../../api/index';
import Toast from '../../components/Toast';
import {putupData, run} from '../../core/common.js';

import getDetail from './getDetail.js';

const pageUri = 'file:///android_asset/h5/monitor-oldata-history/index.html';

let currPage = 0;
const ps = 20;

class Default extends React.Component {
  state = {
    conditions: {},
  };

  componentDidMount() {}

  error = (msg) => {
    Toast.show(msg);
    putupData(this, {pageLoading: false});
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
    const {
      route: {
        params: {title, mnNumber},
      },
    } = this.props;
    //初始化完成之后互通消息然后放置数据
    if (etype === 'pageState' && receivedData.info === 'componentDidMount') {
      putupData(this, {
        pageLoading: true,
      });
      this.query();
    }
    //下拉刷新
    else if (etype === 'onRefreshList') {
      const {conditions} = this.state;
      this.query(0, conditions);
    }

    // 底部加载更多
    else if (etype === 'onEndReached') {
      this.getMore();
    }

    //
    else if (etype === 'clickItem') {
      const {dataSource} = receivedData;
      // 在此判断是废气还是废液
      const {
        route: {
          params: {type},
        },
      } = this.props;

      // 废液
      if (type === 1) {
        putupData(this, {
          detail: {
            fieldContents: getDetail(type, dataSource),
          },
        });
      }
      // 废气
      else {
        putupData(this, {
          detail: {
            fieldContents: getDetail(type, dataSource),
          },
        });
      }
    }

    // 当改变查询条件的时候
    else if (etype === 'onChangeConditions') {
      putupData(this, {pageLoading: true});
      const {type, time1, time2} = receivedData;
      let condition = {
        mnNumber: mnNumber,
        sdatetime: time1,
        edatetime: time2,
        avgType: type && type[0] ? type[0] : 1,
      };

      this.query(0, condition);
    } else if (etype === 'back-btn') {
      navigation.goBack();
    }
  };

  query = (page = 0, conditions = {}) => {
    const {
      route: {
        params: {title, mnNumber, type},
      },
    } = this.props;
    if (!page) currPage = 0;
    this.setState({conditions});
    api
      .getMonitorOlDataHistoryList({
        page,
        ps,
        type,
        mnNumber,
        ...conditions,
      })
      .then((res) => {
        const {errcode, errmsg, data} = res;
        // 超时
        if (errcode === 504) {
          this.error('请求超时!');
          return;
        }
        // 成功
        else if (!errcode) {
          // 没数据
          if (!data || !data.list || !data.list.length) {
            this.error('没有任何数据');
            run(this, 'loadListData', []);
            return;
          }

          if (data.list.length < ps) {
            run(this, 'noMoreItem');
          }

          putupData(this, {pageLoading: false});
          run(this, 'listLoaded');

          let dataArr = data.list
            .map((item) => {
              return {
                name: title,
                time: item.dataTime,
                remarks: item.remark,
                dataSource: item,
              };
            })
            .reverse();
          if (!page) {
            run(this, 'loadListData', dataArr);
            return;
          } else {
            run(this, 'setListData', dataArr);
          }
        }
        // 错误
        else {
          this.error('请求出错了！');
        }
      });
  };

  //
  getMore = () => {
    const {conditions} = this.state;
    this.query(++currPage, conditions);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Default;
