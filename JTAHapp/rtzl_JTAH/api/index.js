import postData from '../core/myFetch2.js';
import config from '../config/index';
import Toast from '../components/Toast/index';

let proxy;
if (config.mode === 'production') {
	proxy = 'http://192.168.0.127:18085';
} else if (config.mode === 'develop') {
	proxy = 'http://192.168.0.127:18085';
}
// 超时设置
const loginTimeout = 2000;
const timeout = 10000;
const commonPrefix = proxy + '/api/consumer/';
const api = {};

// ***************************************************
// 简化一般请求方法
const buildFetcher = (url, data = {}) => {
	const controller = new AbortController();
	let signal = controller.signal;

	const timeoutPromise = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({errcode: 504, errmsg: 'timeout'});
			controller.abort();
		}, timeout);
	});

	const fetchPromise = postData(url, data, signal)
		.then((response) => {
			// return response;
			return response.json();
		})
		.catch((err) => {
			// 超时之后的错误不予以处理
			console.log(err);
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
			return response;
		})
		.catch((err) => {
			// 超时之后的错误不予以处理
			console.log(err);
		});

	return Promise.race([fetchPromise, timeoutPromise]);
};

// main-home
// 获取主数据
api.getHomeMainData = () => {
	return buildFetcher(commonPrefix + 'message/mainList', {ofs: 1, ps: 20});
};

// main-home
// 获取下拉框数据
api.getHomeSelectors = () => {
	return buildFetcher(commonPrefix + 'AqhbEcharts/all');
};

// main-home
// 获取图表数据
api.getMainChart = (conditions) => {
	return buildFetcher(commonPrefix + 'AqhbEcharts/list', conditions);
};

// ecology-repair-info
// 获取生态修复信息主图片列表
api.getEcologyRepairImgs = () => {
	return buildFetcher(commonPrefix + 'institutions/imgUrlList');
};

// ecology-repair-info
// 获取生态修复信息主数据列表
api.getEcologyRepairList = (conditions) => {
	return buildFetcher(commonPrefix + 'Repair/list', conditions);
};

// safe-producting-calendar
// 获取安全生产日历数据
api.getSafeCalendarData = (conditions) => {
	return buildFetcher(commonPrefix + 'AccidentAnalyse/queryByYear', conditions);
};

// fire-control-manage
// 获取主列表数据
api.getFireControlMainData = () => {
	return buildFetcher(commonPrefix + 'institutions/imgUrlList');
};

// fire-control-data-list
// 获取消防资料列表
api.getFireControlDataList = (conditions) => {
	return buildFetcher(commonPrefix + 'firecontrolMain/list', {
		ofs: 0,
		ps: 999,
		...conditions,
	});
};

// news-approval
// 获取审批列表
api.getNewsApprovalList = (conditions) => {
	console.log(conditions);
	return buildFetcher(commonPrefix + 'News/list', {
		ofs: 0,
		ps: 999,
		nodeState: 2,
		...conditions,
	});
};

// news-approval
// 获取机构树形数据
api.getInstitutions = () => {
	return buildFetcher(commonPrefix + 'institutions/department', {});
};

// news-approval
// 点击单条新闻
api.getNewsDetail = (id) => {
	return buildFetcher(commonPrefix + `News/${id}`);
};

// news-approval
// 查看此条的流程
api.viewNewsApprovalProccess = (condtions) => {
	return buildFetcher(commonPrefix + 'FlowInfoRuns/steps', condtions);
};

// news-approval
// 审核通过
api.newsApprovalPass = (condtions) => {
	return buildFetcher(commonPrefix + 'FlowInfoRuns/approve', condtions);
};

// news-approval
// 驳回审核
api.newsApprovalReject = () => {
	return buildFetcher(commonPrefix + 'FlowInfoRuns/reject', condtions);
};

// news-overview
// 查看具体内容
api.viewNewsDetail = (id) => {
	return buildFetcher(commonPrefix + `News/${id}`);
};

export default api;
