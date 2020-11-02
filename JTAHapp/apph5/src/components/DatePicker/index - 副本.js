import React from "react";
import "./style.css";
import { DatePickerView } from "antd-mobile";
import moment from "moment";
import util from "../../util/index";

import calendar from "../../img/icon-calendar.png";
import { CloseOutlined } from "@ant-design/icons";

const getDateStr = date => {
	let d;
	if (!date) d = new Date();
	else {
		d = date;
	}
	let str = `${d.getFullYear()}-${util.executeNumber(
		d.getMonth() + 1
	)}-${util.executeNumber(d.getDate())}`;
	return str;
};

const getMonthStr = date => {
	let d;
	if (!date) d = new Date();
	else {
		d = date;
	}
	let str = `${d.getFullYear()}-${util.executeNumber(d.getMonth() + 1)}`;
	return str;
};

const getYearStr = date => {
	let d;
	if (!date) d = new Date();
	else {
		d = date;
	}
	let str = `${d.getFullYear()}`;
	return str;
};

class Default extends React.Component {
	// static getDerivedStateFromProps(nextProps, prevState) {
	// 	return {};
	// }

	state = {
		text: "",
		comValue: undefined,
		value: undefined,
		showBox: true
	};

	componentDidMount() {
		//修复那个蜜汁bug
		this.setState({
			showBox: false
		});
	}

	render() {
		const { text, comValue, value, showBox } = this.state;
		const { clearable, placeholder = "" } = this.props;
		return (
			<React.Fragment>
				<div className="dater" onClick={this.onOpenBox}>
					<img alt="" src={calendar} />
					<span>{text || placeholder}</span>
					{clearable && value ? <CloseOutlined onClick={this.clear} /> : null}
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
							mode={"date"}
							value={comValue}
							onChange={this.onChange}
						/>
					</div>
				</div>
			</React.Fragment>
		);
	}

	clear = e => {
		e.stopPropagation();
		this.setState({
			text: "",
			value: null,
			comValue: null
		});
	};

	fixUp = () => {
		//初次打开时加载到当前选项
		const { text } = this.state;
		if (!text) return;
		this.setState({
			value: new Date(text)
		});
	};

	onOpenBox = () => {
		this.setState({
			showBox: true
		});
		this.fixUp();
	};

	onHideBox = bool => {
		this.setState({
			showBox: false
			// value: this.state.comValue
		});
		// if (bool) this.fixUp();
	};

	onChange = date => {
		console.log(date);
		this.setState({
			comValue: date
		});
	};

	confirm = () => {
		const { onChange } = this.props;
		const { text, comValue } = this.state;
		this.onHideBox(false);
		console.log(comValue);
		this.setState({
			text: comValue ? getDateStr(comValue) : undefined,
			value: comValue
		});
		if (typeof onChange === "function") {
			onChange(moment(comValue));
		}
	};

	cancel = () => {
		this.onHideBox();
	};

	getValue = () => {
		if (this.state.value) return moment(this.state.value);
		return;
	};
}

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

class YearPicker extends React.Component {
	// static getDerivedStateFromProps(nextProps, prevState) {
	// 	return {};
	// }

	state = {
		text: getYearStr(),
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
					<span className="year">{text} 年</span>
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
							mode={"year"}
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
		this.fixUp();
	};

	onHideBox = bool => {
		this.setState({
			showBox: false
		});
		if (bool) this.fixUp();
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
			text: getYearStr(value)
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

Default.MonthPicker = MonthPicker;
Default.YearPicker = YearPicker;

export default Default;
