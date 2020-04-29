//翻译Web端返回数据
const translate = url => {
	let msg = url.split('#')[1];

	return new Promise((resolve, reject) => {
		if (msg) {
			if (msg === 'componentDidMount') {
				resolve('componentDidMount');
			} else if (msg !== 'componentDidMount') {
				let obj = JSON.parse(msg);
				resolve(obj);
			} else {
				reject('未知错误');
			}
		} else {
			reject('nodata');
		}
	});
};

export {translate};
