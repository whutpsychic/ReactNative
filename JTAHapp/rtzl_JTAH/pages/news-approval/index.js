import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import Toast from '../../components/Toast/index';
import api from '../../api/index';
import moment from 'moment';

const pageUri = 'file:///android_asset/h5/news-approval/index.html';

// 根据类型渲染文字
const typeToWord = (x) => {
  switch (x) {
    case 1:
      return '安全';
    case 2:
      return '环保';
    case 3:
      return '消防';
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
      // 加载机构数据
      api.getInstitutions().then((res) => {
        const {errcode, errmsg, data} = res;
        // 成功
        if (!errcode) {
          // 没数据
          if (!data || !data.title) {
            Toast.show('机构数据竟然没有任何数据！');
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
      // 加载类型数据
      this.postMessage({
        etype: 'data',
        types: [
          {label: '安全', value: 1},
          {label: '环保', value: 2},
          {label: '消防', value: 3},
        ],
      });

      this.query({flowState: 1});
    }
    //条件查询
    else if (etype === 'onChangeConditions') {
      const {date, institution, name, status, type} = receivedData;
      let conditions = {
        institutionId: institution ? institution[0] : undefined,
        newsType: typeof type === 'number' ? type : type[0],
        newsTime: moment(date).valueOf(),
        newsName: name,
        flowState: status ? status + 1 : undefined,
      };
      this.query(conditions);
    }
    // 点击单项
    else if (etype === 'onClickItem') {
      const {serviceId} = receivedData;
      api.getNewsDetail(serviceId).then((res) => {
        console.log(res);
        const {errcode, errmsg, data} = res;

        //超时
        if (errcode === 504) {
          Toast.show('请求超时了');
          return;
        }

        // 成功
        else if (!errcode && data) {
          const {newsName, institutionName, newsType, createrUserName} = data;
          const {newsTime, publishTime, statusDes, cover, content} = data;
          const {fileList, nowNode, updatedNode, status} = data;
          const {id, flowId} = data;
          console.log(data);

          this.postMessage({
            etype: 'data',
            detailData: {
              serviceId: id,
              flowId,
              approvalable:
                nowNode == updatedNode && status != 5 ? true : false,
              name: newsName,
              unit: institutionName,
              type: typeToWord(newsType),
              person: createrUserName,
              orgDate: newsTime,
              publishDate: publishTime,
              status: statusDes,
              img: cover && cover.length ? cover[0].url : '',
              contents: content,
              files: fileList
                ? fileList.map((item) => {
                    return {title: item.name, type: item.file_type};
                  })
                : null,
            },
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
      const {serviceId, flowId} = receivedData;
      this.queryProccess({serviceId, flowInfoId: flowId});
    } else if (etype === 'onOverview') {
      const {serviceId} = receivedData;
      navigate('news_overview', {id: serviceId});
    }

    // 审核通过
    else if (etype === 'pass') {
      const {serviceId, flowId, comments} = receivedData;
      api.newsApprovalPass({serviceId, flowInfoId: flowId}).then((res) => {
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
      api.newsApprovalReject({serviceId, flowInfoId: flowId}).then((res) => {
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

  // 查询主数据列表
  query = (conditions) => {
    this.postMessage({
      etype: 'data',
      pageLoading: true,
    });
    api.getNewsApprovalList({...conditions}).then((res) => {
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
        if (!data.list || !data.list.length) {
          Toast.show('没有任何数据！');
          this.postMessage({
            etype: 'data',
            pageLoading: false,
          });
          return;
        }

        const {list} = data;

        let mainData = list.map((item, i) => {
          return {
            id: item.id,
            flowId: item.flowId,
            serviceId: item.serviceId,
            name: item.newsName,
            unit: item.institutionName,
            type: typeToWord(item.newsType),
            person: item.createrUserName || '',
            orgDate: item.newsTime,
            publishDate: item.publishTime,
            status: item.statusDes,
          };
        });

        this.postMessage({
          etype: 'data',
          pageLoading: false,
          mainData,
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
    api.viewNewsApprovalProccess({serviceId, flowInfoId}).then((res) => {
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Default;
