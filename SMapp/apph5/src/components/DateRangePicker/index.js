import React from "react";
import { List, Calendar } from "antd-mobile";
import util from "../../util/index.js";
import "./style.css";

const now = new Date();

class Default extends React.Component {
	state = {
		show: false,
		dateSelectedStr: ""
	};

	componentDidMount() {
		//如果有默认值则整理并设置之
		const { defaultValue } = this.props;
		if (defaultValue && defaultValue.length) {
			let str = util.dateToString(defaultValue[0], defaultValue[1]);
			this.setState({
				dateSelectedStr: str
			});
		}
	}

	render() {
		const { dateSelectedStr } = this.state;
		return (
			<React.Fragment>
				<div className="dateSelector">
					<List>{this.renderBtn("选择日期", "Select Date Range")}</List>
					<p
						className="dateRender"
						onClick={() => {
							this.setState({
								show: true
							});
						}}
					>
						{dateSelectedStr}
					</p>
				</div>
				{/*---------------------------------------------------*/}
				<Calendar
					visible={this.state.show}
					onCancel={this.onCancel}
					onConfirm={this.onConfirm}
					// onSelectHasDisableDate={this.onSelectHasDisableDate}
					// getDateExtra={this.getDateExtra}
					defaultDate={now}
					defaultValue={this.props.defaultValue}
					// minDate={new Date(+now - 5184000000)}
					// maxDate={new Date(+now + 31536000000)}
				/>
			</React.Fragment>
		);
	}

	onConfirm = (startTime, endTime) => {
		let str = util.dateToString(startTime, endTime);

		this.setState({
			show: false,
			dateSelectedStr: str
		});
	};

	onCancel = () => {
		this.setState({
			show: false
		});
	};

	renderBtn(zh) {
		const { dateSelectedStr } = this.state;
		return (
			<List.Item
				arrow="horizontal"
				onClick={() => {
					this.setState({
						show: true
					});
				}}
			>
				{zh}
			</List.Item>
		);
	}

	getValue = () => {
		return this.state.dateSelectedStr;
	};
}

export default Default;
