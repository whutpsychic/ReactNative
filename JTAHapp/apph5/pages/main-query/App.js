import React from "react";
import "./App.css";
import util from "../util/index";
import TopTitle from "../components/TopTitle/index";
import PageLoading from "../components/PageLoading/index";
// import ajax from "./ajax.js";

// ==========================================
import icon_about_blue from "../img/icon_about_blue.png";
import icon_accident_blue from "../img/icon_accident_blue.png";
import icon_checkol_blue from "../img/icon_checkol_blue.png";
import icon_config_blue from "../img/icon_config_blue.png";
import icon_danger_blue from "../img/icon_danger_blue.png";
import icon_ecology_blue from "../img/icon_ecology_blue.png";
import icon_env_blue from "../img/icon_env_blue.png";
import icon_file_blue from "../img/icon_file_blue.png";
import icon_fireexit_blue from "../img/icon_fireexit_blue.png";
import icon_identity_blue from "../img/icon_identity_blue.png";
import icon_importantArea_blue from "../img/icon_importantArea_blue.png";
import icon_list_blue from "../img/icon_list_blue.png";
import icon_publish_blue from "../img/icon_publish_blue.png";
import icon_risk_blue from "../img/icon_risk_blue.png";
import icon_safe_blue from "../img/icon_safe_blue.png";
import icon_target_blue from "../img/icon_target_blue.png";
import icon_train_blue from "../img/icon_train_blue.png";
import icon_urgency_blue from "../img/icon_urgency_blue.png";

// 图标库
const menu_icon_table = {
	icon_about: icon_about_blue,
	icon_accident: icon_accident_blue,
	icon_checkol: icon_checkol_blue,
	icon_config: icon_config_blue,
	icon_danger: icon_danger_blue,
	icon_ecology: icon_ecology_blue,
	icon_env: icon_env_blue,
	icon_file: icon_file_blue,
	icon_fireexit: icon_fireexit_blue,
	icon_identity: icon_identity_blue,
	icon_importantArea: icon_importantArea_blue,
	icon_list: icon_list_blue,
	icon_publish: icon_publish_blue,
	icon_risk: icon_risk_blue,
	icon_safe: icon_safe_blue,
	icon_target: icon_target_blue,
	icon_train: icon_train_blue,
	icon_urgency: icon_urgency_blue
};

// 根据名称断定图标类型
const judgeIconFromName = name => {
	switch (name) {
		case "about":
			return menu_icon_table.icon_about;
		case "accident":
			return menu_icon_table.icon_accident;
		case "checkol":
			return menu_icon_table.icon_checkol;
		case "config":
			return menu_icon_table.icon_config;
		case "danger":
			return menu_icon_table.icon_danger;
		case "ecology":
			return menu_icon_table.icon_ecology;
		case "env":
			return menu_icon_table.icon_env;
		case "file":
			return menu_icon_table.icon_file;
		case "fireexit":
			return menu_icon_table.icon_fireexit;
		case "identity":
			return menu_icon_table.icon_identity;
		case "importantArea":
			return menu_icon_table.icon_importantArea;
		case "list":
			return menu_icon_table.icon_list;
		case "publish":
			return menu_icon_table.icon_publish;
		case "risk":
			return menu_icon_table.icon_risk;
		case "safe":
			return menu_icon_table.icon_safe;
		case "target":
			return menu_icon_table.icon_target;
		case "train":
			return menu_icon_table.icon_train;
		case "urgency":
			return menu_icon_table.icon_urgency;
		default:
			return menu_icon_table.icon_accident;
	}
};

// ==========================================
// 单个目录项
class MenuItem extends React.Component {
	render() {
		const {
			data,
			data: { label, img, position }
		} = this.props;
		return (
			<div
				className="menu-item-container"
				onClick={() => {
					console.log({ ...data });
					util.traceBack("navigate", { ...data });
				}}
			>
				<img alt="" src={img} />
				<p>{label}</p>
			</div>
		);
	}
}

class App extends React.Component {
	state = {
		pageLoading: false,
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
		// ajax.query().then(data => {
		// 	this.setState({
		// 		data
		// 	});
		// });
	}

	render() {
		const { pageLoading, data } = this.state;
		return (
			<div className="app-container">
				<div className="app-contents">
					{pageLoading ? <PageLoading /> : null}
					<TopTitle title="信息管理" />
					{data.map((menuItems, i) => {
						return (
							<div key={`mk${i}`} className="nav-items-container">
								<p>
									<img alt="tb" src={judgeIconFromName(menuItems.name)} />
									<span>{menuItems.title}</span>
								</p>
								<ul>
									{menuItems.children instanceof Array &&
										menuItems.children.map((item, j) => {
											return (
												<li key={`ik${j}`}>
													<MenuItem
														data={{
															img: judgeIconFromName(menuItems.name),
															...item
														}}
													/>
												</li>
											);
										})}
								</ul>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default App;
