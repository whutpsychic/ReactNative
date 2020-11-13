const postMessage = (_this, obj) => {
	if (!obj instanceof Object)
		throw new Error('传入 postMessage 方法的参数不是一个对象');
	_this.refs.webview.postMessage(JSON.stringify(obj));
};

const putupData = (_this, obj) => {
	if (!obj instanceof Object)
		throw new Error('传入 putupData 方法的参数不是一个对象');
	_this.refs.webview.postMessage(JSON.stringify({etype: 'data', ...obj}));
};

const run = (_this, event, args) => {
	if (!event instanceof String)
		throw new Error('没能给 run 方法传入一个正确的函数名');
	if (args && !args instanceof Array)
		throw new Error('没能给 run 方法传入一组正确的参数组');
	_this.refs.webview.postMessage(JSON.stringify({etype: 'event', event, args}));
};

export {postMessage, putupData, run};
