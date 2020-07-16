import React from "react";
import { List, DatePicker } from "antd-mobile";
import util from "../../util/index.js";
import "./style.css";

const now = new Date();

class Default extends React.Component {
	state = {
		date: ""
	};

	render() {
		const { dateSelectedStr } = this.state;
		const { label } = this.props;
		return (
			<div className="datePicker">
				<DatePicker
					value={this.state.date}
					onChange={date => this.setState({ date })}
				>
					<List.Item arrow="horizontal">{label}</List.Item>
				</DatePicker>
			</div>
		);
	}

	onConfirm = (startTime, endTime) => {};
}

export default Default;
