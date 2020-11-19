import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import api from '../../api/index';
import Toast from '../../components/Toast';
import {putupData, run} from '../../core/common.js';

const pageUri = 'file:///android_asset/h5/relationship-info/index.html';

let currPage = 0;
const ps = 20;

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
        party_name: searchText,
      };

      this.query(0, condition);
    }

    // 点击更多
    else if (etype === 'clickItem') {
      const {name, remarks, person, date, dataSource} = receivedData;
      putupData(this, {
        detail: {
          fieldContents: [
            {label: '单位', content: dataSource.institution_unit},
            {label: '相关方名称', content: dataSource.party_name},
            {label: '主要承接内容', content: dataSource.party_duty},
            {label: '上传人', content: dataSource.creater_user_name},
            {label: '上传时间', content: dataSource.creater_time},
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
      .getRelationshipInfoList({
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
                name: item.party_name,
                person: item.creater_user_name,
                time: item.creater_time,
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