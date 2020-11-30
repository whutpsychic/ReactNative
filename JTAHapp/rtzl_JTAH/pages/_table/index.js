import React from 'react';
import styles from './style.js';
import {View, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import {preReceive, putupData, run} from '../../core/common.js';
import Orientation from 'react-native-orientation';

import {treeData, tableColumns, tableData, fakeConditionList} from './faker.js';

const pageUri = 'file:///android_asset/h5/monitor-oldata-list2/index.html';

const onReceive = (etype, _this, receivedData) => {
	const {
		navigation,
		navigation: {navigate},
	} = _this.props;
	//初始化完成之后互通消息然后放置数据
	if (etype === 'pageState' && receivedData.info === 'componentDidMount') {
		putupData(_this, {
			conditionList: fakeConditionList(),
			columns: tableColumns(20),
			dataSource: tableData(20, 21),
		});
		run(_this, 'setColumnColor', [1, 5]);
	}
};

class Default extends React.Component {
	state = {};

	componentDidMount() {
		Orientation.lockToLandscape();
	}

	componentWillUnmount() {
		Orientation.lockToPortrait();
	}

	render() {
		const {container} = styles;
		return (
			<View style={container}>
				<WebView
					ref="webview"
					source={{uri: pageUri}}
					onMessage={(e) => preReceive(e, this, onReceive)}
				/>
			</View>
		);
	}
}

export default Default;
