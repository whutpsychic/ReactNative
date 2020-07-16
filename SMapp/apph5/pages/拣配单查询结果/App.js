import React from "react";
import "./index.css";
import "./App.css";

// import { Table } from "antd";
import util from "./util/index";
import { TopNavigator, Btns, Table } from "./components";

const { Btn } = Btns;

class App extends React.Component {
  state = {
    loading: false,
    data: [],
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
    const columns = util.calcColumn(
      [
        "拣配日期",
        "车号",
        "收货单位",
        "拣配状态",
        "合同号",
        "发货单号",
        "收货单位",
        "产品编码",
        "产品名称",
        "批次号",
        "计量单位",
        "重量",
        "数量",
        "仓库",
        "备注",
        "拣配人"
      ],
      [
        "date",
        "number",
        "unit",
        "state",
        "hetonghao",
        "fahuodanhao",
        "shouhuodanwei",
        "chanpinbianma",
        "chanpinmingcheng",
        "picihao",
        "jiliangdanwei",
        "zhongliang",
        "shuliang",
        "cangku",
        "beizhu",
        "jianpeiren"
      ]
    );

    const { loading, data } = this.state;
    return (
      <div className="app-container">
        <div className="app-contents jpdcxjg">
          <TopNavigator title="拣配单查询结果" />
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
            <Btn title={"返回"} type={"btn5"} onPress={this.onPressBtn1} />
            <Btn title={"删除"} type={"btn4"} onPress={this.onPressBtn2} />
            <Btn title={"明细"} type={"btn6"} onPress={this.onPressBtn3} />
          </Btns>
        </div>
      </div>
    );
  }

  onPressBtn1 = () => {
    util.traceBack("backBtn");
  };

  onPressBtn2 = () => {
    let { currentLine } = this.state;
    util.traceBack("delete", { data: currentLine });
  };

  onPressBtn3 = () => {
    let { currentLine } = this.state;
    util.traceBack("detail", { data: currentLine });
  };
}

export default App;
