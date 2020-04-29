import React from "react";
import "./index.css";
import "./App.css";

import { Table } from "antd";
import util from "./util/index";
import { TopNavigator, DateRangePicker, Btns } from "./components";

const { Btn } = Btns;

class App extends React.Component {
  state = {
    loading: false,
    data: [],
    currentLine: null,
    inputValue: ""
  };

  componentDidMount() {
    //告知RN页面已经装载完毕
    util.traceBack("pageState", "componentDidMount");
    //监听事件以及时读取RN传回的数据
    document.addEventListener("message", event => {
      let res = JSON.parse(event.data);
      if (res.etype === "data") {
        let obj = { ...res };
        delete obj.etype;
        this.setState({
          ...obj
        });
      }
    });
  }

  render() {
    const columns = [
      {
        title: "车号",
        dataIndex: "number",
        key: "number"
      },
      {
        title: "单据号",
        dataIndex: "danjuhao",
        key: "danjuhao"
      },
      {
        title: "秤房",
        dataIndex: "chengfang",
        key: "chengfang"
      }
    ];

    const { loading, data, currentLine, inputValue } = this.state;
    return (
      <div className="app-container">
        <div className="app-contents xzchh">
          <TopNavigator title="选择车号" onLeftClick={this.backup} />
          <DateRangePicker
            ref="date"
            defaultValue={[
              new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
              new Date()
            ]}
          />
          <div className="table-container">
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              loading={loading}
              onRow={record => {
                return {
                  onClick: event => {
                    event.preventDefault();
                    util.setItUp(
                      event.target.parentNode,
                      event.target.parentNode.parentNode
                    );
                    this.setState({
                      currentLine: record,
                      inputValue: record.number || ""
                    });
                  } // 点击行
                };
              }}
            />
          </div>
          <div className="chehao">
            <label>车牌号</label>
            <input value={inputValue} onChange={this.onChangeText} />
          </div>
          <Btns>
            <Btn title={"查询"} type={"btn1"} onPress={this.onPressQueryBtn} />
            <Btn
              title={"确认"}
              type={"btn2"}
              onPress={this.onPressConfirmBtn}
            />
            <Btn
              title={"手动确认"}
              type={"btn3"}
              onPress={this.onPresssdConfirmBtn}
            />
          </Btns>
        </div>
      </div>
    );
  }

  onChangeText = e => {
    let v = e.target.value;
    this.setState({
      inputValue: v
    });
  };

  backup = () => {
    util.traceBack("backbtn");
  };

  onPressQueryBtn = () => {
    let date = this.refs.date.getValue();
    util.traceBack("query", { date });
  };

  onPressConfirmBtn = () => {
    let date = this.refs.date.getValue();
    const { currentLine } = this.state;
    util.traceBack("confirm", { date, currentLine });
  };

  onPresssdConfirmBtn = () => {
    let date = this.refs.date.getValue();
    const { currentLine, inputValue } = this.state;
    util.traceBack("sdconfirm", { date, currentLine, inputValue });
  };
}

export default App;
