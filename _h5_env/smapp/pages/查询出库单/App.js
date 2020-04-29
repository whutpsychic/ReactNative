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
  state = {
    pickerData: [{ label: "1403库区", value: 1403 }],
    currPickerData: null
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
          loading: false,
          ...obj
        });
      }
    });
  }

  render() {
    const { pickerData, currPickerData } = this.state;
    return (
      <div className="app-container">
        <div className="app-contents cxckd">
          <TopNavigator title="查询出库单" />
          <DateRangePicker ref="date" />
          <InputItem ref="input" label="发货单号" placeholder="请填写单号" />
          <Picker ref="picker" label={"库区"} data={pickerData} />
          <Btns>
            <Btn title={"返回"} type={"btn5"} onPress={this.onPressBtn1} />
            <Btn title={"查询"} type={"btn1"} onPress={this.onPressBtn2} />
          </Btns>
        </div>
      </div>
    );
  }

  onPressBtn1 = () => {
    util.traceBack("backbtn");
  };

  onPressBtn2 = () => {
    let date = this.refs.date.getValue();
    let value = this.refs.input.getValue();
    let picker = this.refs.picker.getValue();
    console.log({ date, value, picker });
    util.traceBack("query", { date, value, picker });
  };
}

export default App;
