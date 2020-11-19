import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import Toast from '../../components/Toast/index';
import api from '../../api/index';

const pageUri = 'file:///android_asset/h5/news-overview/index.html';

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
      this.query();
    }

    //
    else if (etype === 'back-btn') {
      navigation.goBack();
    }
  };

  // 查询主数据列表
  query = () => {
    this.postMessage({
      etype: 'data',
      pageLoading: true,
      noContent: false,
    });
    const {
      route: {
        params: {id},
      },
    } = this.props;
    api.viewNewsDetail(id).then((res) => {
      console.log(res);
      const {errcode, errmsg, data} = res;

      // 超时
      if (errcode === 504) {
        Toast.show('请求超时!');
        this.postMessage({
          etype: 'data',
          pageLoading: false,
        });
        return;
      }

      // 成功
      else if (!errcode) {
        let files = this.postMessage({
          etype: 'data',
          pageLoading: false,
          title: data.newsName || '',
          author: data.createrUserName || '',
          date: data.newsTime,
          files:
            data.fileList instanceof Array
              ? data.fileList.map((item) => {
                  return {title: item.name, type: item.file_type};
                })
              : [],
          noContent: !data.content,
        });

        if (data.content)
          setTimeout(() => {
            this.postMessage({
              etype: 'event',
              event: 'loadNews',
              args: data.content,
            });
          }, 0);
      }

      // 失败
      else {
        Toast.show('请求失败了!');
        this.postMessage({
          etype: 'data',
          pageLoading: false,
        });
        return;
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