import React from "react";
import "./index.css";

export default class extends React.Component {
	render() {
		const { text, onClick } = this.props;
		return (
			<div className="button" onClick={onClick}>
				<span>{text}</span>
			</div>
		);
	}
}
