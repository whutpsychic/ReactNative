import React from "react";
import "./App.css";
import util from "../util/index";
import TopTitle from "../components/TopTitle/index";

import Button from "../components/Button/index";
import Select from "../components/Select/index";
import DatePicker from "../components/DatePicker/index";

class ListItem extends React.Component {
	render() {
		const { img, title, data } = this.props.item;
		return (
			<li className="list-item">
				<img alt={"tp"} src={img} className="left-img" />
				<div className="right-info">
					<p>{title}</p>
					<ul className="text-items">
						{data.map((item, i) => {
							if (item.active)
								return (
									<li>
										<span className="active">{item.text}</span>
									</li>
								);
							return (
								<li>
									<span>{item.text}</span>
								</li>
							);
						})}
					</ul>
				</div>
			</li>
		);
	}
}

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

		// ***************************************************
		// this.setState({
		// 	mainData: [
		// 		{
		// 			img: "",
		// 			title: "银山矿业",
		// 			data: [
		// 				{ text: "设计审查", active: false },
		// 				{ text: "竣工验收", active: true },
		// 				{ text: "消防检查", active: false },
		// 				{ text: "设计维护", active: false },
		// 				{ text: "培训演练", active: false },
		// 				{ text: "其他", active: false }
		// 			]
		// 		},
		// 		{
		// 			img: "",
		// 			title: "永平铜矿",
		// 			data: [
		// 				{ text: "设计审查", active: false },
		// 				{ text: "竣工验收", active: false },
		// 				{ text: "消防检查", active: false },
		// 				{ text: "设计维护", active: false },
		// 				{ text: "培训演练", active: false },
		// 				{ text: "其他", active: false }
		// 			]
		// 		},
		// 		{
		// 			img: "",
		// 			title: "银山矿业",
		// 			data: [
		// 				{ text: "设计审查", active: false },
		// 				{ text: "竣工验收", active: true },
		// 				{ text: "消防检查", active: false },
		// 				{ text: "设计维护", active: false },
		// 				{ text: "培训演练", active: false },
		// 				{ text: "其他", active: false }
		// 			]
		// 		},
		// 		{
		// 			img: "",
		// 			title: "永平铜矿",
		// 			data: [
		// 				{ text: "设计审查", active: false },
		// 				{ text: "竣工验收", active: false },
		// 				{ text: "消防检查", active: false },
		// 				{ text: "设计维护", active: false },
		// 				{ text: "培训演练", active: false },
		// 				{ text: "其他", active: false }
		// 			]
		// 		},
		// 		{
		// 			img: "",
		// 			title: "银山矿业",
		// 			data: [
		// 				{ text: "设计审查", active: false },
		// 				{ text: "竣工验收", active: true },
		// 				{ text: "消防检查", active: false },
		// 				{ text: "设计维护", active: false },
		// 				{ text: "培训演练", active: false },
		// 				{ text: "其他", active: false }
		// 			]
		// 		},
		// 		{
		// 			img: "",
		// 			title: "永平铜矿",
		// 			data: [
		// 				{ text: "设计审查", active: false },
		// 				{ text: "竣工验收", active: false },
		// 				{ text: "消防检查", active: false },
		// 				{ text: "设计维护", active: false },
		// 				{ text: "培训演练", active: false },
		// 				{ text: "其他", active: false }
		// 			]
		// 		},
		// 		{
		// 			img: "",
		// 			title: "银山矿业",
		// 			data: [
		// 				{ text: "设计审查", active: false },
		// 				{ text: "竣工验收", active: true },
		// 				{ text: "消防检查", active: false },
		// 				{ text: "设计维护", active: false },
		// 				{ text: "培训演练", active: false },
		// 				{ text: "其他", active: false }
		// 			]
		// 		},
		// 		{
		// 			img: "",
		// 			title: "永平铜矿",
		// 			data: [
		// 				{ text: "设计审查", active: false },
		// 				{ text: "竣工验收", active: false },
		// 				{ text: "消防检查", active: false },
		// 				{ text: "设计维护", active: false },
		// 				{ text: "培训演练", active: false },
		// 				{ text: "其他", active: false }
		// 			]
		// 		}
		// 	]
		// });
	}

	render() {
		const { selectData1, mainData } = this.state;
		return (
			<div className="app-container">
				<div className="app-contents">
					<TopTitle title="消防管理" canBack />
					<ul className="condition-ul">
						<li>
							<label>检查项目名称</label>
							<Select
								ref="s1"
								data={selectData1}
								onChange={this.onChangeSelect1}
							/>
						</li>
						<li>
							<label>排查截止时间</label>
							<DatePicker ref="d" onChange={this.onChangeDate} />
						</li>
					</ul>
					<ul className="btns">
						<li>
							<Button text="查询" onClick={this.onClickQuery} />
						</li>
					</ul>
					<ul className="main-list">
						{mainData.map((item, i) => {
							return <ListItem key={`item${i}`} item={item} />;
						})}
					</ul>
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

	onClickAdd = () => {
		util.traceBack("btn-add", {});
	};

	onClickOutput = () => {
		util.traceBack("btn-output", {});
	};

	onClickInput = () => {
		util.traceBack("btn-input", {});
	};

	onChangeSelect1 = obj => {
		util.traceBack("s1", obj);
	};

	onChangeSelect2 = obj => {
		util.traceBack("s2", obj);
	};

	onChangeDate = v => {
		util.traceBack("date", v);
	};
}

export default App;
