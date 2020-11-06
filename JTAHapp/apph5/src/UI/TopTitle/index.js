import React from "react";
import "./style.css";
import util from "../../util/index";
import back from "../../img/back.png";
import { PlusCircleOutlined } from "@ant-design/icons";

export default class extends React.Component {
	render() {
		const { title, addons, add, canBack } = this.props;
		return (
			<div className="top-title">
				{canBack ? (
					<img alt={"back"} src={back} onClick={this.onClickBack} />
				) : null}
				<p>{title}</p>
				{add ? (
					<PlusCircleOutlined
						onClick={() => {
							const { onAdd } = this.props;
							if (typeof onAdd === "function") onAdd();
						}}
					/>
				) : null}
				{typeof addons === "function" ? addons() : addons}
			</div>
		);
	}

	onClickBack = () => {
		util.traceBack("back-btn");
	};
}
