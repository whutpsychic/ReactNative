import React from "react";
import "./index.css";
import {
	List,
	InputItem,
	DatePicker,
	TextareaItem,
	ImagePicker,
	Picker,
	PickerView
} from "antd-mobile";
// **************************************************************
import "antd-mobile/lib/list/style/css"; // 加载 CSS
import "antd-mobile/lib/input-item/style/css"; // 加载 CSS
import "antd-mobile/lib/date-picker/style/css"; // 加载 CSS
import "antd-mobile/lib/textarea-item/style/css"; // 加载 CSS
import "antd-mobile/lib/image-picker/style/css"; // 加载 CSS
import "antd-mobile/lib/picker/style/css"; // 加载 CSS
import "antd-mobile/lib/picker-view/style/css"; // 加载 CSS
// **************************************************************
import { SearchOutlined } from "@ant-design/icons";
import { data, province, city, area, town } from "province-city-china/data";
import util from "../../util/index.js";

const Item = List.Item;
const Brief = Item.Brief;

// ===============================================================

let cityData = [];

cityData = province.map(item => {
	let newItem = {};
	newItem.label = item.name;
	newItem.value = item.province;
	newItem.children = city
		.filter(_item => {
			return _item.province === item.province;
		})
		.map(__item__ => {
			let _newItem = {};
			_newItem.label = __item__.name;
			_newItem.value = __item__.city;
			return _newItem;
		});
	return newItem;
});

// ===============================================================

class Default extends React.Component {
	render() {
		return <ul className="list-item-container">{this.props.children}</ul>;
	}
}

//一般输入框
class ListInput extends React.Component {
	state = {
		value: ""
	};

	onChange = value => {
		this.setState({
			value
		});
		const { onChange } = this.props;
		if (typeof onChange === "function") onChange(value);
	};

	render() {
		const { label, required, direct, placeholder } = this.props;
		const { value } = this.state;
		let rightStart = direct === "right";
		return (
			<li>
				<InputItem
					{...this.props}
					onChange={this.onChange}
					clear
					type={rightStart ? "money" : "text"}
					moneyKeyboardAlign={direct}
					placeholder={placeholder}
				>
					<span className={required ? "ineed" : ""}>{label}</span>
				</InputItem>
			</li>
		);
	}

	setValue = value => {
		this.setState({
			value
		});
	};

	getValue = () => {
		return this.state.value;
	};
}

//一般下拉框
class ListPicker extends React.Component {
	state = {
		value: undefined
	};
	render() {
		const { data, title, label, required, placeholder, cols } = this.props;
		const { value } = this.state;
		return (
			<li>
				<Picker
					data={data}
					title={title ? title : ""}
					placeholder={placeholder}
					cols={cols || 1}
					value={value}
					onChange={this.onChange}
				>
					<List.Item arrow="horizontal">
						<span className={required ? "ineed" : ""}>{label}</span>
					</List.Item>
				</Picker>
			</li>
		);
	}

	onChange = v => {
		this.setState({
			value: v
		});
	};

	getValue = () => {
		return this.state.value;
	};
}

//时间选择器
class ListDatePicker extends React.Component {
	state = {
		date: null
	};

	render() {
		const { label, required, onChange } = this.props;
		return (
			<li>
				<DatePicker
					{...this.props}
					value={this.state.date}
					onChange={date => {
						this.setState({ date });
						if (typeof onChange === "function") onChange(date);
					}}
					title={label}
					mode={"date"}
				>
					<List.Item arrow="horizontal">
						<span className={required ? "ineed" : ""}>{label}</span>
					</List.Item>
				</DatePicker>
			</li>
		);
	}

	getValue = () => {
		return this.state.date;
	};
}

//下拉框(城市专用)
class ListCitySelect extends React.Component {
	state = {
		value: null
	};

	render() {
		const { value } = this.state;
		const { label, required } = this.props;
		return (
			<li>
				<Picker
					{...this.props}
					extra="请选择(可选)"
					onOk={this.onOk}
					onDismiss={e => console.log("dismiss", e)}
					title={label}
					data={cityData}
					cols={2}
					value={value}
				>
					<List.Item arrow="horizontal">
						<span className={required ? "ineed" : ""}>{label}</span>
					</List.Item>
				</Picker>
			</li>
		);
	}

	onOk = value => {
		this.setState({
			value
		});
	};

	getValue = () => {
		// 此为城市专用
		const { value } = this.state;
		const result = [];
		if (value && value[0]) {
			let province = cityData.filter(item => {
				return item.value === this.state.value[0];
			});
			result[0] = province[0];
		}
		//
		if (value && value[1]) {
			let city = result[0].children.filter(item => {
				return item.value === this.state.value[1];
			});
			result[1] = city[0];
		}

		return result;
	};
}

//文本输入框
class ListTextArea extends React.Component {
	state = {
		value: ""
	};

	render() {
		const { label, required, disabled, text } = this.props;
		return (
			<li
				className={disabled ? "zbc-text-area-li disabled" : "zbc-text-area-li"}
			>
				<p className={required ? "textarea-title ineed" : "textarea-title"}>
					{label}
				</p>
				{disabled ? (
					<div className="text-shower">{text}</div>
				) : (
					<TextareaItem
						{...this.props}
						rows={5}
						count={200}
						onChange={this.onChangeText}
					/>
				)}
			</li>
		);
	}

	onChangeText = value => {
		this.setState({
			value
		});
		const { onChange } = this.props;
		if (typeof onChange === "function") onChange(value);
	};

	getValue = () => {
		return this.state.value;
	};
}

//树形数据（带搜索查询）
class ListTreeItem extends React.Component {
	state = {
		showMsk: false,
		inputValue: "",
		value: [],
		showedValue: "",
		dataSource: [], //废
		data: null,
		dataKey: null
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		const { data } = nextProps;
		if (nextProps.dataKey !== prevState.dataKey) {
			let arr = [];
			const setItIn = item => {
				if (item.children && item.children.length) {
					arr.push(item.children[0].value);
					setItIn(item.children[0]);
				}
			};
			if (data && data.length) {
				arr.push(data[0].value);
				setItIn(data[0]);
			}
			return { data: nextProps.data, dataKey: nextProps.dataKey, value: arr };
		}
		return {};
	}

	componentDidMount() {
		//设置props数据
		const { data = [], dataKey } = this.props;
		if (data instanceof Array)
			this.setState({
				data,
				dataKey
			});

		// ****************************************
		this.setFirstValue(data);
		// ****************************************
	}
	//设置第一项为默认值
	setFirstValue = data => {
		let arr = [];
		const setItIn = item => {
			if (item.children && item.children.length) {
				arr.push(item.children[0].value);
				setItIn(item.children[0]);
			} else {
				this.setState({
					value: arr
				});
			}
		};
		if (data && data.length) {
			arr.push(data[0].value);
			setItIn(data[0]);
		}
	};

	//根据所有数据找到那个数据对象
	//{lable:xxx,value:xxxx,children:[...]}
	findItemObject = (data, value) => {
		let _dataArr = util.deepClone(data);
		//
		const D = 2; //数据源深度
		let currDepth = 0; //当前操作深度
		let resultArr = []; //结果数组（作为结果返回）
		let opArr = _dataArr; //操作数组（仅运算时需要）

		const arranger = (dataArr, currDepth) => {
			if (opArr instanceof Array && opArr.length) {
				opArr = opArr.filter((item, i) => {
					return item.value === value[currDepth];
				});
				resultArr.push({
					label: opArr[0] ? opArr[0].label : "",
					value: opArr[0] ? opArr[0].value : ""
				});
				if (opArr instanceof Array) opArr = opArr[0] ? opArr[0].children : [];
			}
		};

		for (; currDepth < D; currDepth++) {
			arranger(opArr, currDepth);
		}

		return resultArr;
	};

	render() {
		const { label, required, direct, placeholder } = this.props;
		const {
			value,
			inputValue,
			showMsk,
			showedValue,
			data,
			dataSource
		} = this.state;
		let rightStart = direct === "right";
		return (
			<React.Fragment>
				<li onClick={this.onClickItem} className="zbc-treeData-with-searcher">
					<InputItem
						{...this.props}
						onChange={this.onChange}
						type={rightStart ? "money" : "text"}
						value={showedValue}
						moneyKeyboardAlign={direct}
						placeholder={placeholder}
					>
						<span className={required ? "ineed" : ""}>{label}</span>
					</InputItem>
				</li>
				{/************************/}
				<div
					className={
						showMsk ? "zbc-tree-picker-page" : "zbc-tree-picker-page hide"
					}
				>
					<div className="zbc-tree-picker-top-searcher">
						<input
							onChange={e => {
								this.setState({ inputValue: e.target.value });
								this.onSearch(e.target.value);
							}}
							value={inputValue}
						/>
						<SearchOutlined onClick={this.onSearch} />
					</div>
					<div className="zbc-tree-picker-top-result">
						<p onClick={this.hideMsk}>取消</p>
						<p className="result-text">{showedValue}</p>
						<p onClick={this.confirm}>确定</p>
					</div>
					<PickerView
						ref={ref => {
							this.picker = ref;
						}}
						value={value}
						onChange={this.onChange}
						onScrollChange={this.onScrollChange}
						data={data && data.length ? data : dataSource}
						cols={2}
					/>
				</div>
			</React.Fragment>
		);
	}

	//
	onChange = value => {
		this.setState({ value });
	};

	confirm = () => {
		this.hideMsk();
		const { data, value } = this.state;
		let obj = this.findItemObject(data, value);
		this.setState({
			showedValue: obj
				.map(item => {
					return item.label;
				})
				.join(",")
		});
		const { onConfirm } = this.props;
		if (typeof onConfirm === "function") onConfirm(obj);
	};

	//点击搜索
	onSearch = v => {
		const { data } = this.props;
		let value = typeof v === "string" ? v : "";
		const inputValue = value || this.state.inputValue;
		//先搜索二级名字
		const result = util
			.deepClone(data)
			.filter(item => {
				let hell = item.children.filter(_item => {
					let res = _item.label.indexOf(inputValue);
					if (res !== -1) return true;
					return false;
				});
				if (!hell.length) return false;
				return hell;
			})
			.map(item => {
				item.children = item.children.filter(_item => {
					return _item.label.indexOf(inputValue) != -1;
				});
				return item;
			});

		this.setState({
			data: result
		});

		this.setFirstValue(result);

		//再搜索一级
		// **
	};

	hideMsk = () => {
		this.setState({
			showMsk: false
		});
	};

	//打开新界面
	onClickItem = () => {
		this.setState({
			showMsk: true
		});
	};

	setValue = value => {
		this.setState({
			value
		});
	};

	getValue = () => {
		return this.state.value;
	};
}

Default.ListInput = ListInput;
Default.ListPicker = ListPicker;
Default.ListDatePicker = ListDatePicker;
Default.ListTextArea = ListTextArea;
Default.ListCitySelect = ListCitySelect;
Default.ListTreeItem = ListTreeItem;

export default Default;
