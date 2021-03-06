import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import api from '../../api/index';
import Toast from '../../components/Toast';
import {putupData, run} from '../../core/common.js';

import getDetail from './getDetail.js';

const pageUri = 'file:///android_asset/h5/monitor-oldata-list/index.html';

let currPage = 0;
const ps = 20;

// 默认是 1
// 1：废水，2：废气
let feiqi_feiye = 1;

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
    //初始化完成之后互通消息然后放置数据
    if (etype === 'pageState' && receivedData.info === 'componentDidMount') {
      // 加载一次树形结构数据
      api.getInstitutionRoleItems().then((data) => {
        if (data) {
          putupData(this, {
            institutions: [{title: '全部', key: undefined}, ...data],
          });
        } else {
          Toast.show('单位数据竟然查询失败了');
        }
      });

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

    // 当改变查询条件的时候
    else if (etype === 'onChangeConditions') {
      putupData(this, {pageLoading: true});
      const {institution, type} = receivedData;
      feiqi_feiye = type || 1;
      let condition = {
        institutionId:
          institution && institution[0] ? institution[0] : undefined,
        type: type || 1,
      };

      this.query(0, condition);
    }

    // 点击更多
    else if (etype === 'clickItem') {
      const {name, dataSource} = receivedData;

      this.setState({
        title: name,
        mnNumber: dataSource.mnNumber,
      });

      // =======================
      // 在这儿区分是废气数据还是废液数据
      // 废水
      if (feiqi_feiye === 1) {
        putupData(this, {
          detail: {
            fieldContents: getDetail(feiqi_feiye, dataSource),
          },
        });
      }
      // 废气
      else {
        putupData(this, {
          detail: {
            fieldContents: getDetail(feiqi_feiye, dataSource),
          },
        });
      }
    }
    // 点击浏览文件
    else if (etype === 'history') {
      const {title, mnNumber} = this.state;
      navigate('monitor_oldata_history', {title, mnNumber, type: feiqi_feiye});
    } else if (etype === 'back-btn') {
      navigation.goBack();
    }
  };

  query = (page = 0, conditions = {}) => {
    if (!page) currPage = 0;
    this.setState({conditions});
    api
      .getMonitorOlDataList({
        page,
        ps,
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
                remarks: item.institutionName,
                name: item.areaName,
                time: item.dataTime,
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
