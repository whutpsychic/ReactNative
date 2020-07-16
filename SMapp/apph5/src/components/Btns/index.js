import React from "react";
import "./style.css";

import btn1 from "./btn1.png";
import btn2 from "./btn2.png";
import btn3 from "./btn3.png";
import btn4 from "./btn4.png";
import btn5 from "./btn5.png";
import btn6 from "./btn6.png";
import btn7 from "./btn7.png";

class Btn extends React.Component {
	render() {
		const { title, type } = this.props;
		return (
			<div className="btn" onClick={this.onClick}>
				<img alt="tp" src={this.filterImg(type)} />
				<p>{title}</p>
			</div>
		);
	}

	onClick = () => {
		const { onPress } = this.props;
		if (typeof onPress === "function") {
			onPress();
		}
	};

	filterImg = type => {
		switch (type) {
			case "btn1":
				return btn1;
			case "btn2":
				return btn2;
			case "btn3":
				return btn3;
			case "btn4":
				return btn4;
			case "btn5":
				return btn5;
			case "btn7":
				return btn7;
			case "btn6":
				return btn6;
			default:
				return btn2;
		}
	};
}

class Default extends React.Component {
	render() {
		const { children, suffix } = this.props;
		return <div className={suffix ? "btns suffix" : "btns"}>{children}</div>;
	}
}

Default.Btn = Btn;

export default Default;
