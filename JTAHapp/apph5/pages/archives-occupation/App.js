import React from "react";
import "./App.css";
import util from "../util/index";
import TopTitle from "../components/TopTitle/index";
import PageLoading from "../components/PageLoading/index";
import ListView from "../components/ListView/index";
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";
import { Button } from "antd-mobile";
import { renderImgIcon } from "../common/index.js";

// import Input from "../components/Input/index";
// import Select from "../components/Select/index";
// import DatePicker from "../components/DatePicker/index";
import SelectTree from "../components/SelectTree/index";
// const { YearPicker } = DatePicker;

// debug模式
const debugging = false;

// 渲染分割元素
const separator = (sectionID, rowID) => (
	<div
		key={`${sectionID}-${rowID}`}
		style={{
			backgroundColor: "#F5F5F9",
			height: 10,
			borderTop: "1px solid #ECECED",
			borderBottom: "1px solid #ECECED"
		}}
	/>
);

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
			<p className="remarks">{obj.remarks}</p>
			<div className="spliter"></div>
			<p className="detail">
				<span>当前状态：{obj.status}</span>
				<span>验收时间：{obj.date}</span>
			</p>
		</div>
	);
};

class Detail extends React.Component {
	state = {
		show: false
	};
	render() {
		const { show } = this.state;
		const { data = {}, loading } = this.props;
		const {
			name,
			type,
			type2,
			unit,
			unit2,
			date,
			number,
			date2,
			unit3,
			date3,
			date4,
			date5,
			person,
			remarks,
			files
		} = data;
		return show ? (
			<div className="detail-container">
				<div className="msk" onClick={this.hide} />
				{loading ? <PageLoading /> : null}
				<div className="main-container">
					<p className="detail-title">{name}</p>
					<ul>
						<li>
							<label>{`分类`}</label>
							<span>{type}</span>
						</li>
						<li>
							<label>{`类别`}</label>
							<span>{type2}</span>
						</li>
						<li>
							<label>{`单位`}</label>
							<span>{unit}</span>
						</li>
						<li>
							<label>{`预评价单位`}</label>
							<span>{unit2}</span>
						</li>
						<li>
							<label>{`报告时间`}</label>
							<span>{date}</span>
						</li>
						<li>
							<label>{`批复文号`}</label>
							<span>{number}</span>
						</li>
						<li>
							<label>{`批复时间`}</label>
							<span>{date2}</span>
						</li>
						<li>
							<label>{`编制单位`}</label>
							<span>{unit3}</span>
						</li>
						<li>
							<label>{`评报时间`}</label>
							<span>{date3}</span>
						</li>
						<li>
							<label>{`验收时间`}</label>
							<span>{date4}</span>
						</li>
						<li>
							<label>{`上传时间`}</label>
							<span>{date5}</span>
						</li>
						<li>
							<label>{`上传人`}</label>
							<span>{person}</span>
						</li>
						<li>
							<label>{`备注`}</label>
						</li>
						<li className="multi-lines">
							<p>{remarks}</p>
						</li>
						<li>
							<label>{`附件`}</label>
						</li>
						<li className="multi-lines">
							<ul className="files">
								{files &&
									files.length &&
									files.map((item, i) => {
										return (
											<li
												key={`ik${i}`}
												onClick={() => {
													util.traceBack("onClickFileItem", item);
												}}
											>
												{renderImgIcon(item)}
												<span>{`${item.title}`}</span>
											</li>
										);
									})}
							</ul>
						</li>
					</ul>
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
}

// 筛选抽屉
class Drawer extends React.Component {
	state = {
		showDrawer: false

		// year: undefined
		// date2: undefined
	};

	render() {
		const { showDrawer } = this.state;
		// const { year } = this.state;
		const { institutions } = this.props;
		return showDrawer ? (
			<div className="right-drawer-container">
				<div className="msk" onClick={this.onClickMsk} />
				<div className="main-container">
					<ul>
						<li>
							<label>单位名称</label>
							<SelectTree ref="ins" data={institutions} />
						</li>
						{/*<li>
							<label>状态</label>
							<Select ref="type" data={types} />
						</li>*/}
						{/*<li>
							<label>年度</label>
							<YearPicker
								ref="year"
								placeholder="请选择年份"
								defaultValue={year}
								onChange={year => {
									this.setState({
										year
									});
								}}
								clearable
							/>
						</li>*/}
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
		let institution = this.refs.ins.getValue();
		// let number = this.refs.input.getValue();
		// let type = this.refs.type.getValue();
		// let type2 = this.refs.type2.getValue();

		// let date1 = this.refs.date1.getValue();
		// let date2 = this.refs.date2.getValue();

		// date1 = date1 ? date1.format("YYYY-MM-DD") : undefined;
		// date2 = date2 ? date2.format("YYYY-MM-DD") : undefined;

		return { institution };
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
		detail: {},
		loadingDetail: false,
		name: "",
		conditions: {},
		institutions: []
		// types: [
		// 	{ label: "全部", value: undefined },
		// 	{ label: "安全", value: 1 },
		// 	{ label: "环保", value: 2 },
		// 	{ label: "职业卫生", value: 3 }
		// ],
		// types2: [
		// 	{ label: "全部", value: undefined },
		// 	{ label: "上级通知", value: 1 },
		// 	{ label: "企业通知", value: 2 }
		// ]
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
					remarks:
						"djslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkjdjslkahljashlgjkhasfkj",
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
		}
	}

	render() {
		const {
			pageLoading,
			detail,
			loadingDetail,
			types,
			types2,
			institutions
		} = this.state;
		return (
			<div className="app-container">
				<div className="app-contents">
					{<Detail ref="detail" data={detail} loading={loadingDetail} />}
					{pageLoading ? <PageLoading /> : null}
					{
						<Drawer
							ref="drawer"
							onChange={this.onPressConfirmButton}
							types={types}
							types2={types2}
							institutions={institutions}
						/>
					}
					<TopTitle title={`职业卫生档案资料`} canBack />
					<div className="top-searcher">
						<div className="main-input">
							<input onChange={this.onChangeText} placeholder="项目/文档名称" />
							<SearchOutlined onClick={this.onQuery} />
						</div>
						<div className="right-screen" onClick={this.onOpenDrawer}>
							<span>筛选</span>
							<MenuOutlined />
						</div>
					</div>
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

	onQuery = () => {
		const { name, conditions } = this.state;
		util.traceBack("onChangeConditions", { name, ...conditions });
	};

	onPressConfirmButton = conditions => {
		const { name } = this.state;
		this.setState({
			conditions
		});
		util.traceBack("onChangeConditions", { name, ...conditions });
	};

	onChangeText = e => {
		const { value } = e.target;
		this.setState({ name: value });
	};

	onOpenDrawer = () => {
		this.refs.drawer.show();
	};

	onClickItem = x => {
		this.refs.detail.show();
		this.setState({
			loadingDetail: true
		});
		if (debugging) {
			setTimeout(() => {
				this.setState(
					{
						detail: x
					},
					() => {
						this.setState({
							loadingDetail: false
						});
					}
				);
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
