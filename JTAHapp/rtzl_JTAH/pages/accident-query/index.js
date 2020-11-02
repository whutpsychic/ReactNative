import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import api from '../../api/index';
import Toast from '../../components/Toast';

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
    nomore: false,
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
      this.query();
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
      const {name, type, institution, date} = receivedData;
      let condition = {
        accidentType: type && type[0] ? type[0] : undefined,
        accidentName: name,
        accidentTime: date ? date.split('T')[0] : undefined,
        institutionId: institution ? institution[0] : undefined,
      };
      console.log(condition);
      this.query(0, condition);
    }

    // 点击更多
    else if (etype === 'clickItem') {
      const {
        name,
        type,
        unit,
        date,
        introduction,
        info,
        death,
        damage,
        hurts,
        isRelating,
        remarks,
        files,
      } = receivedData;
      this.postMessage({
        etype: 'data',
        detail: {
          name,
          type,
          unit,
          date,
          introduction,
          info,
          death,
          damage,
          hurts,
          isRelating,
          remarks,
          files,
        },
        loadingDetail: false,
      });
    }

     else if (etype === 'back-btn') {
      navigation.goBack();
    }
  };

  query = (page = 0, conditions = {}) => {
    if (!page) currPage = 0;

    api.getAccidentQueryList({page, ps, ...conditions}).then((res) => {
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
          this.setState({
            nomore: true,
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
            name: item.accidentName,
            type: transTypeToText(item.accidentType),
            unit: item.institutionName,
            date: item.accidentTime,
            introduction: item.accidentContent,
            info: item.accidentPunish,
            death: item.deathNumber,
            damage: item.hurtNumber,
            hurts: item.slightNumber,
            isRelating: item.relatedParties ? '是' : '否',
            remarks: item.remark,
            files:
              item.fileList instanceof Array
                ? item.fileList.map((_item) => {
                    return {
                      title: _item.name,
                      type: _item.file_type,
                      url: _item.url_pdf,
                    };
                  })
                : [],
            id: item.id,
          };
        });
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
    const {conditions, nomore} = this.state;
    if (nomore) {
      this.postMessage({
        etype: 'event',
        event: 'noMoreItem',
      });
      return;
    }
    this.query(++currPage, conditions);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Default;
