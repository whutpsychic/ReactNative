import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import api from '../../api/index';
import Toast from '../../components/Toast';
import {putupData, run} from '../../core/common.js';

const pageUri = 'file:///android_asset/h5/acidic-reservoir-info/index.html';

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
      const {searchText, startTime, endTime, institutions} = receivedData;
      let condition = {
        beginTime: startTime,
        overTime: endTime,
        reservoirName: searchText,
        institutionId: institutions ? institutions[0] : undefined,
      };
      this.query(0, condition);
    }

    // 点击更多
    else if (etype === 'clickItem') {
      const {name, unit, dataSource} = receivedData;
      putupData(this, {
        detail: {
          fieldContents: [
            {label: '水库名称', content: name},
            {label: '上报单位', content: unit},
            {label: '水库水位/m', content: dataSource.valueA},
            {label: '距溢流口高度', content: dataSource.valueB},
            {label: '日期', content: dataSource.date},
            {label: '备注', content: dataSource.remark, multiLines: true},
          ],
        },
      });
    } else if (etype === 'onAdd') {
      navigate('acidic_reservoir_edit', {
        title: '酸性水库记录-新增',
        type: 'add',
      });
    } else if (etype === 'edit') {
      navigate('acidic_reservoir_edit', {
        title: '酸性水库记录-编辑',
        type: 'edit',
        dataSource: receivedData.dataSource,
      });
    } else if (etype === 'back-btn') {
      navigation.goBack();
    }
  };

  query = (page = 0, conditions = {}) => {
    if (!page) currPage = 0;

    api.getAcidicReservoirInfoList({page, ps, ...conditions}).then((res) => {
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
        }

        putupData(this, {pageLoading: false});
        run(this, 'listLoaded');

        let dataArr = data.list
          .map((item) => {
            return {
              name: item.reservoirName,
              unit: item.institutionName,
              remarks: item.remark,
              date: item.date,
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
    const {conditions} = this.state;
    this.query(++currPage, conditions);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Default;
