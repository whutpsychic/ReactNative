import React from "react";
import "./App.css";
import util from "../util/index";
import PageLoading from "../components/PageLoading/index";
import TopTitle from "../components/TopTitle/index";

import Button from "../components/Button/index";
import Select from "../components/Select/index";
import DatePicker from "../components/DatePicker/index";

import { NoticeBar } from "antd-mobile";

const { YearPicker } = DatePicker;

class ListItem extends React.Component {
	render() {
		const { img, title, subtitle, data } = this.props.item;
		return (
			<li className="list-item">
				<img alt={"tp"} src={img} className="left-img" />
				<div className="right-info">
					<p>
						{title}
						<span>{subtitle}</span>
					</p>
					<ul className="img-items">
						{data.map((item, i) => {
							return (
								<li key={`item${i}`}>
									<img alt="" src={item.img} />
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
		pageLoading: true,
		mainData: [],
		title: ""
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
	}

	render() {
		const { pageLoading, title, mainData } = this.state;
		return (
			<div className="app-container">
				<div className="app-contents">
					<TopTitle title="生态修复信息" canBack />
					<ul className="condition-ul">
						<li>
							<YearPicker ref="d" onChange={this.onChangeDate} />
						</li>
						<li>
							<Button text="查询" onClick={this.onClickQuery} />
						</li>
					</ul>
					<NoticeBar
						icon={null}
						marqueeProps={{ loop: true, style: { padding: "0 7.5px" } }}
					>
						{title}
					</NoticeBar>
					<ul className="main-list">
						{mainData.map((item, i) => {
							return <ListItem key={`item${i}`} item={item} />;
						})}
					</ul>
					{pageLoading ? <PageLoading /> : null}
				</div>
			</div>
		);
	}

	onClickQuery = () => {
		const condition = {
			d: this.refs.d.getValue().format("YYYY-MM-DD")
		};
		util.traceBack("btn-query", condition);
	};

	onChangeSelect1 = obj => {
		util.traceBack("s1", obj);
	};

	onChangeDate = v => {
		util.traceBack("onChangeDate", { date: v });
	};
}

export default App;
