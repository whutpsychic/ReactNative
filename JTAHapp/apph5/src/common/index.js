import React from "react";
import imgs from "../img/img.js";
import util from "../util/index.js";

const init = _this => {
	//告知RN页面已经装载完毕
	util.traceBack("pageState", "componentDidMount");
	//监听事件以及时读取RN传回的数据
	document.addEventListener("message", event => {
		let res = JSON.parse(event.data);
		if (res.etype === "data") {
			let obj = { ...res };
			delete obj.etype;
			_this.setState({
				...obj
			});
		} else if (res.etype === "event") {
			let { event, args } = res;
			if (typeof _this[event] === "function") _this[event](...args);
		}
	});
};
// ===========================================
const {
	fileIcon_xlsx,
	fileIcon_pdf,
	fileIcon_txt,
	fileIcon_jpg,
	fileIcon_defaulti
} = imgs;

// 渲染附件图标
const renderImgIcon = item => {
	const { type } = item;
	switch (type) {
		case "xlsx":
			return <img alt={""} src={fileIcon_xlsx} className={"icon"} />;
		case "pdf":
			return <img alt={""} src={fileIcon_pdf} className={"icon"} />;
		case "txt":
			return <img alt={""} src={fileIcon_txt} className={"icon"} />;
		case "png":
			return <img alt={""} src={fileIcon_defaulti} className={"icon"} />;
		case "jpg":
			return <img alt={""} src={fileIcon_jpg} className={"icon"} />;
		case "jpeg":
			return <img alt={""} src={fileIcon_defaulti} className={"icon"} />;
		default:
			return <img alt={""} src={fileIcon_defaulti} className={"icon"} />;
	}
};

export { init, renderImgIcon };
