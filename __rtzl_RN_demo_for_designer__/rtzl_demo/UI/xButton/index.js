// 废
import React from 'react';
import {View, Text, TouchableWithoutFeedback, Button} from 'react-native';
import styles from './style.js';

class Default extends React.Component {
	render() {
		const {title, disabled} = this.props;
		const {btnContainer, btn} = styles;
		return (
			<View style={btnContainer}>
				<Button style={btn} title={title} onPress={this.onPress}>
					{title}
				</Button>
			</View>
		);
	}

	onPress = () => {
		const {onPress, disabled} = this.props;
		if (disabled) return;
		if (typeof onPress === 'function') onPress();
	};
}

export default Default;
