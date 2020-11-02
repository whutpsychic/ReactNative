import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import api from '../../api/index';
import Toast from '../../components/Toast';

const pageUri =
  'file:///android_asset/h5/danger-screening-administer/index.html';

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
      this.postMessage({
        etype: 'data',
        pageLoading: true,
        columns: [
          {
            title: '序号',
            dataIndex: 'string0',
            key: 'string0',
            className: 'string0',
          },
          {
            title: '责任单位',
            dataIndex: 'string1',
            key: 'string1',
            className: 'string1',
          },
          {
            title: '检查项目名称',
            dataIndex: 'string2',
            key: 'string2',
            className: 'string2',
          },
        ].map((item) => {
          item.align = 'center';
          return item;
        }),
      });

      //查询检查公示
      let p1 = api.getDangerCheckList().then((res) => {
        console.log(res);
        const {data} = res;
        if (!data || !data.list) {
          Toast.show('对不起，检查公示没有查到任何数据');
          return;
        }

        const {list} = data;
        this.postMessage({
          etype: 'data',
          boardData: list.map((item) => {
            return {
              text: item.notice,
              date: item.noticeTime,
              files: item.fileList,
            };
          }),
        });
      });

      //查询整改公示
      let p2 = api.getDangerRectificationList().then((res) => {
        console.log(res);
        const {data} = res;
        if (!data || !data.list) {
          Toast.show('对不起，整改公示没有查到任何数据');
          return;
        }

        const {list} = data;
        this.postMessage({
          etype: 'data',
          boardData2: list.map((item) => {
            return {
              text: item.notice,
              date: item.noticeTime,
              files: item.fileList,
            };
          }),
        });
      });

      //责任单位数据查询
      let p3 = api.getTreeUnit().then((res) => {
        console.log(res);
        const {errcode, data} = res;
        if (!errcode && data) {
          this.postMessage({
            etype: 'data',
            selectData: [data],
          });
        }
      });

      let p4 = this.query({});

      Promise.all([p1, p2, p3, p4]).then((resArr) => {
        this.postMessage({
          etype: 'data',
          pageLoading: false,
        });
      });
    } else if (etype === 'board1' || etype === 'board2') {
      const {text, date, files} = receivedData;
      this.postMessage({
        etype: 'data',
        tipsData: {
          content: text,
          date,
          files,
        },
      });
    } else if (etype === 'btn-query') {
      const {input, select, startDate, endDate} = receivedData;

      const condition = {};

      if (input) condition.projectName = input;
      if (select && select[0]) condition.institutionId = select[0];
      if (startDate) condition.startTime = startDate;
      if (endDate) condition.endTime = endDate;

      console.log(condition);
      this.query(condition);
    }
    //点击table行
    else if (etype === 'onClickTableRow') {
      const {id} = receivedData;
      //查询更多细节
      api.queryMoreInfo(id).then((res) => {
        console.log(res);
        const {
          data: {list},
        } = res;
        const data = {
          name: list.projectName || '',
          unit: list.institutionName || '',
          date: list.startTime || '',
          person: list.userName || '',
          time: list.deadline || '',
          recheckTime: list.feedbackTime || '',
          recheckState: list.checkType || '',
          question: list.trouble || '',
          solution: list.measure || '',
          files1: list.fatherPo || '',

          checkDate: list.checkTime || '',
          fbPerson: list.feedbackUserName || '',
          completed: undefined || '',
          files2: list.sonPo || '',
        };
        console.log(data);

        this.postMessage({
          etype: 'data',
          detailData: {
            ...data,
          },
        });
      });
    }
    //
    else if (etype === 'back-btn') {
      navigation.goBack();
    }
  };

  query = (condition) => {
    this.postMessage({
      etype: 'data',
      tableLoading: true,
    });
    return api.queryDangerTable(condition).then((res) => {
      console.log(res);
      const {data} = res;
      if (!data.list) {
        Toast.show('表格没查询到任何数据');
        this.postMessage({
          etype: 'data',
          tableLoading: false,
          tableData: [],
        });
        return;
      }

      this.postMessage({
        etype: 'data',
        tableLoading: false,
        tableData: data.list.map((item, i) => {
          return {
            id: item.id,
            string0: `${i + 1}`,
            string1: item.institutionName,
            string2: item.projectName,
          };
        }),
      });
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Default;
