import {Dimensions} from 'react-native';

const tool = {};

tool.excuteTimeNumber = (t) => {
	t = typeof t === 'string' ? parseInt(t, 10) : t;
	return t < 10 ? '0' + t : t.toString();
};

// 将时间戳转化为日月年
tool.transDate = (str) => {
	// if (typeof str === 'string') str = parseInt(str, 10);

	let _Date = new Date(str);

	let year = _Date.getFullYear();
	let month = _Date.getMonth() + 1;
	let date = _Date.getDate();

	month = tool.excuteTimeNumber(month);
	date = tool.excuteTimeNumber(date);

	let _str = year + '-' + month + '-' + date;
	return _str;
};

// 深度克隆
tool.deepClone = (obj) => {
	if (!obj || typeof obj !== 'object') {
		return obj;
	}
	let newObj = {};
	if (Array.isArray(obj)) {
		newObj = obj.map((item) => tool.deepClone(item));
	} else {
		Object.keys(obj).forEach((key) => {
			return (newObj[key] = tool.deepClone(obj[key]));
		});
	}
	return newObj;
};

export default tool;
