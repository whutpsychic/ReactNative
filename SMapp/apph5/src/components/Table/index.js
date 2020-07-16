import React from "react";
import "./style.css";
import { Spin } from "antd";

class Default extends React.Component {
	render() {
		const { columns, loading } = this.props;
		return (
			<React.Fragment>
				<table className="smapp-table" cellSpacing="0">
					<thead>
						<tr>
							{columns.map((item, i) => {
								return <th key={`item${i}`}>{item.title}</th>;
							})}
						</tr>
					</thead>
					<tbody>{this.renderTdTrs()}</tbody>
				</table>
				{loading ? (
					<div className="spin-container">
						<Spin />
					</div>
				) : null}
			</React.Fragment>
		);
	}

	renderTdTrs = () => {
		const { dataSource } = this.props;
		return dataSource.map((item, i) => {
			return (
				<tr key={`tritem${i}`} onClick={() => this.onSelectRow(item)}>
					{this.renderTds(item)}
				</tr>
			);
		});
	};

	renderTds = item => {
		const { columns } = this.props;
		let arr = [];
		for (let i in columns) {
			arr.push(
				<td key={columns[i][`key`]}>{item[columns[i][`dataIndex`]]}</td>
			);
		}
		return arr;
	};

	//
	onSelectRow = item => {
		const { onRow } = this.props;
		if (typeof onRow === "function") onRow(item).onClick(window.event);
	};
}

export default Default;
