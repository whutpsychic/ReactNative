import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {initializing} from '../../redux/actions.js';
import config from '../../config.js';

const {mode} = config;

class Default extends React.Component {
	state = {};

	componentDidMount() {
		const {initialized} = this.props;
		if (mode === 'production') {
			setTimeout(() => {
				initialized();
			}, 2000);
			return;
		} else if (mode === 'develop') {
			initialized();
		}
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
}

const mapDispatchToProps = (dispatch, props) => {
	return {
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
