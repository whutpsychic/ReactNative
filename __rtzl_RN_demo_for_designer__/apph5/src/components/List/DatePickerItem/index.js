// --------------------
// 属性：
// label
// defaultValue
// disabled
// clearable
// --------------------
// 方法：
// getValue
// setValue
// clear

// ===============================================================
import React from "react";
import "./style.css";
// ===============================================================
import DatePickerView from "../../DatePickerView/index";
import { CloseCircleOutlined } from "@ant-design/icons";

const { formatter } = DatePickerView;

class Default extends React.Component {
	state = {
		text: "",
		// 默认无值
		value: undefined
	};

	componentDidMount() {
		const { defaultValue } = this.props;
		if (defaultValue) {
			this.setValue(defaultValue);
		}
	}

	render() {
		const { label, clearable = true, disabled = false } = this.props;
		const { text, value } = this.state;
		return (
			<li
				className={disabled ? "disabled" : undefined}
				onClick={() => {
					if (!disabled) this.refs.date.show();
				}}
			>
				<label>{label}</label>
				<span>{text}</span>
				{clearable && !disabled && text ? (
					<CloseCircleOutlined onClick={this.clear} />
				) : null}
				<DatePickerView
					ref="date"
					//矫正打开时显示的值位置
					onShowBox={() => {
						if (value) this.refs.date.setValue(value);
					}}
					onConfirm={v => {
						this.setState({
							text: formatter(v),
							value: v
						});
					}}
				/>
			</li>
		);
	}

	getValue = () => {
		if (!this.state.value) return;
		let value = this.refs.date.getValue();
		return value;
	};

	setValue = v => {
		this.refs.date.setValue(v);
		this.setState({
			text: formatter(v),
			value: v
		});
	};

	clear = e => {
		if (e && e.stopPropagation) e.stopPropagation();
		this.setState({
			value: undefined,
			text: ""
		});
		this.refs.date.clear();
	};

	// ********************************
}

export default Default;
