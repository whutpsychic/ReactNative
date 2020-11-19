import React from "react";
import "./App.css";
import util from "../util/index";
import TopTitle from "../components/TopTitle/index";
import BoardInfo from "../components/BoardInfo/index";
import Panel from "../components/Panel/index";

import Button from "../components/Button/index";
import Table from "../components/Table/index";
import Input from "../components/Input/index";
import SelectTree from "../components/SelectTree/index";
import DatePicker from "../components/DatePicker/index";
import PageLoading from "../components/PageLoading/index";

class Tips extends React.Component {
	state = {
		show: false,
		loading: false
	};

	render() {
		const { data } = this.props;
		const { loading, show } = this.state;
		return show ? (
			<div className="tips-container-outer">
				<div className="tips-msk" onClick={this.hide}></div>
				{loading ? <PageLoading /> : null}
				<div className="tips-container">
					<span>通知内容：{data.content}</span>
					<span>发布时间：{data.date}</span>
					<span>
						附件列表：
						{data.files &&
							data.files.length &&
							data.files.map((item, i) => {
								return (
									<a key={`${i}`} onClick={() => util.traceBack("file", item)}>
										{item.name}
									</a>
								);
							})}
					</span>
				</div>
			</div>
		) : null;
	}

	show = () => {
		this.setState({
			show: true
		});
	};

	hide = () => {
		this.setState({
			show: false
		});
	};

	loading = () => {
		this.setState({
			loading: true
		});
	};

	loaded = () => {
		this.setState({
			loading: false
		});
	};
}

class Detail extends React.Component {
	state = {
		show: false,
		loading: false
	};

	render() {
		const { data } = this.props;
		const { loading, show } = this.state;
		return show ? (
			<div className="detail-container-outer">
				<div className="detail-msk" onClick={this.hide}></div>
				{loading ? <PageLoading /> : null}
				<div className="detail-container">
					<p>事故隐患与整改意见表</p>
					<span>检查项目名称:{data.name}</span>
					<span>责任单位:{data.unit}</span>
					<span>排查时间:{data.date}</span>
					<span>责任人:{data.person}</span>
					<span>整改期限:{data.time}</span>
					<span>复核时间:{data.recheckTime}</span>
					<span>复核状态:{data.recheckState}</span>
					<span>存在问题:{data.question}</span>
					<span>整改措施:{data.solution}</span>
					<span>
						问题附件：
						{data.files1 &&
							data.files1.length &&
							data.files1.map(item => {
								return (
									<a onClick={() => util.traceBack("file", item)}>
										{item.name}
									</a>
								);
							})}
					</span>
					<p>整改反馈</p>
					<span>完成时间:{data.checkDate}</span>
					<span>反馈人:{data.fbPerson}</span>
					<span>完成情况:{data.completed}</span>
					<span>
						反馈附件：
						{data.files2 &&
							data.files2.length &&
							data.files2.map(item => {
								return (
									<a onClick={() => util.traceBack("file", item)}>
										{item.name}
									</a>
								);
							})}
					</span>
				</div>
			</div>
		) : null;
	}

	show = () => {
		this.setState({
			show: true
		});
	};

	hide = () => {
		this.setState({
			show: false
		});
	};

	loading = () => {
		this.setState({
			loading: true
		});
	};

	loaded = () => {
		this.setState({
			loading: false
		});
	};
}

class App extends React.Component {
	state = {
		pageLoading: false,

		boardData: [],
		boardData2: [],

		selectData: [],
		columns: [],
		tableData: [],
		tableLoading: false,

		tipsData: {},
		detailData: {}
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
		const { pageLoading, boardData, boardData2 } = this.state;
		const { selectData, columns, tableData, tableLoading } = this.state;
		const { tipsData, detailData } = this.state;
		return (
			<div className="app-container">
				<div className="app-contents">
					{pageLoading ? <PageLoading /> : null}
					{<Tips ref="tips" data={tipsData} />}
					{<Detail ref="detail" data={detailData} />}
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
								<Input ref="input" onChange={this.onChangeInput} />
							</li>
							<li>
								<label>责任单位</label>
								<SelectTree
									ref="select"
									data={selectData}
									placeholder={"选择责任单位"}
									onChange={this.onChangeSelect}
								/>
							</li>
							<li>
								<label>开始时间</label>
								<DatePicker ref="date" onChange={this.onChangeDate} />
							</li>
							<li>
								<label>结束时间</label>
								<DatePicker ref="date2" onChange={this.onChangeDate2} />
							</li>
						</ul>
						<ul className="btns">
							<li>
								<Button text="查询" onClick={this.onClickQuery} />
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
										// 点击行
										onClick: event => {
											event.preventDefault();
											util.setItUp(
												event.target.parentNode,
												event.target.parentNode.parentNode
											);
											this.onClickTableRow(record);
										}
									};
								}}
							/>
						</div>
					</Panel>
				</div>
			</div>
		);
	}

	onClickBoard1 = item => {
		util.traceBack("board1", { ...item });
		this.refs.tips.show();
	};

	onClickBoard2 = item => {
		util.traceBack("board2", { ...item });
		this.refs.tips.show();
	};

	onClickQuery = () => {
		const condition = {
			input: this.refs.input.getValue(),
			select: this.refs.select.getValue(),
			startDate: this.refs.date.getValue().format("YYYY-MM-DD"),
			endDate: this.refs.date2.getValue().format("YYYY-MM-DD")
		};
		util.traceBack("btn-query", condition);
	};

	onChangeSelect = obj => {
		util.traceBack("onChangeSelect", obj);
	};

	onChangeDate = v => {
		util.traceBack("date", v);
	};

	onChangeDate2 = v => {
		util.traceBack("date2", v);
	};

	onClickTableRow = record => {
		util.traceBack("onClickTableRow", { ...record });
		this.refs.detail.show();
	};
}

export default App;
