import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {Button} from '@ant-design/react-native';

class Default extends React.Component {
	render() {
		const {
			navigation: {navigate},
		} = this.props;
		return (
			<ScrollView style={styles.sv}>
				<View style={styles.container}>
					<Button
						style={{width: '80%', marginVertical: 10}}
						onPress={() => {
							navigate('web_TopTitle');
						}}>
						TopTitle 顶部标题组件
					</Button>
					<Button
						style={{width: '80%', marginVertical: 10}}
						onPress={() => {
							navigate('web_ListView');
						}}>
						ListView 可下滑式列表组件
					</Button>
					<Button
						style={{width: '80%', marginVertical: 10}}
						onPress={() => {
							navigate('web_List');
						}}>
						Form 表单（含各项输入）组件
					</Button>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	sv: {
		flex: 1,
	},
	container: {
		flex: 1,
		height: 800,
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent: 'center',
		alignContent: 'center',
	},
});

export default Default;
