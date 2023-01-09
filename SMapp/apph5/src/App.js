import React from "react";
import "./index.css";
import "./App.css";

import util from "./util/index";
import {
  TopNavigator,
  DateRangePicker,
  Btns,
  InputItem,
  Picker
} from "./components";

const { Btn } = Btns;

class App extends React.Component {
  state = {};

  componentDidMount() {
    //告知RN页面已经装载完毕
    util.traceBack("pageState", "componentDidMount");
    //监听事件以及时读取RN传回的数据
    document.addEventListener("message", event => {
      // alert(event.data);
      // alert(JSON.stringify(event));
    });
  }

  render() {
    return (
      <div className="app-container">
        <div className="app-contents cxckd">
          <TopNavigator title="查询拣配单头" />
          <DateRangePicker ref="date" />
          <InputItem ref="input" label="发货单号" placeholder="请填写单号" />
          <Btns>
            <Btn title={"返回"} type={"btn5"} onPress={this.onPressbackBtn} />
            <Btn title={"查询"} type={"btn1"} onPress={this.onPressqueryBtn} />
          </Btns>
        </div>
      </div>
    );
  }

  onPressbackBtn = () => {
    util.traceBack("backbtn");
  };

  onPressqueryBtn = () => {
    let date = this.refs.date.getValue();
    let value = this.refs.input.getValue();
    util.traceBack("query", { date, value });
  };
}

export default App;
