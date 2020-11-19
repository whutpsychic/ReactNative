// ===============================================================
// === ListView
// === v1.0.0
// === 首次编辑日期：2020-10-21
// === 作者：zbc
// === 上一次维护日期：2020-10-26
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
// 一页最多几条
const NUM_ROWS = 20;
// ===============================================================
// 当前页
let pageIndex = 0;

function genData(pIndex = 0, nums = NUM_ROWS) {
	// nums = nums > NUM_ROWS ? NUM_ROWS : nums;
	const dataArr = [];
	for (let i = 0; i < nums; i++) {
		dataArr.push(`row - ${pIndex * nums + i}`);
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
		this.setState({
			height: hei
		});
	}

	onRefresh = () => {
		console.log("inner-com-list onRefresh");
		const { onRefresh } = this.props;

		if (typeof onRefresh === "function") onRefresh();
	};

	onEndReached = event => {
		console.log("inner-com-list onEndReached");
		this.loading(() => {
			// load new data
			// hasMore: from backend data, indicates whether it is the last page, here is false
			if (this.state.isLoading && !this.state.hasMore) {
				return;
			}
			console.log("onEndReached 加载一次");
			const { onEndReached } = this.props;
			if (typeof onEndReached === "function") onEndReached(pageIndex);
		});
	};

	render() {
		const { dataSource, data, isLoading, hasMore } = this.state;
		const { separator, renderItem, onClick } = this.props;

		let itemIndex = data.length - 1;
		const preRenderItem = (rowData, sectionID, rowID) => {
			return renderItem({
				data,
				onClick,
				itemIndex: itemIndex--,
				rowData,
				sectionID,
				rowID
			});
		};

		const renderFooter = (isLoading, hasMore) => {
			if (!hasMore) {
				return <span>没有更多数据了</span>;
			} else if (isLoading && hasMore) {
				return <span>加载更多...</span>;
			} else {
				return <span></span>;
			}
		};

		return (
			<div>
				<ListView
					ref={el => (this.lv = el)}
					dataSource={this.state.dataSource}
					renderFooter={() => (
						<div className={"list-view-footer-container"}>
							{renderFooter(isLoading, hasMore)}
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
							damping={24}
							distanceToRefresh={24}
						/>
					}
					onEndReachedThreshold={1}
					// initialListSize={data.length < NUM_ROWS ? data.length : NUM_ROWS}
					initialListSize={data.length}
					onEndReached={this.onEndReached}
				/>
			</div>
		);
	}

	// ********************************
	refreshing = () => {
		this.setState({
			refreshing: true
		});
	};

	loading = callback => {
		this.setState(
			{
				isLoading: true
			},
			() => {
				if (typeof callback === "function") callback();
			}
		);
	};

	loaded = () => {
		this.setState({
			isLoading: false,
			refreshing: false
		});
	};

	nomore = () => {
		this.setState({
			hasMore: false
		});
	};

	// 用于初始加载数据/刷新数据
	loadData = data => {
		// 率先清空
		pageIndex = 0;
		this.setState({
			hasMore: true,
			data: [],
			dataSource: this.state.dataSource.cloneWithRows(genData(0, 0))
		});

		this.rData = genData(0, data.length);
		this.setState({
			data,
			dataSource: this.state.dataSource.cloneWithRows(this.rData)
		});
	};

	// 用于填充更多数据
	setData = data => {
		this.rData = [...this.rData, ...genData(++pageIndex, data.length)];
		this.setState({
			data: [...this.state.data, ...data],
			dataSource: this.state.dataSource.cloneWithRows(this.rData)
		});
	};
}

export default Default;
