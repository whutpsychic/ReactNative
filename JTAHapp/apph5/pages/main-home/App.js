import React from "react";
import "./App.css";
import util from "../util/index";
import PageLoading from "../components/PageLoading/index";
import TopTitle from "../components/TopTitle/index";
import Carousel from "./Carousel.js";
import BoardInfo from "../components/BoardInfo/index";
import BoardInfo2 from "./BoardInfo2.js";
import MenuBlock from "../components/MenuBlock/index";
import Panel from "../components/Panel/index";
import ListItem from "../components/ListItem/index";
import Chart from "../components/Chart/index";
import Select from "../components/Select/index";

import Radios from "../components/Radios/index";

const colors = [];

const getOption = ({ xAxis, data }) => {
	return {
		grid: {
			top: "10%",
			right: "10%",
			bottom: "20%",
			left: "18%"
		},
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow"
			}
		},
		xAxis: {
			type: "category",
			data: xAxis,
			splitLine: { show: true }
			// axisLabel: { interval: 0 }
		},
		yAxis: {
			type: "value"
		},
		series: data
	};
};

class App extends React.Component {
	state = {
		pageLoading: true,

		carouselData: [],
		boardInfoData1: [],
		boardInfoData2: [],
		boardInfoData3: [],
		boardInfoData4: [],
		menuData: [],
		selectData1: [],
		selectData2: [],
		radios: [],

		chartTitle: "",
		loadingChart: false,
		chartLoadFailed: false,
		noChartData: false
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
		this.setState({
			menuData: [
				{
					title: "目标管理",
					icon: "mbgl"
				},
				{
					title: "信息发布",
					icon: "xxfb"
				},
				{
					title: "应急管理",
					icon: "yjgl"
				},
				{
					title: "事故管理",
					icon: "sggl"
				},
				{
					title: "重点区域",
					icon: "zdqy"
				},
				{
					title: "工作提醒",
					icon: "gztx"
				},
				{
					title: "挂牌监督",
					icon: "gpjd"
				},
				{
					title: "风险提醒",
					icon: "fxtx"
				}
			]
		});
		// ***************************************************
		// setTimeout(() => {
		// 	this.setState({
		// 		loadingChart: false,
		// 		pageLoading: false,
		// 		chartTitle: "xxxxxxxxxxx",
		// 		radios: [
		// 			{ label: "hell", value: 1 },
		// 			{ label: "hell2", value: 2 }
		// 		]
		// 	});
		// 	this.setChart({
		// 		xAxis: [
		// 			"10-16",
		// 			"10-17",
		// 			"10-18",
		// 			"10-19",
		// 			"10-19",
		// 			"10-19",
		// 			"10-19",
		// 			"10-19"
		// 		],
		// 		data: [
		// 			{
		// 				name: "废水",
		// 				type: "line",
		// 				data: [20, 92, 10, 84, 84, 84, 84, 84]
		// 			},
		// 			{ name: "废气", type: "line", data: [70, 32, 50, 34, 84, 84, 84, 84] }
		// 		]
		// 	});
		// }, 1500);
	}

	setChart = obj => {
		this.refs.chart.setOption(getOption(obj));
	};

	render() {
		const {
			pageLoading,
			boardInfoData1,
			boardInfoData2,
			boardInfoData3,
			boardInfoData4
		} = this.state;
		const {
			carouselData,
			menuData,
			selectData1,
			selectData2,
			radios
		} = this.state;
		const {
			chartTitle,
			loadingChart,
			chartLoadFailed,
			noChartData
		} = this.state;
		return (
			<div className="app-container">
				<div className="app-contents">
					<TopTitle title="首页" />
					<Carousel data={carouselData} />
					<BoardInfo
						title="公司要闻"
						data={boardInfoData1}
						onClick={this.onClickInfo}
					/>
					<BoardInfo
						title="动态信息"
						data={boardInfoData2}
						onClick={this.onClickInfo}
					/>
					<MenuBlock data={menuData} onClick={this.onClickMenu} />
					<BoardInfo
						title="工作提醒"
						data={boardInfoData3}
						onClick={this.onClickInfo}
					/>
					<BoardInfo2 title="风险提醒" data={boardInfoData4} />
					<Panel title="在线监测" style={{ minHeight: "380px" }}>
						<ul className="condition-ul">
							<li>
								<label>单位</label>
								<Select
									ref="s1"
									data={selectData1}
									onChange={this.onChangeSelect1}
								/>
							</li>
							<li>
								<label>监测项目</label>
								<Select
									ref="s2"
									data={selectData2}
									onChange={this.onChangeSelect2}
								/>
							</li>
						</ul>
						{<Radios data={radios} onChange={this.onChangeRadio} />}
						<p className="chart-title">{chartTitle}</p>
						<div className="bottom-chart ">
							<Chart
								ref="chart"
								loadingChart={loadingChart}
								loadFailed={chartLoadFailed}
								noData={noChartData}
							/>
						</div>
					</Panel>
					{pageLoading ? <PageLoading /> : null}
				</div>
			</div>
		);
	}

	onClickInfo = item => {
		util.traceBack("board-info", item);
	};

	onClickMenu = item => {
		util.traceBack("menu", item);
	};

	onChangeRadio = item => {
		util.traceBack("onChangeRadio", item);
	};

	onChangeSelect1 = item => {
		util.traceBack("onChangeSelect1", item);
	};

	onChangeSelect2 = item => {
		util.traceBack("onChangeSelect2", item);
	};
}

export default App;
