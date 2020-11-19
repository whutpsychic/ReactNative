import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import Toast from '../../components/Toast';
import {putupData, run} from '../../core/common.js';

const pageUri = 'file:///android_asset/h5/top-title/index.html';

class Default extends React.Component {
	state = {};

	componentDidMount() {}

	render() {
		return (
			<View style={styles.container}>
				<WebView
					ref="webview"
					source={{uri: pageUri}}
					onMessage={this.onReceive}
				/>
			</View>
		);
	}

	onReceive = (event) => {
		const {
			navigation,
			navigation: {navigate},
		} = this.props;
		const receivedData = JSON.parse(event.nativeEvent.data);
		const {etype} = receivedData;
		console.log(receivedData);
		//初始化完成之后互通消息然后放置数据
		if (etype === 'pageState' && receivedData.info === 'componentDidMount') {
		}
		// 默认后退到上一页
		else if (etype === 'back-btn') {
			navigation.goBack();
		}
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default Default;
