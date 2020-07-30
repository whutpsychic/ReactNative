import React from "react";
import "./index.css";

export default class extends React.Component {
	render() {
		const { title, style } = this.props;
		return (
			<div className="panel-container" style={style ? style : {}}>
				<p className="panel-title">{title}</p>
				{this.props.children}
			</div>
		);
	}
}
