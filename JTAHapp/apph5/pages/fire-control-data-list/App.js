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

class Detail extends React.Component {
	state = {
		showDetail: false
	};

	render() {
		const { showDetail } = this.state;
		const { data = {} } = this.props;
		const { unit, name, type, person, date, remarks, files } = data;
		return showDetail ? (
			<div className="detail-container">
				<div className="msk" onClick={this.onClickMsk} />
				<div className="main-container">
					<p className="detail-title">{name}</p>
					<ul>
						<li>
							<label>{`隶属单位`}</label>
							<span>{unit}</span>
						</li>
						<li>
							<label>{`资料类别`}</label>
							<span>{type}</span>
						</li>
						<li>
							<label>{`上传人`}</label>
							<span>{person}</span>
						</li>
						<li>
							<label>{`上传时间`}</label>
							<span>{date}</span>
						</li>
						<li>
							<label>{`备注`}</label>
						</li>
						<li className="multi-lines">
							<p>{remarks}</p>
						</li>
						<li>
							<label>{`附件`}</label>
						</li>
						<li className="multi-lines">
							<ul className="files">
								{files.map((item, i) => {
									return (
										<li key={`ik${i}`}>
											{this.renderImgIcon(item)}
											<span>{`${item.title}.${item.type}`}</span>
										</li>
									);
								})}
							</ul>
						</li>
					</ul>
				</div>
			</div>
		) : null;
	}

	show = () => {
		this.setState({
			showDetail: true
		});
	};

	onClickMsk = () => {
		const { showDetail } = this.state;
		this.setState({
			showDetail: false
		});
	};

	renderImgIcon = item => {
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
}

class ListItem extends React.Component {
	render() {
		const {
			item,
			item: { unit, name, type, person, date, remarks }
		} = this.props;
		return (
			<li className="list-item" onClick={() => this.onClickItem(item)}>
				<div className="list-item-line1">
					<p className="title">{name}</p>
					<span className="typer">{type}</span>
				</div>
				<p className="remarks">{`${remarks}`}</p>
				<div className="spliter" />
				<div className="list-item-bottom-line">
					<span className="person">{`上传人：${person}`}</span>
					<span className="dater">{`上传时间：${date}`}</span>
				</div>
			</li>
		);
	}

	onClickItem = item => {
		const { onClick, index } = this.props;
		if (typeof onClick === "function") onClick(index);
	};
}

class App extends React.Component {
	state = {
		pageLoading: false,
		index: 0,
		mainData: [],
		unit: ""
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
		// 			name: "资料名称资料名称",
		// 			unit: "德兴铜矿",
		// 			type: "资料类别",
		// 			person: "admin",
		// 			date: "2020-10-10",
		// 			remarks:
		// 				"备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注",
		// 			files: [
		// 				{
		// 					type: "xlsx",
		// 					title: "假数据名称"
		// 				},
		// 				{
		// 					type: "pdf",
		// 					title: "假数据名称"
		// 				},
		// 				{
		// 					type: "txt",
		// 					title: "假数据名称"
		// 				},
		// 				{
		// 					type: "png",
		// 					title: "假数据名称"
		// 				}
		// 			]
		// 		}
		// 	]
		// });
	}

	render() {
		const { mainData, pageLoading, index, unit } = this.state;
		return (
			<div className="app-container">
				{pageLoading ? <PageLoading /> : null}
				{<Detail ref="detail" data={mainData[index]} />}
				<div className="app-contents">
					<TopTitle title={`消防资料 - ${unit}`} canBack />
					<ul className="main-list">
						{mainData.map((item, i) => {
							return (
								<ListItem
									key={`item${i}`}
									index={i}
									item={item}
									onClick={this.onClickItem}
								/>
							);
						})}
					</ul>
				</div>
			</div>
		);
	}

	onClickItem = index => {
		this.refs.detail.show();
		this.setState({
			index
		});
	};
}

export default App;
