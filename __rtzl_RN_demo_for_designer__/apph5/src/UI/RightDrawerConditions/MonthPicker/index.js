// ========================
// 默认值：没有
// 打开默认值：今天
// 可清空
// 可选日期范围：10年前、3年后
// ========================

import React from "react";
import "./style.css";
import { DatePickerView } from "antd-mobile";
import moment from "moment";
import util from "../../../util/index";

import calendar from "../../../img/icon-calendar.png";
import { CloseOutlined } from "@ant-design/icons";

const formatter = x => {
	return x.format("YYYY-MM");
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

class MonthPicker extends React.Component {
	state = {
		text: "",
		comValue: new Date(), //纯粹是为了缓冲
		value: undefined,
		showBox: true
	};

	componentDidMount() {
		//修复那个蜜汁bug
		this.setState({
			showBox: false
		});

		//设置默认值
		const { defaultValue } = this.props;
		if (defaultValue)
			this.setState({
				comValue: new Date(defaultValue),
				value: new Date(defaultValue),
				text: getMonthStr(new Date(defaultValue))
			});
	}

	render() {
		const { text, comValue, value, showBox } = this.state;
		const { clearable, placeholder = "" } = this.props;
		return (
			<React.Fragment>
				<div className="rtmcc-rnweb-year-picker" onClick={this.onOpenBox}>
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
							mode={"month"}
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
			comValue: new Date()
		});
	};

	checkItUp = () => {
		//每次打开时加载到当前值
		const { text } = this.state;
		if (!text) return;
		this.setState({
			comValue: new Date(text),
			value: new Date(text)
		});
	};

	onOpenBox = () => {
		this.setState({
			showBox: true
		});
		this.checkItUp();
	};

	onHideBox = () => {
		this.setState({
			showBox: false
		});
	};

	onChange = date => {
		console.log(date);
		this.setState({
			comValue: date
		});
		// ===
		const { onChange } = this.props;
		if (typeof onChange === "function") onChange(date);
	};

	confirm = () => {
		const { onChange } = this.props;
		const { text, comValue } = this.state;
		this.onHideBox();
		this.setState({
			text: comValue ? getMonthStr(comValue) : undefined,
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
		if (this.state.value) return formatter(moment(this.state.value));
		return undefined;
	};
}

export default MonthPicker;
