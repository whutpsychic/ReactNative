// ===============================================================
// === List
// === v1.0.0
// === 首次编辑日期：2020-11-03
// === 作者：zbc
// === 上一次维护日期：2020-11-03
// ===============================================================
// props:
// btns
// ===============================================================
// 方法:
// getValue
// ===============================================================
import React from "react";
import "./style.css";
// ===============================================================
import InputItem from "./InputItem/index";
import NumberItem from "./NumberItem/index";
import SelectItem from "./SelectItem/index";
import DatePickerItem from "./DatePickerItem/index";
import TreeSelectItem from "./TreeSelectItem/index";
import TextAreaItem from "./TextAreaItem/index";
import Button from "./Button/index";

const renderListItem = (item, index) => {
	const { type, label, disabled, defaultValue, data } = item;

	switch (type) {
		case "date":
			return (
				<DatePickerItem
					key={`li${index}`}
					ref={`li${index}`}
					label={label}
					disabled={disabled}
					defaultValue={defaultValue}
				/>
			);
		case "tree-select":
			return (
				<TreeSelectItem
					key={`li${index}`}
					ref={`li${index}`}
					label={label}
					disabled={disabled}
					defaultValue={defaultValue}
					data={data}
				/>
			);
		case "select":
			return (
				<SelectItem
					key={`li${index}`}
					ref={`li${index}`}
					label={label}
					disabled={disabled}
					defaultValue={defaultValue}
					data={data}
				/>
			);
		case "number":
			return (
				<NumberItem
					key={`li${index}`}
					ref={`li${index}`}
					label={label}
					disabled={disabled}
					defaultValue={defaultValue}
				/>
			);
		case "input":
			return (
				<InputItem
					key={`li${index}`}
					ref={`li${index}`}
					label={label}
					disabled={disabled}
					defaultValue={defaultValue}
				/>
			);
		case "text-area":
			return (
				<TextAreaItem
					key={`li${index}`}
					ref={`li${index}`}
					label={label}
					disabled={disabled}
					defaultValue={defaultValue}
				/>
			);
		default:
			return null;
	}
};

class Default extends React.Component {
	componentDidMount() {}

	render() {
		const { btns = [] } = this.props;
		return (
			<ul className="rtmcc-rnweb-list">
				{this.props.children}
				<li className="btns">
					<ul>
						{btns.map((item, i) => {
							const { label, func, disabled } = item;
							return (
								<Button
									key={`bk${i}`}
									label={label}
									onClick={func}
									disabled={disabled}
								/>
							);
						})}
					</ul>
				</li>
			</ul>
		);
	}

	// ********************************
	getValue(_this) {
		const { children } = this.props;

		console.log(_this.refs);

		let conditions = [];
		children.map((item, i) => {
			conditions.push(_this.refs[`li${i}`].getValue());
		});

		return conditions;
	}
}

Default.renderListItem = renderListItem;
Default.Button = Button;

export default Default;
