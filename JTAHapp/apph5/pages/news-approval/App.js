import React from "react";
import "./App.css";
import util from "../util/index";
import TopTitle from "../components/TopTitle/index";
import PageLoading from "../components/PageLoading/index";
import Select from "../components/Select/index";
import SelectTree from "../components/SelectTree/index";
import DatePicker from "../components/DatePicker/index";
import imgs from "../img/img.js";
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";
import { Steps, Button } from "antd-mobile";
import { Radio, Spin } from "antd";
import "antd/es/radio/style/index.css";
import "antd/es/spin/style/index.css";

const Step = Steps.Step;
const {
	fileIcon_xlsx,
	fileIcon_pdf,
	fileIcon_txt,
	fileIcon_jpg,
	fileIcon_defaulti
} = imgs;

// 流程展示组件
class ApprovalProccess extends React.Component {
	state = {
		showProccess: false,
		loading: false
	};
	render() {
		const { showProccess, loading } = this.state;
		const { data } = this.props;
		return showProccess ? (
			<div className="approval-proccess-container">
				<div className="msk" onClick={this.onClickMsk} />
				{loading ? (
					<div className="spin-container-outer">
						<div className="spin-container">
							<Spin />
						</div>
					</div>
				) : null}
				<div className="main-container">
					<p>审批进度</p>
					<Steps size="small" current={2}>
						{data.map((item, i) => {
							return (
								<Step
									key={`ik${i}`}
									title={<p className="step-title">{item.title}</p>}
									description={
										<div className="step-blocker">
											<p className="status">{`${item.status}`}</p>
											<p className="opinion">{`${item.opinion}`}</p>
											<p className="cost">{`耗时：${item.cost}`}</p>
											<p className="person">{`处理人：${item.person}`}</p>
											<p className="date">{`${item.date}`}</p>
										</div>
									}
								/>
							);
						})}
					</Steps>
				</div>
			</div>
		) : null;
	}

	show = () => {
		this.setState({
			showProccess: true
		});
	};

	onClickMsk = () => {
		this.setState({
			showProccess: false
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

// 细节展示
class Detail extends React.Component {
	state = {
		showDetail: false,
		comments: ""
	};

	render() {
		const { showDetail, comments } = this.state;
		const { onViewProccess, data } = this.props;
		const { unit, name, type, person, orgDate, publishDate } = this.props.data;
		const { status, img, contents, files, approvalable } = this.props.data;
		return showDetail ? (
			<div className="detail-container">
				<div className="msk" onClick={this.onClickMsk} />
				<div className="main-container">
					<p className="detail-title">{name}</p>
					<ul>
						<li>
							<label>{`发布机构`}</label>
							<span>{unit}</span>
						</li>
						<li>
							<label>{`分类`}</label>
							<span>{type}</span>
						</li>
						<li>
							<label>{`编制人`}</label>
							<span>{person}</span>
						</li>
						<li>
							<label>{`编制时间`}</label>
							<span>{orgDate}</span>
						</li>
						<li>
							<label>{`发布时间`}</label>
							<span>{publishDate}</span>
						</li>
						<li>
							<label>{`审批状态`}</label>
							<span>{status}</span>
						</li>
						<li>
							<label>{`新闻封面`}</label>
						</li>
						<li className="align-center">
							<img alt="news_img" src={img} className="news-img" />
						</li>
						<li>
							<label>{`新闻内容`}</label>
						</li>
						<li className="multi-lines">
							<p>{contents}</p>
						</li>
						<li>
							<label>{`附件`}</label>
						</li>
						<li className="multi-lines">
							<ul className="files">
								{files &&
									files.map((item, i) => {
										return (
											<li key={`ik${i}`}>
												{this.renderImgIcon(item)}
												<span>{`${item.title}.${item.type}`}</span>
											</li>
										);
									})}
							</ul>
						</li>
					</ul>
					<a onClick={() => onViewProccess(data)}>查看审核流程</a>
					<a
						onClick={() => {
							util.traceBack("onOverview", { ...data });
						}}
					>
						预览
					</a>
					{approvalable ? (
						<React.Fragment>
							<Button
								className="approval-btn agree"
								onClick={() => {
									util.traceBack("pass", { ...data, comments });
									this.onClickMsk();
								}}
							>
								通过
							</Button>
							<Button
								className="approval-btn reject"
								onClick={() => {
									util.traceBack("reject", { ...data, comments });
									this.onClickMsk();
								}}
							>
								驳回
							</Button>
							<textarea
								placeholder={"意见"}
								onChange={e => {
									const { value } = e.target;
									this.setState({
										comments: value
									});
								}}
							></textarea>
						</React.Fragment>
					) : null}
				</div>
			</div>
		) : null;
	}

	show = () => {
		this.setState({
			showDetail: true
		});
	};

	onClickMsk = () => {
		this.setState({
			showDetail: false
		});
	};

	renderImgIcon = item => {
		const { type } = item;
		switch (type) {
			case "xlsx":
				return <img alt={type} src={fileIcon_xlsx} className={"icon"} />;
			case "pdf":
				return <img alt={type} src={fileIcon_pdf} className={"icon"} />;
			case "txt":
				return <img alt={type} src={fileIcon_txt} className={"icon"} />;
			case "png":
				return <img alt={type} src={fileIcon_defaulti} className={"icon"} />;
			case "jpg":
				return <img alt={type} src={fileIcon_jpg} className={"icon"} />;
			case "jpeg":
				return <img alt={type} src={fileIcon_defaulti} className={"icon"} />;
			default:
				return <img alt={type} src={fileIcon_defaulti} className={"icon"} />;
		}
	};
}

// 列表每一项
class ListItem extends React.Component {
	render() {
		const {
			item,
			item: { unit, name, type, person, orgDate, remarks }
		} = this.props;
		return (
			<li className="list-item" onClick={() => this.onClickItem(item)}>
				<div className="list-item-line1">
					<p className="title">{name}</p>
					<span className="typer">{type}</span>
				</div>
				<p className="publish-unit">{`发布单位：${unit}`}</p>
				<div className="spliter" />
				<div className="list-item-bottom-line">
					<span className="person">{`上传人：${person}`}</span>
					<span className="dater">{`编制时间：${orgDate}`}</span>
				</div>
			</li>
		);
	}

	onClickItem = item => {
		const { onClick } = this.props;
		if (typeof onClick === "function") onClick(item);
	};
}

// 筛选抽屉
class Drawer extends React.Component {
	state = {
		showDrawer: false,
		status: 0
	};

	render() {
		const { showDrawer } = this.state;
		const { institutions, types } = this.props;
		return showDrawer ? (
			<div className="right-drawer-container">
				<div className="msk" onClick={this.onClickMsk} />
				<div className="main-container">
					<ul>
						<li>
							<label>机构</label>
							<SelectTree ref="tree" data={institutions} />
						</li>
						<li>
							<label>类型</label>
							<Select ref="select" data={types} />
						</li>
						<li>
							<label>编制时间</label>
							<DatePicker ref="date" />
						</li>
						<li>
							<Radio.Group
								defaultValue={0}
								options={[
									{ label: "全部", value: 0 },
									{ label: "待办", value: 1 },
									{ label: "已办", value: 2 }
								]}
								onChange={this.onChangeRadio}
								optionType="button"
								buttonStyle="solid"
							/>
						</li>
					</ul>
					<div className="drawer-btns">
						<Button type="primary" size="small" onClick={this.onConfirm}>
							确定
						</Button>
						<Button type="primary" size="small" onClick={this.hide}>
							取消
						</Button>
					</div>
				</div>
			</div>
		) : null;
	}

	getConditions = () => {
		let institution = this.refs.tree.getValue();
		let type = this.refs.select.getValue();
		let date = this.refs.date.getValue();
		let status = this.state.status;

		return { institution, type, date, status };
	};

	onConfirm = () => {
		let conditions = this.getConditions();

		const { onChange } = this.props;
		if (typeof onChange === "function") onChange(conditions);
		this.hide();
	};

	hide = () => {
		this.setState({
			showDrawer: false
		});
	};

	onChangeRadio = e => {
		const { value } = e.target;
		this.setState({
			status: value
		});
	};

	onClickMsk = () => {
		this.setState({
			showDrawer: false
		});
	};

	show = () => {
		this.setState({
			showDrawer: true
		});
	};
}

class App extends React.Component {
	state = {
		pageLoading: false,
		mainData: [],
		detailData: {},
		proccessData: [],

		name: "",

		// 机构数据
		institutions: [],

		// 类型数据
		types: []
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
		// 	institutions: [
		// 		{
		// 			title: "根节点",
		// 			key: "gjd",
		// 			children: [
		// 				{
		// 					title: "子节点1",
		// 					key: "z1",
		// 					children: [
		// 						{ title: "叶子结点1", key: "yz1" },
		// 						{ title: "叶子结点2", key: "yz2" },
		// 						{ title: "叶子结点3", key: "yz3" },
		// 						{ title: "叶子结点4", key: "yz4" }
		// 					]
		// 				}
		// 			]
		// 		}
		// 	],
		// 	types: [
		// 		{ label: "类型1", value: "lx1" },
		// 		{ label: "类型2", value: "lx2" },
		// 		{ label: "类型3", value: "lx3" },
		// 		{ label: "类型4", value: "lx4" },
		// 		{ label: "类型5", value: "lx5" }
		// 	],
		// 	mainData: [
		// 		{
		// 			name: "抗洪抢险，江铜在行动 4",
		// 			unit: "江西铜业集团有限公司",
		// 			type: "安全",
		// 			person: "admin",
		// 			orgDate: "2020-07-21 09:07:02",
		// 			publishDate: "2020-07-21 09:07:02",
		// 			status: "已发布"
		// 		},
		// 		{
		// 			name: "抗洪抢险，江铜在行动 5",
		// 			unit: "江西铜业集团有限公司",
		// 			type: "安全",
		// 			person: "admin",
		// 			orgDate: "2020-07-21 09:07:02",
		// 			publishDate: "2020-07-21 09:07:02",
		// 			status: "待审批"
		// 		}
		// 	]
		// });
	}

	render() {
		const { mainData, detailData, proccessData, pageLoading } = this.state;
		const { institutions, types } = this.state;
		return (
			<div className="app-container">
				{pageLoading ? <PageLoading /> : null}
				{
					<Detail
						ref="detail"
						data={detailData}
						onViewProccess={this.onViewProccess}
					/>
				}
				{<ApprovalProccess ref="proccess" data={proccessData} />}
				{
					<Drawer
						ref="drawer"
						onChange={this.onChangeConditions}
						institutions={institutions}
						types={types}
					/>
				}
				<div className="app-contents">
					<TopTitle title={`新闻审批`} canBack />
					<div className="top-searcher">
						<div className="main-input">
							<input onChange={this.onChangeText} />
							<SearchOutlined onClick={this.onQuery} />
						</div>
						<div className="right-screen" onClick={this.onOpenDrawer}>
							<span>筛选</span>
							<MenuOutlined />
						</div>
					</div>
					<ul className="main-list">
						{mainData.map((item, i) => {
							return (
								<ListItem
									key={`item${i}`}
									index={i}
									item={item}
									onClick={this.onClickItem}
								/>
							);
						})}
					</ul>
				</div>
			</div>
		);
	}

	onChangeText = e => {
		const { value } = e.target;
		this.setState({ name: value });
	};

	onOpenDrawer = () => {
		this.refs.drawer.show();
	};

	onViewProccess = item => {
		this.refs.proccess.show();
		util.traceBack("onViewProccess", { ...item });

		// this.setState({
		// 	proccessData: [
		// 		{
		// 			title: "编制测试",
		// 			status: "提交",
		// 			opinion: "未填写意见",
		// 			date: "2020-07-21 09:05:40",
		// 			cost: 0,
		// 			person: "集团测试"
		// 		},
		// 		{
		// 			title: "审批测试",
		// 			status: "同意",
		// 			opinion: "未填写意见",
		// 			date: "2020-07-21 09:05:40",
		// 			cost: 0,
		// 			person: "admin"
		// 		},
		// 		{
		// 			title: "完成测试",
		// 			status: "同意",
		// 			opinion: "未填写意见",
		// 			date: "2020-07-21 09:05:40",
		// 			cost: 0,
		// 			person: "admin"
		// 		}
		// 	]
		// });
	};

	onClickItem = item => {
		this.refs.detail.show();
		util.traceBack("onClickItem", { ...item });
		// this.setState({
		// 	detailData: {
		// 		approvalable: Math.random() > 0.01,
		// 		name: "抗洪抢险，江铜在行动 4",
		// 		unit: "江西铜业集团有限公司",
		// 		type: "安全",
		// 		person: "admin",
		// 		orgDate: "2020-07-21 09:07:02",
		// 		publishDate: "2020-07-21 09:07:02",
		// 		status: "已发布",
		// 		img: "",
		// 		contents:
		// 			"yixie新闻内容yixie新闻内容yixie新闻内容yixie新闻内容yixie新闻内容yixie新闻内容yixie新闻内容yixie新闻内容yixie新闻内容yixie新闻内容yixie新闻内容yixie新闻内容yixie新闻内容yixie新闻内容",
		// 		files: [
		// 			{
		// 				title: "xxxxxxxx",
		// 				type: "xlsx"
		// 			},
		// 			{
		// 				title: "xxxxxxxx",
		// 				type: "pdf"
		// 			}
		// 		]
		// 	}
		// });
	};

	proccessLoading = () => {
		this.refs.proccess.loading();
	};

	proccessLoaded = () => {
		this.refs.proccess.loaded();
	};

	onQuery = () => {
		const { name, conditions } = this.state;
		util.traceBack("onChangeConditions", { name, ...conditions });
	};

	onChangeConditions = conditions => {
		const { name } = this.state;
		this.setState({
			conditions
		});
		util.traceBack("onChangeConditions", { ...conditions, name });
	};
}

export default App;
