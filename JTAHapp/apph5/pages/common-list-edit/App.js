import React from "react";
import "./App.css";
import util from "../util/index";
// ====================================
import List from "../core/components/List/index";
// ====================================
import TopTitle from "../UI/TopTitle/index";
import PageLoading from "../UI/PageLoading/index";

const { renderListItem } = List;

// debug模式
const debugging = false;

class App extends React.Component {
	state = {
		pageLoading: false,
		title: "",
		institutions: [],
		selectData1: [],
		ListItems: []
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
		if (debugging) {
			this.setState({
				pageLoading: true
			});
			setTimeout(() => {
				this.setState({
					title: "酸性水库信息维护",
					pageLoading: false,
					ListItems: [
						{
							label: "日期",
							type: "date"
							// disabled: true,
							// defaultValue: "2020-08-21"
						},
						{
							label: "单位",
							type: "tree-select",
							// disabled: true,
							data: [
								{ title: "全部", key: "all" },
								{
									title: "根节点",
									key: "gjd",
									children: [
										{
											title: "子节点1",
											key: "z1",
											children: [
												{ title: "叶子结点1", key: "yz1" },
												{ title: "叶子结点2", key: "yz2" },
												{ title: "叶子结点3", key: "yz3" },
												{ title: "叶子结点4", key: "yz4" }
											]
										},
										{
											title: "子节点2",
											key: "z2",
											children: [
												{ title: "叶子结点1", key: "yz21" },
												{ title: "叶子结点2", key: "yz22" },
												{ title: "叶子结点3", key: "yz23" },
												{ title: "叶子结点4", key: "yz24" }
											]
										}
									]
								}
							]
							// defaultValue: { text: "全部", value: "all" }
						},
						{
							label: "监测地点",
							type: "select",
							// disabled: true,
							// defaultValue: { text: "全部", value: "all" },
							data: [
								{ label: "xxx1", value: 1 },
								{ label: "xxx2", value: 2 },
								{ label: "xxx3", value: 3 },
								{ label: "xxx4", value: 4 }
							]
						},
						{
							label: "水库水位/m",
							type: "number",
							disabled: true,
							defaultValue: 8
						},
						{
							label: "距离溢流口高度/m",
							type: "number"
							// disabled: true,
						},
						{
							label: "备注",
							type: "text-area",
							// disabled: true,
							defaultValue: "2020-08-21"
						}
					]
				});
			}, 1000);
		}
	}

	render() {
		const { pageLoading, title } = this.state;
		const { institutions, selectData1, ListItems } = this.state;
		// const ListItems =

		const btns = [
			{
				label: "提交",
				func: this.onClickSubmit
				// disabled: true
			}
		];

		return (
			<div className="app-container">
				<div className="app-contents">
					{pageLoading ? <PageLoading /> : null}
					<TopTitle title={title} canBack />
					<List btns={btns} ref="list">
						{ListItems.map((item, i) => {
							return renderListItem(item, i);
						})}
					</List>
				</div>
			</div>
		);
	}

	onClickSubmit = () => {
		let conditions = this.refs.list.getValue(this);
		util.traceBack("submit", conditions);
	};
}

export default App;
