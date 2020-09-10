import React from "react";
import "./App.css";
import util from "../util/index";
import TopTitle from "../components/TopTitle/index";
import Table from "../components/Table/index";
import Button from "../components/Button/index";
import Select from "../components/Select/index";
import Input from "../components/Input/index";
import DatePicker from "../components/DatePicker/index";
import { List } from "antd-mobile";

const Item = List.Item;
const { YearPicker } = DatePicker;

class App extends React.Component {
	state = {
		selectData1: [],
		mainData: []
	};

	componentDidMount() {
		//告知RN页面已经装载完毕
		util.traceBack("pageState", "componentDidMount");
		//监听事件以及时读取RN传回的数据
		document.addEventListener("message", event => {
			let res = JSON.parse(event.data);
			if (res.etype === "data") {
				let obj = { ...res };
				delete obj.etype;
				this.setState({
					...obj
				});
			} else if (res.etype === "event") {
				let { event, args } = res;
				if (typeof this[event] === "function") this[event](args);
			}
		});
		// ==================================

		this.setState({
			selectData1: [
				{ text: "option1", value: 1 },
				{ text: "option2", value: 2 },
				{ text: "option3d", value: 3 },
				{ text: "option4", value: 4 },
				{ text: "option5", value: 5 },
				{ text: "option6", value: 6 },
				{ text: "option7", value: 7 },
				{ text: "option8", value: 8 },
				{ text: "option9", value: 9 }
			],
			mainData: [
				{ text: "2017年上半年报表" },
				{ text: "2017年下半年报表" },
				{ text: "2018年上半年报表" },
				{ text: "2018年下半年报表" },
				{ text: "2019年上半年报表" },
				{ text: "2019年下半年报表" },
				{ text: "2020年上半年报表" },
				{ text: "2020年下半年报表" },
				{ text: "2017年上半年报表" },
				{ text: "2017年下半年报表" },
				{ text: "2018年上半年报表" },
				{ text: "2018年下半年报表" },
				{ text: "2019年上半年报表" },
				{ text: "2019年下半年报表" },
				{ text: "2020年上半年报表" },
				{ text: "2020年下半年报表" },
				{ text: "2017年上半年报表" },
				{ text: "2017年下半年报表" },
				{ text: "2018年上半年报表" },
				{ text: "2018年下半年报表" },
				{ text: "2019年上半年报表" },
				{ text: "2019年下半年报表" },
				{ text: "2020年上半年报表" },
				{ text: "2020年下半年报表" }
			]
		});
	}

	render() {
		const { selectData1, mainData } = this.state;
		return (
			<div className="app-container">
				<div className="app-contents">
					<TopTitle title="环保报表浏览" canBack />
					<ul className="condition-ul">
						<li>
							<label>时间</label>
							<YearPicker ref="y1" />
						</li>
						<li>
							<label>至</label>
							<YearPicker ref="y2" />
						</li>
					</ul>
					<ul className="condition-ul withbtns">
						<li>
							<label>选择台账</label>
							<Select ref="s1" data={[]} />
						</li>
						<li>
							<Button text="查询" onClick={this.onClickQuery} />
						</li>
					</ul>
					<List>
						{mainData.map((item, i) => {
							return (
								<Item
									key={`item${i}`}
									thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
									arrow="horizontal"
									onClick={() => {
										this.onClickItem(item, i);
									}}
								>
									<span style={{ fontSize: "15px" }}>{item.text}</span>
								</Item>
							);
						})}
					</List>
				</div>
			</div>
		);
	}

	onClickQuery = () => {
		const condition = {
			s1: this.refs.s1.getValue(),
			d: this.refs.d.getValue().format("YYYY-MM-DD")
		};
		util.traceBack("btn-query", condition);
	};

	onClickItem = (item, i) => {};

	onChangeSelect1 = obj => {
		util.traceBack("s1", obj);
	};
}

export default App;
