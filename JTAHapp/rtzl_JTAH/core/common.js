// 向web端 传出数据
const postMessage = (_this, obj) => {
	if (!obj instanceof Object)
		throw new Error('传入 postMessage 方法的参数不是一个对象');
	_this.refs.webview.postMessage(JSON.stringify(obj));
};

// 向web端 setState
const putupData = (_this, obj) => {
	if (!obj instanceof Object)
		throw new Error('传入 putupData 方法的参数不是一个对象');
	_this.refs.webview.postMessage(JSON.stringify({etype: 'data', ...obj}));
};

// 运行web端 方法
const run = (_this, event, args) => {
	if (!event instanceof String)
		throw new Error('没能给 run 方法传入一个正确的函数名');
	if (args && !args instanceof Array)
		throw new Error('没能给 run 方法传入一组正确的参数组');
	_this.refs.webview.postMessage(JSON.stringify({etype: 'event', event, args}));
};

// RN端接收方法
const preReceive = (event, _this, onReceive) => {
	const receivedData = JSON.parse(event.nativeEvent.data);
	const {etype} = receivedData;
	console.log(receivedData);
	if (typeof onReceive !== 'function') {
		throw new Error('传入preReceive方法中的后备函数不是一个正确的方法');
	}
	onReceive(etype, _this, receivedData);
};

export {postMessage, putupData, run, preReceive};
