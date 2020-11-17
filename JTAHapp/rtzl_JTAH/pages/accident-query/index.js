import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import api from '../../api/index';
import Toast from '../../components/Toast';
import {putupData, run} from '../../core/common.js';

const pageUri = 'file:///android_asset/h5/accident-query/index.html';

let currPage = 0;
const ps = 20;

const transTypeToText = (x) => {
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

class Default extends React.Component {
  state = {
    conditions: {},
  };

  componentDidMount() {}

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
      api.getInstitutionsDepartment().then((data) => {
        if (data) {
          putupData(this, {
            institutions: [{title: '全部', key: undefined}, ...data],
          });
        } else {
          Toast.show('机构数据竟然查询失败了');
        }
      });

      putupData(this, {
        pageLoading: true,
        types: [
          {label: '全部', value: undefined},
          {label: '安全', value: 1},
          {label: '环保', value: 2},
          {label: '消防', value: 3},
        ],
      });
      this.query();
    }
    //下拉刷新
    else if (etype === 'onRefreshList') {
      const {conditions} = this.state;
      this.query(0, conditions);
    }

    // 底部加载更多
    else if (etype === 'onEndReached') {
      this.getMore();
    }

    // 当改变查询条件的时候
    else if (etype === 'onChangeConditions') {
      putupData(this, {pageLoading: true});
      const {searchText, type, institution, date} = receivedData;
      let condition = {
        institutionId:
          institution && institution[0] ? institution[0] : undefined,
        accidentType: type && type[0] ? type[0] : undefined,
        publishTime: date,
        accidentName: searchText,
      };

      this.query(0, condition);
    }

    // 点击更多
    else if (etype === 'clickItem') {
      const {name, remarks, person, date, dataSource} = receivedData;
      putupData(this, {
        detail: {
          fieldContents: [
            {label: '责任单位', content: dataSource.institutionName},
            {
              label: '事故类型',
              content: transTypeToText(dataSource.accidentType),
            },
            {
              label: '事故名称',
              content: dataSource.accidentName,
            },
            {label: '发生时间', content: dataSource.accidentTime},
            {label: '死亡', content: dataSource.deathNumber},
            {label: '重伤', content: dataSource.hurtNumber},
            {label: '轻伤', content: dataSource.slightNumber},
            {
              label: '是相关方事故',
              content: dataSource.relatedParties ? '是' : '否',
            },
            {
              label: '事故简介',
              content: dataSource.accidentContent,
              multiLines: true,
            },
            {
              label: '处理情况',
              content: dataSource.accidentPunish,
              multiLines: true,
            },
            {label: '备注', content: dataSource.remark, multiLines: true},
          ],
          files:
            dataSource.fileList instanceof Array
              ? dataSource.fileList.map((_item) => {
                  return {
                    title: _item.name,
                    type: _item.file_type,
                    url: _item.url_pdf,
                  };
                })
              : [],
        },
      });
    }
    // 点击浏览文件
    else if (etype === 'onClickFileItem') {
      const {title, url} = receivedData;
      navigate('pdf', {url, title});
    } else if (etype === 'back-btn') {
      navigation.goBack();
    }
  };

  query = (page = 0, conditions = {}) => {
    if (!page) currPage = 0;
    this.setState({conditions});
    api
      .getAccidentQueryList({
        page,
        ps,
        ...conditions,
      })
      .then((res) => {
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
            this.error('没有任何数据');
            run(this, 'loadListData', []);
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
                remarks: item.institutionName,
                name: item.accidentName,
                date: item.accidentTime,
                isHell: item.relatedParties ? '是' : '否',
                dataSource: item,
              };
            })
            .reverse();

          if (!page) {
            run(this, 'loadListData', dataArr);
            return;
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
