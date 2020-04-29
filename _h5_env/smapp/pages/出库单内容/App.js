import React from "react";
import "./index.css";
import "./App.css";

import util from "./util/index";
import {
  TopNavigator,
  Btns
  // DatePicker,
  // DateRangePicker,
  // InputItem,
  // Picker
} from "./components";
import ddd from "./ddd.png";

const { Btn } = Btns;

class ViewItemBar extends React.Component {
  render() {
    const { label, value, extra, fp } = this.props;
    return (
      <li>
        <label>{label}</label>
        <p style={fp && typeof fp === "number" ? { flexBasis: fp + "%" } : {}}>
          {value}
        </p>
        {extra ? extra : null}
      </li>
    );
  }
}

class App extends React.Component {
  state = {
    //发货单号
    fhdh: "",
    //制单日期
    zdrq: "",
    //计划数量
    jhsl: "",
    //已发数量
    yfsl: "",
    //应捡数量
    yjsl: "",
    //收货单位
    shdw: "",
    //车号
    ch: ""
  };

  componentDidMount() {
    //告知RN页面已经装载完毕
    util.traceBack("pageState", "componentDidMount");
    //监听事件以及时读取RN传回的数据
    document.addEventListener("message", event => {
      alert(res.etype === "data")
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
    const { fhdh, zdrq, jhsl, yfsl, yjsl, shdw, ch } = this.state;
    const extraIcon = (
      <img alt="tp" src={ddd} className="ddd" onClick={this.onClickextraBtn} />
    );
    return (
      <div className="app-container">
        <div className="app-contents ckdnr">
          <TopNavigator title="出库单内容" />
          {/*<InputItem label="发货单号" placeholder="请填写单号" />
          <DatePicker label="制单日期" />
          <InputItem label="计划数量" type="number" placeholder="请填写" />
          <InputItem label="已发数量" type="number" placeholder="请填写" />
          <InputItem label="应拣数量" type="number" placeholder="请填写" />
          <Picker label={"收货单位"} data={colors} />
          <InputItem label="库号" placeholder="请填写" extra={extraIcon} />*/}
          <ul className="items">
            <ViewItemBar label="发货单号" value={fhdh} />
            <ViewItemBar label="制单日期" value={zdrq} />
            <ViewItemBar label="计划数量" value={jhsl} />
            <ViewItemBar label="已发数量" value={yfsl} />
            <ViewItemBar label="应拣数量" value={yjsl} />
            <ViewItemBar label="收货单位" value={shdw} />
            <ViewItemBar label="车号" value={ch} extra={extraIcon} fp={58} />
          </ul>
          <Btns>
            <Btn title={"返回"} type={"btn5"} onPress={this.onClickBack} />
            <Btn title={"扫描"} type={"btn1"} onPress={this.onClickScan} />
          </Btns>
        </div>
      </div>
    );
  }

  onClickBack = () => {
    util.traceBack("backBtn");
  };
  onClickScan = () => {
    util.traceBack("scanBtn");
  };

  onClickextraBtn = () => {
    util.traceBack("xuanzechehao");
  };
}

export default App;
