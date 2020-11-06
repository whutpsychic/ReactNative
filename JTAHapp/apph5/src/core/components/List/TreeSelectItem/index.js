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
import TreeSelectPickerView from "../../TreeSelectPickerView/index";
import { CloseCircleOutlined } from "@ant-design/icons";

const { getItemFromDataSource } = TreeSelectPickerView;

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
					if (!disabled) this.refs.tree.show();
				}}
			>
				<label>{label}</label>
				<span>{text}</span>
				{clearable && !disabled && text ? (
					<CloseCircleOutlined onClick={this.clear} />
				) : null}
				<TreeSelectPickerView
					ref="tree"
					loading={loading}
					data={data}
					//矫正打开时显示的值位置(现在并没有什么效果)
					onShowBox={() => {
						if (value) this.refs.tree.setValue(value);
					}}
					onConfirm={obj => {
						if (!obj) return;
						const { title, key } = obj;
						this.setState({
							text: title,
							value: key
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
		let value = this.refs.tree.getValue();
		return value;
	};

	setValue = ({ value, text }) => {
		const { data } = this.props;
		this.refs.tree.setValue(value);
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
		this.refs.tree.clear();
	};

	// ********************************
}

export default Default;
