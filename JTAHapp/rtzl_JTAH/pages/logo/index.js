import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {initializing, login} from '../../redux/actions.js';

class Default extends React.Component {
	state = {};

	componentDidMount() {
		const {login, initialized} = this.props;
		login(false);
		setTimeout(() => {
			initialized();
		}, 2000);
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
