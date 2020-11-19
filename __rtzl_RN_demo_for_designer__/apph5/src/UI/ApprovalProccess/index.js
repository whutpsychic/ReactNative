import React from "react";
import "./style.css";
import { Steps } from "antd-mobile";
import { Spin } from "antd";
import "antd/es/spin/style/index.css";

const Step = Steps.Step;

// 流程展示组件
export default class extends React.Component {
	state = {
		showProccess: false,
		loading: false
	};
	render() {
		const { showProccess, loading } = this.state;
		const { title, data, renderStepItem } = this.props;
		return showProccess ? (
			<div className="approval-proccess-container">
				<div className="msk" onClick={() => this.hide()} />
				{loading ? (
					<div className="spin-container-outer">
						<div className="spin-container">
							<Spin />
						</div>
					</div>
				) : null}
				<div className="main-container">
					<p>{title}</p>
					<Steps size="small" current={2}>
						{data.map((item, i) => {
							return (
								<Step
									key={`ik${i}`}
									title={<p className="step-title">{item.title}</p>}
									description={renderStepItem(item)}
								/>
							);
						})}
					</Steps>
				</div>
			</div>
		) : null;
	}

	show = () => {
		this.setState({
			showProccess: true
		});
	};

	hide = () => {
		this.setState({
			showProccess: false
		});
	};

	loading = () => {
		this.setState({
			loading: true
		});
	};

	loaded = () => {
		this.setState({
			loading: false
		});
	};
}
