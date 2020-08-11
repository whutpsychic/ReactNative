import React from "react";
import "./index.css";
import util from "../../util/index";

export default class extends React.Component {
	render() {
		const { data, onClick } = this.props;
		return (
			<div
				className="icon-nav-block-item"
				onClick={() => util.traceBack("nav", data)}
			>
				<img alt="img" src={data.src} />
				<p>{data.title}</p>
			</div>
		);
	}
}
