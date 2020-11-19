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
// loading
// loaded
// ===============================================================
import React from "react";
import "./style.css";
// ===============================================================
import PickerView from "../../PickerView/index";
import { CloseCircleOutlined } from "@ant-design/icons";

const { getItemFromDataSource } = PickerView;

const formatter = (data, value) => {
	let obj = getItemFromDataSource(data, value);
	if (obj && obj.title) return obj.title;
};

class Default extends React.Component {
	state = {
		text: "",
		// 默认无值
		value: undefined,
		loading: false
	};

	componentDidMount() {
		const { defaultValue = {} } = this.props;
		if (defaultValue) {
			this.setValue({
				text: defaultValue.text || "",
				value: defaultValue.value
			});
		}
	}

	render() {
		const { label, data, clearable = true, disabled = false } = this.props;
		const { text, value, loading } = this.state;
		return (
			<li
				className={disabled ? "disabled" : undefined}
				onClick={() => {
					if (!disabled) this.refs.select.show();
				}}
			>
				<label>{label}</label>
				<span>{text}</span>
				{clearable && !disabled && text ? (
					<CloseCircleOutlined onClick={this.clear} />
				) : null}
				<PickerView
					ref="select"
					loading={loading}
					data={data}
					//矫正打开时显示的值位置(现在并没有什么效果)
					onShowBox={() => {
						console.log(value);
						if (value) this.refs.select.setValue({ value });
					}}
					onConfirm={obj => {
						if (!obj) return;
						const { label, value } = obj;
						this.setState({
							text: label,
							value
						});
					}}
				/>
			</li>
		);
	}

	loading = () => {
		this.setState({
			loading: true
		});
	};

	loaded = () => {
		this.setState({
			loading: false
		});
	};

	getValue = () => {
		let value = this.refs.select.getValue();
		return value;
	};

	setValue = ({ value, text }) => {
		const { data } = this.props;
		this.refs.select.setValue({ value });
		this.setState({
			text: formatter(data, value) || text,
			value: value
		});
	};

	clear = e => {
		if (e && e.stopPropagation) e.stopPropagation();
		this.setState({
			value: undefined,
			text: ""
		});
		this.refs.select.clear();
	};

	// ********************************
}

export default Default;
