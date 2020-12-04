// *****************************************
// * 原始参考文档:https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
// * 一个基于 fetch 的二次封装文件，开箱即用
// * 默认可以跨域访问
// *
// *
// *
// * 作者:zbc
// * 上一次维护时间:2020-10-12
// *****************************************

// 参数全部序列化后缀到 url 后面
const serializeUrl = (url, data) => {
	// url=url+
	const _str = JSON.stringify(data)
		.replace(/{/g, ``)
		.replace(/}/g, ``)
		.replace(/"/g, ``)
		.replace(/,/g, `&`)
		.replace(/:/g, `=`);
	url += '?' + _str;
	return url;
};

// 发送请求前整理发送前的数据
const arrangePoster = (url, data, signal = {}, type = 'GET') => {
	const obj = {};
	// 先判断 type
	// 如果是 get 类型，采用 url 后缀拼接的模式
	// 如果是 post 类型，采用 body 拼接的模式
	type = type.toUpperCase();
	obj.type = type;
	//超时判断符
	obj.signal = signal;

	switch (type) {
		case 'GET':
			obj.url = serializeUrl(url, data);
			obj.data = undefined;
			break;
		default:
			obj.url = url;
			obj.data = data;
			break;
	}

	return obj;
};

// url:地址
// type:get/post/put/delete
// data:body
const fetcher = (a, b, c, d) => {
	let obj = arrangePoster(a, b, c, d);
	const {url, data, type, signal} = obj;
	const condition = {
		method: type, // *GET, POST, PUT, DELETE, etc.
		headers: {
			'content-type': 'application/json',
		},
		body: type === 'GET' ? undefined : JSON.stringify(data), // must match 'Content-Type' header
		signal,
		cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'include', // include, same-origin, *omit
		// mode: 'cors', // no-cors, cors, *same-origin
		// redirect: 'follow', // manual, *follow, error
		// referrer: 'no-referrer', // *client, no-referrer
	};
	console.log(obj);
	console.log(condition);

	return fetch(url, condition);
};

export default fetcher;
