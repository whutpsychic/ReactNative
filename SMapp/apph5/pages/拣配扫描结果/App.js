import React from "react";
import "./index.css";
import "./App.css";
import util from "./util/index";
import { TopNavigator, Btns, Table } from "./components";

const { Btn } = Btns;

class App extends React.Component {
  state = {
    tableloading: false,
    data: [],
    currentLine: null,

    yingj: "",
    yij1: "",
    yij2: "",
    ques: "",
    pz: "",
    pizhong: ""
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
        title: "日期",
        dataIndex: "date",
        key: "date",
        className: "date"
      },
      {
        title: "包号",
        dataIndex: "number",
        key: "number",
        className: "baohao"
      },
      {
        title: "条码",
        dataIndex: "barcode",
        key: "barcode",
        className: "barcode"
      },
      {
        title: "重量",
        dataIndex: "weight",
        key: "weight"
      }
    ].map(item => {
      item.align = "center";
      return item;
    });

    const { tableloading, data } = this.state;
    const { yingj, yij1, yij2, ques, pz, pizhong } = this.state;
    return (
      <div className="app-container">
        <div className="app-contents jpsmjg">
          <TopNavigator
            title="拣配"
            scan={this.onClickScan}
            onLeftClick={() => {
              util.traceBack("event", { target: "backBtn" });
            }}
          />
          <div className="table-container">
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              loading={tableloading}
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
          <div className="info-container">
            <span className="title">应拣</span>
            <span className="title">已拣</span>
            <span className="title">缺少</span>
            <span>{yingj}</span>
            <span>{yij1}</span>
            <span>{ques}</span>
            <span className="title">皮重</span>
            <span className="title">捆数</span>
            <span className="title">合计</span>
            <span>{pizhong}</span>
            <span>{yij2}</span>
            <span>{pz}</span>
          </div>
          <Btns suffix>
            <Btn title={"确认"} type={"btn2"} onPress={this.onPressConfirm} />
            <Btn title={"手动"} type={"btn3"} onPress={this.onPressShoudong} />
            <Btn title={"剔除"} type={"btn4"} onPress={this.onPressTichu} />
          </Btns>
        </div>
      </div>
    );
  }

  onClickScan = () => {
    util.traceBack("scan");
  };

  onPressConfirm = () => {
    let { currentLine } = this.state;
    util.traceBack("confirm", { currentLine });
  };

  onPressShoudong = () => {
    let { currentLine } = this.state;
    util.traceBack("shoudong", { currentLine });
  };

  onPressTichu = () => {
    let { currentLine } = this.state;
    util.traceBack("tichu", { currentLine });
  };
}

export default App;
