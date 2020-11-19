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
import { CloseCircleOutlined } from "@ant-design/icons";

class Default extends React.Component {
	state = {
		value: undefined
	};

	componentDidMount() {
		const { defaultValue = "" } = this.props;
		if (defaultValue) {
			this.setValue(defaultValue);
		}
	}

	render() {
		const { label, clearable = true, disabled = false } = this.props;
		const { value } = this.state;
		return (
			<li className={disabled ? "textarea-item disabled" : "textarea-item"}>
				<label>{label}</label>
				<textarea
					disabled={disabled}
					className="number"
					value={value}
					onChange={e => {
						let value = e.target.value;
						this.setState({ value });
					}}
				/>
				{clearable && !disabled && value ? (
					<CloseCircleOutlined onClick={this.clear} />
				) : null}
			</li>
		);
	}

	getValue = () => {
		return this.state.value;
	};

	setValue = value => {
		this.setState({
			value: value
		});
	};

	clear = e => {
		this.setState({
			value: ""
		});
	};

	// ********************************
}

export default Default;
