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

import {
	treeData,
	tableColumns,
	tableData,
	fakeConditionList
} from "../faker.js";

// debug模式
const debugging = false;

const renderColor = item => {
	item.render = x => {
		if (x === `第1行第2列数据`) {
			return <span style={{ color: "red" }}>{x}</span>;
		} else if (x === `第2行第2列数据`) {
			return <span style={{ color: "green" }}>{x}</span>;
		} else if (x === `第3行第2列数据`) {
			return <span style={{ color: "#389edc" }}>{x}</span>;
		} else {
			return x;
		}
	};
	return item;
};

class App extends React.Component {
	state = {
		pageLoading: false,
		title: "",
		conditionList: [],
		ps: 5,
		tableScroller: 1500,
		columns: [],
		dataSource: [],
		institutions: []
	};

	componentDidMount() {
		init(this);
		// ***************************************************
		if (debugging) {
			this.setState({
				pageLoading: true
			});
			setTimeout(() => {
				this.setState({
					pageLoading: false,
					conditionList: fakeConditionList(),
					columns: tableColumns(20),
					dataSource: tableData(20, 21)
				});

				this.setColumnColor(1, 6);
			}, 1000);
		}
	}

	render() {
		const { pageLoading, title } = this.state;
		const { conditionList, columns, dataSource, ps } = this.state;

		return (
			<div className="app-container">
				<div className="app-contents horizontal">
					{pageLoading ? <PageLoading /> : null}
					<TopTitle title={`${title}`} canBack />
					<TopSearcher
						placeholder="项目/文档名称"
						conditionList={conditionList}
					/>
					<div className="table-container">
						<Table
							dataSource={dataSource}
							columns={columns}
							pagination={{ pageSize: ps }}
							scroll={{ x: 8000 }}
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

	setColumnColor = (start, end) => {
		const { columns } = this.state;
		let result = columns.map((item, i) => {
			if (i >= start && i <= end) {
				renderColor(item);
			}
			return item;
		});
		this.setState({
			columns: result
		});
	};
}

export default App;
