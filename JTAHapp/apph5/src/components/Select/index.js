import React from "react";
import "./style.css";
import { PickerView } from "antd-mobile";

class Default extends React.Component {
	static getDerivedStateFromProps(nextProps, prevState) {
		if (!prevState.value && nextProps.data.length)
			return {
				text: nextProps.data[0].label,
				value: [nextProps.data[0].value]
			};
		return {};
	}

	state = {
		text: null,
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
		const { text, value, showBox } = this.state;
		return (
			<React.Fragment>
				<div className="select" onClick={this.onOpenBox}>
					<span>{text ? text : data[0] ? data[0].label : ""}</span>
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
						<PickerView
							data={data}
							value={value}
							cols={1}
							onChange={this.onChange}
						/>
					</div>
				</div>
			</React.Fragment>
		);
	}

	fixUp = () => {
		//初次打开时加载到当前选项
		const { data } = this.props;
		const { text } = this.state;
		if (!text) return;
		let obj = data.filter(item => {
			return item.label === text;
		})[0];
		this.setState({
			value: [obj.value]
		});
	};

	onOpenBox = () => {
		this.setState({
			showBox: true
		});
		this.fixUp();
	};

	onHideBox = bool => {
		this.setState({
			showBox: false
		});
		if (bool) this.fixUp();
	};

	onChange = v => {
		const { data } = this.props;
		let obj = data.filter(item => {
			return item.value === v[0];
		})[0];
		this.setState({
			value: [obj.value]
		});
	};

	confirm = () => {
		const { data, onChange } = this.props;
		const { text, value } = this.state;
		this.onHideBox(false);
		let obj = data.filter(item => {
			return item.value === value[0];
		})[0];
		this.setState({
			text: obj.label
		});
		if (typeof onChange === "function") {
			onChange({ label: text, value });
		}
	};

	cancel = () => {
		this.onHideBox(true);
	};

	getValue = () => {
		return this.state.value;
	};
}

export default Default;
