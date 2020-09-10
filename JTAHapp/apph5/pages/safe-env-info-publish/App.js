import React from "react";
import "./App.css";
import util from "../util/index";
import TopTitle from "../components/TopTitle/index";
import Table from "../components/Table/index";
import Button from "../components/Button/index";
import Select from "../components/Select/index";
import Input from "../components/Input/index";
import DatePicker from "../components/DatePicker/index";

const { MonthPicker } = DatePicker;

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
				title: "单位名称",
				dataIndex: "string1",
				key: "string1",
				className: "string1"
			},
			{
				title: "分类",
				dataIndex: "string2",
				key: "string2",
				className: "string2"
			},
			{
				title: "标题",
				dataIndex: "string3",
				key: "string3",
				className: "string3"
			},
			{
				title: "审核时间",
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
		// ==================================

		this.setState({
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
		return (
			<div className="app-container">
				<div className="app-contents">
					<TopTitle title="安全环保信息发布" canBack />
					<ul className="condition-ul">
						<li>
							<label>单位名称</label>
							<Input ref="d1" />
						</li>
						<li>
							<label>分类</label>
							<Select
								ref="s1"
								data={selectData1}
								onChange={this.onChangeSelect1}
							/>
						</li>
						<li>
							<label>当前状态</label>
							<Select
								ref="s2"
								data={selectData1}
								onChange={this.onChangeSelect1}
							/>
						</li>
						<li>
							<label>标题</label>
							<Input ref="in2" />
						</li>
					</ul>
					<ul className="btns">
						<li>
							<Button text="查询" onClick={this.onClickQuery} />
						</li>
						<li>
							<Button text="新增" onClick={this.onClickQuery} />
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
