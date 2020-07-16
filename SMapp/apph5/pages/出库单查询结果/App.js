import React from "react";
import "./index.css";
import "./App.css";

// import { Table } from "antd";
import util from "./util/index";
import { TopNavigator, Btns,Table } from "./components";

const { Btn } = Btns;

class App extends React.Component {
  state = {
    loading: true,
    data: [
      // { name: "xxxxxxx1", unit: "xccccccccccc", weight: "klksljldfjglk" },
      // { name: "xxxxxxx2", unit: "xccccccccccc", weight: "klksljldfjglk" },
      // { name: "xxxxxxx3", unit: "xccccccccccc", weight: "klksljldfjglk" }
    ],
    currentLine: null
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
        title: "发货单号",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "收货单位",
        dataIndex: "unit",
        key: "unit"
      },
      {
        title: "计划重量",
        dataIndex: "weight",
        key: "weight"
      }
    ];

    const { loading, data } = this.state;
    return (
      <div className="app-container">
        <div className="app-contents jpdcxjg">
          <TopNavigator title="出库单查询结果" />
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
                      currentLine: record
                    });
                  } // 点击行
                };
              }}
            />
          </div>
          <Btns>
            <Btn title={"返回"} type={"btn5"} onPress={this.onPressBackBtn} />
            <Btn
              title={"刷新"}
              type={"btn7"}
              onPress={this.onPressRefreshBtn}
            />
            <Btn title={"查看"} type={"btn1"} onPress={this.onPressViewBtn} />
          </Btns>
        </div>
      </div>
    );
  }

  onPressBackBtn = () => {
    util.traceBack("backBtn");
  };

  onPressRefreshBtn = () => {
    util.traceBack("refresh");
  };

  onPressViewBtn = () => {
    let { currentLine } = this.state;
    util.traceBack("detail", { data: currentLine });
  };
}

export default App;
