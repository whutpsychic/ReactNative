import React from "react";
import "./style.css";
import { Radio } from "antd";
import "antd/es/radio/style/index.css";

export default class extends React.Component {
	state = {};

	componentDidMount() {}

	render() {
		const { data = [], defaultValue } = this.props;
		const loadDefaultValue = () => {
			if (defaultValue) return defaultValue;
			else {
				return data[0] ? data[0].value : undefined;
			}
		};
		return (
			<div className="rtmcc-rnweb-radios">
				<Radio.Group
					defaultValue={loadDefaultValue()}
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
		const { value } = this.state;
		return value;
	};
}
