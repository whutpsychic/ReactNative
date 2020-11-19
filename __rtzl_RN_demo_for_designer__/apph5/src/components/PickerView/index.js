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

import { PickerView } from "antd-mobile";

// 从数据源当中拿出当前这个obj
const getItemFromDataSource = (data, value) => {
	if (!value) return;
	let obj = data.filter(item => {
		return item.value === value;
	});
	return obj[0];
};

class Default extends React.Component {
	static getDerivedStateFromProps(nextProps, prevState) {
		return {};
	}

	state = {
		value: null,
		showBox: false,
		busy: false // 正在展示
	};

	componentDidMount() {}

	render() {
		const { data, loading } = this.props;
		const { showBox, value } = this.state;

		const onConfirm = e => {
			const { data, onConfirm } = this.props;
			const { value } = this.state;
			let obj = getItemFromDataSource(data, value);
			// 默认第一项矫正
			if (!obj) obj = data[0];
			if (typeof onConfirm === "function") {
				onConfirm(obj);
			}
			this.hide(e);
		};

		return (
			<div
				className={
					showBox
						? "rtmcc-rnweb-pickerview-container"
						: "rtmcc-rnweb-pickerview-container hide"
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
							<PickerView
								data={data}
								value={[value]}
								cols={1}
								onChange={value =>
									this.setState({
										value: value[0]
									})
								}
							/>
						) : null}
					</div>
				</div>
			</div>
		);
	}

	show = e => {
		const { onShowBox } = this.props;
		if (typeof onShowBox === "function") onShowBox();
		this.setState({
			showBox: true,
			busy: true
		});
		setTimeout(() => {
			this.setState({
				busy: false
			});
		}, 150);
	};

	hide = e => {
		if (this.state.busy) return;
		this.setState({
			showBox: false
		});
	};

	getValue = () => {
		return this.state.value;
	};

	setValue = ({ value }) => {
		this.setState({
			value: value
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
