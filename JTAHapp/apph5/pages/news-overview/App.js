import React from "react";
import "./App.css";
import util from "../util/index";
import TopTitle from "../components/TopTitle/index";
import PageLoading from "../components/PageLoading/index";
import imgs from "../img/img.js";

const {
	fileIcon_xlsx,
	fileIcon_pdf,
	fileIcon_txt,
	fileIcon_jpg,
	fileIcon_defaulti
} = imgs;

const renderImgIcon = item => {
	const { type } = item;
	switch (type) {
		case "xlsx":
			return <img alt={type} src={fileIcon_xlsx} className={"icon"} />;
		case "pdf":
			return <img alt={type} src={fileIcon_pdf} className={"icon"} />;
		case "txt":
			return <img alt={type} src={fileIcon_txt} className={"icon"} />;
		case "png":
			return <img alt={type} src={fileIcon_defaulti} className={"icon"} />;
		case "jpg":
			return <img alt={type} src={fileIcon_jpg} className={"icon"} />;
		case "jpeg":
			return <img alt={type} src={fileIcon_defaulti} className={"icon"} />;
		default:
			return <img alt={type} src={fileIcon_defaulti} className={"icon"} />;
	}
};

// 空数据
class None extends React.Component {
	render() {
		return (
			<div className="none-container">
				<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJkAAACTCAYAAACdx7vcAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowOTQ5QkNCQkI4QzFFQTExQTU2MEFCNTE2MUVCQkVGQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0QzU0QjU0MkMxQkUxMUVBOUVDM0M4M0I2OTY2NzQ3MiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0QzU0QjU0MUMxQkUxMUVBOUVDM0M4M0I2OTY2NzQ3MiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjEzNDlCQ0JCQjhDMUVBMTFBNTYwQUI1MTYxRUJCRUZCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjA5NDlCQ0JCQjhDMUVBMTFBNTYwQUI1MTYxRUJCRUZCIi8+IDwvcmRmOkRlc2NyaXB0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" />
				<p className="none-text">内容不存在或已经被删除</p>
			</div>
		);
	}
}

class App extends React.Component {
	state = {
		pageLoading: false,
		noContent: true,
		title: "",
		author: "",
		date: "",
		files: []
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

		// setTimeout(() => {
		// 	this.setState(
		// 		{
		// 			noContent: true,
		// 			title: "标题",
		// 			author: "作者",
		// 			date: "2020-07-09 30:80:80",
		// 			files: [
		// 				{
		// 					name: "jfalksd",
		// 					type: "xlsx",
		// 					url: "vnjklshvkjlfdnvl"
		// 				},
		// 				{
		// 					name: "jfalksd",
		// 					type: "txt",
		// 					url: "vnjklshvkjlfdnvl"
		// 				},
		// 				{
		// 					name: "jfalksd",
		// 					type: "png",
		// 					url: "vnjklshvkjlfdnvl"
		// 				},
		// 				{
		// 					name: "jfalksd",
		// 					type: "pdf",
		// 					url: "vnjklshvkjlfdnvl"
		// 				}
		// 			]
		// 		},
		// 		// () => {
		// 		// 	this.loadNews("<p>xxxxxxxxx</p>");
		// 		// }
		// 	);
		// }, 1000);
	}

	render() {
		const { pageLoading, title, author, date, files, noContent } = this.state;
		return (
			<div className="app-container">
				{pageLoading ? <PageLoading /> : null}
				<div className="app-contents">
					<TopTitle title={title} canBack />
					<div className="news-container">
						<p>
							<span>{`作者：${author}`}</span>
							<span>{`时间：${date}`}</span>
						</p>
						{noContent ? (
							<None />
						) : (
							<div ref="content" className="news-contents" />
						)}
						<p>附件</p>
						<ul className="files">
							{files.map((file, i) => {
								return (
									<li>
										{renderImgIcon(file)}
										<span>{`${file.name}${file.type}`}</span>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		);
	}

	loadNews = mainData => {
		if (this.refs.content) this.refs.content.innerHTML = mainData;
	};
}

export default App;
