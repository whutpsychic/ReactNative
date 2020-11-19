import config from '../config/index';

const styles = {
	menuIcon: {
		width: 28,
		height: 28,
	},
	menuLabel: {
		fontSize: 12,
		fontWeight: 'bold',
	},
	menuBadge: {
		width: 18,
		height: 18,
		position: 'absolute',
		top: 0,
		right: -9,
		borderRadius: 8,
		backgroundColor: 'red',
		zIndex: 2,
	},
	menuBadgeText: {
		fontSize: 12,
		color: '#fff',
		textAlign: 'center',
		alignItems: 'center',
	},
	menuTabActiveTintColor: config.bottomTabTintColor,
	menuTabActiveBackgroundColor: '#fff',
};

export default styles;
