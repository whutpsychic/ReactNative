const ajax = {};

ajax.query = () => {
	return new Promise((resolve, reject) => {
		const mockData = [];
		for (let i = 0; i < 20; i++) {
			mockData.push({
				img: "https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png",
				title: `Meet hotel${i}`,
				des: `这里是备受组${i}`
			});
		}

		setTimeout(() => {
			resolve(mockData);
		}, 1500);
	});
};

ajax.getMore = () => {
	return new Promise((resolve, reject) => {
		const mockData = [];
		for (let i = 0; i < 17; i++) {
			mockData.push({
				img: "https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png",
				title: `Meet More Data${i}`,
				des: `这里是备受组${i}`
			});
		}

		setTimeout(() => {
			resolve(mockData);
		}, 1500);
	});
};

export default ajax;
