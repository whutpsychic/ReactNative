import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import api from '../../api/index';
import Toast from '../../components/Toast';
import {putupData, run} from '../../core/common.js';

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
          {label: '新员工安全培训', value: 1},
          {label: '特种作业人员安全培训', value: 2},
          {label: '安管人员和主负责人取证培训', value: 3},
          {label: '安全环保消防专项培训', value: 4},
          {label: '其他培训', value: 5},
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
      const {searchText, type, date, date2, institution} = receivedData;
      let condition = {
        trainees: searchText,
        type: type && type[0] ? type[0] : undefined,
        start_date: date,
        end_date: date2,
        institutionId:
          institution && institution[0] ? institution[0] : undefined,
        isUpload: 1,
      };

      this.query(0, condition);
    }

    // 点击更多
    else if (etype === 'clickItem') {
      const {name, remarks, person, date, dataSource} = receivedData;
      putupData(this, {
        detail: {
          fieldContents: [
            {label: '单位名称', content: dataSource.institutionName},
            {label: '培训对象', content: dataSource.trainees},
            {
              label: '培训类型',
              content: transTypeToText(dataSource.trainingType),
            },
            {label: '培训人数', content: dataSource.traineesNumber},
            {label: '开始时间', content: dataSource.startTime},
            {label: '结束时间', content: dataSource.endTime},
            {label: '培训地点', content: dataSource.trainingPlace},
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
      .getEducatingStandBook({
        page,
        ps,
        ...conditions,
      })
      .then((res) => {
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
                remarks: item.remark,
                name: item.trainees,
                point: item.trainingPlace,
                personNumber: item.traineesNumber,
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
