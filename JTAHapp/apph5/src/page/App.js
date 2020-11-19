import React from "react";
import "./App.css";
import util from "../util/index";
import TopTitle from "../components/TopTitle/index";
import PageLoading from "../components/PageLoading/index";
import Chart from "../components/Chart/index";
import "echarts/map/js/china";
import buildChartOption from "./buildChartOption.js";
import PickerView from "../core/components/PickerView/index";

const debugging = false;

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
		if (debugging) {
			this.setState({
				data: [{ name: "银山矿业", x: 117.592154, y: 28.963425 }],
				selectData: [
					{ label: "标签1", value: 1 },
					{ label: "标签2", value: 2 },
					{ label: "标签3", value: 3 },
					{ label: "标签4", value: 4 },
					{ label: "标签5", value: 5 }
				]
			});
		}
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
					ref="picker"
					data={selectData}
					onConfirm={this.onSelectPicker}
				/>
			</React.Fragment>
		);
	}

	onSelectPicker = obj => {
		console.log(obj);
		util.traceBack("selectPicker", { result: obj });
	};

	onClickChart = x => {
		const { name, value } = x;
		const { data } = this.state;
		this.refs.picker.show();

		let result = data.find(item => {
			return item.name === name && item.x === value[0] && item.y === value[1];
		});

		util.traceBack("onClickPoint", { result });
	};
}

export default App;
