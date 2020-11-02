import React from "react";
import "./index.css";
import ReactEcharts from "echarts-for-react";
import { Result } from "antd";
import "antd/lib/result/style/css";

export default class extends React.Component {
  echartsInstance = null;
  render() {
    const { option, loadingChart, loadFailed, noData } = this.props;
    return (
      <div className="chart-container">
        {loadFailed ? (
          <Result status="warning" title="图表加载失败了" />
        ) : noData ? (
          <Result title="抱歉！没有数据" />
        ) : (
          <ReactEcharts
            ref={e => {
              if (e && e.getEchartsInstance)
                this.echartsInstance = e.getEchartsInstance();
            }}
            option={option instanceof Object ? option : {}}
            notMerge={true}
            lazyUpdate={true}
            showLoading={loadingChart}
            loadingOption={{ text: "" }}
            style={{ width: "100%", height: "100%" }}
            onEvents={{
              click: this.onClick
            }}
          />
        )}
      </div>
    );
  }

  onClick = e => {
    const { onClick } = this.props;
    if (typeof onClick === "function") {
      onClick(e);
    }
  };

  setOption = option => {
    this.setState({ option: option });
    if (this.echartsInstance) this.echartsInstance.setOption(option, true);
  };

  clear = () => {
    if (this.echartsInstance) this.echartsInstance.clear();
  };
}
