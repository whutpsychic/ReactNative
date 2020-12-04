import postData from '../core/myFetch.js';
import config from '../config/index';
import Toast from '../components/Toast/index';
import mockData from './mockData.js';

// main-query
const {mainQueryData} = mockData;
// =================================================
const productionUrl = 'http://10.99.189.116';
const productionPort = '18085';
const developUrl = 'http://10.99.189.116';
const developPort = '18085';

let proxy;
// 打包产品
const {mode} = config;
if (mode === 'production') {
	proxy = `${productionUrl}:${productionPort}`;
}
// 开发模式时
else if (mode === 'develop') {
	proxy = `${developUrl}:${developPort}`;
}

// 超时设置
const loginTimeout = 2000;
const timeout = 10000;
const commonPrefix = proxy + '/api/consumer/';
const api = {};

// ***************************************************
// 简化一般请求方法
const buildFetcher = (url, data = {}, type) => {
	const controller = new AbortController();
	let signal = controller.signal;

	const timeoutPromise = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({errcode: 504, errmsg: 'timeout'});
			controller.abort();
		}, timeout);
	});

	const fetchPromise = postData(url, data, signal, type)
		.then((response) => {
			// return response;
			return response.json();
		})
		.catch((err) => {
			// 超时之后的错误不予以处理
			console.log(err);
			return {errcode: 256, errmsg: 'failed'};
		});

	return Promise.race([fetchPromise, timeoutPromise]);
};

// ***************************************************
// =============================================================

// 登录
// 返回:
// response(成功)/err(错误)/undefined(超时)
api.login = (userName, password) => {
	const controller = new AbortController();
	let signal = controller.signal;

	const timeoutPromise = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(new Response('timeout', {status: 504, statusText: 'timeout'}));
			controller.abort();
		}, loginTimeout);
	});

	const fetchPromise = postData(
		proxy + '/login',
		{userName, password},
		signal,
		'post',
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			// 超时之后的错误不予以处理
			console.log(err);
		});

	return Promise.race([fetchPromise, timeoutPromise]);
};

// ==========================公用接口================================
// ==========================页面接口================================

export default api;
