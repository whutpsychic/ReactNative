import React, { Fragment } from "react";
import "./style.css";

import arrow from "../../../img/icon-select-arrow.png";
import arrow_disabled from "../../../img/icon-select-arrow-disabled.png";

import { FolderOpenOutlined } from "@ant-design/icons";
import { Tree } from "antd";
import "antd/es/tree/style/index.css";

// 铺开树形数据
const spreadTreeData = data => {
	const arr = [];

	const sptd = _data => {
		_data.map(item => {
			arr.push({ title: item.title, key: item.key });
			if (item.children && item.children.length) {
				sptd(item.children);
			}
		});
	};

	sptd(data);
	return arr;
};

class Default extends React.Component {
	static getDerivedStateFromProps(nextProps, prevState) {
		return {};
	}

	state = {
		text: <span style={{ color: "#ddd" }}>请选择</span>,
		prevalue: null,
		value: null,
		showBox: true
	};

	componentDidMount() {
		//修复那个蜜汁bug
		this.setState({
			showBox: false
		});
	}

	render() {
		const { data } = this.props;
		const { showBox } = this.state;
		let { text, value } = this.state;
		if (!text && data.length) text = data[0].label;
		if (!value && data.length) value = data[0].value;
		return (
			<React.Fragment>
				<div className="rtmcc-rnweb-select-tree" onClick={this.onOpenBox}>
					<span>{text ? text : data[0] ? data[0].label : ""}</span>
					<img alt="" src={arrow} />
				</div>
				<div
					className={
						showBox ? "pickerview-container" : "pickerview-container hide"
					}
				>
					<div className="msk" onClick={this.onHideBox} />
					<div className="pickerview">
						<div className="top-btns">
							<span onClick={this.confirm}>确定</span>
							<span onClick={this.cancel}>取消</span>
						</div>
						<div className="tree-box">
							{showBox ? (
								<Tree onSelect={this.onSelect} treeData={data} />
							) : null}
							{data instanceof Array && data.length > 0 ? null : (
								<Fragment>
									<FolderOpenOutlined />
									<span style={{ margin: "0 10px" }}>没有数据</span>
								</Fragment>
							)}
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}

	onSelect = x => {
		this.setState({
			value: x
		});
	};

	onOpenBox = () => {
		this.setState({
			showBox: true
		});
	};

	onHideBox = bool => {
		this.setState({
			showBox: false
		});
	};

	confirm = () => {
		const { data, onChange } = this.props;
		const { value } = this.state;
		let spreadedData = spreadTreeData(data);
		let obj = spreadedData.filter(item => {
			return item.key === value[0];
		});
		this.setState({
			text: obj[0].title
		});
		if (typeof onChange === "function") {
			onChange(obj);
		}
		this.onHideBox();
	};

	cancel = () => {
		this.onHideBox();
		this.setState({
			value: this.state.prevalue
		});
	};

	getValue = () => {
		return this.state.value;
	};
}

export default Default;
