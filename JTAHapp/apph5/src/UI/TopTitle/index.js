import React from "react";
import "./style.css";
import util from "../../util/index";
import back from "../../img/back.png";

export default class extends React.Component {
	render() {
		const { title, addons, canBack } = this.props;
		return (
			<div className="top-title">
				{canBack ? (
					<img alt={"back"} src={back} onClick={this.onClickBack} />
				) : null}
				<p>{title}</p>
				{typeof addons === "function" ? addons() : addons}
			</div>
		);
	}

	onClickBack = () => {
		util.traceBack("back-btn");
	};
}
