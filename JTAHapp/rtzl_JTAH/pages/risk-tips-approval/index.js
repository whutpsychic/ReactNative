import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import Toast from '../../components/Toast/index';
import api from '../../api/index';
import moment from 'moment';

const pageUri = 'file:///android_asset/h5/risk-tips-approval/index.html';

let currPage = 0;
const ps = 20;

// 根据类型渲染文字
const typeToWord = (x) => {
  switch (x) {
    case 1:
      return '历史今天';
    case 2:
      return '风险提示';
    default:
      return '未知类型';
  }
};

const statusToWord = (x) => {
  switch (x) {
    case 1:
      return '待编制';
    case 2:
      return '待审批';
    case 3:
      return '待发布';
    case 4:
      return '被撤回';
    case 5:
      return '已发布';
    default:
      return '未知状态';
  }
};

// 渲染流程状态
const renderState = ({nodeState, updatedState, rejectState}) => {
  if (nodeState === 1) return '提交';
  if (nodeState !== 1 && rejectState === 1) return '同意';
  if (rejectState === 2 || updatedState === 4) return '拒绝';
  if (nodeState === 1 && rejectState === 2) return '被撤回';
  if (nodeState === 5) return '发布';
};

// 渲染多长时间
const formatDuration = (milliseconds) => {
  const seconds = milliseconds / 1000;
  const oneDay = 24 * 60 * 60;
  const oneHour = 60 * 60;
  const oneMinute = 60;
  const d = Math.floor(seconds / oneDay);
  const h = Math.floor((seconds - d * oneDay) / oneHour);
  const m = Math.floor((seconds - d * oneDay - h * oneHour) / oneMinute);
  const s = seconds - d * oneDay - h * oneHour - m * oneMinute;
  const moreThanOneDay = seconds >= oneDay;
  const moreThanOneHour = seconds >= oneHour;
  const moreThanOneMinute = seconds >= oneMinute;

  if (moreThanOneDay) return d + '天 ';
  if (moreThanOneHour) return h + '小时' + (!!m ? m + '分钟' : '');
  if (moreThanOneMinute) return m + '分钟';
  if (seconds >= 1) return s + '秒';
  return '0';
};

class Default extends React.Component {
  state = {
    conditions: {},
  };

  componentDidMount() {}

  postMessage = (obj) => {
    this.refs.webview.postMessage(JSON.stringify(obj));
  };

  error = (text) => {
    Toast.show(text);
    this.postMessage({
      etype: 'data',
      pageLoading: false,
    });
    this.postMessage({
      etype: 'event',
      event: 'listLoaded',
    });
    return;
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
      // 加载机构数据
      api.getInstitutions().then((res) => {
        const {errcode, errmsg, data} = res;
        // 成功
        if (!errcode) {
          // 没数据
          if (!data || !data.title) {
            Toast.show('机构数据竟然没有任何数据！');
            return;
          }

          // 有数据
          this.postMessage({
            etype: 'data',
            institutions: [data],
          });
        }
        // 超时
        else if (errcode === 504) {
          Toast.show('机构数据请求超时！');
          return;
        }
        // 错误
        else {
          Toast.show('机构数据查询失败！');
          return;
        }
      });

      this.postMessage({
        etype: 'data',
        pageLoading: true,
      });

      this.query();
    }
    //条件查询
    else if (etype === 'onChangeConditions') {
      this.postMessage({
        etype: 'data',
        pageLoading: true,
      });
      const {date, institution, name, status, type} = receivedData;

      let conditions = {
        institutionId: institution ? institution[0] : undefined,
        newsType: typeof type === 'number' ? type : type[0],
        newsTime: moment(date).valueOf(),
        newsName: name,
        flowState: status ? status + 1 : undefined,
      };
      this.query(0, conditions);
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

    // 点击单项
    else if (etype === 'onClickItem') {
      const {serviceId, name, type, person, status, remarks} = receivedData;
      this.postMessage({
        etype: 'data',
        detail: {
          fieldContents: [
            {label: '单位名称', content: name},
            {label: '分类', content: type},
            {label: '发布人', content: person},
            {label: '当前状态', content: status},
            {
              label: '提示内容',
              multiLines: true,
              content: remarks,
            },
          ],
          files: [],
        },
      });
    }

    // 查看流程
    else if (etype === 'onViewProccess') {
      const {serviceId, flowId} = receivedData;
      this.queryProccess({serviceId, flowInfoId: flowId});
    }

    // 审核通过
    else if (etype === 'pass') {
      const {serviceId, flowId, comments} = receivedData;
      api.riskTipsApprovalPass({serviceId, flowInfoId: flowId}).then((res) => {
        const {errcode, errmsg} = res;
        if (!errcode) {
          Toast.show('审核成功通过!');
        } else {
          Toast.show('网络连接有问题，请稍后再试');
          return;
        }
      });
    }

    // 审核驳回
    else if (etype === 'reject') {
      const {serviceId, flowId, comments} = receivedData;
      api
        .riskTipsApprovalReject({serviceId, flowInfoId: flowId})
        .then((res) => {
          const {errcode, errmsg} = res;
          if (!errcode) {
            Toast.show('审核成功驳回!');
          } else {
            Toast.show('网络连接有问题，请稍后再试');
            return;
          }
        });
    }

    //
    else if (etype === 'back-btn') {
      navigation.goBack();
    }
  };

  // 查询流程数据
  queryProccess = ({serviceId, flowInfoId}) => {
    this.postMessage({
      etype: 'data',
      proccessData: [],
    });
    this.postMessage({
      etype: 'event',
      event: 'proccessLoading',
    });
    api.viewRiskTipsApprovalProccess({serviceId, flowInfoId}).then((res) => {
      console.log(res);
      const {errcode, errmsg, data} = res;

      // 超时
      if (errcode === 504) {
        Toast.show('流程数据请求超时！');
      }
      // 成功
      else if (!errcode) {
        // 没数据
        if (!data || !data.length) {
          Toast.show('没有任何流程数据！');
          this.postMessage({
            etype: 'event',
            event: 'proccessLoaded',
          });
          return;
        }

        // 有数据
        this.postMessage({
          etype: 'data',
          proccessData: data.map((item) => {
            return {
              title: item.nodeName,
              status: renderState(item),
              opinion: item.comments,
              date: item.flowDate,
              cost: formatDuration(item.interval),
              person: item.userNameList.join(','),
            };
          }),
        });
        this.postMessage({
          etype: 'event',
          event: 'proccessLoaded',
        });
      }

      // 失败
      else {
        Toast.show('流程数据请求失败!');
      }
    });
  };

  query = (page = 0, conditions = {}, bool) => {
    if (!page) currPage = 0;
    api.getRiskTipsApproval({page, ps, ...conditions}).then((res) => {
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
            id: item.id,
            flowId: item.flowId,
            serviceId: item.serviceId,
            name: item.institutionName,
            remarks: item.content,
            person: item.createrUserName,
            status: statusToWord(item.status),
            type: typeToWord(item.type),
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
