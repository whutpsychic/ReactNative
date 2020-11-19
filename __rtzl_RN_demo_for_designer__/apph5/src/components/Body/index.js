import React from "react";
import "./style.css";

class Default extends React.Component {
	render() {
		return (
			<div className="app-container">
				<div className="app-contents">{this.props.children}</div>
			</div>
		);
	}
}

export default Default;
