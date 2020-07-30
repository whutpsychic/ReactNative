import React from "react";
import "./index.css";

export default class extends React.Component {
	render() {
		const { title, addons } = this.props;
		return (
			<div className="top-title">
				<p>{title}</p>
				{typeof addons === "function" ? addons() : addons}
			</div>
		);
	}
}
