import React from 'react';
import {View, Text, StatusBar, Image} from 'react-native';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {initializing, login} from '../../redux/actions.js';
import Toast from '../../components/Toast/index';
import storage from '../../core/storage.js';
import api from '../../api/index.js';
import config from '../../config.js';
import logo from './logo.png';

class Default extends React.Component {
	state = {};

	componentDidMount() {
		const {login, initialized} = this.props;

		if (config.mode === 'develop') {
			login(true);
			initialized();
			return;
		}

		//如果有记住密码，自动登录
		let p1 = storage.getData('jtah_userName');
		let p2 = storage.getData('jtah_psw');
		let P = Promise.all([p1, p2]).then((resArr) => {
			// 如果有记住用户名和密码
			if (resArr[0] && resArr[1]) {
				api.login(resArr[0], resArr[1]).then((res) => {
					const {errcode, data} = res;
					//成功
					if (!errcode && data) {
						login(true);
						initialized();
						Toast.show('登录成功');
						return;
					}
					// 超时
					// else if (!ok && status === 504) {
					// 	login(false);
					// 	initialized();
					// 	Toast.show('登录超时，请稍后重试');
					// 	return;
					// }

					// 错误
					else {
						login(false);
						initialized();
						Toast.show('登录错误');
						return;
					}
				});
			} else {
				login(false);
				initialized();
			}
		});
	}

	render() {
		return (
			<React.Fragment>
				<StatusBar
					hidden={true}
					backgroundColor={'transparent'}
					translucent={true}
				/>
				<View style={styles.container}>
					{/*<Text style={styles.logoText}>LOGO</Text>*/}
					<Image alt="" source={logo} style={styles.logoImage} />
				</View>
			</React.Fragment>
		);
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		login: (bool) => {
			dispatch(login(bool));
		},
		initialized: () => {
			dispatch(initializing(false));
		},
	};
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	logoImage: {
		height: '100%',
		resizeMode: 'contain',
	},
});

export default connect(null, mapDispatchToProps)(Default);
