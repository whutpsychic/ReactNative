// =======================rtmcc==========================
// UI-TopTitle
// UI-顶部标题
// v1.0.0
// create-date:2020-11-18
// developer:zbc
// last maintian date:2020-11-18
// =======================rtmcc==========================
import React from "react";
import "./style.scss";
import util from "../../util/index";
import { Dropdown } from "antd";
import "antd/es/dropdown/style/css";
import "antd";
import {
	LeftOutlined,
	MenuOutlined,
	QuestionOutlined,
	PlusCircleOutlined,
	ScanOutlined
} from "@ant-design/icons";

const renderAddonsIcon = name => {
	switch (name) {
		case "add":
			return <PlusCircleOutlined />;
		case "scan":
			return <ScanOutlined />;
		default:
			return <QuestionOutlined />;
	}
};

const onPressBack = props => {
	util.traceBack("back-btn");
	const { onPressBack } = props;
	if (typeof onPressBack === "function") {
		onPressBack();
	}
};

const renderAddons = props => {
	const { addons } = props;
	if (addons instanceof Array && addons.length) {
		const adddonsArr = addons.map((item, i) => {
			const { fn } = item;
			return (
				<li
					key={`ia${i}`}
					onClick={() => {
						if (typeof fn === "function") fn();
					}}
				>
					{renderAddonsIcon(item.name)}
					<span>{item.text}</span>
				</li>
			);
		});

		return (
			<Dropdown
				overlay={
					<ul className="rtmcc-rnweb-top-title-right-addons">{adddonsArr}</ul>
				}
				placement="bottomLeft"
				arrow
			>
				<MenuOutlined />
			</Dropdown>
		);
	}
};

export default class extends React.Component {
	render() {
		const { title, addons, canBack } = this.props;
		return (
			<div className="rtmcc-rnweb-top-title">
				{canBack ? (
					<LeftOutlined
						onClick={() => {
							onPressBack(this.props);
						}}
					/>
				) : null}
				<p>{title}</p>
				{renderAddons(this.props)}
			</div>
		);
	}
}
