//单选视图
import React from "react";
import "./style.css";
import { PickerView } from "antd-mobile";

class Default extends React.Component {
	state = {
		showBox: false,
		value: undefined
	};

	componentDidMount() {
		const { data = [] } = this.props;
		if (data[0])
			this.setState({
				value: [data[0].value]
			});
	}

	render() {
		const { data } = this.props;
		const { showBox, value } = this.state;
		return (
			<div
				className={
					showBox
						? "rtzl-zbc-pickerview-container"
						: "rtzl-zbc-pickerview-container hide"
				}
			>
				<div className="msk" />
				<div className="rtzl-zbc-pickerview">
					<div className="top-btns">
						<span onClick={this.confirm}>确定</span>
						<span onClick={this.cancel}>取消</span>
					</div>
					{showBox ? (
						<PickerView
							data={data}
							value={value}
							cols={1}
							onChange={this.onChange}
						/>
					) : null}
				</div>
			</div>
		);
	}

	open = () => {
		this.setState({
			showBox: true
		});
	};

	hide = e => {
		this.setState({
			showBox: false
		});
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
		const { data, onSelect } = this.props;
		const { value } = this.state;
		this.hide();
		let obj = data.filter(item => {
			return item.value === value[0];
		})[0];

		if (typeof onSelect === "function") {
			onSelect(obj);
		}
	};

	cancel = () => {
		this.hide();
	};

	getValue = () => {
		return this.state.value;
	};
}

export default Default;
