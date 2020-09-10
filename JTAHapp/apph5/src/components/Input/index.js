import React from "react";
import "./style.css";
import { PickerView } from "antd-mobile";

class Default extends React.Component {
	state = {
		text: ""
	};

	componentDidMount() {
		//修复那个蜜汁bug
		this.setState({
			showBox: false
		});
	}

	render() {
		const { text } = this.state;
		return (
			<input
				className="input"
				value={text}
				onChange={e => {
					let v = e.target.value;
					this.setState({
						text: v
					});
				}}
			/>
		);
	}

	getValue = () => {
		return this.state.value;
	};
}

export default Default;
