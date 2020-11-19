// props:
// data
// onShowBox
// onConfirm
// ====================
// 方法：
// show
// hide
// getValue
// setValue
// clear

import React, { Fragment } from "react";
import "./style.css";

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

// 从数据源当中拿出当前这个obj
const getItemFromDataSource = (data, value) => {
	if (!value) return;

	let spreadedData = spreadTreeData(data);
	let obj = spreadedData.filter(item => {
		return item.key === value[0];
	});
	return obj[0];
};

class Default extends React.Component {
	static getDerivedStateFromProps(nextProps, prevState) {
		return {};
	}

	state = {
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
		const { data, loading } = this.props;
		const { showBox, value } = this.state;

		const onConfirm = e => {
			const { data, onConfirm } = this.props;
			const { value } = this.state;
			let obj = getItemFromDataSource(data, value);
			if (typeof onConfirm === "function") {
				onConfirm(obj);
			}
			this.hide(e);
		};

		return (
			<div
				className={
					showBox
						? "rtmcc-rnweb-treepickerview-container"
						: "rtmcc-rnweb-treepickerview-container hide"
				}
			>
				<div className="msk" onClick={this.hide} />
				<div className="pickerview">
					<div className="top-btns">
						<span onClick={onConfirm}>确定</span>
						<span onClick={this.hide}>取消</span>
					</div>
					<div className="tree-box">
						{showBox ? (
							<Tree
								onSelect={value =>
									this.setState({
										value
									})
								}
								treeData={data}
							/>
						) : null}
						{data instanceof Array && data.length > 0 ? null : (
							<Fragment>
								<FolderOpenOutlined />
								{loading ? (
									<span style={{ margin: "0 10px" }}>加载中...</span>
								) : (
									<span style={{ margin: "0 10px" }}>没有数据</span>
								)}
							</Fragment>
						)}
					</div>
				</div>
			</div>
		);
	}

	show = () => {
		this.setState({
			showBox: true
		});
	};

	hide = e => {
		if (e && e.stopPropagation) e.stopPropagation();
		this.setState({
			showBox: false
		});
	};

	getValue = () => {
		return this.state.value;
	};

	setValue = v => {
		this.setState({
			value: v
		});
	};

	clear = () => {
		this.setState({
			value: null
		});
	};
}

Default.getItemFromDataSource = getItemFromDataSource;

export default Default;
