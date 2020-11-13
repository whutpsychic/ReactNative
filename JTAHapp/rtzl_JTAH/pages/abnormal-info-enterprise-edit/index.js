import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import api from '../../api/index';
import Toast from '../../components/Toast';
import Tips from '../../components/Tips';

const pageUri = 'file:///android_asset/h5/common-list-edit/index.html';

const defaultUnitId = '390090725934497792';

const buildEditListItems = (dataSource) => {
  const result = [
    {
      label: '单位名称',
      type: 'tree-select',
      disabled: true,
      data: [],
      defaultValue: {text: '江西铜业有限公司', value: defaultUnitId},
    },
    {
      label: '监测地点',
      type: 'input',
      disabled: true,
      defaultValue: dataSource.areaName,
    },
    {
      label: '参数名称',
      type: 'input',
      disabled: true,
      defaultValue: dataSource.factorsName,
    },
    {
      label: '开始时间',
      type: 'input',
      disabled: true,
      defaultValue: dataSource.startTime,
    },
    {
      label: '结束时间',
      type: 'input',
      disabled: true,
      defaultValue: dataSource.endTime,
    },
    {
      label: '异常说明',
      type: 'text-area',
      defaultValue: '',
    },
    {
      label: '备注',
      type: 'text-area',
      defaultValue: dataSource.remark,
    },
  ];

  return result;
};

class Default extends React.Component {
  state = {};

  componentDidMount() {}

  postMessage = (obj) => {
    this.refs.webview.postMessage(JSON.stringify(obj));
  };

  error = (msg) => {
    Toast.show(msg);
    this.postMessage({
      etype: 'data',
      pageLoading: false,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <WebView
          ref="webview"
          source={{uri: pageUri}}
          onMessage={this.onReceive}
        />
        <Tips ref="tips" />
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
        params: {title, dataSource},
      },
    } = this.props;
    //初始化完成之后互通消息然后放置数据
    if (etype === 'pageState' && receivedData.info === 'componentDidMount') {
      this.postMessage({
        etype: 'data',
        pageLoading: true,
      });

      this.preEdit(title, dataSource);
    }
    // 提交动作
    else if (etype === 'submit') {
      const {
        route: {
          params: {type},
        },
      } = this.props;
      this.submitEdit(receivedData, dataSource);
    }
    // 默认后退
    else if (etype === 'back-btn') {
      navigation.goBack();
    }
  };

  preEdit = (title, data) => {
    let ListItems = buildEditListItems(data);
    this.postMessage({
      etype: 'data',
      pageLoading: false,
      title,
      ListItems,
    });
  };

  submitEdit = (receivedData, dataSource) => {
    this.refs.tips.modal('正在提交');
    console.log(receivedData)
    console.log(dataSource)
    let condition = {
      ...dataSource,
      explanation: receivedData[5],
      remark: receivedData[6],
      checkStatus: 1
    };

    api.abnormalInfoEnterpriseEdit(condition).then((res) => {
      this.refs.tips.hide();
      console.log(res);
      const {errcode} = res;
      if (!errcode) {
        Toast.show('处置成功！');
        this.props.navigation.goBack();
        return;
      } else {
        Toast.show('处置失败！');
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
