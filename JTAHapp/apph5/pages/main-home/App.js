import React from "react";
import "./App.css";
import util from "../util/index";
import TopTitle from "../components/TopTitle/index";
import Carousel from "./Carousel.js";
import BoardInfo from "../components/BoardInfo/index";
import MenuBlock from "../components/MenuBlock/index";
import Panel from "../components/Panel/index";
import ListItem from "../components/ListItem/index";
import Chart from "../components/Chart/index";

import pic1 from "../img/pic_0.png";
import pic2 from "../img/pic_1.png";
import pic3 from "../img/pic_2.png";

const colors = [];

const getOption = ({ legend, xAxis, data }) => {
	return {
		legend: {
			data: legend,
			top: 22,
			icon: "rect"
		},
		grid: {
			top: "30%",
			right: "10%",
			bottom: "18%",
			left: "18%"
		},
		xAxis: {
			type: "category",
			data: xAxis,
			splitLine: { show: true },
			axisLabel: { interval: 0 }
		},
		yAxis: {
			type: "value",
			min: 0,
			max: 100,
			axisLabel: {
				formatter: v => {
					return v + "%";
				}
			}
		},
		series: data
	};
};

class App extends React.Component {
	state = {
		carouselData: [],
		boardInfoData: [],
		menuData: [],
		selectData1: [],
		selectData2: [],

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
			carouselData: [
				{ href: "1", src: pic1 },
				{ href: "2", src: pic2 },
				{ href: "3", src: pic3 }
			],
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
		// this.setChart({
		// 	legend: ["废水", "废气"],
		// 	xAxis: ["10-16", "10-17", "10-18", "10-19"],
		// 	data: [
		// 		{ name: "废水", type: "line", data: [20, 92, 10, 84] },
		// 		{ name: "废气", type: "line", data: [70, 32, 50, 34] }
		// 	]
		// });

		// this.setState({
		// 	chartTitle: "工业废气PH日数据",
		// 	boardInfoData: [
		// 		{
		// 			text: "开启智慧链新时代，全新智慧链震撼新智慧链震撼",
		// 			date: "2019-06-12"
		// 		},
		// 		{ text: "如何发布高质量五星级产品信息？", date: "2019-06-14" },
		// 		{
		// 			text: "询盘量和流量——秘密在商机里如何做新智慧链震撼",
		// 			date: "2019-06-15"
		// 		}
		// 	],
		// 	selectData1: [
		// 		{ text: "option1", value: 1 },
		// 		{ text: "option2dsssssssssdddd", value: 2 },
		// 		{ text: "option3d", value: 3 },
		// 		{ text: "option4", value: 4 },
		// 		{ text: "option5", value: 5 },
		// 		{ text: "option6", value: 6 },
		// 		{ text: "option7", value: 7 },
		// 		{ text: "option8", value: 8 },
		// 		{ text: "option9", value: 9 }
		// 	],
		// 	selectData2: [
		// 		{ text: "option1", value: 1 },
		// 		{ text: "option2dsssssssssdddd", value: 2 },
		// 		{ text: "option3", value: 3 },
		// 		{ text: "option4", value: 4 },
		// 		{ text: "option5", value: 5 },
		// 		{ text: "option6", value: 6 },
		// 		{ text: "option7", value: 7 },
		// 		{ text: "option8", value: 8 },
		// 		{ text: "option9", value: 9 }
		// 	]
		// });
	}

	setChart = obj => {
		this.refs.chart.setOption(getOption(obj));
	};

	render() {
		const {
			carouselData,
			boardInfoData,
			menuData,
			selectData1,
			selectData2
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
						title="动态信息"
						data={boardInfoData}
						onClick={this.onClickInfo}
					/>
					<MenuBlock data={menuData} onClick={this.onClickMenu} />
					<Panel title="在线监测" style={{ minHeight: "380px" }}>
						{/*<ListItem>
							<ListItem.ListPicker data={[]} label="单位" cols={1} />
							<ListItem.ListPicker data={[]} label="监测项目" cols={1} />
						</ListItem>*/}
						<ul className="condition-ul">
							<li>
								<label>单位</label>
								<select onChange={this.onChangeSelect1}>
									{selectData1.map((item, i) => {
										return (
											<option key={`op${i}`} value={item.value}>
												{item.text}
											</option>
										);
									})}
								</select>
							</li>
							<li>
								<label>监测项目</label>
								<select onChange={this.onChangeSelect2}>
									{selectData2.map((item, i) => {
										return (
											<option key={`op${i}`} value={item.value}>
												{item.text}
											</option>
										);
									})}
								</select>
							</li>
						</ul>
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

	onChangeSelect1 = e => {
		let v = e.target.value;
		util.traceBack("onChangeSelect1", v);
	};

	onChangeSelect2 = e => {
		let v = e.target.value;
		util.traceBack("onChangeSelect2", v);
	};
}

export default App;
