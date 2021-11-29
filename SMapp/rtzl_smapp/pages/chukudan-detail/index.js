import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {WebView} from 'react-native-webview';
import tool from '../../core/tool.js';
import Tips from '../../components/Tips/index';
import {connect} from 'react-redux';
import {login} from '../../redux/actions.js';

const uri = 'file:///android_asset/h5/chukudan-detail/index.html';

class Default extends React.MyPage {
  onLoad() {
    const {navigation} = this.props;
    navigation.addListener('focus', (e) => {
      // Prevent default action
      if (e.preventDefault) e.preventDefault();
      const {
        route: {
          params: {chehao},
        },
      } = this.props;
      if (chehao) {
        this.postMessage({
          etype: 'data',
          ch: chehao,
        });
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <StatusBar barStyle={'dark-content'} />
        <View style={styles.container}>
          <WebView
            ref={'webview'}
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

  postMessage = (obj) => {
    this.refs.webview.postMessage(JSON.stringify(obj));
  };

  onReceive = (event) => {
    const {
      navigation,
      navigation: {navigate},
    } = this.props;
    const receivedData = JSON.parse(event.nativeEvent.data);
    console.log(receivedData);

    //初始化加载
    if (
      receivedData.etype === 'pageState' &&
      receivedData.info === 'componentDidMount'
    ) {
      //根据点击数据放置细节
      const {
        route: {
          params: {data},
        },
      } = this.props;
      this.postMessage({
        etype: 'data',
        //发货单号
        fhdh: data.name,
        //制单日期
        zdrq: tool.transTimer(data.fahdrq),
        //计划数量
        jhsl: data.weight,
        //已发数量
        yfsl: data.yifsl,
        //应拣数量
        yjsl: (parseFloat(data.weight) - parseFloat(data.yifsl)).toFixed(4),
        //收货单位
        shdw: data.unit,
        //车号
        ch: data.cheh,
      });
    }

    //查询及跳转
    if (receivedData.etype === 'scanBtn') {
      const {
        route: {
          params: {data, chehao, danjuhao, chengfang, pizhong, DataId},
        },
      } = this.props;

      if (!chehao) {
        this.refs.tips.show('您尚未选择车号');
        return;
      }

      navigate('scan-result', {
        yingjian: (parseFloat(data.weight) - parseFloat(data.yifsl)).toFixed(4),
        fahuodanhao: data.name,
        //这里未确定
        chehao,
        chengfang,
        danjuhao,
        pizhong,
        DataId
      });
    } else if (receivedData.etype === 'backBtn') {
      navigation.goBack();
    } else if (receivedData.etype === 'xuanzechehao') {
      navigate('xuanzechehao');
    }
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
