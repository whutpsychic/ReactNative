import React from "react";
import "./App.css";
import util from "../util/index";
// ====================================
import TopTitle from "../components/TopTitle/index";
import PageLoading from "../components/PageLoading/index";
import TopSearcher from "../UI/TopSearcher/index";
// import Details from "../UI/Details/index";
// ====================================
import ListView from "../components/ListView/index";
import { renderImgIcon } from "../common/index";
import moment from "moment";

// debug模式
const debugging = false;

// 渲染每一项
const renderListItem = ({
	data,
	onClick,
	itemIndex,
	rowData,
	sectionID,
	rowID
}) => {
	if (itemIndex < 0) {
		itemIndex = data.length - 1;
	}
	const obj = data[itemIndex];
	if (!obj) return null;

	// const renderTab = tag => {
	// 	if (tag === "期限内") {
	// 		return <span className="tag inner">期限内</span>;
	// 	} else if (tag === "即将到期") {
	// 		return <span className="tag will">即将到期</span>;
	// 	} else if (tag === "已过期") {
	// 		return <span className="tag outer">已过期</span>;
	// 	} else {
	// 		return <span className="tag">未知状态</span>;
	// 	}
	// };

	return (
		<div
			key={rowID}
			className="item-outer"
			onClick={() => {
				if (typeof onClick === "function") onClick(obj);
				util.traceBack("clickItem", obj);
			}}
		>
			<p className="title">{obj.name}</p>
			<p>
				<span> 流量（升/秒）</span>
				<span>{obj.value1}</span>
			</p>
			<p>
				<span>pH（无量纲）</span>
				<span>{obj.value2}</span>
			</p>
			<p>
				<span>化学需氧量（毫克/升）</span>
				<span>{obj.value3}</span>
			</p>
			<p>
				<span>氨氮（毫克/升）</span>
				<span>{obj.value4}</span>
			</p>
			<div className="spliter"></div>
			<p className="detail">
				<span>监测时间：{obj.time}</span>
			</p>
		</div>
	);
};

class App extends React.Component {
	state = {
		pageLoading: false,
		detail: {},
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
		],
		institutions: []
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
			this.loadListData([
				{
					name: "文件名test0",
					unit: "德兴铜矿",
					person: "admin",
					date: "2020-06-07",
					value1: 111,
					value2: 111,
					value3: 111,
					value4: 111,
					remarks:
						"djslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkj"
				}
			]);
		}
	}

	render() {
		const { pageLoading, otherConditions = [] } = this.state;

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
				<div className="app-contents">
					{pageLoading ? <PageLoading /> : null}
					<TopTitle title={`历史数据`} canBack />
					<TopSearcher
						// placeholder="报告名称"
						onClickQuery={this.onQuery}
						conditionList={conditionList}
						noinput
					/>
					<ListView
						ref="lv"
						height={document.documentElement.clientHeight}
						onClick={this.onClickItem}
						renderItem={renderListItem}
						onRefresh={this.onRefreshList}
						onEndReached={this.onEndReached}
						separator={null}
					/>
				</div>
			</div>
		);
	}

	onQuery = condition => {
		console.log(condition);
		util.traceBack("onChangeConditions", condition);
	};

	onClickItem = x => {
		this.refs.detail.show();
		if (debugging) {
			setTimeout(() => {
				this.setState({
					detail: {
						fieldContents: [
							{ label: "名称", content: "抗洪抢险，江铜在行动 4" },
							{
								label: "名称",
								content: "抗洪抢险，江铜在行动 4",
								multiLines: true
							},
							{ label: "名称", content: "抗洪抢险，江铜在行动 4" },
							{ label: "名称", content: "抗洪抢险，江铜在行动 4" },
							{ label: "名称", content: "抗洪抢险，江铜在行动 4" },
							{ label: "名称", content: "抗洪抢险，江铜在行动 4" },
							{ label: "名称", content: "抗洪抢险，江铜在行动 4" },
							{ label: "名称", content: "抗洪抢险，江铜在行动 4" },
							{ label: "名称", content: "抗洪抢险，江铜在行动 4" }
						],
						files: [
							{
								id: 1,
								title: "f1",
								type: "xlsx",
								url: "xxxxxx1"
							},
							{
								id: 2,
								title: "f2",
								type: "pdf",
								url: "xxxxxx2"
							},
							{
								id: 3,
								title: "f3",
								type: "txt",
								url: "xxxxxx3"
							}
						]
					}
				});
			}, 1000);
		}
	};

	listLoading = () => {
		this.refs.lv.loading();
	};

	listLoaded = () => {
		this.refs.lv.loaded();
	};

	noMoreItem = () => {
		this.refs.lv.nomore();
	};

	loadListData = data => {
		this.refs.lv.loadData(data);
	};

	setListData = data => {
		this.refs.lv.setData(data);
	};

	onRefreshList = reset => {
		this.refs.lv.refreshing();
		if (debugging) {
			setTimeout(() => {
				this.loadListData([
					{
						name: "文件名test01111111111111",
						person: "admin",
						date: "2020-06-07",
						remarks: "djslkahljashlgjkhasfkj",
						files: [
							{
								id: 1,
								name: "f1",
								type: "xlsx",
								url: "xxxxxx1"
							},
							{
								id: 2,
								name: "f2",
								type: "pdf",
								url: "xxxxxx2"
							},
							{
								id: 3,
								name: "f3",
								type: "txt",
								url: "xxxxxx3"
							}
						]
					}
				]);
				this.listLoaded();
			}, 1500);
		}

		util.traceBack("onRefreshList");
	};

	onEndReached = ps => {
		if (debugging) {
			setTimeout(() => {
				this.setListData([
					{
						name: "文件名test02222222222222",
						person: "admin",
						date: "2020-06-07",
						remarks: "djslkahljashlgjkhasfkj",
						files: [
							{
								id: 1,
								name: "f1",
								type: "xlsx",
								url: "xxxxxx1"
							},
							{
								id: 2,
								name: "f2",
								type: "pdf",
								url: "xxxxxx2"
							},
							{
								id: 3,
								name: "f3",
								type: "txt",
								url: "xxxxxx3"
							}
						]
					}
				]);
			}, 1500);
		}
		util.traceBack("onEndReached", { ps });
	};
}

export default App;
