import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import Toast from '../../components/Toast/index';
import api from '../../api/index';

const pageUri = 'file:///android_asset/h5/fire-control-data-list/index.html';

const typeData = [
  '设计审查',
  '竣工验收',
  '消防检查',
  '设施维护',
  '培训演练',
  '其他',
];

// 根据数字判断类型字符串
const getType = (x) => {
  return typeData[x - 1];
};

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
      const {
        route: {params},
      } = this.props;
      console.log(params);
      const {
        unit,
        i,
        item: {institution_id},
      } = params;
      this.postMessage({
        etype: 'data',
        unit,
      });
      this.query({institution_id, data_type: i + 1, id: ''});
    }
    //
    else if (etype === 'onClickItem') {
      const {i, item} = receivedData;
      console.log(i);
      console.log(item);
    }
    //
    else if (etype === 'back-btn') {
      navigation.goBack();
    }
  };

  query = (conditions) => {
    this.postMessage({
      etype: 'data',
      pageLoading: true,
    });
    api.getFireControlDataList(conditions).then((res) => {
      console.log(res);
      const {errcode, errmsg, data = {}} = res;
      // 超时
      if (errcode === 504) {
        Toast.show('请求超时！');
        this.postMessage({
          etype: 'data',
          pageLoading: false,
        });
        return;
      }
      // 成功
      else if (!errcode) {
        // 没数据
        if (!data) {
          Toast.show('没有任何数据！');
          this.postMessage({
            etype: 'data',
            pageLoading: false,
            mainData: [],
          });
          return;
        }

        const {list = []} = data;
        let arr = list.map((item) => {
          return {
            name: item.data_name,
            unit: item.institution_unit,
            type: getType(item.data_type),
            person: item.creater_user_name,
            date: item.creater_time,
            remarks: item.remark,
            files: item.fileList.map((item) => {
              return {title: item.name, type: item.file_type};
            }),
          };
        });

        this.postMessage({
          etype: 'data',
          pageLoading: false,
          mainData: arr,
        });

        return;
      }
      // 失败
      else {
        Toast.show(`请求超时！${errmsg}`);
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
