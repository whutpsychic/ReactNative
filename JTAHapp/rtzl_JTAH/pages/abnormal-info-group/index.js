import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import api from '../../api/index';
import Toast from '../../components/Toast';
import {putupData, run} from '../../core/common.js';

const pageUri = 'file:///android_asset/h5/abnormal-info-group/index.html';

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
            types: [
              {label: '全部', value: undefined},
              {label: '未处置', value: 0},
              {label: '已处置', value: 1},
            ],
            institutions: [{title: '全部', key: undefined}, ...data],
          });
        } else {
          Toast.show('机构数据竟然查询失败了');
          return;
        }
      });

      putupData(this, {pageLoading: true});
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
      putupData(this, {pageLoading: true});
      const {searchText, type, institutions} = receivedData;
      let condition = {
        factorName: searchText,
        checkStatus: type && type[0] ? type[0] : undefined,
        institutionId:
          institutions && institutions[0] ? institutions[0] : undefined,
      };
      this.query(0, condition);
    }

    // 点击更多
    else if (etype === 'clickItem') {
      const {name, unit, remarks, dataSource} = receivedData;
      putupData(this, {
        detail: {
          fieldContents: [
            {label: '单位名称', content: dataSource.institutionName},
            {label: '参数名称', content: dataSource.factorsName},
            {label: '监测地点', content: dataSource.areaName},
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

    api.getAbnormalInfoGroupList({page, ps, ...conditions}).then((res) => {
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
          run(this, 'loadListData', []);
          this.error('没有任何数据');
          return;
        }

        if (data.list.length < ps) {
          run(this, 'noMoreItem');
          this.setState({
            nomore: true,
          });
        }

        putupData(this, {pageLoading: false});
        run(this, 'listLoaded');

        let dataArr = data.list
          .map((item) => {
            return {
              name: item.areaName,
              unit: item.institutionName,
              remarks: item.remark,
              status: transStatusToText(item.checkStatus),
              time: `${item.startTime}-${item.endTime}`,
              dataSource: item,
            };
          })
          .reverse();

        if (!page) {
          run(this, 'loadListData', dataArr);
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
    const {conditions, nomore} = this.state;
    if (nomore) {
      run(this, 'noMoreItem');
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
