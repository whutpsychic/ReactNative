import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import api from '../../api/index';
import Toast from '../../components/Toast';

const pageUri = 'file:///android_asset/h5/educating-stand-book/index.html';

let currPage = 0;
const ps = 20;

const transTypeToText = (x) => {
  switch (x) {
    case 1:
      return '新员工安全培训';
    case 2:
      return '特种作业人员';
    case 3:
      return '安管员/主负责人取证';
    case 4:
      return '安环消防专项培训';
    case 5:
      return '其他培训';
    default:
      return '未知类型';
  }
};

const transDateToTag = (date) => {
  let now = new Date().getTime();
  let limit = Date.parse(date);

  if (now > limit) {
    return '已过期';
  } else if (now >= limit - 90 * 24 * 60 * 60 * 1000) {
    return '即将到期';
  } else {
    return '期限内';
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
      const {institution, name, date1, date2, type} = receivedData;
      let condition = {
        institutionId: institution && institution[0] ? institution[0] : undefined,
        startTime: date1 ? date1.split('T')[0] : undefined,
        endTime: date2 ? date2.split('T')[0] : undefined,
        trainees: name,
        type: type && type[0] ? type[0] : undefined,
      };
      this.query(0, condition);
    }

    // 点击更多
    else if (etype === 'clickItem') {
      const {
        unit,
        object,
        type,
        number,
        date1,
        date2,
        area,
        remarks,
        id,
      } = receivedData;
      this.postMessage({
        etype: 'data',
        detail: {
          unit,
          object,
          type,
          number,
          date1,
          date2,
          area,
          remarks,
          id,
        },
        loadingDetail: false,
      });
    } else if (etype === 'back-btn') {
      navigation.goBack();
    }
  };

  query = (page = 0, conditions = {}, bool) => {
    if (!page) currPage = 0;

    api.getEducatingStandBook({page, ps, ...conditions}).then((res) => {
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
            name:item.institutionName,
            unit: item.institutionName,
            object: item.trainees,
            type: transTypeToText(item.trainingType),
            number: item.traineesNumber,
            date1: item.startTime,
            date2: item.endTime,
            area: item.trainingPlace,
            remarks: item.remark,
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
