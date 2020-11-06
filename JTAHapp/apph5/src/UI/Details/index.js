import React from "react";
import "./style.css";
import util from "../../util/index";
// import { Spin } from "antd";
// import "antd/es/spin/style/index.css";
import { renderImgIcon } from "../../common/index";

// 细节展示
export default class extends React.Component {
	state = {
		showDetail: false
	};

	render() {
		const { showDetail } = this.state;
		const { title, data, extra } = this.props;
		const { files, fieldContents } = data;

		const calcCls = x => {
			let clsArr = [];
			if (x) clsArr.push("multi-lines");

			return clsArr.join(" ");
		};

		return showDetail ? (
			<div className="detail-container">
				<div className="msk" onClick={() => this.hide()} />
				<div className="main-container">
					<p className="detail-title">{title}</p>
					<ul>
						{fieldContents instanceof Array && fieldContents.length > 0
							? fieldContents.map((item, i) => {
									const { multiLines, label, content } = item;
									return (
										<li key={`i${i}`} className={calcCls(multiLines)}>
											<label>{label}</label>
											<span>{item["content"]}</span>
										</li>
									);
							  })
							: null}
						{files instanceof Array && (
							<li className="multi-lines">
								<label>附件</label>
								<ul className="files">
									{files.map((item, i) => {
										return (
											<li
												key={`ik${i}`}
												onClick={() => {
													util.traceBack("onClickFileItem", item);
												}}
											>
												{renderImgIcon(item)}
												<span>{`${item.title}`}</span>
											</li>
										);
									})}
								</ul>
							</li>
						)}
					</ul>
					{extra && typeof extra === "function" ? extra() : null}
				</div>
			</div>
		) : null;
	}

	show = () => {
		this.setState({
			showDetail: true
		});
	};

	hide = () => {
		this.setState({
			showDetail: false
		});
	};
}
