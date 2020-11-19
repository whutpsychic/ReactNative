import React from "react";
import "./App.css";
import util from "../util/index";
// ====================================
import Body from "../components/Body/index";
import ListView from "../components/ListView/index";
// ====================================
import TopTitle from "../UI/TopTitle/index";
import ajax from "./ajax.js";

// debug模式
const debugging = true;

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
				<span>上传人：{obj.person}</span>
				<span>上传时间：{obj.date}</span>
			</p>
		</div>
	);
};

class App extends React.Component {
	state = {
		title: "",
		pageLoading: false,
		detail: {}
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
			this.loadListData(ajax.data());
		}
	}

	render() {
		return (
			<Body>
				<TopTitle title={`一般列表页`} canBack />
				<div style={{ width: "100%", height: "10px" }} />
				<ListView
					ref="lv"
					height={document.documentElement.clientHeight}
					onClick={this.onClickItem}
					renderItem={renderListItem}
					onRefresh={this.onRefreshList}
					onEndReached={this.onEndReached}
					separator={null}
				/>
			</Body>
		);
	}

	onClickItem = x => {
		if (debugging) {
			util.traceBack("clickItem");
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
				this.loadListData(ajax.reData());
				this.listLoaded();
			}, 1500);
		}
		util.traceBack("onRefreshList");
	};

	onEndReached = ps => {
		if (debugging) {
			setTimeout(() => {
				this.setListData(ajax.moreData());
			}, 1500);
		}
		util.traceBack("onEndReached", { ps });
	};
}

export default App;
