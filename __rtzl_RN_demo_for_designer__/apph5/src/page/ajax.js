const ajax = {};

ajax.data = () => {
	const L = 10;
	const arr = [];
	for (let i = 0; i < L; i++) {
		arr.unshift({
			name: `文件名test${i}`,
			person: `admin`,
			date: `2020-06-${i + 10}`,
			remarks: `一些很有趣很有趣很有趣很有趣很有趣很有趣很有趣很有趣很有趣很有趣的备注内容`
		});
	}
	console.log(arr);
	return arr;
};

ajax.reData = () => {
	const L = 10;
	const arr = [];
	for (let i = 0; i < L; i++) {
		arr.unshift({
			name: `文件名ttest${i}`,
			person: `admin`,
			date: `2020-07-${i + 10}`,
			remarks: `一些很有趣很有趣很有趣很有趣很有趣很有趣很有趣很有趣很有趣很有趣的备注内容`
		});
	}
	return arr;
};

ajax.moreData = () => {
	const L = 3;
	const arr = [];
	for (let i = 0; i < L; i++) {
		arr.push({
			name: `文件名test${i + 10}`,
			person: `admin`,
			date: `2020-08-${i + 20}`,
			remarks: `一些很有趣很有趣很有趣很有趣很有趣很有趣很有趣很有趣很有趣很有趣的备注内容`
		});
	}
	return arr;
};

export default ajax;
