import React from "react";
import "./App.css";
import Body from "../components/Body/index";
import util from "../util/index";
import TopTitle from "../UI/TopTitle/index";

class Default extends React.Component {
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
	}
	render() {
		const onPressBack = () => {
			util.traceBack("back-btn");
		};
		return (
			<Body>
				<p style={{ marginTop: "12px" }}>只有标题</p>
				<TopTitle title="标题文字" />
				<p style={{ marginTop: "12px" }}>有标题和后退键</p>
				<TopTitle title="标题文字" canBack onPressBack={onPressBack} />
				<p style={{ marginTop: "12px" }}>有标题、后退键、更多动作选项</p>
				<TopTitle
					title="标题文字"
					canBack
					onPressBack={onPressBack}
					addons={[
						{
							name: "add",
							text: "添 加",
							fn: () => {
								util.traceBack("addons-add");
							}
						},
						{
							name: "scan",
							text: "扫一扫",
							fn: () => {
								util.traceBack("addons-scan");
							}
						}
					]}
				/>
			</Body>
		);
	}
}

export default Default;
