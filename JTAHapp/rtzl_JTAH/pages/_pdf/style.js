import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

const vw = Dimensions.get('window').width / 100;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: 50,
		backgroundColor: 'rgba(0,0,0,.3)',
		zIndex: 9,
	},
	titleText: {
		width: 100 * vw - 100,
		fontSize: 18,
		color: '#233',
		textAlign: 'center',
	},
	backupOuter: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: 40,
		height: 40,
		position: 'absolute',
		top: 5,
		left: 5,
	},
	backup: {
		width: 20,
		height: 20,
	},
	errContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
	},
	errText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#233',
		textAlign: 'center',
	},
	pdf: {
		flex: 1,
		width: '100%',
		height: '100%',
	},
});

export default styles;
