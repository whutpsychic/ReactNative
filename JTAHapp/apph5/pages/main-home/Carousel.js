import React from "react";
import { Carousel } from "antd-mobile";
import "./Carousel.css";
import util from "../util/index";

class Default extends React.Component {
	state = {
		imgHeight: 200
	};

	componentDidMount() {}

	render() {
		const { data } = this.props;
		return (
			<div className="carousel-container">
				{data instanceof Array && data.length ? (
					<Carousel className="board-carousel" autoplay infinite>
						{data.map((item, index) => {
							return (
								<img
									src={item.src}
									alt="img"
									onClick={() => {
										util.traceBack("img", item.href);
									}}
									onLoad={() => {
										// fire window resize event to change height
										window.dispatchEvent(new Event("resize"));
										this.setState({ imgHeight: "auto" });
									}}
								/>
							);
						})}
					</Carousel>
				) : null}
			</div>
		);
	}
}

export default Default;
