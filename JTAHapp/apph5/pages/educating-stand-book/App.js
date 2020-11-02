import React from "react";
import "./App.css";
import util from "../util/index";
import TopTitle from "../components/TopTitle/index";
import PageLoading from "../components/PageLoading/index";
import ListView from "../components/ListView/index";
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";
import { Button } from "antd-mobile";
import DatePicker from "../components/DatePicker/index";
import SelectTree from "../components/SelectTree/index";
import Select from "../components/Select/index";

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
				<span>有效期：{obj.date1}</span>
				<span>上传人：{obj.date2}</span>
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
		const { unit, object, type, number, date1, date2, area, remarks } = data;
		return show ? (
			<div className="detail-container">
				<div className="msk" onClick={this.hide} />
				{loading ? <PageLoading /> : null}
				<div className="main-container">
					<p className="detail-title">{""}</p>
					<ul>
						<li>
							<label>{`单位`}</label>
							<span>{unit}</span>
						</li>
						<li>
							<label>{`培训对象`}</label>
							<span>{object}</span>
						</li>
						<li>
							<label>{`培训类型`}</label>
							<span>{type}</span>
						</li>
						<li>
							<label>{`培训人数`}</label>
							<span>{number}</span>
						</li>
						<li>
							<label>{`开始时间`}</label>
							<span>{date1}</span>
						</li>
						<li>
							<label>{`结束时间`}</label>
							<span>{date2}</span>
						</li>
						<li>
							<label>{`培训地点`}</label>
							<span>{area}</span>
						</li>
						<li>
							<label>{`备注`}</label>
						</li>
						<li className="multi-lines">
							<p>{remarks}</p>
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

		date1: undefined,
		date2: undefined
	};

	render() {
		const { showDrawer } = this.state;
		const { date1, date2 } = this.state;
		const { institutions, types } = this.props;
		return showDrawer ? (
			<div className="right-drawer-container">
				<div className="msk" onClick={this.onClickMsk} />
				<div className="main-container">
					<ul>
						<li>
							<label>单位名称</label>
							<SelectTree ref="ins" data={institutions} />
						</li>
						<li>
							<label>证件类别</label>
							<Select ref="select" data={types} />
						</li>
						<li>
							<label>有效开始日期</label>
							<DatePicker
								ref="date1"
								placeholder="开始日期"
								onChange={date => {
									this.setState({ date1: date });
								}}
								defaultValue={date1}
								clearable
							/>
						</li>
						<li>
							<label>有效结束日期</label>
							<DatePicker
								ref="date2"
								placeholder="结束日期"
								onChange={date => {
									this.setState({ date2: date });
								}}
								defaultValue={date2}
								clearable
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
		let institution = this.refs.ins.getValue();
		let type = this.refs.select.getValue();
		let date1 = this.refs.date1.getValue();
		let date2 = this.refs.date2.getValue();

		date1 = date1 ? date1.format("YYYY-MM-DD") : undefined;
		date2 = date2 ? date2.format("YYYY-MM-DD") : undefined;

		return { type, institution, date1, date2 };
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
		institutions: [],
		types: [
			{ label: "全部", value: undefined },
			{ label: "新员工安全培训", value: 1 },
			{ label: "特种作业人员", value: 2 },
			{ label: "安管员/主负责人取证", value: 3 },
			{ label: "安环消防专项培训", value: 4 },
			{ label: "其他培训", value: 5 }
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
			pageLoading,
			detail,
			loadingDetail,
			types,
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
							institutions={institutions}
						/>
					}
					<TopTitle title={`教育培训台账管理`} canBack />
					<div className="top-searcher">
						<div className="main-input">
							<input onChange={this.onChangeText} placeholder="培训对象" />
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
