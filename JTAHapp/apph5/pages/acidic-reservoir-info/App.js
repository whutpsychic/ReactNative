import React from "react";
import "./App.css";
import util from "../util/index";
// ====================================
import TopTitle from "../UI/TopTitle/index";
import PageLoading from "../UI/PageLoading/index";
import TopSearcher from "../UI/TopSearcher/index";
import Details from "../UI/Details/index";
// ====================================
import ListView from "../core/components/ListView/index";
import { renderImgIcon } from "../common/index";
import { Button } from "antd-mobile";

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
			<span
				className="editor"
				onClick={e => {
					e.stopPropagation();
					util.traceBack("edit", obj);
				}}
			>
				编辑
			</span>
			<p className="remarks">{obj.remarks}</p>
			<div className="spliter"></div>
			<p className="detail">
				<span>上传单位：{obj.unit}</span>
				<span>日期：{obj.date}</span>
			</p>
		</div>
	);
};

class App extends React.Component {
	state = {
		// 页面加载中
		pageLoading: false,
		// ========
		// 细节数据
		detail: {},
		// 机构树形数据
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
			this.setState({
				pageLoading: true
			});
			setTimeout(() => {
				this.setState({
					pageLoading: false,
					institutions: [
						{ title: "全部", key: "all" },
						{
							title: "根节点",
							key: "gjd",
							children: [
								{
									title: "子节点1",
									key: "z1",
									children: [
										{ title: "叶子结点1", key: "yz1" },
										{ title: "叶子结点2", key: "yz2" },
										{ title: "叶子结点3", key: "yz3" },
										{ title: "叶子结点4", key: "yz4" }
									]
								}
							]
						}
					]
				});
				this.loadListData([
					{
						name: "文件名test0",
						unit: "德兴铜矿",
						person: "admin",
						date: "2020-06-07",
						remarks:
							"djslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkj"
					},
					{
						name: "文件名test1",
						unit: "德兴铜矿",
						person: "admin",
						date: "2020-06-07",
						remarks:
							"djslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkj"
					}
				]);
			}, 800);
		}
	}

	render() {
		const conditionList = [
			{
				label: "单位名称",
				field: "institutions",
				type: "selecttree",
				placeholder: "请选择单位",
				data: this.state.institutions
			},
			{
				label: "开始时间",
				field: "startTime",
				type: "date",
				placeholder: "请选择开始时间",
				clearable: true
			},
			{
				label: "结束时间",
				field: "endTime",
				type: "date",
				placeholder: "请选择结束时间",
				clearable: true
			}
		];

		const { pageLoading, detail } = this.state;
		return (
			<div className="app-container">
				<div className="app-contents">
					<Details ref="detail" data={detail} />
					{pageLoading ? <PageLoading /> : null}
					<TopTitle
						title={`酸性水库信息`}
						canBack
						add
						onAdd={this.onClickAdd}
					/>
					<TopSearcher
						placeholder="请输入水库名称"
						onClickQuery={this.onQuery}
						conditionList={conditionList}
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

	onClickAdd = () => {
		util.traceBack("onAdd");
	};

	onQuery = conditions => {
		console.log(conditions);
		util.traceBack("onChangeConditions", { ...conditions });
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
						title: "文件名test01111111111111",
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
				this.setState({
					loadingDetail: false
				});
			}, 1500);
		}

		util.traceBack("onRefreshList");
	};

	onEndReached = ps => {
		if (debugging) {
			setTimeout(() => {
				this.setListData([
					{
						title: "文件名test02222222222222",
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
				this.setState({
					loadingDetail: false
				});
			}, 1500);
		}
		util.traceBack("onEndReached", { ps });
	};
}

export default App;
