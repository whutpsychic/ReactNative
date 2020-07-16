import React from "react";
import { NavBar } from "antd-mobile";
import { ArrowLeftOutlined, ScanOutlined } from "@ant-design/icons";
import "./style.css";

//图标大小
const IconSize = 26;

class Default extends React.Component {
	render() {
		const { title, onLeftClick, scan } = this.props;
		return (
			<NavBar
				mode="dark"
				icon={
					onLeftClick ? (
						<ArrowLeftOutlined
							style={{ fontSize: IconSize }}
							onClick={onLeftClick}
						/>
					) : null
				}
				rightContent={
					scan ? (
						<ScanOutlined style={{ fontSize: IconSize }} onClick={scan} />
					) : (
						undefined
					)
				}
			>
				{title}
			</NavBar>
		);
	}
}

export default Default;
