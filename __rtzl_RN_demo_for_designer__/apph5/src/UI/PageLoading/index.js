import React from "react";
import "./index.css";
import { Spin } from "antd";
import "antd/lib/spin/style/css";

export default class extends React.Component {
	render() {
		return (
			<div className="page-loading-container">
				<div className="page-loading-msk" />
				<div className="page-loading">
					<Spin />
				</div>
			</div>
		);
	}
}
