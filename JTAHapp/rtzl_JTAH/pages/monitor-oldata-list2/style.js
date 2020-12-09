import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

const vw = Dimensions.get('window').width / 100;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default styles;
