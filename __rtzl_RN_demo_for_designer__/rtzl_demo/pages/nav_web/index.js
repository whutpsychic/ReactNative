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

	componentDidMount() {}

	render() {
		const {
			navigation: {navigate},
		} = this.props;
		return (
			<ScrollView style={styles.sv}>
				<View style={styles.container}>
					<Btn
						title="TopTitle 顶部标题"
						nav="web_TopTitle"
						navigate={navigate}
					/>
					<Btn
						title="ListView 列表组件"
						nav="web_ListView"
						navigate={navigate}
					/>
					<Btn
						title="RightConditions 抽屉筛选组件"
						nav="web_RightConditions"
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
