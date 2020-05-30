import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {WebView} from 'react-native-webview';
import api from '../../api/index';
import Tips from '../../components/Tips/index';
import {connect} from 'react-redux';
import {login} from '../../redux/actions.js';

const uri = 'file:///android_asset/h5/jianpeidan-detail/index.html';

class Default extends React.MyPage {
  onLoad() {}

  render() {
    return (
      <React.Fragment>
        <StatusBar barStyle={'dark-content'} />
        <View style={styles.container}>
          <WebView
            ref="webview"
            style={{flex: 1}}
            originWhitelist={['*']}
            source={{uri}}
            // injectedJavaScript={patchPostMessageJsCode}
            onMessage={this.onReceive}
          />
        </View>
        <Tips ref="tips" />
      </React.Fragment>
    );
  }

  postMessage = obj => {
    this.refs.webview.postMessage(JSON.stringify(obj));
  };

  onReceive = e => {
    const {navigation} = this.props;
    let receivedData = JSON.parse(e.nativeEvent.data);
    console.log(receivedData);
    const {etype, info} = receivedData;
    //Webview componentDidMount
    if (etype === 'pageState' && info === 'componentDidMount') {
      //
      this.query();
    } else if (etype === 'back') {
      navigation.goBack();
    }
  };

  query = () => {
    //先设置为正在查询中的效果
    this.postMessage({
      etype: 'data',
      loading: true,
    });
    const {
      route: {
        params: {data},
      },
    } = this.props;

    let condition = {};
    condition.strPickNo = data.jianpeidanhao;
    api.getJianpeidanDetail(condition).then(res => {
      //
      if (res && res.length) {
        this.postMessage({
          etype: 'data',
          loading: false,
          data: res,
        });
      } else {
        this.postMessage({
          etype: 'data',
          loading: false,
        });
        this.refs.tips.show('没有任何数据');
      }
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btn: {
    width: 100,
    height: 40,
    backgroundColor: '#389edc',
    marginTop: 40,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
  },
});

const mapDispatchToProps = (dispatch, props) => {
  return {
    logout: () => {
      dispatch(login(false));
    },
  };
};

export default connect(null, mapDispatchToProps)(Default);
