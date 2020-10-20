import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import Toast from '../../components/Toast/index';
import moment from 'moment';
import api from '../../api/index';

const pageUri = 'file:///android_asset/h5/ecology-repair-info/index.html';

class Default extends React.Component {
  state = {
    year: new Date().getFullYear(),
    mainData: [],
  };

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
      // fixed
      this.postMessage({
        etype: 'data',
        pageLoading: true,
      });

      api
        .getEcologyRepairImgs()
        .then((res) => {
          console.log(res);
          const {errcode, errmsg, data} = res;
          //如果没数据
          if (!data || !data.length) {
            Toast.show('没有任何数据');
            this.postMessage({
              etype: 'data',
              pageLoading: false,
            });
            return;
          } else if (errcode) {
            Toast.show('主数据查询失败了');
            this.postMessage({
              etype: 'data',
              pageLoading: false,
            });
            return;
          }
          //
          this.setState({
            mainData: data,
          });
          return data;
        })
        .then((data) => {
          if (!data) {
            return;
          }
          this.query();
        });
    }
    //
    else if (etype === 'onChangeDate') {
      const {date} = receivedData;
      let year = moment(date).year();
      this.setState({
        year,
      });
    }
    //
    else if (etype === 'btn-query') {
      this.query();
    }
    //
    else if (etype === 'back-btn') {
      navigation.goBack();
    }
  };

  query = () => {
    this.postMessage({
      etype: 'data',
      pageLoading: true,
    });

    let data = this.state.mainData;

    api
      .getEcologyRepairList({year: this.state.year, ofs: 0, ps: 999})
      .then((res) => {
        console.log(res);
        const {
          data: {list},
        } = res;
        let totalArea = 0;
        let totalCost = 0;

        list.forEach((item) => {
          totalArea += item.restoreArea;
          totalCost += item.cost;
        });
        let mainData = data.map((item) => {
          let dyobj =
            list.filter((_item) => {
              return _item.institutionId === item.identity;
            })[0] || {};

          let obj = {};
          obj.img = item.imgUrl;
          obj.title = item.title;
          obj.subtitle = `修复面积${dyobj.restoreArea || ''}(公顷)`;
          obj.data = dyobj.fileList
            ? dyobj.fileList.map((item) => {
                return {img: item.url};
              })
            : [];
          return obj;
        });

        this.postMessage({
          etype: 'data',
          pageLoading: false,
          title: `江铜集团有限公司${this.state.year}年生态修复总面积：${totalArea}(公顷)  生态修复总金额：${totalCost}(万元)`,
          mainData: mainData,
        });
      });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
  },
});

export default Default;
