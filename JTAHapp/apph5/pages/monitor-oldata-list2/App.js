import React from "react";
import "./App.css";
import util from "../util/index";
import { init } from "../common/index";
// ====================================
import TopTitle from "../components/TopTitle/index";
import PageLoading from "../components/PageLoading/index";
import TopSearcher from "../UI/TopSearcher/index";
// ====================================
import { Table } from "antd";
import "antd/es/table/style/css.js";
import columns1 from "./feishui.js";
import columns2 from "./feiqi.js";
import { treeData, tableData, tb2 } from "../faker.js";

// debug模式
const debugging = false;

class App extends React.Component {
	state = {
		pageLoading: false,
		title: "",
		conditionList: [],
		ps: 5,
		tableScroller: 800,
		columns: columns1,
		dataSource: [],
		// ==
		institutions: [],
		types: [
			{ label: "废水", value: 1 },
			{ label: "废气", value: 2 }
		]
	};

	componentDidMount() {
		init(this);
		// ***************************************************
		if (debugging) {
			console.log(tb2);
			this.setState({
				pageLoading: true
			});
			setTimeout(() => {
				this.setState({
					pageLoading: false,
					institutions: treeData,
					dataSource: tb2
				});
			}, 1000);
		}
	}

	render() {
		const { pageLoading, title, tableScroller } = this.state;
		const { columns, dataSource, ps } = this.state;

		const conditionList = [
			{
				label: "单位",
				field: "institution",
				type: "selecttree",
				data: this.state.institutions
			},
			{
				field: "type",
				type: "radios",
				data: this.state.types
			}
		];

		return (
			<div className="app-container">
				<div className="app-contents horizontal">
					{pageLoading ? <PageLoading /> : null}
					<TopTitle title={`${title}`} canBack />
					<TopSearcher
						conditionList={conditionList}
						onClickQuery={this.onClickQuery}
						noinput
					/>
					<div className="table-container">
						<Table
							dataSource={dataSource}
							columns={columns}
							pagination={{ pageSize: ps }}
							scroll={{ x: tableScroller }}
							onRow={record => {
								return {
									className: "td-row",
									onClick: event => {} // 点击行
								};
							}}
							onHeaderRow={column => {
								return {
									className: "th-row",
									onClick: () => {} // 点击表头行
								};
							}}
						/>
					</div>
				</div>
			</div>
		);
	}

	onClickQuery = conditions => {
		console.log(conditions);
		const { type } = conditions;
		if (type === 1) {
			this.setState({
				columns: columns1,
				tableScroller: 800
			});
		} else if (type === 2) {
			this.setState({
				columns: columns2,
				tableScroller: 1500
			});
		}
		util.traceBack("onChangeCondition", conditions);
	};
}

export default App;
