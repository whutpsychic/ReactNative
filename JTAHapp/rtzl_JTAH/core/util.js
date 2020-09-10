import {Dimensions} from 'react-native';

const tool = {};

//获取相对于屏幕的偏差高度
tool.getHeight = (x) => {
	const {height} = Dimensions.get('window');
	return height + x;
};

//获取相对于屏幕的偏差宽度
tool.getWidth = (x) => {
	const {width} = Dimensions.get('window');
	return width + x;
};

tool.getWidthbyPercent = (x) => {
	if (typeof x !== 'number') {
		throw new Error('getWidthbyPercent 方法中x不是一个数字');
	}

	const {width} = Dimensions.get('window');
	return width * x;
};

tool.calcHeight = (per, num) => {
	if (typeof per !== 'number' || typeof num !== 'number') {
		throw new Error('getWidthbyPercent 方法中 per 或 num 不是一个数字');
	}
	const {height} = Dimensions.get('window');
	return height * per + num;
};

tool.excuteTimeNumber = (t) => {
	t = typeof t === 'string' ? parseInt(t, 10) : t;
	return t < 10 ? '0' + t : t.toString();
};

//第二个参数标识：两边是否有空格
tool.renderTime = (seconds, bool) => {
	if (typeof seconds !== 'number') {
		return '未知时长';
	}

	const _lj = bool ? ':' : ' : ';
	const _h = parseInt(seconds / 3600, 10);
	let _t = seconds - _h * 3600;
	const _m = parseInt(_t / 60, 10);
	_t = _t - _m * 60;

	const str =
		tool.excuteTimeNumber(_h) +
		_lj +
		tool.excuteTimeNumber(_m) +
		_lj +
		tool.excuteTimeNumber(_t);
	return str;
};

//显示共有几小时几分钟几秒钟
tool.calcTime = (seconds) => {
	const _h = parseInt(seconds / 3600, 10);
	let _t = seconds - _h * 3600;
	const _m = parseInt(_t / 60, 10);
	_t = _t - _m * 60;

	let _str = '';
	if (_h) _str += _h + '小时';
	if (_m) _str += _m + '分钟';
	if (_t) _str += _h + '秒';
	return _str;
};

//剔除掉关于视频当中.mp4等名称后缀
tool.calcRealVideoName = (str) => {
	const arr = ['.mp4', '.avi', '.ogg'];

	let _str = str;
	arr.map((item) => {
		let _reg = new RegExp(item + '$');
		_str = _str.replace(_reg, '');
	});
	return _str;
};

//将时间戳转化为日月年
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

//将大段文字最多限制在15个字以内
tool.reString = (str) => {
	if (str.length > 15) {
		let arr = str.split('');
		arr.length = 15;
		arr.push('...');
		return arr.join('');
	} else {
		return str;
	}
};

//计算某一月的最后一天
tool.getEndDate = (year, month) => {
	month = typeof month === 'string' ? month : month.toString();

	let endDate;

	switch (month) {
		case '1':
		case '3':
		case '5':
		case '7':
		case '8':
		case '10':
		case '12':
			endDate = 31;
			break;
		case '4':
		case '6':
		case '9':
		case '11':
			endDate = 30;
			break;
		default:
			break;
	}

	if (month == '2') {
		let _year = typeof year === 'string' ? parseInt(year, 10) : year;
		if (!(_year % 400)) {
			endDate = 29;
		} else if (!(_year % 4)) {
			endDate = 29;
		} else {
			endDate = 28;
		}
	}

	return endDate;
};

//
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
