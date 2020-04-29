import React from "react";
import "./index.css";
import "./App.css";

import { Table } from "antd";
import util from "./util/index";
import { TopNavigator, Btns } from "./components";

const { Btn } = Btns;

class App extends React.Component {
  state = {
    loading: false,
    data: []
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
    //'拣配单号', '批次号', '批次编码', '重量', '块数', '计量单位'
    const columns = [
      {
        title: "拣配单号",
        dataIndex: "jianpeidan",
        key: "jianpeidan",
        className: "jianpeidan"
      },
      {
        title: "批次号",
        dataIndex: "picihao",
        key: "picihao",
        className: "picihao"
      },
      {
        title: "批次编码",
        dataIndex: "picibianma",
        key: "picibianma",
        className: "picibianma"
      },
      {
        title: "重量",
        dataIndex: "weight",
        key: "weight"
      },
      {
        title: "块数",
        dataIndex: "kuaishu",
        key: "kuaishu"
      },
      {
        title: "计量单位",
        dataIndex: "unit",
        key: "unit"
      }
    ].map(item => {
      item.align = "center";
      return item;
    });

    const { loading, data } = this.state;

    return (
      <div className="app-container">
        <div className="app-contents jpdmx">
          <TopNavigator title="拣配单明细" />
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
                  } // 点击行
                };
              }}
            />
          </div>
          <Btns>
            <Btn title={"返回"} type={"btn5"} onPress={this.onPressBtn1} />
          </Btns>
        </div>
      </div>
    );
  }
  onPressBtn1 = () => {
    util.traceBack("back");
  };
}

export default App;
