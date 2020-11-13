import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import api from '../../api/index';
import Toast from '../../components/Toast';
import {putupData, run} from '../../core/common.js';

const pageUri = 'file:///android_asset/h5/law-standard/index.html';

let currPage = 0;
const ps = 20;

const transTypeToText = (x) => {
  switch (x) {
    case 1:
      return '安全';
    case 2:
      return '环保';
    case 3:
      return '职业卫生';
    default:
      return '未知类型';
  }
};

const transTypeToText2 = (x) => {
  switch (x) {
    case 1:
      return '法律法规';
    case 2:
      return '标准';
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
      putupData(this, {
        pageLoading: true,
        types: [
          {label: '全部', value: undefined},
          {label: '安全', value: 1},
          {label: '环保', value: 2},
          {label: '职业卫生', value: 3},
        ],
        types2: [
          {label: '全部', value: undefined},
          {label: '法律法规', value: 1},
          {label: '标准', value: 2},
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
      const {searchText, type, type2, string} = receivedData;
      let condition = {
        name: searchText,
        classify: type && type[0] ? type[0] : undefined,
        category: type2 && type2[0] ? type2[0] : undefined,
        versionNumber: string,
      };

      this.query(0, condition);
    }

    // 点击更多
    else if (etype === 'clickItem') {
      const {name, remarks, person, date, dataSource} = receivedData;
      putupData(this, {
        detail: {
          fieldContents: [
            {label: '名称', content: dataSource.name},
            {
              label: '分类',
              content: transTypeToText(dataSource.classify),
            },
            {
              label: '类别',
              content: transTypeToText2(dataSource.category),
            },
            {label: '发布时间', content: dataSource.publishTime},
            {label: '实施时间', content: dataSource.effectiveTime},
            {label: '版本号/文号', content: dataSource.versionNumber},
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
      .getLawStandardList({
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
                name: item.name,
                type: transTypeToText(item.classify),
                time: item.publishTime,
                dataSource: item,
              };
            })
            .reverse();

          run(this, 'loadListData', dataArr);
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
