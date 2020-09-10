import React from "react";
import "./App.css";
import util from "../util/index";
import TopTitle from "../components/TopTitle/index";
import BoardInfo from "../components/BoardInfo/index";
import Panel from "../components/Panel/index";

import Button from "../components/Button/index";
import Table from "../components/Table/index";
import Select from "../components/Select/index";
import DatePicker from "../components/DatePicker/index";

class App extends React.Component {
	state = {
		boardData: [],
		boardData2: [],

		selectData1: [],
		selectData2: [],
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
			}
		].map(item => {
			item.align = "center";
			return item;
		}),
		tableData: [],
		tableLoading: false
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
		// this.setState({
		// 	boardData: [
		// 		{
		// 			text: "国庆节前专项检查通知",
		// 			date: "2019-06-12"
		// 		},
		// 		{ text: "高温酷暑专项检查通知", date: "2019-06-14" },
		// 		{
		// 			text: "危险化学品专项检查通知",
		// 			date: "2019-06-15"
		// 		},
		// 		{
		// 			text: "年终专项检查通知",
		// 			date: "2019-06-15"
		// 		}
		// 	],
		// 	boardData2: [
		// 		{
		// 			text: "国庆节前专项检查通知",
		// 			date: "2019-06-12"
		// 		},
		// 		{ text: "高温酷暑专项检查通知", date: "2019-06-14" },
		// 		{
		// 			text: "危险化学品专项检查通知",
		// 			date: "2019-06-15"
		// 		},
		// 		{
		// 			text: "年终专项检查通知",
		// 			date: "2019-06-15"
		// 		}
		// 	],
		// 	selectData1: [
		// 		{ label: "项目名1", value: 1 },
		// 		{ label: "项目名2", value: 2 },
		// 		{ label: "项目名3", value: 3 },
		// 		{ label: "项目名4", value: 4 },
		// 		{ label: "项目名5", value: 5 },
		// 		{ label: "项目名6", value: 6 },
		// 		{ label: "项目名7", value: 7 },
		// 		{ label: "项目名8", value: 8 },
		// 		{ label: "项目名9", value: 9 }
		// 	],
		// 	selectData2: [
		// 		{ label: "单位1", value: 1 },
		// 		{ label: "单位2", value: 2 },
		// 		{ label: "单位3", value: 3 },
		// 		{ label: "单位4", value: 4 },
		// 		{ label: "单位5", value: 5 },
		// 		{ label: "单位6", value: 6 },
		// 		{ label: "单位7", value: 7 },
		// 		{ label: "单位8", value: 8 },
		// 		{ label: "单位9", value: 9 }
		// 	],
		// 	tableData: [
		// 		{ string0: 1, string1: "德钢", string2: "" },
		// 		{ string0: 2, string1: "银山", string2: "" },
		// 		{ string0: 3, string1: "东同", string2: "" },
		// 		{ string0: 4, string1: "武钢", string2: "" },
		// 		{ string0: 5, string1: "德钢", string2: "" },
		// 		{ string0: 6, string1: "银山", string2: "" },
		// 		{ string0: 7, string1: "东同", string2: "" },
		// 		{ string0: 8, string1: "武钢", string2: "" }
		// 	]
		// });
	}

	render() {
		const {
			boardData,
			boardData2,
			selectData1,
			selectData2,
			columns,
			tableData,
			tableLoading
		} = this.state;
		return (
			<div className="app-container">
				<div className="app-contents">
					<TopTitle title="隐患排查治理" canBack />
					<BoardInfo
						title="检查公示"
						data={boardData}
						onClick={this.onClickBoard1}
					/>
					<BoardInfo
						title="整改公示"
						data={boardData2}
						onClick={this.onClickBoard2}
					/>
					<Panel title="隐患排查与治理台账">
						<ul className="condition-ul">
							<li>
								<label>检查项目名称</label>
								<Select
									ref="s1"
									data={selectData1}
									onChange={this.onChangeSelect1}
								/>
							</li>
							<li>
								<label>责任单位</label>
								<Select
									ref="s2"
									data={selectData2}
									onChange={this.onChangeSelect2}
								/>
							</li>
							<li>
								<label>排查截止时间</label>
								<DatePicker ref="d" onChange={this.onChangeDate} />
							</li>
						</ul>
						<ul className="btns">
							<li>
								<Button text="查询" onClick={this.onClickQuery} />
							</li>
							<li>
								<Button text="添加" onClick={this.onClickAdd} />
							</li>
							<li>
								<Button text="导出" onClick={this.onClickOutput} />
							</li>
							<li>
								<Button text="导入" onClick={this.onClickInput} />
							</li>
						</ul>
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
					</Panel>
				</div>
			</div>
		);
	}

	onClickQuery = () => {
		const condition = {
			s1: this.refs.s1.getValue(),
			s2: this.refs.s2.getValue(),
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
