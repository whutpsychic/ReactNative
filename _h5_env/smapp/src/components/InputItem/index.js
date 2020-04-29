import React from "react";
import { List, InputItem } from "antd-mobile";
import util from "../../util/index.js";
import "./style.css";

class Default extends React.Component {
	state = {
		str: ""
	};

	render() {
		const { str } = this.state;
		const { label, placeholder, type, extra } = this.props;
		return (
			<React.Fragment>
				<div className="input-item">
					<List>
						<InputItem
							clear
							type={type}
							placeholder={placeholder}
							value={str}
							onChange={this.onChange}
						>
							{label}
						</InputItem>
					</List>
					{extra ? extra : null}
				</div>
			</React.Fragment>
		);
	}

	onChange = v => {
		console.log(v);
		this.setState({
			str: v
		});
	};

	getValue = () => {
		return this.state.str;
	};
}

export default Default;
