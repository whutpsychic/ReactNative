import React from "react";
import "./_month-picker.css";
import { DatePickerView } from "antd-mobile";
import moment from "moment";
import util from "../../util/index";

import calendar from "../../img/icon-calendar.png";
import { CloseOutlined } from "@ant-design/icons";

const getMonthStr = date => {
	let d;
	if (!date) d = new Date();
	else {
		d = date;
	}
	let str = `${d.getFullYear()}-${util.executeNumber(d.getMonth() + 1)}`;
	return str;
};

class MonthPicker extends React.Component {
	// static getDerivedStateFromProps(nextProps, prevState) {
	// 	return {};
	// }

	state = {
		text: getMonthStr(),
		value: new Date(),
		showBox: true
	};

	componentDidMount() {
		//修复那个蜜汁bug
		this.setState({
			showBox: false
		});
	}

	render() {
		const { text, value, showBox } = this.state;
		return (
			<React.Fragment>
				<div className="dater" onClick={this.onOpenBox}>
					<span>{text}</span>
					<img alt="" src={calendar} />
				</div>
				<div
					className={
						showBox ? "pickerview-container" : "pickerview-container hide"
					}
				>
					<div className="msk" onClick={this.onHideBox} />
					<div className="pickerview">
						<div className="top-btns">
							<span onClick={this.confirm}>确定</span>
							<span onClick={this.cancel}>取消</span>
						</div>
						<DatePickerView
							mode={"month"}
							value={value}
							onChange={this.onChange}
						/>
					</div>
				</div>
			</React.Fragment>
		);
	}

	fixUp = () => {
		//初次打开时加载到当前选项
		const { text } = this.state;
		this.setState({
			value: new Date(text)
		});
	};

	onOpenBox = () => {
		this.setState({
			showBox: true
		});
		// this.fixUp();
	};

	onHideBox = bool => {
		this.setState({
			showBox: false
		});
		// if (bool) this.fixUp();
	};

	onChange = date => {
		this.setState({
			value: date
		});
	};

	confirm = () => {
		const { onChange } = this.props;
		const { text, value } = this.state;
		this.onHideBox(false);
		this.setState({
			text: getMonthStr(value)
		});
		if (typeof onChange === "function") {
			onChange(moment(value));
		}
	};

	cancel = () => {
		this.onHideBox(true);
	};

	getValue = () => {
		return moment(this.state.value);
	};
}

export default MonthPicker;
