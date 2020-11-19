import React from 'react';
import styles from './style.js';
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import Pdf from 'react-native-pdf';
import backImg from './back.png';

const testUrl = 'http://samples.leanpub.com/thereactnativebook-sample.pdf';

class Default extends React.Component {
	state = {
		showTitle: true,
		isNotFormat: false,
		loadFailed: false,
	};

	componentDidMount() {
		// 默认三秒后隐藏标题
		setTimeout(() => {
			this.setState({
				showTitle: false,
			});
		}, 3000);
	}

	render() {
		const {
			route: {
				params: {url, title},
			},
		} = this.props;

		const {isNotFormat, loadFailed, showTitle} = this.state;

		// ********************
		// 变换是否显示标题
		const ToggleHideTitle = () => {
			console.log(2222222);
			this.setState({
				showTitle: !showTitle,
			});
		};

		// **********************
		const source = {
			uri: url,
			cache: true,
		};

		const {
			container,
			titleContainer,
			titleText,
			backupOuter,
			backup,
			errContainer,
			errText,
		} = styles;

		return (
			<View style={container}>
				{showTitle ? (
					<TouchableWithoutFeedback>
						<View style={titleContainer}>
							<TouchableWithoutFeedback
								onPress={() => this.props.navigation.goBack()}>
								<View style={backupOuter}>
									<Image alt={''} source={backImg} style={backup} />
								</View>
							</TouchableWithoutFeedback>
							<Text style={titleText}>{title}</Text>
						</View>
					</TouchableWithoutFeedback>
				) : null}
				{isNotFormat ? (
					<TouchableWithoutFeedback onPress={ToggleHideTitle}>
						<View style={errContainer}>
							<Text style={errText}>文件格式不正确</Text>
						</View>
					</TouchableWithoutFeedback>
				) : null}
				{loadFailed ? (
					<TouchableWithoutFeedback onPress={ToggleHideTitle}>
						<View style={errContainer}>
							<Text style={errText}>文件加载失败</Text>
						</View>
					</TouchableWithoutFeedback>
				) : null}
				{!isNotFormat && !loadFailed ? (
					<Pdf
						source={source}
						onPageSingleTap={ToggleHideTitle}
						onLoadComplete={(numberOfPages, filePath) => {
							console.log(`number of pages: ${numberOfPages}`);
						}}
						onPageChanged={(page, numberOfPages) => {
							console.log(`current page: ${page}`);
						}}
						// 一般都是格式不符
						onError={(error) => {
							let err = error.toString();
							const isNotFormat =
								err ===
								'Error: cannot create document: File not in PDF format or corrupted.';
							if (isNotFormat) {
								this.setState({
									isNotFormat,
								});
							} else {
								this.setState({
									loadFailed: true,
								});
							}
						}}
						onPressLink={(uri) => {
							console.log(`Link presse: ${uri}`);
						}}
						style={styles.pdf}
					/>
				) : null}
			</View>
		);
	}
}

export default Default;
