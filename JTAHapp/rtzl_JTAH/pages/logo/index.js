import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {initializing, login} from '../../redux/actions.js';
import myFetch from '../../core/myFetch.js';
import Toast from '../../components/Toast/index';
import storage from '../../core/storage.js';

class Default extends React.Component {
	state = {};

	componentDidMount() {
		const {login, initialized} = this.props;

		setTimeout(() => {
			//如果有记住密码，自动登录
			let p1 = storage.getData('jtah_userName');
			let p2 = storage.getData('jtah_psw');
			let P = Promise.all([p1, p2]).then((resArr) => {
				console.log(resArr);
				if (resArr[0] && resArr[1]) {
					this.login({name: resArr[0], psw: resArr[1], rememberPsw: true}).then(
						() => {
							login(true);
							initialized();
						},
					);
				} else {
					login(false);
					initialized();
				}
			});
		}, 1000);

		// //自动登录超时
		// setTimeout(() => {
		// 	login(false);
		// 	initialized();
		// 	Toast.show('自动登录已超时');
		// }, 10000);
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
					<Text style={styles.logoText}>LOGO</Text>
				</View>
			</React.Fragment>
		);
	}

	login = ({name, psw, rememberPsw}) => {
		const {login} = this.props;
		return myFetch('login', {userName: name, password: psw}, 'post', true)
			.then((res) => {
				console.log(res);
				if (res.errcode) {
					Toast.show(res.errmsg);
					return;
				}

				//记住身份
				if (rememberPsw) {
					storage.setData('jtah_userName', name);
					storage.setData('jtah_psw', psw);
				}

				//登陆成功
				login(true);
				Toast.show('登录成功');
			})
			.catch((err) => {
				console.log(err);
				Toast.show('登录请求发生错误,请稍后再试');
			});
	};
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
	logoText: {
		fontSize: 24,
		color: 'black',
		fontWeight: 'bold',
		textAlign: 'center',
	},
});

export default connect(null, mapDispatchToProps)(Default);
