import React from 'react';
import {View, Text} from 'react-native';
import {Modal} from '@ant-design/react-native';

class Default extends React.Component {
	state = {
		showConfirm: false,
		tipsContent: '',
		onConfirm: null,
		onClickOffFn: null,
	};

	render() {
		const footerButtons = [
			{
				text: '确认',
				onPress: () => {
					const {onConfirm} = this.state;
					this.setState({showConfirm: false}, () => {
						if (typeof onConfirm === 'function') {
							onConfirm();
						}
					});
				},
			},
			{
				text: '取消',
				onPress: () => {
					const {onClickOffFn} = this.state;
					this.setState({showConfirm: false}, () => {
						if (typeof onClickOffFn === 'function') onClickOffFn();
					});
				},
			},
		];

		return (
			<Modal
				transparent
				onClose={this.onClose}
				visible={this.state.showConfirm}
				footer={footerButtons}>
				<View style={{paddingVertical: 20}}>
					<Text style={{fontSize: 18, textAlign: 'center'}}>
						{this.state.tipsContent}
					</Text>
				</View>
			</Modal>
		);
	}

	show = (text, fn, fn2) => {
		this.setState({
			showConfirm: true,
			tipsContent: text || '',
			onConfirm: fn,
			onClickOffFn: fn2,
		});
	};
}

export default Default;
