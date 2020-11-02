import React from "react";
import "./style.css";
import { Radio } from "antd";
import "antd/es/radio/style/index.css";

export default class extends React.Component {
	state = {
		active: 0
	};

	render() {
		const { active } = this.state;
		const { data = [] } = this.props;

		return (
			<div className="rtmcc-rnweb-radios">
				<Radio.Group
					defaultValue={data[0] ? data[0].value : undefined}
					options={data}
					onChange={this.onChangeRadio}
					optionType="button"
					buttonStyle="solid"
				/>
			</div>
		);
	}

	onChangeRadio = e => {
		const { value } = e.target;
		this.setState({
			value
		});
	};

	getValue = () => {
		const { active } = this.state;
		const { data } = this.props;
		return data[active].value;
	};
}
