import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import api from '../../api/index';
import Toast from '../../components/Toast';

const pageUri = 'file:///android_asset/h5/risk-grade-control-list/index.html';

let currPage = 0;
const ps = 20;

class Default extends React.Component {
  state = {};

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
      const {
        route: {
          params: {title},
        },
      } = this.props;
      this.postMessage({
        etype: 'data',
        pageLoading: true,
        title: title,
      });
      this.query();
    }

    // 当改变查询条件的时候
    else if (etype === 'onChangeConditions') {
      this.postMessage({
        etype: 'data',
        pageLoading: true,
      });
      const {searchText} = receivedData;
      let condition = {risk_type: searchText};
      this.query(0, condition);
    }

    //下拉刷新
    else if (etype === 'onRefreshList') {
      this.query();
    }

    // 底部加载更多
    else if (etype === 'onEndReached') {
      this.getMore();
    }

    // 点击更多
    else if (etype === 'clickItem') {
      const {
        date,
        files,
        person,
        remarks,
        unit,
        name,
        dataSource,
      } = receivedData;
      this.postMessage({
        etype: 'data',
        detail: {
          fieldContents: [
            {label: '上报单位', content: unit},
            {label: '文件名称', content: name},
            {label: '上传日期', content: date},
            {label: '上传人', content: person},
            {label: '备注', content: remarks},
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
    // 点击预览附件(pdf)
    else if (etype === 'onClickFileItem') {
      navigate('pdf', {url: receivedData.url});
    } else if (etype === 'back-btn') {
      navigation.goBack();
    }
  };

  query = (page = 0, conditions = {}) => {
    this.setState({
      conditions,
    });
    if (!page) currPage = 0;
    const {
      route: {
        params: {title, identity},
      },
    } = this.props;
    api
      .getRiskGradeControlDataList({
        page,
        ps,
        institution_id: identity,
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
            this.postMessage({
              etype: 'event',
              event: 'loadListData',
              args: [],
            });
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

          if (!page) {
            this.postMessage({
              etype: 'event',
              event: 'loadListData',
              args: data.list.map((item) => {
                return {
                  name: item.title_name,
                  unit: title,
                  remarks: item.remark,
                  person: item.creater_user_name,
                  date: item.creater_time,

                  dataSource: item,
                };
              }),
            });
            return;
          } else {
            this.postMessage({
              etype: 'event',
              event: 'setListData',
              args: data.list.map((item) => {
                return {
                  name: item.title_name,
                  unit: title,
                  remarks: item.remark,
                  person: item.creater_user_name,
                  date: item.creater_time,

                  dataSource: item,
                };
              }),
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
