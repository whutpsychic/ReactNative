import React from "react";
import "./App.css";
import util from "../util/index";
// ====================================
import TopTitle from "../components/TopTitle/index";
import PageLoading from "../components/PageLoading/index";
import TopSearcher from "../UI/TopSearcher/index";
import ApprovalProccess from "../UI/ApprovalProccess/index";
import Details from "../UI/Details/index";
// ====================================
import ListView from "../components/ListView/index";
import { renderImgIcon } from "../common/index";
import { Button } from "antd-mobile";

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
			}}
		>
			<p className="title">{obj.name}</p>
			<span className="status">{obj.status}</span>
			<p className="remarks">{obj.remarks}</p>
			<div className="spliter"></div>
			<p className="detail">
				<span>编制人：{obj.person}</span>
				<span>编制时间：{obj.time}</span>
			</p>
		</div>
	);
};

class App extends React.Component {
	state = {
		// 页面加载中
		pageLoading: false,
		// ========
		// 是否可审批
		approvalable: true,
		// 细节数据
		detail: {},
		// 流程数据
		proccessData: [],
		// 审批意见数据
		comments: "",
		// 机构树形数据
		institutions: [],

		typeData: [
			{ label: "全部", value: undefined },
			{ label: "历史今天", value: 1 },
			{ label: "风险提示", value: 2 }
		],
		statusData: [
			{ label: "全部", value: undefined },
			{ label: "待办", value: 1 },
			{ label: "已办", value: 2 }
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
			this.loadListData([
				{
					name: "抗洪抢险，江铜在行动 4",
					unit: "江西铜业集团有限公司",
					type: "安全",
					person: "admin",
					orgDate: "2020-07-21 09:07:02",
					publishDate: "2020-07-21 09:07:02",
					status: "已发布"
				},
				{
					name: "抗洪抢险，江铜在行动 5",
					unit: "江西铜业集团有限公司",
					type: "安全",
					person: "admin",
					orgDate: "2020-07-21 09:07:02",
					publishDate: "2020-07-21 09:07:02",
					status: "待审批"
				}
			]);
			this.setState({
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
				],
				types: [
					{ label: "类型1", value: "lx1" },
					{ label: "类型2", value: "lx2" },
					{ label: "类型3", value: "lx3" },
					{ label: "类型4", value: "lx4" },
					{ label: "类型5", value: "lx5" }
				]
			});
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
				label: "分类",
				field: "type",
				type: "select",
				data: this.state.typeData
			},
			{
				label: "时间",
				field: "time",
				type: "date",
				placeholder: "请选择时间",
				clearable: true
			},
			{
				label: "状态",
				field: "status",
				type: "radios",
				data: this.state.statusData
			}
		];

		const renderStepItem = item => (
			<div className="step-blocker">
				<p className="status">{`${item.status}`}</p>
				<p className="opinion">{`${item.opinion}`}</p>
				<p className="cost">{`耗时：${item.cost}`}</p>
				<p className="person">{`处理人：${item.person}`}</p>
				<p className="date">{`${item.date}`}</p>
			</div>
		);

		const { pageLoading, pageData } = this.state;
		const { proccessData, comments, detail, approvalable } = this.state;
		return (
			<div className="app-container">
				{pageLoading ? <PageLoading /> : null}
				<Details
					ref="detail"
					data={detail}
					extra={() => (
						<React.Fragment>
							<a onClick={() => this.onViewProccess()}>查看审核流程</a>
							{approvalable ? (
								<React.Fragment>
									<textarea
										placeholder={"意见"}
										onChange={e => {
											const { value } = e.target;
											this.setState({
												comments: value
											});
										}}
									></textarea>
									<Button
										className="approval-btn agree"
										onClick={() => {
											util.traceBack("pass", { comments });
										}}
									>
										通过
									</Button>
									<Button
										className="approval-btn reject"
										onClick={() => {
											util.traceBack("reject", { comments });
										}}
									>
										驳回
									</Button>
								</React.Fragment>
							) : null}
						</React.Fragment>
					)}
				/>
				<ApprovalProccess
					ref="proccess"
					title="审批进度"
					data={proccessData}
					renderStepItem={renderStepItem}
				/>
				<div className="app-contents">
					<TopTitle title={`风险提示审批`} canBack />
					<TopSearcher
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

	onViewProccess = () => {
		this.refs.proccess.show();
		util.traceBack("onViewProccess");

		if (debugging) {
			this.setState({
				proccessData: [
					{
						title: "编制测试",
						status: "提交",
						opinion: "未填写意见",
						date: "2020-07-21 09:05:40",
						cost: 0,
						person: "集团测试"
					},
					{
						title: "审批测试",
						status: "同意",
						opinion: "未填写意见",
						date: "2020-07-21 09:05:40",
						cost: 0,
						person: "admin"
					},
					{
						title: "完成测试",
						status: "同意",
						opinion: "未填写意见",
						date: "2020-07-21 09:05:40",
						cost: 0,
						person: "admin"
					}
				]
			});
		}
	};

	onClickItem = item => {
		this.refs.detail.show();
		util.traceBack("onClickItem", { ...item });

		if (debugging) {
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
					files: []
				}
			});
		}
	};

	onQuery = conditions => {
		util.traceBack("onChangeConditions", { ...conditions });
	};

	hideDetail = () => {
		this.refs.detail.hide();
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
			}, 1500);
		}
		util.traceBack("onEndReached", { ps });
	};
}

export default App;
