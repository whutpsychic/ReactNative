import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import Pdf from 'react-native-pdf';

class Default extends React.Component {
	state = {};

	componentDidMount() {}

	render() {
		const source = {
			uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
			cache: true,
		};
		return (
			<View style={styles.container}>
				<Pdf
					source={source}
					onLoadComplete={(numberOfPages, filePath) => {
						console.log(`number of pages: ${numberOfPages}`);
					}}
					onPageChanged={(page, numberOfPages) => {
						console.log(`current page: ${page}`);
					}}
					onError={(error) => {
						console.log(error);
					}}
					onPressLink={(uri) => {
						console.log(`Link presse: ${uri}`);
					}}
					style={styles.pdf}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	pdf: {
		flex: 1,
		width: '100%',
		height: '100%',
	},
});

export default Default;
