import ReactDOM from "react-dom";
import React from "react";
import "./index.css";

import { PullToRefresh } from "antd-mobile";

class Default extends React.Component {
	state = {
		refreshing: false,
		height: document.documentElement.clientHeight
	};

	componentDidMount() {
		const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
		setTimeout(
			() =>
				this.setState({
					height: hei
				}),
			0
		);
	}

	render() {
		const { renderItem, data = [], onRefresh } = this.props;
		if (typeof renderItem !== "function") {
			console.alert("renderItem应该是一个函数");
			return null;
		}
		return (
			<div className="rt-zlist-container">
				<PullToRefresh
					damping={60}
					distanceToRefresh={40}
					ref={el => (this.ptr = el)}
					style={{
						height: this.state.height,
						overflow: "auto"
					}}
					direction={"down"}
					refreshing={this.state.refreshing}
					onRefresh={() => {
						this.setState({ refreshing: true });
						if (typeof onRefresh === "function") {
							onRefresh().then(() => {
								this.endRefresh();
							});
						}
					}}
				>
					{data.map((item, i) => {
						return renderItem(item, i);
					})}
				</PullToRefresh>
			</div>
		);
	}

	endRefresh = () => {
		this.setState({ refreshing: false });
	};
}

export default Default;
