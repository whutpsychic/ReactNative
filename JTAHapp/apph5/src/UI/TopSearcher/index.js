import React, { Fragment } from "react";
import "./style.css";
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";
import RightDrawer from "../RightDrawer/index";

// 外接组件 RightDrawer 获取数据方法
const getConditions = classInstance => {
	let conditions = {};
	if (classInstance.refs.rd) conditions = classInstance.refs.rd.getConditions;
	return conditions;
};

class Default extends React.Component {
	state = {
		text: ""
	};

	render() {
		const { conditionList, placeholder, noinput } = this.props;
		const moreConditions =
			conditionList instanceof Array && conditionList.length ? true : false;
		const { showDrawer } = this.state;
		return (
			<Fragment>
				<div className={noinput ? "top-searcher noinput" : "top-searcher"}>
					{noinput ? null : (
						<div className="main-input">
							<input
								placeholder={placeholder}
								onChange={e => {
									const { value } = e.target;
									this.setState({ text: value });
								}}
							/>
							<SearchOutlined onClick={() => this.onQuery()} />
						</div>
					)}
					{moreConditions ? (
						<div className="right-screen" onClick={this.onClickScreen}>
							<span>筛选</span>
							<MenuOutlined />
						</div>
					) : null}
				</div>
				{moreConditions ? (
					<RightDrawer
						ref="rd"
						data={conditionList}
						// onChange={this.onChangeConditions}
						onClickConfirmBtn={this.onQuery}
					/>
				) : null}
			</Fragment>
		);
	}

	// 点击查询按钮
	onQuery = conditions => {
		const { onClickQuery } = this.props;
		conditions = conditions ? conditions : getConditions(this);
		if (typeof onClickQuery === "function")
			onClickQuery({ searchText: this.state.text, ...conditions });
	};

	// 点击筛选按钮
	onClickScreen = () => {
		this.refs.rd.show();
		// ------
		const { onClickScreen } = this.props;
		if (typeof onClickScreen === "function") onClickScreen();
	};
}

export default Default;
