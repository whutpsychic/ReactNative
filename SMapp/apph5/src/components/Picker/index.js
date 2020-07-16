import React from "react";
import { List, Picker } from "antd-mobile";
import util from "../../util/index.js";
import "./style.css";

class Default extends React.Component {
	static getDerivedStateFromProps(props, state) {
		return props.data.length ? { value: [props.data[0].value] } : null;
	}

	state = {
		value: null
	};

	componentDidMount() {}

	render() {
		const { label, data } = this.props;
		return (
			<List>
				<Picker
					data={data}
					cols={1}
					value={this.state.value}
					onChange={this.onChange}
				>
					<List.Item arrow="horizontal">{label}</List.Item>
				</Picker>
			</List>
		);
	}

	onChange = v => {
		this.setState({
			value: v
		});
	};

	getValue = () => {
		return this.state.value;
	};
}

export default Default;
