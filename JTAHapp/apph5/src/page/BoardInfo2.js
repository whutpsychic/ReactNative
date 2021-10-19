import React from "react";
import "./BoardInfo2.css";

export default class extends React.Component {
	render() {
		const { title, data = [] } = this.props;
		return (
			<div className="board-info2-container">
				<p className="board-info2-title">{title}</p>
				<div className="board-info2-contents">
					{data.map((item, i) => {
						return (
							<div key={`text${i}`}>
								<span>{item.text}</span>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}
