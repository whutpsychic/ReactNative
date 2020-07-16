import React from "react";
import "./index.css";
import "./App.css";

import { Table } from "antd";
import util from "./util/index";
import { TopNavigator, Btns } from "./components";

const { Btn } = Btns;

class ViewItemBar extends React.Component {
  render() {
    const { label, extra, fp, value } = this.props;
    return (
      <li>
        <label>{label}</label>
        {value ? (
          <input
            ref="input"
            value={value}
            style={fp && typeof fp === "number" ? { flexBasis: fp + "%" } : {}}
            onChange={this.onChange}
          />
        ) : (
          <input
            ref="input"
            style={fp && typeof fp === "number" ? { flexBasis: fp + "%" } : {}}
            onChange={this.onChange}
          />
        )}
        {extra ? <span>{extra}</span> : null}
      </li>
    );
  }

  onChange = e => {
    let v = e.target.value;
    const { onChange } = this.props;
    if (typeof onChange === "function") {
      onChange(v);
    }
  };

  getValue = () => {
    return this.refs.input.value;
  };
}

class App extends React.Component {
  state = { value: "" };

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
    const { value } = this.state;
    return (
      <div className="app-container">
        <div className="app-contents jpdmx">
          <TopNavigator title="手动不合格条码" />
          <ul className="items">
            <ViewItemBar label="批次号" extra="四位" ref="input1" />
            <ViewItemBar label="编  号" extra="三位" ref="input2" />
          </ul>
          <div className="bbtns">
            <Btn title={"查询"} type={"btn1"} onPress={this.onPressBtn1} />
          </div>
          <ul className="items">
            <ViewItemBar
              label="条形码"
              fp={90}
              onChange={this.onChangeText}
              value={value}
              ref="input3"
            />
          </ul>
          <div className="bbtns">
            <Btn title={"确认"} type={"btn2"} onPress={this.onPressBtn2} />
            <Btn title={"取消"} type={"btn4"} onPress={this.onPressBtn3} />
          </div>
        </div>
      </div>
    );
  }

  onChangeText = value => {
    this.setState({
      value
    });
  };

  onPressBtn1 = () => {
    let picihao = this.refs.input1.getValue();
    let bianhao = this.refs.input2.getValue();
    util.traceBack("query", { picihao, bianhao });
  };

  onPressBtn2 = () => {
    const { value } = this.state;
    util.traceBack("confirm", { barcode: value });
  };

  onPressBtn3 = () => {
    util.traceBack("cancel");
  };
}

export default App;
