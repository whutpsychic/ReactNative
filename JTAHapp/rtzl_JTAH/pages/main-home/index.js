import React from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import util from '../../core/util.js';
import api from '../../api/index';

const pageUri = 'file:///android_asset/h5/main-home/index.html';

const getOption = (data) => {
  return {
    xAxis: data.xAxis,
    data: [{name: '', type: 'line', data: data.data}],
  };
};

class Default extends React.Component {
  state = {
    // 图表的全部选项数据
    allSelectData: [],
    // 格式化图表的全部选项之后的数据结构
    formatData: [],

    s1: null,
    radio: null,
    s2: null,
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

  //加载单位下拉框数据
  //仅初始化之后一次
  loadSelect1Data = () => {
    const {allSelectData} = this.state;
    //整理出单位的数据，并归拢其radio数据
    let clonedArr = util.deepClone(allSelectData);
    let resArr = [];

    while (clonedArr.length) {
      //取走第一项同时删除掉了第一个元素
      let firstItem = clonedArr.shift();
      resArr.push(firstItem);
      clonedArr = clonedArr.filter((item) => {
        return item.institutionid !== firstItem.institutionid;
      });
    }
    resArr = resArr.map((item) => {
      let arr;
      arr = allSelectData
        .filter((_item) => {
          return item.institutionid === _item.institutionid;
        })
        .map((_item) => {
          return _item.type;
        });
      item.type = arr;
      return item;
    });

    let selectData1 = resArr.map((item) => {
      return {label: item.institutionName, value: item.institutionid};
    });

    this.postMessage({
      etype: 'data',
      selectData1,
    });

    this.setState(
      {
        formatData: resArr,
        s1: selectData1[0].value,
      },
      () => {
        this.loadRadiosData();
      },
    );

    return resArr;
  };

  //加载radio数据
  //每次改变单位选项后触发
  loadRadiosData = (x) => {
    const {allSelectData, formatData, radio} = this.state;
    if (!x) x = formatData[0].institutionid;

    let data = allSelectData
      .filter((item) => {
        return item.institutionid === x;
      })
      .map((item) => {
        switch (item.type) {
          case 1:
            return {label: '废水', value: 1};
          case 2:
            return {label: '废气', value: 2};
          default:
            return {};
        }
      });

    //初始化值
    if (!this.state.radio)
      this.setState(
        {
          radio: data[0].value,
        },
        () => {
          this.loadSelect2Data(null, radio);
        },
      );
    //

    this.postMessage({
      etype: 'data',
      radios: data,
    });
  };

  //加载监测项目下拉框数据
  //每当改变下拉框1或radio数据时触发
  loadSelect2Data = (data1, radio) => {
    const {allSelectData, formatData} = this.state;

    if (!data1) data1 = formatData[0].institutionid;
    if (!radio) radio = formatData[0].type[0];

    let data = allSelectData.filter((item) => {
      return item.institutionid === data1 && item.type === radio;
    })[0];

    let resArr = [];

    for (let i in data.item) {
      resArr.push({label: data.item[i], value: i});
    }

    //默认查询动作
    this.setState(
      {
        s2: resArr[0].value,
      },
      () => {
        this.loadChart();
      },
    );

    this.postMessage({
      etype: 'data',
      selectData2: resArr,
    });
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
        chartTitle: '工业废气PH日数据',
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

      //下拉框数据
      api.getHomeSelectors().then((res) => {
        const {
          data: {list = []},
        } = res;

        this.setState(
          {
            allSelectData: list,
          },
          () => {
            this.loadSelect1Data();
          },
        );
      });
    }
    //改变select1时
    else if (etype === 'onChangeSelect1') {
      const {label, value} = receivedData;
      this.loadRadiosData(value);
      this.setState(
        {
          s1: value,
        },
        () => {
          this.loadChart();
        },
      );
    }
    //改变radio时
    else if (etype === 'onChangeRadio') {
      const {label, value} = receivedData;
      this.loadSelect2Data(this.state.s1, value);
      this.setState(
        {
          radio: value,
        },
        () => {
          this.loadChart();
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
    const {s1, s2} = this.state;

    api
      .getMainChart({institutionId: s1, code: s2})
      .then((res) => {
        const {
          data: {list},
        } = res;

        let op = getOption({
          xAxis: list.map((item) => {
            return item.xData;
          }),
          data: list.map((item) => {
            return item.yData;
          }),
        });

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
