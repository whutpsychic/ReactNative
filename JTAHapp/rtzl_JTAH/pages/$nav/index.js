import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {Button} from '@ant-design/react-native';

class Btn extends React.Component {
	render() {
		const {title, disabled} = this.props;
		return (
			<Button style={styles.btn} onPress={this.clickBtn} disabled={disabled}>
				{title}
			</Button>
		);
	}

	clickBtn = () => {
		const {nav, navigate} = this.props;
		navigate(nav);
	};
}

class Default extends React.Component {
	state = {};

	componentDidMount() {
		const {
			navigation: {navigate},
		} = this.props;
		navigate('main');
	}

	render() {
		const {
			navigation: {navigate},
		} = this.props;
		return (
			<ScrollView style={styles.sv}>
				<View style={styles.container}>
					<Btn title="主页" nav="main" navigate={navigate} />
					<Btn
						title="安全环保目标统计"
						nav="safe_env_target_statistic"
						navigate={navigate}
					/>
					<Btn title="新闻审批" nav="news_approval" navigate={navigate} />
					<Btn
						title="安全环保信息发布"
						nav="safe_env_info_publish"
						navigate={navigate}
						disabled
					/>
					<Btn
						title="安环信息发布-新增"
						nav="safe_env_info_publish_adding"
						navigate={navigate}
						disabled
					/>
					<Btn
						title="安全生产日历"
						nav="safe_producing_calendar"
						navigate={navigate}
					/>
					<Btn
						title="德铜环保报表浏览"
						nav="dt_environment_protection_reports_list"
						navigate={navigate}
					/>
					<Btn
						title="江铜生态修复信息"
						nav="ecology_repair_info"
						navigate={navigate}
					/>
					<Btn
						title="江铜消防管理"
						nav="fire_control_manage"
						navigate={navigate}
					/>
					<Btn
						title="隐患排查浏览与反馈"
						nav="danger_screening_administer"
						navigate={navigate}
					/>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	sv: {
		flex: 1,
		height: 400,
	},
	container: {
		flex: 1,
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	btn: {
		fontSize: 18,
		color: '#fff',
		textAlign: 'center',
		width: 240,
		height: 30,
		lineHeight: 26,
		marginTop: 16,
	},
});

export default Default;
