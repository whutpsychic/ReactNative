import React from 'react';
import styles from './style.js';
import {View, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import {preReceive, putupData, run} from '../../core/common.js';
import api from '../../api/index';
import Toast from '../../components/Toast/index';

const pageUri = 'file:///android_asset/h5/monitor-oldata-history2/index.html';

const onReceive = (etype, _this, receivedData) => {
  const {
    navigation,
    navigation: {navigate},
    route: {
      params: {type, line},
    },
  } = _this.props;

  //初始化完成之后互通消息然后放置数据
  if (etype === 'pageState' && receivedData.info === 'componentDidMount') {
    putupData(_this, {
      title: `${line.institutionName}-${line.areaName}-历史数据`,
    });
    // 加载一次树形结构数据
    api.getInstitutionRoleItems().then((data) => {
      if (data) {
        putupData(_this, {
          institutions: [{title: '全部', key: undefined}, ...data],
        });
      } else {
        Toast.show('机构数据竟然查询失败了');
      }
    });

    _this.query();
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

    this.query(condition);
  } else if (etype === 'back-btn') {
    navigation.goBack();
  }
};

class Default extends React.Component {
  state = {};

  render() {
    const {container} = styles;
    return (
      <View style={container}>
        <WebView
          ref="webview"
          source={{uri: pageUri}}
          onMessage={(e) => preReceive(e, this, onReceive)}
        />
      </View>
    );
  }

  query = (conditions) => {
    const {
      route: {
        params: {type, line, mnNumber},
      },
    } = this.props;
    putupData(this, {
      pageLoading: true,
    });
    api
      .getMonitorOlDataHistoryList({
        page: 1,
        ps: 9999,
        type,
        mnNumber,
        ...conditions,
      })
      .then((res) => {
        console.log(res);

        // 超时
        if (res.errcode === 504) {
          Toast.show('请求超时!');
          putupData(this, {
            pageLoading: false,
          });
        }

        const {data} = res;
        // 成功
        if (data && data.list instanceof Array) {
          putupData(this, {
            pageLoading: false,
            dataSource: data.list,
          });
        }
      });
  };
}

export default Default;
