import React from "react";
import "./index.css";
import "./App.css";

import util from "./util/index";
import { TopNavigator } from "./components";

class App extends React.Component {
  state = {};

  componentDidMount() {
    //告知RN页面已经装载完毕
    util.traceBack("pageState", "componentDidMount");
    //监听事件以及时读取RN传回的数据
    document.addEventListener("message", event => {
      alert(event.data);
      alert(JSON.stringify(event));
    });
  }

  render() {
    return (
      <div className="app-container">
        <div className="app-contents main">
          <TopNavigator title="主菜单" />
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
