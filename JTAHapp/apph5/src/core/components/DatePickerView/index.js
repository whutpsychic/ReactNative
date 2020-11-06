// props:
// data
// onShowBox
// onConfirm
// ====================
// 方法：
// show
// hide
// getValue
// setValue
// clear
// 打开视图时默认为选中今天
import React from "react";
import "./style.css";
import { DatePickerView } from "antd-mobile";
import moment from "moment";

const formatter = x => {
	return moment(x).format("YYYY-MM-DD");
};

class DatePicker extends React.Component {
	state = {
		// 核心组件值
		value: new Date(),
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
				value: new Date(defaultValue)
			});
	}

	render() {
		const { value, showBox } = this.state;
		// 改变值
		const onChangeDate = date => {
			this.setState({
				value: date
			});
			// ===
			const { onChange } = this.props;
			if (typeof onChange === "function") formatter(date);
		};
		// 点击确认
		const onConfirm = e => {
			const { onConfirm } = this.props;
			const { value } = this.state;
			this.hide(e);
			if (typeof onConfirm === "function") {
				onConfirm(formatter(value));
			}
		};

		return (
			<div
				className={
					showBox
						? "rtmcc-rnweb-datepickerview-container"
						: "rtmcc-rnweb-datepickerview-container hide"
				}
			>
				<div className="msk" onClick={this.hide} />
				<div className="pickerview">
					<div className="top-btns">
						<span onClick={onConfirm}>确定</span>
						<span onClick={this.hide}>取消</span>
					</div>
					<DatePickerView mode={"date"} value={value} onChange={onChangeDate} />
				</div>
			</div>
		);
	}

	show = () => {
		this.setState({
			showBox: true
		});

		const { onShowBox } = this.props;
		if (typeof onShowBox === "function") onShowBox();
	};

	hide = e => {
		if (e && e.stopPropagation) e.stopPropagation();
		this.setState({
			showBox: false
		});
	};

	clear = () => {
		this.setState({
			value: new Date()
		});
	};

	getValue = () => {
		return formatter(this.state.value);
	};

	setValue = v => {
		this.setState({
			value: new Date(v)
		});
	};
}

DatePicker.formatter = formatter;

export default DatePicker;
