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
	SelectTree,
	Radios
} = RightDrawerConditions;

const renderConditionItem = item => {
	const { field, type, data, placeholder, clearable } = item;
	switch (type) {
		case "input":
			return <Input ref={field} placeholder={placeholder} />;
		case "select":
			return <Select ref={field} data={data} />;
		case "radios":
			return <Radios ref={field} data={data} />;
		case "date":
			return (
				<DatePicker
					ref={field}
					placeholder={placeholder}
					clearable={clearable}
				/>
			);
		case "month":
			return (
				<MonthPicker
					ref={field}
					placeholder={placeholder}
					clearable={clearable}
				/>
			);
		case "year":
			return (
				<YearPicker
					ref={field}
					placeholder={placeholder}
					clearable={clearable}
				/>
			);
		case "selecttree":
			return <SelectTree ref={field} placeholder={placeholder} data={data} />;
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
		return showDrawer ? (
			<div className="right-drawer-container">
				<div className="msk" onClick={() => this.hide()} />
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
						<Button type="primary" size="small" onClick={this.onConfirm}>
							确定
						</Button>
						<Button type="primary" size="small" onClick={this.hide}>
							取消
						</Button>
					</div>
				</div>
			</div>
		) : null;
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
