import React from "react";
import "./style.css";
import { PickerView } from "antd-mobile";

class Default extends React.Component {
	state = {
		text: ""
	};

	componentDidMount() {}

	render() {
		const { text } = this.state;
		return (
			<input
				className="rtmcc-rnweb-input"
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
		return this.state.text;
	};
}

export default Default;
