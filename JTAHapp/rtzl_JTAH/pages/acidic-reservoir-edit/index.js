import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import api from '../../api/index';
import Toast from '../../components/Toast';
import Tips from '../../components/Tips';

const pageUri = 'file:///android_asset/h5/common-list-edit/index.html';

const defaultUnitId = '390090725934497792';
const buildAddListItems = (data) => {
  let arr1 = [
    {
      label: '单位名称',
      type: 'tree-select',
      disabled: true,
      data: [],
      defaultValue: {text: '江西铜业有限公司', value: defaultUnitId},
    },
    {
      label: '日期',
      type: 'date',
    },
  ];

  let arr2 = [];

  data.map((item) => {
    arr2.push({
      label: '水库名称',
      type: 'input',
      disabled: true,
      data: [],
      defaultValue: `${item.reservoirName}`,
    });
    arr2.push({
      label: '水库水位/m',
      type: 'number',
    });
  });

  let result = [
    ...arr1,
    ...arr2,
    {
      label: '备注',
      type: 'text-area',
      defaultValue: '',
    },
  ];

  return result;
};

const buildEditListItems = (dataSource) => {
  const result = [
    {
      label: '日期',
      type: 'date',
      disabled: true,
      defaultValue: dataSource.date,
    },
    {
      label: '单位',
      type: 'tree-select',
      disabled: true,
      data: [],
      defaultValue: {text: '江西铜业有限公司', value: defaultUnitId},
    },
    {
      label: '监测地点',
      type: 'input',
      disabled: true,
      defaultValue: dataSource.reservoirName,
    },
    {
      label: '水库水位/m',
      type: 'number',
      defaultValue: dataSource.valueA,
    },
    {
      label: '距溢流口高度/m',
      type: 'number',
      disabled: true,
      defaultValue: dataSource.valueB,
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
        params: {type, title, dataSource},
      },
    } = this.props;
    //初始化完成之后互通消息然后放置数据
    if (etype === 'pageState' && receivedData.info === 'componentDidMount') {
      this.postMessage({
        etype: 'data',
        pageLoading: true,
      });

      if (type === 'add') {
        this.preAdd(title);
      } else if (type === 'edit') {
        this.preEdit(title, dataSource);
      }
    }
    // 提交动作
    else if (etype === 'submit') {
      const {
        route: {
          params: {type},
        },
      } = this.props;
      if (type === 'add') this.submitAdd(receivedData);
      else if (type === 'edit') this.submitEdit(receivedData, dataSource);
    }
    // 默认后退
    else if (etype === 'back-btn') {
      navigation.goBack();
    }
  };

  preAdd = (title) => {
    // 查询有多少水库
    api.getReservoirsByUnit().then((data) => {
      if (data) {
        let ListItems = buildAddListItems(data);
        this.postMessage({
          etype: 'data',
          pageLoading: false,
          title,
          ListItems,
        });
        this.setState({
          reservoirs: data,
        });
      }
    });
  };

  submitAdd = (receivedData) => {
    this.refs.tips.modal('正在提交');
    const {reservoirs} = this.state;

    const conditionArr = reservoirs.map((item, i) => {
      const L = reservoirs.length;
      return {
        rId: item.rId,
        valueA: receivedData[2 * i + 3],
        valueB: null,
        valueC: null,
        date: receivedData[1],
        remark: receivedData[2 * L + 2],
      };
    });

    api.acidicReservoirSubmitAdd(conditionArr).then((res) => {
      this.refs.tips.hide();
      const {errcode} = res;
      if (!errcode) {
        Toast.show('新增成功！');
        this.props.navigation.goBack();
        return;
      } else {
        Toast.show('新增失败！');
      }
    });
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
    let condition = {
      date: receivedData[0],
      id: dataSource.id,
      institutionName: dataSource.institutionName,
      rId: dataSource.rId,
      remark: receivedData[5],
      reservoirName: receivedData[2],
      valueA: receivedData[3],
      valueB: dataSource.valueB,
      valueC: dataSource.valueC,
    };

    api.acidicReservoirSubmitEdit(condition).then((res) => {
      this.refs.tips.hide();
      const {errcode} = res;
      if (!errcode) {
        Toast.show('修改成功！');
        this.props.navigation.goBack();
        return;
      } else {
        Toast.show('修改失败！');
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
