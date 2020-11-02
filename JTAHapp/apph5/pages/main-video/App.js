import React from "react";
import "./App.css";
import util from "../util/index";
import TopTitle from "../components/TopTitle/index";
import PageLoading from "../components/PageLoading/index";
import Chart from "../components/Chart/index";
import "echarts/map/js/china";
import buildChartOption from "./buildChartOption.js";
import PickerView from "../core/components/PickerView/index";

class App extends React.Component {
	state = {
		pageLoading: false,
		selectData: [],
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
			} else if (res.etype === "event") {
				let { event, args } = res;
				if (typeof this[event] === "function") this[event](args);
			}
		});

		// ***************************************************
	}

	render() {
		const { pageLoading, data, selectData } = this.state;
		const options = buildChartOption(data);
		return (
			<React.Fragment>
				<div className="app-container">
					<div className="app-contents">
						{pageLoading ? <PageLoading /> : null}
						<TopTitle title="视频监控" />
						<div className="map-container">
							<Chart option={options} onClick={this.onClickChart} />
						</div>
					</div>
				</div>
				<PickerView
					ref="pickerview"
					data={selectData}
					onSelect={this.onSelectPicker}
				/>
			</React.Fragment>
		);
	}

	select = () => {
		this.refs.pickerview.open();
	};

	onSelectPicker = obj => {
		util.traceBack("selectPicker", { ...obj });
	};

	onClickChart = x => {
		const { name, value } = x;
		const { data } = this.state;
		this.select();

		let result = data.find(item => {
			return item.name === name && item.x === value[0] && item.y === value[1];
		});

		util.traceBack("onClickPoint", { result });
	};
}

export default App;
