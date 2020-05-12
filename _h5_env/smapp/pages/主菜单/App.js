import React from "react";
import "./index.css";
import "./App.css";

import util from "./util/index";
import { TopNavigator } from "./components";

class App extends React.Component {
  state = {
    user: "",
    time: ""
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
    const { user, time } = this.state;
    return (
      <div className="app-container">
        <div className="app-contents main">
          <TopNavigator title="主菜单" />
          <div className="info">
            <p>当前用户：{user}</p>
            <p>登录时间：{time}</p>
          </div>
          <div className="main-btns">
            <div className="btn" onClick={this.onClickJianPei}>
              拣配
            </div>
            <div className="btn" onClick={this.onClickJianPeiDanQuery}>
              查询拣配单
            </div>
            <div className="btn" onClick={this.onClickCancelLogin}>
              退出登录
            </div>
          </div>
        </div>
      </div>
    );
  }

  onClickJianPei = () => {
    util.traceBack("jianpei");
  };

  onClickJianPeiDanQuery = () => {
    util.traceBack("jianpeidanQuery");
  };

  onClickCancelLogin = () => {
    util.traceBack("cancelLogin");
  };
}

export default App;
