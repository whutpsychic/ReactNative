import React from "react";
import "./index.css";

export default class extends React.Component {
	render() {
		const { title, data = [], onClick } = this.props;
		return (
			<div className="board-info-container">
				<p className="board-info-title">{title}</p>
				{data.map((item, i) => {
					return (
						<p key={`text${i}`} onClick={() => onClick(item)}>
							<span>{item.text}</span>
							<span>{item.date}</span>
						</p>
					);
				})}
			</div>
		);
	}
}
