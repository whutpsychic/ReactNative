import React from "react";
import "./App.css";

import logo from "../img/logo.png";
import rmbpsw_un from "../img/rmbpsw_un.png";
import rmbpsw from "../img/rmbpsw.png";

import util from "../util/index";

class App extends React.Component {
	state = {
		name: "",
		psw: "",
		rememberPsw: false
	};

	render() {
		const { name, psw, rememberPsw } = this.state;
		return (
			<div className="app-container">
				<div className="app-contents">
					{/*<img alt="bg" src={bg} className="bg" />*/}
					<div className="main">
						<img alt="logo" src={logo} className="logo" />
						<p>江西铜业集团有限公司</p>
						<div className="form-outer">
							<div className="form">
								<p>安全环保管理系统</p>
								<ul>
									<li>
										<label>账号</label>
										<input
											value={name}
											onChange={e => {
												let v = e.target.value;
												this.setState({
													name: v
												});
											}}
										/>
									</li>
									<li>
										<label>密码</label>
										<input
											type="password"
											value={psw}
											onChange={e => {
												let v = e.target.value;
												this.setState({
													psw: v
												});
											}}
										/>
									</li>
									<li onClick={this.toggleRmbPsw}>
										<label></label>
										<div>
											<img
												alt="block"
												src={rememberPsw ? rmbpsw : rmbpsw_un}
												className="rmbpsw"
											/>
											<span>记住密码</span>
										</div>
									</li>
								</ul>
								<div className="loginBtn" onClick={this.onClickBtn} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	toggleRmbPsw = () => {
		this.setState({
			rememberPsw: !this.state.rememberPsw
		});
	};

	onClickBtn = () => {
		const { name, psw, rememberPsw } = this.state;
		util.traceBack("login", {
			name,
			psw,
			rememberPsw
		});
	};
}

export default App;
