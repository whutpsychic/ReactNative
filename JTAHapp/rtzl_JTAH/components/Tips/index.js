import React from 'react';
import {View, Text} from 'react-native';
import {Modal} from '@ant-design/react-native';

class Default extends React.Component {
	state = {
		showTips: false,
		tipsContent: '',
		onClickOffFn: null,
		noBtns: false,
	};

	render() {
		const {noBtns} = this.state;

		const footerButtons = [
			{
				text: '好的',
				onPress: () => {
					const {onClickOffFn} = this.state;
					this.setState({showTips: false}, () => {
						if (typeof onClickOffFn === 'function') onClickOffFn();
					});
				},
			},
		];

		return (
			<Modal
				transparent
				onClose={this.onClose}
				visible={this.state.showTips}
				footer={noBtns ? null : footerButtons}>
				<View style={{paddingVertical: 20}}>
					<Text style={{fontSize: 18, textAlign: 'center'}}>
						{this.state.tipsContent}
					</Text>
				</View>
			</Modal>
		);
	}

	show = (text, fn) => {
		this.setState({
			showTips: true,
			tipsContent: text || '',
			onClickOffFn: fn,
		});
	};

	modal = text => {
		this.setState({
			showTips: true,
			noBtns: true,
			tipsContent: text || '',
		});
	};

	hide = () => {
		this.setState({
			showTips: false,
			noBtns: false,
		});
	};
}

export default Default;
