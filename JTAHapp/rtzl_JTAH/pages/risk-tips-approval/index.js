import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import Toast from '../../components/Toast/index';
import api from '../../api/index';
import {putupData, run} from '../../core/common.js';
import moment from 'moment';

const pageUri = 'file:///android_asset/h5/risk-tips-approval/index.html';

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

let ps = 20;
let currPage = 0;

class Default extends React.Component {
  state = {conditions: {}, currItem: {}};

  componentDidMount() {}

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
        if (data) {
          putupData(this, {institutions: data});
        } else {
          Toast.show('机构数据竟然查询失败了');
          return;
        }
      });

      putupData(this, {pageLoading: true});
      this.query();
    }
    //条件查询
    else if (etype === 'onChangeConditions') {
      const {searchText, institutions, type, status, time} = receivedData;
      let conditions = {
        institutionId: institutions ? institutions[0] : undefined,
        newsType: typeof type === 'number' ? type : undefined,
        newsTime: time,
        newsName: searchText,
        flowState: status ? status[0] : undefined,
      };
      this.query(0, conditions);
    }
    // 点击单项
    else if (etype === 'onClickItem') {
      const {
        dataSource,
        dataSource: {serviceId, flowId},
      } = receivedData;

      putupData(this, {
        approvalable: false, //默认先不允许审批
        detail: {
          fieldContents: [
            {label: '发布单位', content: dataSource.institutionName},
            {label: '标题', content: dataSource.newsName},
            {label: '分类', content: typeToWord(dataSource.newsType)},
            {label: '编制人', content: dataSource.createrUserName},
            {label: '编制时间', content: dataSource.newsTime},
            {label: '发布时间', content: dataSource.publishTime},
            {label: '审批状态', content: dataSource.statusDes},
          ],
          files: dataSource.fileList
            ? dataSource.fileList.map((item) => {
                return {title: item.name, type: item.file_type};
              })
            : null,
        },
      });

      // 本地记录当前数据条
      this.setState({
        currItem: {
          serviceId,
          flowId,
        },
      });

      api.getNewsDetail(serviceId).then((res) => {
        const {errcode, errmsg, data} = res;
        //超时
        if (errcode === 504) {
          Toast.show('请求超时了');
          return;
        }
        // 成功
        else if (!errcode && data) {
          const {nowNode, updatedNode, status} = data;
          putupData(this, {
            approvalable: nowNode == updatedNode && status != 5 ? true : false,
          });
        }

        // 失败
        else {
          Toast.show(`请求失败了：${errmsg}`);
          return;
        }
      });
    }

    // 查看流程
    else if (etype === 'onViewProccess') {
      const {serviceId, flowId} = this.state.currItem;
      this.queryProccess({serviceId, flowInfoId: flowId});
    }
    // 预览
    else if (etype === 'onPreview') {
      const {serviceId} = this.state.currItem;
      navigate('news_overview', {id: serviceId});
    }

    // 审核通过
    else if (etype === 'pass') {
      const {serviceId, flowId} = this.state.currItem;
      const {comments} = receivedData;
      api
        .riskTipsApprovalPass({serviceId, flowInfoId: flowId, comments})
        .then((res) => {
          const {errcode, errmsg} = res;
          if (!errcode) {
            Toast.show('审核成功通过!');
            run(this, 'hideDetail');
            this.query();
          } else {
            Toast.show('网络连接有问题，请稍后再试');
            return;
          }
        });
    }

    // 审核驳回
    else if (etype === 'reject') {
      const {serviceId, flowId} = this.state.currItem;
      api
        .riskTipsApprovalReject({serviceId, flowInfoId: flowId})
        .then((res) => {
          const {errcode, errmsg} = res;
          if (!errcode) {
            Toast.show('审核成功驳回!');
            run(this, 'hideDetail');
            this.query();
          } else {
            Toast.show('网络连接有问题，请稍后再试');
            return;
          }
        });
    }

    //下拉刷新
    else if (etype === 'onRefreshList') {
      this.query();
    }

    // 底部加载更多
    else if (etype === 'onEndReached') {
      this.getMore();
    }

    //
    else if (etype === 'back-btn') {
      navigation.goBack();
    }
  };

  endLoad = () => {
    putupData(this, {pageLoading: false});
    run(this, 'listLoaded');
  };

  // 查询主数据列表
  query = (page = 0, conditions = {}) => {
    if (!page) currPage = 0;
    putupData(this, {pageLoading: true});
    api.getRiskTipsApproval({ofs: page, ps, ...conditions}).then((res) => {
      console.log(res);
      const {errcode, errmsg, data = {}} = res;
      // 超时
      if (errcode === 504) {
        Toast.show('请求超时！');
        this.endLoad();
        return;
      }
      // 成功
      else if (!errcode) {
        // 没数据
        if (!data || !data.list || !data.list.length) {
          Toast.show('没有任何数据！');
          this.endLoad();
          return;
        }

        const {list = []} = data;

        let mainData = list
          .map((item, i) => {
            return {
              name: item.newsName,
              person: item.createrUserName || '',
              remarks: item.remark,
              time: item.createrTime,
              status: item.statusDes,
              dataSource: item,
            };
          })
          .reverse();

        this.endLoad();

        if (mainData.length < ps) {
          run(this, 'noMoreItem');
        }

        if (!page) {
          run(this, 'loadListData', mainData);
        } else {
          run(this, 'setListData', mainData);
        }
      }
      // 失败
      else {
        Toast.show(`请求失败！${errmsg}`);
        this.endLoad();
        return;
      }
    });
  };

  getMore = () => {
    const {conditions} = this.state;
    this.query(++currPage, conditions);
  };

  // 查询流程数据
  queryProccess = ({serviceId, flowInfoId}) => {
    putupData(this, {proccessData: []});
    run(this, 'proccessLoading');
    api.viewRiskTipsApprovalProccess({serviceId, flowInfoId}).then((res) => {
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
          run(this, 'proccessLoaded');
          return;
        }

        // 有数据
        putupData(this, {
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
        run(this, 'proccessLoaded');
      }

      // 失败
      else {
        Toast.show('流程数据请求失败!');
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
