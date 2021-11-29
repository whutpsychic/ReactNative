import React from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import util from '../../core/util.js';
import api from '../../api/index';
import config from '../../config/index';
import moment from 'moment';

const pageUri = 'file:///android_asset/h5/main-home/index.html';

const getOption = (data) => {
  var markLine = [];

  if (data.ml1) {
    markLine.push({
      silent: true, //鼠标悬停事件  true没有，false有
      lineStyle: {
        //警戒线的样式  ，虚实  颜色
        type: 'solid',
        color: 'red',
      },
      label: {
        position: 'middle',
        formatter: `报警值下限${data.ml1}`,
      },
      yAxis: data.ml1 || 0, // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
    });
  }

  if (data.ml2) {
    markLine.push({
      silent: true, //鼠标悬停事件  true没有，false有
      lineStyle: {
        //警戒线的样式  ，虚实  颜色
        type: 'solid',
        color: 'red',
      },
      label: {
        position: 'middle',
        formatter: `报警值下限${data.ml2}`,
      },
      yAxis: data.ml2 || 0, // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
    });
  }

  if (data.ml3) {
    markLine.push({
      silent: true, //鼠标悬停事件  true没有，false有
      lineStyle: {
        //警戒线的样式  ，虚实  颜色
        type: 'solid',
        color: 'red',
      },
      label: {
        position: 'middle',
        formatter: `报警值下限${data.ml3}`,
      },
      yAxis: data.ml3 || 0, // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
    });
  }

  if (data.ml4) {
    markLine.push({
      silent: true, //鼠标悬停事件  true没有，false有
      lineStyle: {
        //警戒线的样式  ，虚实  颜色
        type: 'solid',
        color: 'red',
      },
      label: {
        position: 'middle',
        formatter: `报警值下限${data.ml4}`,
      },
      yAxis: data.ml4 || 0, // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
    });
  }

  if (markLine.length)
    return {
      xAxis: data.xAxis,
      data: [
        {
          name: '',
          type: 'line',
          lineStyle: {color: '#389edc'},
          data: data.data,
          markLine: {
            symbol: 'none',
            data: markLine,
          },
        },
      ],
    };

  return {
    xAxis: data.xAxis,
    data: [
      {
        name: '',
        type: 'line',
        lineStyle: {color: '#389edc'},
        data: data.data,
      },
    ],
  };
};

class Default extends React.Component {
  state = {
    // 图表的全部选项数据
    allSelectData: [],
    radios: [
      {label: '废水', value: 32},
      {label: '废气', value: 31},
    ],

    radio: 32,
    s1: null,
    s2: null,
  };

  componentDidMount() {
    //
    const {
      navigation: {navigate},
    } = this.props;
    const {mode} = config;
    if (mode === 'develop') {
      navigate('monitor_oldata_list2');
    }
  }

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

  //加载radio数据
  //初始仅加载一次
  loadRadiosData = (x) => {
    const {radios} = this.state;
    this.postMessage({
      etype: 'data',
      radios: radios,
    });
  };

  // 加载单位数据
  loadSelect1Data = () => {
    const {allSelectData, radio} = this.state;
    console.log(allSelectData);
    const arr = allSelectData
      .filter((item) => item.type == radio)
      .map((item) => {
        item.label = item.institutionName;
        item.value = item.institutionid;
        return item;
      });
    this.postMessage({
      etype: 'data',
      selectData1: arr,
    });
    this.setState(
      {
        s1: arr[0].value,
      },
      () => {
        this.loadSelect2Data(arr[0].item);
      },
    );
  };

  //加载监测项目下拉框数据
  //每当改变下拉框1或radio数据时触发
  loadSelect2Data = (it) => {
    const {allSelectData, s1} = this.state;
    let arr = [];

    for (let i in it) {
      arr.push({label: it[i], value: it[i]});
    }
    this.postMessage({
      etype: 'data',
      selectData2: arr,
    });

    this.setState(
      {
        s2: arr[0].value,
      },
      () => {
        this.loadChart();
      },
    );
  };

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
      this.postMessage({
        etype: 'data',
        loadingChart: true,
        chartTitle: '',
        pageLoading: false,
      });
      // newsPic 顶部图片
      // newsOne 公司要闻
      // newsTwo 动态信息
      // todos 工作提醒
      // risks 风险提醒
      // tasks 挂牌督办
      api.getHomeMainData().then((res) => {
        const {errcode, errmsg} = res;
        //成功
        if (!errcode) {
          const {
            data: {list},
          } = res;

          this.postMessage({
            etype: 'data',
            pageLoading: false,
            // 顶部图片
            carouselData: list.newsPic.map((item) => {
              return {href: '', src: item.cover};
            }),
            // 公司要闻
            boardInfoData1: list.newsOne.map((item) => {
              return {text: item.institutionName, date: item.time};
            }),
            // 动态信息
            boardInfoData2: list.newsTwo.map((item) => {
              return {text: item.institutionName, date: item.time};
            }),
            // 工作提醒
            boardInfoData3: list.todos.map((item) => {
              return {text: item.title, date: item.time};
            }),
            // 风险提醒
            boardInfoData4: list.risks.map((item) => {
              return {text: item.content, date: item.time};
            }),
          });
        }
        //超时
        else if (errcode === 504) {
          Toast.show('请求主数据超时!');
          this.postMessage({
            etype: 'data',
            pageLoading: false,
            // 顶部图片
            carouselData: [],
            // 公司要闻
            boardInfoData1: [],
            // 动态信息
            boardInfoData2: [],
            // 工作提醒
            boardInfoData3: [],
            // 风险提醒
            boardInfoData4: [],
          });
        }
        // 失败
        else {
          Toast.show('请求主数据失败!');
          this.postMessage({
            etype: 'data',
            pageLoading: false,
            // 顶部图片
            carouselData: [],
            // 公司要闻
            boardInfoData1: [],
            // 动态信息
            boardInfoData2: [],
            // 工作提醒
            boardInfoData3: [],
            // 风险提醒
            boardInfoData4: [],
          });
        }
      });
      this.loadRadiosData();

      //下拉框数据
      api.getHomeAllSelectors().then((res) => {
        this.setState(
          {
            allSelectData: res.data.list,
          },
          () => {
            this.loadSelect1Data();
          },
        );
      });
    }
    //改变radio时
    else if (etype === 'onChangeRadio') {
      const {label, value} = receivedData;
      this.setState(
        {
          radio: value,
        },
        () => {
          this.loadSelect1Data();
        },
      );
    }
    //改变select1时
    else if (etype === 'onChangeSelect1') {
      const {label, value, item} = receivedData;
      this.setState(
        {
          s1: value,
        },
        () => {
          this.loadSelect2Data(item);
        },
      );
    }

    //改变select2时
    else if (etype === 'onChangeSelect2') {
      const {label, value} = receivedData;
      this.setState(
        {
          s2: value,
        },
        () => {
          this.loadChart();
        },
      );
    }
  };

  loadChart = () => {
    this.postMessage({
      etype: 'data',
      loadingChart: true,
    });
    const {radio, s1, s2} = this.state;
    const params = {
      avgType: 2,
      mnNumber: s1,
      factorCode: s2,
      type: radio == 32 ? 1 : 2,
      sdatetime: moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
      edatetime: moment().format('YYYY-MM-DD HH:mm:ss'),
    };

    api
      .getMainChart(params)
      .then((res) => {
        console.log(res);
        const {data} = res;

        let op = getOption({
          xAxis: data.map((item) => {
            return item.dataTime;
          }),
          data: data.map((item) => {
            return item.dtaValue;
          }),
          ml1: data[0].alarmDown,
          ml2: data[0].warnDown,
          ml3: data[0].warnUp,
          ml4: data[0].alarmUp,
        });

        console.log(op);

        this.postMessage({
          etype: 'data',
          loadingChart: false,
        });
        this.postMessage({
          etype: 'event',
          event: 'setChart',
          args: op,
        });
      })
      .catch((err) => {
        Toast.show('图表数据获取有误');
      });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Default;
