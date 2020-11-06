// --------------------
// 属性：
// label
// --------------------
// 方法：
// onClick
// ===============================================================
import React from "react";
import "./style.css";
// ===============================================================
import { Button } from "antd-mobile";

class Default extends React.Component {
	componentDidMount() {}

	render() {
		const { label, disabled } = this.props;

		return (
			<li className={disabled ? "button disabled" : "button"}>
				<Button type="primary" disabled={disabled} onClick={this.onClick}>
					{label}
				</Button>
			</li>
		);
	}

	onClick = () => {
		const { onClick } = this.props;
		if (typeof onClick === "function") onClick();
	};

	// ********************************
}

export default Default;
