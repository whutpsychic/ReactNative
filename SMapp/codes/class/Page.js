import React from 'react';
import config from '../config.js';
import Toast from '../components/ToastModule/index';

class MyPage extends React.Component {
	constructor() {
		super();
	}

	componentDidMount() {
		const {navigation} = this.props;
		const {logout} = this.props;
		navigation.addListener('focus', () => {
			this.timeoutKey = setTimeout(() => {
				if (typeof logout === 'function') logout();
				Toast.show('因长时间停留此页面，您已登出');
			}, config.pageTimeout);
		});

		navigation.addListener('blur', () => {
			if (this.timeoutKey) {
				clearTimeout(this.timeoutKey);
			}
		});
		if (this.onLoad) this.onLoad();
	}

	componentWillUnmount() {}
}

React.MyPage = MyPage;

export default MyPage;
