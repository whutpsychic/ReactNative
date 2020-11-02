import React from "react";
import imgs from "../img/img.js";

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

export { renderImgIcon };
