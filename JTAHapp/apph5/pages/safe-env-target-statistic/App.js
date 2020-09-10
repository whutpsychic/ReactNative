import React from "react";
import "./App.css";
import util from "../util/index";
import TopTitle from "../components/TopTitle/index";
import Table from "../components/Table/index";
import Button from "../components/Button/index";
import Select from "../components/Select/index";
import DatePicker from "../components/DatePicker/index";
import Chart from "../components/Chart/index";

const { MonthPicker, YearPicker } = DatePicker;

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
		selectData1: [],
		columns: [
			{
				title: "序号",
				dataIndex: "string0",
				key: "string0",
				className: "string0"
			},
			{
				title: "责任单位",
				dataIndex: "string1",
				key: "string1",
				className: "string1"
			},
			{
				title: "检查项目名称",
				dataIndex: "string2",
				key: "string2",
				className: "string2"
			},
			{
				title: "检查项目名称",
				dataIndex: "string3",
				key: "string3",
				className: "string3"
			},
			{
				title: "检查项目名称",
				dataIndex: "string4",
				key: "string4",
				className: "string4"
			},
			{
				title: "检查项目名称",
				dataIndex: "string5",
				key: "string5",
				className: "string5"
			},
			{
				title: "检查项目名称",
				dataIndex: "string6",
				key: "string6",
				className: "string6"
			},
			{
				title: "检查项目名称",
				dataIndex: "string7",
				key: "string7",
				className: "string7"
			}
		].map(item => {
			item.align = "center";
			return item;
		}),
		tableData: [
			{
				string0: "xxxxx",
				string1: "xxxxx",
				string2: "xxxxx",
				string3: "xxxxx",
				string4: "xxxxx",
				string5: "xxxxx",
				string6: "xxxxx",
				string7: "xxxxx"
			},
			{
				string0: "xxxxx",
				string1: "xxxxx",
				string2: "xxxxx",
				string3: "xxxxx",
				string4: "xxxxx",
				string5: "xxxxx",
				string6: "xxxxx",
				string7: "xxxxx"
			},
			{
				string0: "xxxxx",
				string1: "xxxxx",
				string2: "xxxxx",
				string3: "xxxxx",
				string4: "xxxxx",
				string5: "xxxxx",
				string6: "xxxxx",
				string7: "xxxxx"
			},
			{
				string0: "xxxxx",
				string1: "xxxxx",
				string2: "xxxxx",
				string3: "xxxxx",
				string4: "xxxxx",
				string5: "xxxxx",
				string6: "xxxxx",
				string7: "xxxxx"
			},
			{
				string0: "xxxxx",
				string1: "xxxxx",
				string2: "xxxxx",
				string3: "xxxxx",
				string4: "xxxxx",
				string5: "xxxxx",
				string6: "xxxxx",
				string7: "xxxxx"
			},
			{
				string0: "xxxxx",
				string1: "xxxxx",
				string2: "xxxxx",
				string3: "xxxxx",
				string4: "xxxxx",
				string5: "xxxxx",
				string6: "xxxxx",
				string7: "xxxxx"
			},
			{
				string0: "xxxxx",
				string1: "xxxxx",
				string2: "xxxxx",
				string3: "xxxxx",
				string4: "xxxxx",
				string5: "xxxxx",
				string6: "xxxxx",
				string7: "xxxxx"
			},
			{
				string0: "xxxxx",
				string1: "xxxxx",
				string2: "xxxxx",
				string3: "xxxxx",
				string4: "xxxxx",
				string5: "xxxxx",
				string6: "xxxxx",
				string7: "xxxxx"
			},
			{
				string0: "xxxxx",
				string1: "xxxxx",
				string2: "xxxxx",
				string3: "xxxxx",
				string4: "xxxxx",
				string5: "xxxxx",
				string6: "xxxxx",
				string7: "xxxxx"
			},
			{
				string0: "xxxxx",
				string1: "xxxxx",
				string2: "xxxxx",
				string3: "xxxxx",
				string4: "xxxxx",
				string5: "xxxxx",
				string6: "xxxxx",
				string7: "xxxxx"
			}
		],
		tableLoading: false,
		chartTitle: "",
		loadingChart: false,
		chartLoadFailed: false,
		noChartData: false
	};

	setChart = obj => {
		this.refs.chart.setOption(getOption(obj));
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
		// ==================================
		this.setChart({
			legend: ["废水", "废气"],
			xAxis: ["10-16", "10-17", "10-18", "10-19"],
			data: [
				{ name: "废水", type: "line", data: [20, 92, 10, 84] },
				{ name: "废气", type: "line", data: [70, 32, 50, 34] }
			]
		});

		this.setState({
			chartTitle: "工业废气PH日数据",
			boardInfoData: [
				{
					text: "开启智慧链新时代，全新智慧链震撼新智慧链震撼",
					date: "2019-06-12"
				},
				{ text: "如何发布高质量五星级产品信息？", date: "2019-06-14" },
				{
					text: "询盘量和流量——秘密在商机里如何做新智慧链震撼",
					date: "2019-06-15"
				}
			],
			selectData1: [
				{ text: "option1", value: 1 },
				{ text: "option2dsssssssssdddd", value: 2 },
				{ text: "option3d", value: 3 },
				{ text: "option4", value: 4 },
				{ text: "option5", value: 5 },
				{ text: "option6", value: 6 },
				{ text: "option7", value: 7 },
				{ text: "option8", value: 8 },
				{ text: "option9", value: 9 }
			],
			selectData2: [
				{ text: "option1", value: 1 },
				{ text: "option2dsssssssssdddd", value: 2 },
				{ text: "option3", value: 3 },
				{ text: "option4", value: 4 },
				{ text: "option5", value: 5 },
				{ text: "option6", value: 6 },
				{ text: "option7", value: 7 },
				{ text: "option8", value: 8 },
				{ text: "option9", value: 9 }
			]
		});
	}

	render() {
		const { selectData1, selectData2 } = this.state;
		const { columns, tableData, tableLoading } = this.state;
		const {
			chartTitle,
			loadingChart,
			chartLoadFailed,
			noChartData
		} = this.state;
		return (
			<div className="app-container">
				<div className="app-contents">
					<TopTitle title="安全环保目标统计" canBack />
					<ul className="condition-ul">
						<li>
							<label>开始时间</label>
							<MonthPicker ref="d1" onChange={this.onChangeDate1} />
						</li>
						<li>
							<label>结束时间</label>
							<MonthPicker ref="d2" onChange={this.onChangeDate2} />
						</li>
						<li>
							<label>单位名称</label>
							<Select
								ref="s1"
								data={selectData1}
								onChange={this.onChangeSelect1}
							/>
						</li>
					</ul>
					<ul className="btns">
						<li>
							<Button text="查询" onClick={this.onClickQuery} />
						</li>
						<li>
							<Button text="编辑" onClick={this.onClickQuery} />
						</li>
					</ul>
					<div className="table-container-outer">
						<div className="table-container">
							<Table
								columns={columns}
								loading={tableLoading}
								dataSource={tableData}
								pagination={false}
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
					</div>
					<div className="chart-container-outer">
						<ul className="ahead-conditions">
							<li>
								<label>年份</label>
								<YearPicker ref="y" onChange={this.onChangeDate1} />
							</li>
							<li>
								<label>指标</label>
								<Select data={[]} />
							</li>
						</ul>
						<Chart
							ref="chart"
							loadingChart={loadingChart}
							loadFailed={chartLoadFailed}
							noData={noChartData}
						/>
					</div>
				</div>
			</div>
		);
	}

	onClickQuery = () => {
		const condition = {
			s1: this.refs.s1.getValue(),
			d: this.refs.d.getValue().format("YYYY-MM-DD")
		};
		util.traceBack("btn-query", condition);
	};

	onClickAdd = () => {
		util.traceBack("btn-add", {});
	};

	onClickOutput = () => {
		util.traceBack("btn-output", {});
	};

	onClickInput = () => {
		util.traceBack("btn-input", {});
	};

	onChangeSelect1 = obj => {
		util.traceBack("s1", obj);
	};

	onChangeSelect2 = obj => {
		util.traceBack("s2", obj);
	};

	onChangeDate = v => {
		util.traceBack("date", v);
	};
}

export default App;
