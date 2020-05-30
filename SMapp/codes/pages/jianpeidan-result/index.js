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
import {Modal} from '@ant-design/react-native';
import Toast from '../../components/ToastModule/index';
import Confirm from '../../components/Confirm/index';
import {connect} from 'react-redux';
import {login} from '../../redux/actions.js';

const uri = 'file:///android_asset/h5/jianpeidan-result/index.html';

class Default extends React.MyPage {
  state = {
    showConfirm: false,
    currLine: null,
  };

  onLoad() {
    const {navigation} = this.props;
    navigation.addListener('focus', e => {
      //强行后置
      this.postMessage({
        etype: 'data',
        currentLine: null,
      });
    });
  }

  render() {
    const footerButtons = [
      {text: '取消', onPress: this.onCancel},
      {text: '确定', onPress: this.onConfirm},
    ];

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
        <Modal
          transparent
          onClose={this.onClose}
          visible={this.state.showConfirm}
          footer={footerButtons}>
          <View style={{paddingVertical: 20}}>
            <Text style={{fontSize: 18, textAlign: 'center'}}>
              确认删除这条数据？
            </Text>
          </View>
        </Modal>
        <Tips ref="tips" />
        <Confirm ref="confirm" />
      </React.Fragment>
    );
  }

  postMessage = obj => {
    this.refs.webview.postMessage(JSON.stringify(obj));
  };

  onCancel = () => {
    this.setState({
      showConfirm: false,
    });
  };

  onReceive = e => {
    const {
      navigation,
      navigation: {navigate},
    } = this.props;
    let receivedData = JSON.parse(e.nativeEvent.data);
    console.log(receivedData);
    const {etype, info} = receivedData;
    //Webview componentDidMount
    if (etype === 'pageState' && info === 'componentDidMount') {
      //
      this.query();
    }
    //明细
    if (receivedData.etype === 'detail') {
      const {data} = receivedData;
      if (!data && !this.state.currLine) {
        this.refs.tips.show('请选择一条数据');
        return;
      }
      if (data)
        this.setState({
          currLine: data,
        });
      navigate('jianpeidan-detail', {data: data || this.state.currLine});
    }
    //删除
    else if (receivedData.etype === 'delete') {
      let {data} = receivedData;
      if (!data && !this.state.currLine) {
        this.refs.tips.show('请选择一条数据');
        return;
      }
      if (data)
        this.setState({
          currLine: data,
        });

      if (!data) data = this.state.currLine;

      //如果状态不为0
      if (data.state !== '0') {
        this.refs.tips.show('已装车，不能删除');
        return;
      } else {
        // console.log(data);
        this.refs.confirm.show(
          '确定删除车号为' + data.number + '的记录？',
          () => {
            let condition = {};
            (condition.strDeliveryNo = data.fahuodanhao),
              (condition.strPickNo = data.jianpeidanhao),
              (condition.strSuttle = data.zhongliang);

            api.deletePickNo(condition).then(result => {
              const {
                DeletePickNoResult,
                strError = '删除失败，原因未知',
              } = result;
              //删除成功
              if (DeletePickNoResult) {
                this.refs.tips.show('删除成功！');
                //重置当前选中行
                this.postMessage({
                  etype: 'data',
                  currentLine: null,
                });
                this.query().then(dataArr => {
                  if (dataArr && dataArr.length) {
                    this.setState({
                      currentLine: dataArr[0],
                    });
                  }
                });
                return;
              }
              //删除失败
              else {
                this.refs.tips.show(strError);
                return;
              }
            });
          },
        );
      }
    } else if (receivedData.etype === 'backBtn') {
      navigation.goBack();
    }
  };

  //查询主表格
  query = () => {
    //先设置为正在查询中的效果
    this.postMessage({
      etype: 'data',
      loading: true,
    });

    const {
      route: {params},
    } = this.props;

    //整理查询条件
    let _condition = {
      dtStart: params.startDate,
      dtEnd: params.endDate,
      strDeliveryNo: params.str || '',
    };

    return api
      .getJIANPEIDAN(_condition)
      .then(res => {
        console.log(res);
        //
        if (res && res.length) {
          this.postMessage({
            etype: 'data',
            loading: false,
            data: res,
          });
          return res;
        } else {
          this.postMessage({
            etype: 'data',
            loading: false,
            data: [],
          });
          // this.refs.tips.show('没有任何数据');
          Toast.show('没有任何数据');
          return [];
        }
      })
      .catch(err => {
        console.log(err);
        //查询失败
        this.postMessage({
          etype: 'data',
          loading: false,
          data: [],
        });
        this.refs.tips.show('没有任何数据');
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
