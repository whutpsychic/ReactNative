import React from "react";
import "./App.css";
import util from "../util/index";
import TopTitle from "../components/TopTitle/index";
import PageLoading from "../components/PageLoading/index";

const data = [
	"设计审查",
	"竣工验收",
	"消防检查",
	"设施维护",
	"培训演练",
	"其他"
];

class ListItem extends React.Component {
	state = {
		curr: null
	};

	render() {
		const { img, title } = this.props.item;
		const { curr } = this.state;
		return (
			<li className="list-item">
				<img alt={"tp"} src={img} className="left-img" />
				<div className="right-info">
					<p>{title}</p>
					<ul className="text-items">
						{data.map((item, i) => {
							if (curr === i)
								return (
									<li key={`itemk${i}`} onClick={() => this.onClickItem(i)}>
										<span className="active">{item}</span>
									</li>
								);
							return (
								<li key={`itemk${i}`} onClick={() => this.onClickItem(i)}>
									<span>{item}</span>
								</li>
							);
						})}
					</ul>
				</div>
			</li>
		);
	}

	onClickItem = i => {
		const { item } = this.props;
		this.setState({
			curr: i
		});
		util.traceBack("onClickItem", { i, item });
	};
}

class App extends React.Component {
	state = {
		pageLoading: false,
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
	}

	render() {
		const { mainData, pageLoading } = this.state;
		return (
			<div className="app-container">
				{pageLoading ? <PageLoading /> : null}
				<div className="app-contents">
					<TopTitle title="消防管理" canBack />
					<ul className="main-list">
						{mainData.map((item, i) => {
							return <ListItem key={`item${i}`} item={item} />;
						})}
					</ul>
				</div>
			</div>
		);
	}
}

export default App;
