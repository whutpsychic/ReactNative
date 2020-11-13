import React from "react";
import "./App.css";
import util from "../util/index";
// ====================================
import TopTitle from "../components/TopTitle/index";
import PageLoading from "../components/PageLoading/index";
import TopSearcher from "../UI/TopSearcher/index";
import Details from "../UI/Details/index";
// ====================================
import ListView from "../components/ListView/index";
import { renderImgIcon } from "../common/index";

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
			<p className="remarks">{obj.remarks}</p>
			<div className="spliter"></div>
			<p className="detail">
				<span>分类：{obj.type}</span>
				<span>类别：{obj.type2}</span>
			</p>
		</div>
	);
};

class App extends React.Component {
	state = {
		pageLoading: false,
		detail: {},
		// types: [],
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
				institutions: [{"value":"390090725934497792","label":"江西铜业集团有限公司","parentId":"0","sort":0,"level":1,"children":[{"value":"436932209262198784","label":"德兴铜矿","parentId":"390090725934497792","sort":1,"level":2,"children":[],"title":"德兴铜矿","key":"436932209262198784"},{"value":"436933485161086976","label":"城门山铜矿","parentId":"390090725934497792","sort":2,"level":2,"children":[],"selectable":false,"title":"城门山铜矿","key":"436933485161086976"},{"value":"436934554456948736","label":"永平铜矿","parentId":"390090725934497792","sort":3,"level":2,"children":[],"selectable":false,"title":"永平铜矿","key":"436934554456948736"},{"value":"436935221909127168","label":"武山铜矿","parentId":"390090725934497792","sort":4,"level":2,"children":[],"selectable":false,"title":"武山铜矿","key":"436935221909127168"},{"value":"436935493695832064","label":"银山矿业","parentId":"390090725934497792","sort":5,"level":2,"children":[],"selectable":false,"title":"银山矿业","key":"436935493695832064"},{"value":"436936484168138752","label":"东同矿业","parentId":"390090725934497792","sort":6,"level":2,"children":[],"selectable":false,"title":"东同矿业","key":"436936484168138752"},{"value":"436936900947738624","label":"四川稀土","parentId":"390090725934497792","sort":7,"level":2,"children":[],"selectable":false,"title":"四川稀土","key":"436936900947738624"},{"value":"436937049254133760","label":"七宝山矿业","parentId":"390090725934497792","sort":8,"level":2,"children":[],"selectable":false,"title":"七宝山矿业","key":"436937049254133760"},{"value":"436937866908532736","label":"贵溪冶炼厂","parentId":"390090725934497792","sort":9,"level":2,"children":[],"selectable":false,"title":"贵溪冶炼厂","key":"436937866908532736"},{"value":"436942583181082624","label":"铅锌公司","parentId":"390090725934497792","sort":10,"level":2,"children":[],"selectable":false,"title":"铅锌公司","key":"436942583181082624"},{"value":"436942983275741184","label":"金德铅业","parentId":"390090725934497792","sort":11,"level":2,"children":[],"selectable":false,"title":"金德铅业","key":"436942983275741184"},{"value":"436943904206487552","label":"江铜清远","parentId":"390090725934497792","sort":12,"level":2,"children":[],"selectable":false,"title":"江铜清远","key":"436943904206487552"},{"value":"436948078520434688","label":"铜加工事业部","parentId":"390090725934497792","sort":13,"level":2,"children":[],"selectable":false,"title":"铜加工事业部","key":"436948078520434688"},{"value":"436944350979555328","label":"铜板带公司","parentId":"390090725934497792","sort":14,"level":2,"children":[],"selectable":false,"title":"铜板带公司","key":"436944350979555328"},{"value":"436944640503971840","label":"铜箔公司","parentId":"390090725934497792","sort":15,"level":2,"children":[],"selectable":false,"title":"铜箔公司","key":"436944640503971840"},{"value":"436945762669035520","label":"铜材公司","parentId":"390090725934497792","sort":16,"level":2,"children":[],"selectable":false,"title":"铜材公司","key":"436945762669035520"},{"value":"462948831454035968","label":"广州铜材","parentId":"390090725934497792","sort":17,"level":2,"children":[],"selectable":false,"title":"广州铜材","key":"462948831454035968"},{"value":"481028643292708864","label":"江铜物流","parentId":"390090725934497792","sort":18,"level":2,"children":[],"selectable":false,"title":"江铜物流","key":"481028643292708864"},{"value":"481029125448925184","label":"南方公司","parentId":"390090725934497792","sort":19,"level":2,"children":[],"selectable":false,"title":"南方公司","key":"481029125448925184"}],"selectable":false,"title":"江西铜业集团有限公司","key":"390090725934497792"}]
			});
			this.loadListData([
				{
					name: "文件名test0",
					unit: "德兴铜矿",
					person: "admin",
					date: "2020-06-07",
					remarks:
						"djslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkj"
				}
			]);
		}
	}

	render() {
		const { pageLoading, detail } = this.state;

		const conditionList = [
			{
				label: "单位",
				field: "institution",
				type: "selecttree",
				data: this.state.institutions
			}
		];

		return (
			<div className="app-container">
				<div className="app-contents">
					<Details ref="detail" title="详情" data={detail} />
					{pageLoading ? <PageLoading /> : null}
					<TopTitle title={`环保档案资料`} canBack />
					<TopSearcher
						placeholder="项目/文档名称"
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

	onQuery = condition => {
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
