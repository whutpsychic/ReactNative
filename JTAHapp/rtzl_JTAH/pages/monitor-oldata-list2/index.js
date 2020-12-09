import React from 'react';
import styles from './style.js';
import {View, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import {preReceive, putupData, run} from '../../core/common.js';
import Orientation from 'react-native-orientation';
import api from '../../api/index';

const pageUri = 'file:///android_asset/h5/monitor-oldata-list2/index.html';

const onReceive = (etype, _this, receivedData) => {
  const {
    navigation,
    navigation: {navigate},
  } = _this.props;
  //初始化完成之后互通消息然后放置数据
  if (etype === 'pageState' && receivedData.info === 'componentDidMount') {
    putupData(_this, {
      title: '在线监测实时数据',
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
  } else if (etype === 'onChangeCondition') {
    const {institution, type} = receivedData;
    _this.setState({type});
    _this.query({type, institutionId: institution[0] || undefined});
  } else if (etype === 'history') {
    const {line} = receivedData;
    const {type} = _this.state;
    //
    navigate('monitor_oldata_history2', {type, line, mnNumber: line.mnNumber});
  } else if (etype === 'back-btn') {
    navigation.goBack();
  }
};

class Default extends React.Component {
  state = {
    type: 1,
  };

  componentDidMount() {
    Orientation.lockToLandscape();
  }

  componentWillUnmount() {
    Orientation.lockToPortrait();
  }

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
    putupData(this, {
      pageLoading: true,
    });
    api.getMonitorOlDataList({page: 1, ps: 9999, ...conditions}).then((res) => {
      console.log(res);
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
