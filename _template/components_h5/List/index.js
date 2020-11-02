// ===============================================================
// === ListView
// === 首次编辑日期：2020-10-21
// === 作者：zbc
// === 上一次维护日期：2020-10-21
// ===============================================================
import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import { PullToRefresh, ListView } from "antd-mobile";
// **************************************************************
import "antd-mobile/lib/pull-to-refresh/style/css"; // 加载 CSS
import "antd-mobile/lib/list-view/style/css"; // 加载 CSS
// **************************************************************

// ===============================================================
// 可配置控制项
// 一页几条
const NUM_ROWS = 20;
// ===============================================================
// 当前页
let pageIndex = 0;

function genData(pIndex = 0) {
	const dataArr = [];
	for (let i = 0; i < NUM_ROWS; i++) {
		dataArr.push(`row - ${pIndex * NUM_ROWS + i}`);
	}
	return dataArr;
}

class Default extends React.Component {
	constructor(props) {
		super(props);
		const dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2
		});

		this.state = {
			// 原始数据
			data: [],

			// 特殊格式数据
			dataSource,
			refreshing: false,
			isLoading: false,
			hasMore: true,
			height: document.documentElement.clientHeight
		};
	}

	componentDidMount() {
		document.body.style.overflow = "hidden";
		const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
	}

	onRefresh = () => {
		const { onRefresh } = this.props;
		this.setState({
			hasMore: true
		});
		if (typeof onRefresh === "function") onRefresh();
	};

	onEndReached = event => {
		// load new data
		// hasMore: from backend data, indicates whether it is the last page, here is false
		if (this.state.isLoading || !this.state.hasMore) {
			return;
		}
		const { onEndReached } = this.props;
		if (typeof onEndReached === "function") onEndReached();
	};

	render() {
		const { dataSource, data } = this.state;
		const { separator, renderItem } = this.props;

		const preRenderItem = (rowData, sectionID, rowID) => {
			return renderItem(data, rowData, sectionID, rowID);
		};

		return (
			<div>
				<ListView
					ref={el => (this.lv = el)}
					dataSource={this.state.dataSource}
					renderFooter={() => (
						<div style={{ textAlign: "center" }}>
							{this.state.isLoading ? "加载更多..." : ""}
							{this.state.hasMore ? "" : "没有更多数据了"}
						</div>
					)}
					renderRow={preRenderItem}
					renderSeparator={separator}
					useBodyScroll={false}
					style={{
						height: this.state.height
					}}
					pullToRefresh={
						<PullToRefresh
							refreshing={this.state.refreshing}
							onRefresh={this.onRefresh}
							damping={32}
						/>
					}
					onEndReached={this.onEndReached}
					pageSize={NUM_ROWS}
				/>
			</div>
		);
	}

	// ********************************
	loading = () => {
		this.setState({
			isLoading: true
		});
	};

	loaded = () => {
		this.setState({
			isLoading: false
		});
	};

	nomore = () => {
		this.setState({
			hasMore: false
		});
	};

	// 用于初始加载数据/刷新数据
	loadData = data => {
		this.rData = genData();
		this.setState({
			data,
			dataSource: this.state.dataSource.cloneWithRows(this.rData)
		});
	};

	// 用于填充更多数据
	setData = data => {
		this.rData = [...this.rData, ...genData(++pageIndex)];
		this.setState({
			data: [...this.state.data, ...data],
			dataSource: this.state.dataSource.cloneWithRows(this.rData)
		});
	};
}

export default Default;
