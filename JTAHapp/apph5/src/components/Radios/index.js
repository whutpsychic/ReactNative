import React from "react";
import "./index.css";

import radio from "../../img/radio.png";
import radio_active from "../../img/radio_active.png";

export default class extends React.Component {
	state = {
		active: 0
	};
	render() {
		const { active } = this.state;
		const { data = [] } = this.props;
		return (
			<ul className="radios-container">
				{data.map((item, i) => {
					return (
						<li key={`key${i}`} onClick={() => this.onChange(item, i)}>
							<img alt="" src={i === active ? radio_active : radio} />
							<span>{item.label}</span>
						</li>
					);
				})}
			</ul>
		);
	}

	onChange = (item, i) => {
		this.setState({ active: i });
		const { onChange } = this.props;
		if (typeof onChange === "function") {
			onChange(item);
		}
	};
}
