import React from "react";
import "./App.css";
import util from "../util/index";
import TopTitle from "../components/TopTitle/index";
import PageLoading from "../components/PageLoading/index";
import ListView from "../components/ListView/index";
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
const renderListItem = ({ data, itemIndex, rowData, sectionID, rowID }) => {
	if (itemIndex < 0) {
		itemIndex = data.length - 1;
	}
	const obj = data[itemIndex];
	if (!obj) return null;
	return (
		<div
			key={rowID}
			className="img-item-outer"
			onClick={() => {
				util.traceBack("clickItem", obj);
			}}
		>
			<img src={obj.img} alt="" />
			<p>{obj.title}</p>
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
		if (debugging) {
			this.loadListData([
				{ img: "", title: "xxxxxxxxxxxx" },
				{ img: "", title: "xxxxxxxxxxxx1" },
				{ img: "", title: "xxxxxxxxxxxx2" },
				{ img: "", title: "xxxxxxxxxxxx3" },
				{ img: "", title: "xxxxxxxxxxxx4" },
				{ img: "", title: "xxxxxxxxxxxx5" }
			]);
		}
	}

	render() {
		const { pageLoading } = this.state;
		return (
			<div className="app-container">
				<div className="app-contents">
					{pageLoading ? <PageLoading /> : null}
					<TopTitle title="救援演练与评估" canBack />
					<ListView
						ref="lv"
						height={document.documentElement.clientHeight}
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

	onRefreshList = reset => {
		this.refs.lv.refreshing();
		if (debugging) {
			setTimeout(() => {
				this.loadListData([
					{ img: "", title: "xxxxxxxxxxxx6" },
					{ img: "", title: "xxxxxxxxxxxx7" },
					{ img: "", title: "xxxxxxxxxxxx8" },
					{ img: "", title: "xxxxxxxxxxxx9" },
					{ img: "", title: "xxxxxxxxxxxx10" },
					{ img: "", title: "xxxxxxxxxxxx11" }
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
					{ img: "", title: "xxxxxxxxxxxx6" },
					{ img: "", title: "xxxxxxxxxxxx7" },
					{ img: "", title: "xxxxxxxxxxxx8" },
					{ img: "", title: "xxxxxxxxxxxx9" },
					{ img: "", title: "xxxxxxxxxxxx10" },
					{ img: "", title: "xxxxxxxxxxxx11" }
				]);
				this.listLoaded();
			}, 1500);
		}
		util.traceBack("onEndReached", { ps });
	};
}

export default App;
