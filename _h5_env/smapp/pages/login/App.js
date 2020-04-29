import React from "react";
import "./index.css";
import "./App.css";
import { Input } from "antd";
import util from "./util/index";

class App extends React.Component {
  state = {
    userName: "",
    psw: "",
    errmsg: ""
  };

  componentDidMount() {
    util.traceBack("pageState", "componentDidMount");

    //监听事件以及时读取RN传回的数据
    document.addEventListener("message", event => {
      let _data = JSON.parse(event.data);
      if (_data.etype === "data") {
        let obj = { ..._data };
        delete obj.etype;
        this.setState({ ...obj });
      }
    });
  }

  render() {
    const { userName, psw, errmsg } = this.state;
    return (
      <div className="app-container">
        <div className="app-contents login">
          <p className="title">紫金铜业阴极铜条码系统</p>
          <div className="form">
            <Input value={userName} onChange={this.onChangeUserName} />
            <Input.Password
              placeholder="请输入密码"
              value={psw}
              onChange={this.onChangePsw}
            />
            <p className="err">{errmsg}</p>
          </div>
          <div className="btns">
            <div className="btn cancel" onClick={this.onClickCancel}>
              取消
            </div>
            <div className="btn login2" onClick={this.onClickLogin}>
              登录
            </div>
          </div>
        </div>
      </div>
    );
  }

  onChangeUserName = e => {
    let v = e.target.value;
    this.setState({
      userName: v,
      errmsg: ""
    });
  };

  onChangePsw = e => {
    let v = e.target.value;
    this.setState({
      psw: v,
      errmsg: ""
    });
  };

  //点击登录
  onClickLogin = () => {
    const { userName, psw } = this.state;
    util.traceBack("login", { userName, psw });
  };

  //迷之取消
  onClickCancel = () => {
    util.traceBack("cancel");
  };
}

export default App;
