import React from "react";
import "./App.css";
import util from "../util/index";
// ====================================
import TopTitle from "../components/TopTitle/index";
import PageLoading from "../components/PageLoading/index";
import TopSearcher from "../UI/TopSearcher/index";
// ====================================
import moment from "moment";
import { Table } from "antd";
import "antd/es/table/style/css.js";
import columns1 from "./feishui.js";
import columns2 from "./feiqi.js";
import { treeData, tableData, tb2 } from "../faker.js";

// debug模式
const debugging = false;

class App extends React.Component {
	state = {
		pageLoading: false,
		tableScroller: 1200,
		columns: columns1,
		dataSource: [],
		ps: 5,
		otherConditions: [
			{
				label: "开始时间",
				field: "time1",
				type: "time",
				disabled: true,
				defaultValue: `${moment().format("YYYY-MM-DD")} 00:00`
			},
			{
				label: "结束时间",
				field: "time2",
				type: "time",
				disabled: true,
				defaultValue: `${moment().format("YYYY-MM-DD HH:MM")}`
			}
		],
		types: [
			{ label: "实时数据", value: 1 },
			{ label: "小时数据", value: 2 },
			{ label: "日数据", value: 3 }
		]
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
			// console.log(tb2);
			this.setState({
				pageLoading: true
			});
			setTimeout(() => {
				this.setState({
					pageLoading: false,
					dataSource: tb2
				});
			}, 1000);
		}
	}

	render() {
		const { pageLoading, title, otherConditions = [] } = this.state;
		const { tableScroller, columns, dataSource, ps } = this.state;
		const conditionList = [
			{
				label: "均值类型",
				field: "type",
				type: "select",
				data: this.state.types,
				onChange: x => {
					const { value } = x;
					switch (value) {
						case 1:
							this.setState({
								otherConditions: [
									{
										label: "开始时间",
										field: "time1",
										type: "time",
										disabled: true,
										defaultValue: `${moment().format("YYYY-MM-DD")} 00:00`
									},
									{
										label: "结束时间",
										field: "time2",
										type: "time",
										disabled: true,
										defaultValue: `${moment().format("YYYY-MM-DD HH:MM")}`
									}
								]
							});
							return;
						case 2:
							this.setState({
								otherConditions: [
									{
										label: "开始时间",
										field: "time1",
										type: "time",
										defaultValue: `${moment().format("YYYY-MM-DD")} 00:00`
									},
									{
										label: "结束时间",
										field: "time2",
										type: "time",
										defaultValue: `${moment().format("YYYY-MM-DD HH:MM")}`
									}
								]
							});
							return;
						case 3:
							this.setState({
								otherConditions: [
									{ label: "开始时间", field: "time1", type: "date" },
									{ label: "结束时间", field: "time2", type: "date" }
								]
							});
							return;
						default:
							return;
					}
				}
			},
			...otherConditions
		];

		return (
			<div className="app-container">
				<div className="app-contents horizontal">
					{pageLoading ? <PageLoading /> : null}
					<TopTitle title={title} canBack />
					<TopSearcher
						// placeholder="报告名称"
						onClickQuery={this.onQuery}
						conditionList={conditionList}
						noinput
					/>
					<div className="table-container">
						<Table
							dataSource={dataSource}
							columns={columns}
							pagination={{ pageSize: ps }}
							scroll={{ x: tableScroller }}
							onRow={record => {
								return {
									className: "td-row",
									onClick: event => {} // 点击行
								};
							}}
							onHeaderRow={column => {
								return {
									className: "th-row",
									onClick: () => {} // 点击表头行
								};
							}}
						/>
					</div>
				</div>
			</div>
		);
	}

	onQuery = condition => {
		console.log(condition);
		util.traceBack("onChangeConditions", condition);
	};

	changeToFeiqi = () => {
		this.setState({
			columns: columns2
		});
	};
}

export default App;