import React from "react";
import "./App.css";
import util from "../util/index";
import TopTitle from "../components/TopTitle/index";
import PageLoading from "../components/PageLoading/index";
import ListView from "../components/ListView/index";
import ajax from "./ajax.js";

// 渲染分割元素
const separator = (sectionID, rowID) => (
	<div
		key={`${sectionID}-${rowID}`}
		style={{
			backgroundColor: "#F5F5F9",
			height: 8,
			borderTop: "1px solid #ECECED",
			borderBottom: "1px solid #ECECED"
		}}
	/>
);

// 渲染每一项
const renderListItem = (data, rowData, sectionID, rowID) => {
	console.log(data);
	let index = 0;
	const obj = data[index++];
	if (!obj) return null;
	return (
		<div
			key={rowID}
			style={{
				padding: "0 15px",
				backgroundColor: "white"
			}}
		>
			<div
				style={{
					height: "50px",
					lineHeight: "50px",
					color: "#888",
					fontSize: "18px",
					borderBottom: "1px solid #ddd"
				}}
			>
				{obj.title}
			</div>
			<div style={{ display: "-webkit-box", display: "flex", padding: "15px" }}>
				<img
					style={{ height: "63px", width: "63px", marginRight: "15px" }}
					src={obj.img}
					alt=""
				/>
				<div style={{ display: "inline-block" }}>
					<div
						style={{
							marginBottom: "8px",
							color: "#000",
							fontSize: "16px",
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
							maxWidth: "250px"
						}}
					>
						{obj.des}
					</div>
					<div style={{ fontSize: "16px" }}>
						<span style={{ fontSize: "30px", color: "#FF6E27" }}>{rowID}</span>{" "}
						元/任务
					</div>
				</div>
			</div>
		</div>
	);
};

class App extends React.Component {
	state = {
		pageLoading: false
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
		this.onRefreshList();
	}

	render() {
		const { pageLoading, data } = this.state;
		return (
			<div className="app-container">
				<div className="app-contents">
					{pageLoading ? <PageLoading /> : null}
					<TopTitle title="视频监控" />
					<ListView
						ref="lv"
						height={document.documentElement.clientHeight}
						data={data}
						renderItem={renderListItem}
						onRefresh={this.onRefreshList}
						onEndReached={this.onEndReached}
						separator={separator}
					/>
				</div>
			</div>
		);
	}

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

	onRefreshList = () => {
		this.listLoading();
		ajax.query().then(data => {
			this.loadListData(data);
			this.listLoaded();
		});
	};

	onEndReached = () => {
		this.listLoading();
		ajax.getMore().then(data => {
			this.setListData(data);
			this.noMoreItem();
			this.listLoaded();
		});
	};
}

export default App;
