import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import api from '../../api/index';
import Toast from '../../components/Toast';

const pageUri = 'file:///android_asset/h5/abnormal-info-enterprise/index.html';

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

let currPage = 0;
const ps = 20;

class Default extends React.Component {
  state = {
    conditions: {},
    nomore: false,
    institutions: [],
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.query();
    });
  }

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
          this.postMessage({
            etype: 'data',
            institutions: [{title: '全部', key: undefined}, ...data],
          });
        } else {
          Toast.show('机构数据竟然查询失败了');
          return;
        }
      });

      this.postMessage({
        etype: 'data',
        pageLoading: true,
      });
      this.query();
    }
    //下拉刷新
    else if (etype === 'onRefreshList') {
      this.query();
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
      const {searchText, status, institutions} = receivedData;
      let condition = {
        checkStatus: status && status[0] ? status[0] : undefined,
        factorName: searchText,
        institutionId:
          institutions && institutions[0] ? institutions[0] : undefined,
      };
      this.query(0, condition);
    }

    // 点击更多
    else if (etype === 'clickItem') {
      const {name, unit, remarks, dataSource} = receivedData;
      this.postMessage({
        etype: 'data',
        detail: {
          fieldContents: [
            {label: '单位名称', content: unit},
            {label: '监测地点', content: dataSource.areaName},
            {label: '参数名称', content: name},
            {label: '监测时间', content: dataSource.endTime},
            {
              label: '异常时段',
              content: `${dataSource.startTime} 至 ${dataSource.endTime}`,
              multiLines: true,
            },
            {label: '状态', content: transStatusToText(dataSource.checkStatus)},
            {label: '备注', content: remarks},
          ],
        },
      });
    } else if (etype === 'edit') {
      navigate('abnormal_info_enterprise_edit', {
        title: '异常信息(企业)-编辑',
        dataSource: receivedData.dataSource,
      });
    } else if (etype === 'back-btn') {
      navigation.goBack();
    }
  };

  query = (page = 0, conditions = {}) => {
    this.setState({
      conditions,
    });
    if (!page) currPage = 0;

    api.getAbnormalInfoEnterpriseList({page, ps, ...conditions}).then((res) => {
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
          this.setState({
            nomore: true,
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

        let dataArr = data.list
          .map((item) => {
            return {
              name: item.areaName,
              unit: item.institutionName,
              remarks: item.remark,
              status: transStatusToText(item.checkStatus),
              date: `${item.startTime}-${item.endTime}`,
              dataSource: item,
            };
          })
          .reverse();

        if (!page) {
          this.postMessage({
            etype: 'event',
            event: 'loadListData',
            args: dataArr,
          });
        } else {
          this.postMessage({
            etype: 'event',
            event: 'setListData',
            args: dataArr,
          });
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
    const {conditions, nomore} = this.state;
    if (nomore) {
      this.postMessage({
        etype: 'event',
        event: 'noMoreItem',
      });
      return;
    }
    this.query(++currPage, conditions);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Default;
