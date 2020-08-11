import React from "react";
import "./App.css";
import util from "../util/index";
import TopTitle from "../components/TopTitle/index";
import NavBlock from "../components/NavBlock/index";

import icon_target_green from "../img/icon_target_green.png";
import icon_risk_green from "../img/icon_risk_green.png";
import icon_fireexit_green from "../img/icon_fireexit_green.png";
import icon_file_green from "../img/icon_file_green.png";
import icon_identity_green from "../img/icon_identity_green.png";
import icon_importantArea_green from "../img/icon_importantArea_green.png";
import icon_list_green from "../img/icon_list_green.png";
import icon_checkol_green from "../img/icon_checkol_green.png";
import icon_about_green from "../img/icon_about_green.png";
import icon_urgency_green from "../img/icon_urgency_green.png";
import icon_accident_green from "../img/icon_accident_green.png";
import icon_publish_green from "../img/icon_publish_green.png";
import icon_train_green from "../img/icon_train_green.png";
import icon_ecology_green from "../img/icon_ecology_green.png";
import icon_danger_green from "../img/icon_danger_green.png";
import icon_env_green from "../img/icon_env_green.png";
import icon_safe_green from "../img/icon_safe_green.png";
import icon_config_green from "../img/icon_config_green.png";

const menuData = [
	{ title: "目标管理", src: icon_target_green },
	{ title: "风险管控", src: icon_risk_green },
	{ title: "消防管理", src: icon_fireexit_green },
	{ title: "档案管理", src: icon_file_green },
	{ title: "证照管控", src: icon_identity_green },
	{ title: "重点区域管理", src: icon_importantArea_green },
	{ title: "挂牌督办", src: icon_list_green },
	{ title: "在线检测", src: icon_checkol_green },
	{ title: "相关方信息", src: icon_about_green },
	{ title: "应急管理", src: icon_urgency_green },
	{ title: "事故管理", src: icon_accident_green },
	{ title: "信息发布", src: icon_publish_green },
	{ title: "培训管理", src: icon_train_green },
	{ title: "生态修复", src: icon_ecology_green },
	{ title: "危险化学品", src: icon_danger_green },
	{ title: "环保类报表", src: icon_env_green },
	{ title: "安全类报表", src: icon_safe_green },
	{ title: "系统管理", src: icon_config_green }
];

class App extends React.Component {
	state = {
		data: []
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
		this.setState({
			data: menuData
		});
	}

	render() {
		const { data } = this.state;
		return (
			<div className="app-container">
				<div className="app-contents">
					<TopTitle title="信息查询" />
					<div className="menu-container">
						{data.map((item, i) => {
							return <NavBlock key={`item${i}`} data={item} />;
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
