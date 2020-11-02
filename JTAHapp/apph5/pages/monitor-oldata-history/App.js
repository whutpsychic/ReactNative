import React from "react";
import "./App.css";
import util from "../util/index";
import TopTitle from "../components/TopTitle/index";
import PageLoading from "../components/PageLoading/index";
import ListView from "../components/ListView/index";
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";
import { Button } from "antd-mobile";
import { renderImgIcon } from "../common/index.js";

import Select from "../components/Select/index";
import SelectTree from "../components/SelectTree/index";
import DatePicker from "../components/DatePicker/index";

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
			{/*<p className="remarks">{obj.remarks}</p>*/}
			<div className="spliter"></div>
			<p className="detail">
				<span>流量(升/秒)：{obj.stream}</span>
				<span>PH(无量纲)：{obj.ph}</span>
			</p>
			<p className="detail">
				<span>需氧(毫克/升)：{obj.oxygen}</span>
				<span>氨氮(毫克/升)：{obj.AN}</span>
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
		const { name, time, stream, ph, oxygen, AN } = data;
		return show ? (
			<div className="detail-container">
				<div className="msk" onClick={this.hide} />
				{loading ? <PageLoading /> : null}
				<div className="main-container">
					{/*<p className="detail-title">{name}</p>*/}
					<ul>
						<li>
							<label>{`监测时间`}</label>
							<span>{time}</span>
						</li>
						<li>
							<label>{`流量(升/秒)`}</label>
							<span>{stream}</span>
						</li>
						<li>
							<label>{`PH(无量纲)`}</label>
							<span>{ph}</span>
						</li>
						<li>
							<label>{`需氧(毫克/升)`}</label>
							<span>{oxygen}</span>
						</li>
						<li>
							<label>{`氨氮(毫克/升)`}</label>
							<span>{AN}</span>
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
		showDrawer: false,

		date: undefined,
		date2: undefined
	};

	render() {
		const { showDrawer } = this.state;
		const { date, date2 } = this.state;
		const { types } = this.props;
		return showDrawer ? (
			<div className="right-drawer-container">
				<div className="msk" onClick={this.onClickMsk} />
				<div className="main-container">
					<ul>
						{/*<li>
							<label>单位名称</label>
							<SelectTree ref="ins" data={institutions} />
						</li>*/}
						<li>
							<label>均值类型</label>
							<Select ref="type" data={types} />
						</li>
						{
							<li>
								<label>开始时间</label>
								<DatePicker
									ref="year"
									placeholder="请选择日期"
									defaultValue={date}
									onChange={date => {
										this.setState({
											date
										});
									}}
									clearable
								/>
							</li>
						}
						{
							<li>
								<label>结束时间</label>
								<DatePicker
									ref="year"
									placeholder="请选择日期"
									defaultValue={date}
									onChange={date => {
										this.setState({
											date2
										});
									}}
									clearable
								/>
							</li>
						}
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
		// let institution = this.refs.ins.getValue();
		// let number = this.refs.input.getValue();
		let type = this.refs.type.getValue();
		// let type2 = this.refs.type2.getValue();

		let date1 = this.refs.date1.getValue();
		let date2 = this.refs.date2.getValue();

		date1 = date1 ? date1.format("YYYY-MM-DD") : undefined;
		date2 = date2 ? date2.format("YYYY-MM-DD") : undefined;

		return { type, date1, date2 };
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
		title: "",
		pageLoading: false,
		detail: {},
		loadingDetail: false,
		name: "",
		conditions: {},
		institutions: [],
		types: [
			{ label: "全部", value: undefined },
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
			title,
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
					<TopTitle title={`${title}-历史数据`} canBack />
					<div className="top-searcher">
						{/*<div className="main-input">
							<input onChange={this.onChangeText} placeholder="" />
							<SearchOutlined onClick={this.onQuery} />
						</div>*/}
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
		console.log(conditions);
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
