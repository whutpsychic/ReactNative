import React from "react";
import "./style.css";
import { PickerView } from "antd-mobile";

class Default extends React.Component {
	state = {
		text: ""
	};

	componentDidMount() {
		const { defaultValue } = this.props;
		if (defaultValue) {
			this.setState({ text: defaultValue });
		}
	}

	render() {
		const { disabled } = this.props;
		const { text } = this.state;
		return (
			<input
				className={`rtmcc-rnweb-input${disabled ? " disabled" : ""}`}
				value={text}
				disabled={disabled}
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
