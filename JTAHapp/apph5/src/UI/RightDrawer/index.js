import React, { Fragment } from "react";
import "./style.css";
import RightDrawerConditions from "../RightDrawerConditions/index";

import { Button } from "antd-mobile";

const {
	Input,
	Select,
	DatePicker,
	MonthPicker,
	YearPicker,
	TimePicker,
	SelectTree,
	Radios
} = RightDrawerConditions;

const renderConditionItem = item => {
	const {
		field,
		type,
		data,
		placeholder,
		clearable,
		disabled,
		defaultValue,
		onChange
	} = item;
	switch (type) {
		case "input":
			return (
				<Input
					ref={field}
					placeholder={placeholder}
					disabled={disabled}
					defaultValue={defaultValue}
				/>
			);
		case "select":
			return (
				<Select
					ref={field}
					data={data}
					disabled={disabled}
					defaultValue={defaultValue}
					onChange={onChange}
				/>
			);
		case "radios":
			return (
				<Radios
					ref={field}
					data={data}
					disabled={disabled}
					defaultValue={defaultValue}
				/>
			);
		case "date":
			return (
				<DatePicker
					ref={field}
					placeholder={placeholder}
					clearable={clearable}
					disabled={disabled}
					defaultValue={defaultValue}
				/>
			);
		case "month":
			return (
				<MonthPicker
					ref={field}
					placeholder={placeholder}
					clearable={clearable}
					disabled={disabled}
					defaultValue={defaultValue}
				/>
			);
		case "year":
			return (
				<YearPicker
					ref={field}
					placeholder={placeholder}
					clearable={clearable}
					disabled={disabled}
					defaultValue={defaultValue}
				/>
			);
		case "time":
			return (
				<TimePicker
					ref={field}
					placeholder={placeholder}
					clearable={clearable}
					disabled={disabled}
					defaultValue={defaultValue}
				/>
			);
		case "selecttree":
			return (
				<SelectTree
					ref={field}
					placeholder={placeholder}
					data={data}
					disabled={disabled}
					defaultValue={defaultValue}
				/>
			);
		default:
			return null;
	}
};

// 筛选抽屉
class Default extends React.Component {
	state = {
		showDrawer: false
	};

	render() {
		const { showDrawer } = this.state;
		const { data } = this.props;
		return (
			<React.Fragment>
				<div
					className={
						showDrawer ? "right-drawer-msk" : "right-drawer-msk hidden"
					}
					onClick={() => this.hide()}
				/>
				<div
					className={
						showDrawer
							? "right-drawer-container"
							: "right-drawer-container hidden"
					}
				>
					<div className="main-container">
						<ul>
							{data.map((item, i) => {
								return (
									<li key={`i${i}`}>
										<label>{item.label}</label>
										{renderConditionItem(item)}
									</li>
								);
							})}
						</ul>
						<div className="drawer-btns">
							<Button type="primary" size="small" onClick={this.hide}>
								取消
							</Button>
							<Button type="primary" size="small" onClick={this.onConfirm}>
								确定
							</Button>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}

	show = () => {
		this.setState({
			showDrawer: true
		});
	};

	hide = () => {
		this.setState({
			showDrawer: false
		});
	};

	// 获得查询条件
	getConditions = () => {
		const { data } = this.props;
		const conditionObj = {};
		data.map(item => {
			const { field } = item;
			conditionObj[field] = this.refs[field].getValue();
		});
		return conditionObj;
	};

	// 按下确认按钮
	onConfirm = () => {
		this.hide();
		let conditions = this.getConditions();
		const { onClickConfirmBtn } = this.props;
		if (typeof onClickConfirmBtn === "function") onClickConfirmBtn(conditions);
	};
}
export default Default;
