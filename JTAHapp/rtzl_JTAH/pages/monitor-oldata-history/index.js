import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import api from '../../api/index';
import Toast from '../../components/Toast';

const pageUri = 'file:///android_asset/h5/monitor-oldata-history/index.html';

let currPage = 0;
const ps = 20;

const transStatusToText = (x) => {
  switch (x) {
    case 0:
      return '未处置';
    case 1:
      return '已处置';
    default:
      return '未知状态';
  }
};

class Default extends React.Component {
  state = {
    conditions: {},
  };

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
    this.postMessage({
      etype: 'event',
      event: 'listLoaded',
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
      api.getInstitutionsDepartment().then((data) => {
        console.log(data);
        if (data)
          this.postMessage({
            etype: 'data',
            institutions: data,
          });
      });

      this.postMessage({
        etype: 'data',
        pageLoading: true,
      });
      this.query();
    }
    //下拉刷新
    else if (etype === 'onRefreshList') {
      this.setState({
        conditions: {},
      });
      this.query(0, {});
    }

    // 底部加载更多
    else if (etype === 'onEndReached') {
      this.getMore();
    }

    // 当改变查询条件的时候
    else if (etype === 'onChangeConditions') {
      this.postMessage({
        etype: 'data',
        pageLoading: true,
      });
      const {institution, type, type2} = receivedData;
      let condition = {
        institutionId:
          institution && institution[0] ? institution[0] : undefined,
        avgType: type && type[0] ? type[0] : undefined,
        type: type2,
      };
      this.query(0, condition);
    }

    // 点击更多
    else if (etype === 'clickItem') {
      this.postMessage({
        etype: 'data',
        detail: {
          ...receivedData,
        },
        loadingDetail: false,
      });
    } else if (etype === 'back-btn') {
      navigation.goBack();
    }
  };

  query = (page = 0, conditions = {}, bool) => {
    if (!page) currPage = 0;

    api.getMonitorOlDataList({page, ps, ...conditions}).then((res) => {
      console.log(res);
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
          this.postMessage({
            etype: 'event',
            event: 'loadListData',
            args: [],
          });
          this.error('没有任何数据');
          return;
        }

        if (data.list.length < ps) {
          this.postMessage({
            etype: 'event',
            event: 'noMoreItem',
          });
        }

        this.postMessage({
          etype: 'data',
          pageLoading: false,
        });
        this.postMessage({
          etype: 'event',
          event: 'listLoaded',
        });

        let dataArr = data.list.map((item) => {
          return {
            name: item.areaName,
            enterprise: item.institutionName,
            time: item.dataTime,
            stream: item.liuliang,
            ph: item.ph,
            oxygen: item.xuyang,
            AN: item.andan,
            id: item.id,
          };
        });
        if (bool) {
          this.postMessage({
            etype: 'event',
            event: 'setListData',
            args: dataArr,
          });
          return;
        }
        console.log(dataArr);
        this.postMessage({
          etype: 'event',
          event: 'loadListData',
          args: dataArr,
        });
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
    this.query(++currPage, conditions, true);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Default;
