import postData from '../core/myFetch2.js';
import config from '../config/index';
import Toast from '../components/Toast/index';
import mockData from './mockData.js';

// main-query
const {mainQueryData} = mockData;
// =================================================
const xcUrl = 'http://10.99.189.116';
const xcPort = '18085';
const gsUrl = 'http://192.168.0.123';
const gsPort = '18085';

let proxy;
// 打包产品
const {mode, inposition} = config;
if (mode === 'production') {
	proxy = `${xcUrl}:${xcPort}`;
}
// 开发模式时
else if (mode === 'develop') {
	// 如果在公司
	if (inposition) proxy = `${gsUrl}:${gsPort}`;
	// 其他情况均视为在现场
	else {
		proxy = `${xcUrl}:${xcPort}`;
	}
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
// 获取机构树形数据
api.getInstitutionsDepartment = () => {
	return buildFetcher(commonPrefix + 'institutions/department', {}).then(
		(res) => {
			const {errcode, errmsg, data} = res;
			// 超时
			if (errcode === 504) {
				Toast.show(`机构数据查询超时！`);
				return;
			}
			// 默认成功
			else if (!errcode) {
				// 没数据
				if (!data || !(data instanceof Object)) {
					Toast.show('查询机构竟没有任何数据！');
					return;
				}
				// 有数据
				else {
					return [data];
				}
			}
			// 失败
			else {
				Toast.show(`机构数据查询失败,原因：${errmsg}`);
				return;
			}
		},
	);
};

// 获取单位树形数据(一维)
// 强制全可以选择
api.getInstitutionRoleItems = () => {
	return buildFetcher(commonPrefix + 'users/institutionRoleTree', {}).then(
		(res) => {
			console.log(res);
			const {errcode, errmsg, data} = res;
			// 超时
			if (errcode === 504) {
				Toast.show(`单位数据查询超时！`);
				return;
			}
			// 默认成功
			else if (!errcode) {
				// 没数据
				if (!data || !(data instanceof Array) || !data.length) {
					Toast.show('查询单位竟没有任何数据！');
					return;
				}
				// 有数据
				else {
					const _childs = data[0].children
						.filter((item) => {
							return item.sort;
						})
						.map((item) => {
							item.title = item.label;
							item.key = item.value;
							item.children = [];
							item.selectable = true;
							return item;
						});
					data[0].children = _childs;
					data[0].title = data[0].label;
					data[0].key = data[0].value;
					data[0].selectable = true;
					return data;
				}
			}
			// 失败
			else {
				Toast.show(`单位数据查询失败,原因：${errmsg}`);
				return;
			}
		},
	);
};

// 获取机构图片列表数据
api.getImgUrlList = () => {
	return buildFetcher(commonPrefix + 'institutions/imgUrlList');
};

// 查询某单位名下有多少水库
api.getReservoirsByUnit = (condition = {}) => {
	const {id = '390090725934497792', date = '2100-01-01'} = condition;
	return buildFetcher(commonPrefix + 'keyAreas/recordDayList', {
		institutionId: id,
		date,
	}).then((res) => {
		const {errcode, errmsg, data} = res;
		// 超时
		if (errcode === 504) {
			Toast.show(`水库数量查询超时！`);
			return;
		}
		// 默认成功
		else if (!errcode) {
			// 没数据
			if (
				!data ||
				!(data instanceof Object) ||
				!data.list instanceof Array ||
				!data.list.length
			) {
				Toast.show('查询水库竟没有任何数据！');
				return;
			}
			// 有数据
			else {
				return data.list;
			}
		}
		// 失败
		else {
			Toast.show(`水库数据查询失败,原因：${errmsg}`);
			return;
		}
	});
};

// 查询某单位名下有多少监测点
api.getMonitorPointByUnit = (condition = {}) => {
	const {id = '390090725934497792', date = '2100-01-01'} = condition;
	return buildFetcher(commonPrefix + 'rain/recordDayList', {
		institutionId: id,
		date,
	}).then((res) => {
		const {errcode, errmsg, data} = res;
		// 超时
		if (errcode === 504) {
			Toast.show(`监测点查询超时！`);
			return;
		}
		// 默认成功
		else if (!errcode) {
			// 没数据
			if (
				!data ||
				!(data instanceof Object) ||
				!data.list instanceof Array ||
				!data.list.length
			) {
				Toast.show('查询监测点竟没有任何数据！');
				return;
			}
			// 有数据
			else {
				return data.list;
			}
		}
		// 失败
		else {
			Toast.show(`监测点查询失败,原因：${errmsg}`);
			return;
		}
	});
};

// 查询某单位名下有几个废水厂
api.getWasteWaterWorkShop = (condition = {}) => {
	const {id = '390090725934497792', date = '2100-01-01'} = condition;
	return buildFetcher(commonPrefix + 'waste/recordDayList', {
		institutionId: id,
		date,
	}).then((res) => {
		const {errcode, errmsg, data} = res;
		// 超时
		if (errcode === 504) {
			Toast.show(`废水厂查询超时！`);
			return;
		}
		// 默认成功
		else if (!errcode) {
			// 没数据
			if (
				!data ||
				!(data instanceof Object) ||
				!data.list instanceof Array ||
				!data.list.length
			) {
				Toast.show('查询废水厂竟没有任何数据！');
				return;
			}
			// 有数据
			else {
				return data.list;
			}
		}
		// 失败
		else {
			Toast.show(`废水厂查询失败,原因：${errmsg}`);
			return;
		}
	});
};
// ==========================公用接口================================

// main-home
// 【首页】
// 获取主数据
api.getHomeMainData = () => {
	return buildFetcher(commonPrefix + 'message/mainList', {ofs: 1, ps: 20});
};

// main-home
// 【首页】
// 获取下拉框数据
api.getHomeSelectors = () => {
	return buildFetcher(commonPrefix + 'AqhbEcharts/all');
};

// main-home
// 【首页】
// 获取图表数据
api.getMainChart = (conditions) => {
	return buildFetcher(commonPrefix + 'AqhbEcharts/list', conditions);
};

// main-query
// 【首页-信息管理】
// 获取菜单
api.getMainQueryMenuList = () => {
	return new Promise((resolve) => {
		resolve(mainQueryData);
	});
};
// =============================================================
// risk-grade-control-list
// 【风险分级管控数据列表】
// 获取列表数据
api.getRiskGradeControlDataList = (conditions) => {
	const {page, ps} = conditions;
	return buildFetcher(commonPrefix + 'riskMain/list', {
		ofs: page,
		ps,
		id: '',
		...conditions,
	});
};

// emergency-reserve-plan
// 【应急预案】
// 获取数据列表
api.getEmergencyReservePlanList = (conditions) => {
	const {page, ps} = conditions;
	return buildFetcher(commonPrefix + 'contingencyMain/list', {
		ofs: page,
		ps,
		...conditions,
	});
};

// rescue-drill-list
// 【救援演练与评估】
// 获取主数据列表
api.getResecueDrillDataList = (conditions) => {
	const {page, ps} = conditions;
	return buildFetcher(commonPrefix + 'rescueMain/list', {
		ofs: page,
		ps,
		id: '',
		...conditions,
	});
};

// accident-quick-report
// 【事故快报】
// 获取列表主数据
api.getAccidentQuickReport = (conditions) => {
	const {page, ps} = conditions;
	return buildFetcher(commonPrefix + 'Accident/list', {
		ofs: page,
		ps,
		...conditions,
	});
};

// accident-query
// 【事故查询】
// 获取事故数据主列表
api.getAccidentQueryList = (conditions) => {
	const {page, ps} = conditions;
	return buildFetcher(commonPrefix + 'AccidentAnalyse/list', {
		ofs: page,
		ps,
		...conditions,
	});
};

// acidic-reservoir-info
// 【酸性水库信息查询】
// 获取主数据列表
api.getAcidicReservoirInfoList = (conditions) => {
	const {page, ps} = conditions;
	return buildFetcher(commonPrefix + 'keyAreas/recordViewList', {
		ofs: page,
		ps,
		...conditions,
	});
};

// rain-info
// 【降雨量信息】
// 获取主数据列表
api.getRainInfoList = (conditions) => {
	const {page, ps} = conditions;
	return buildFetcher(commonPrefix + 'rain/recordViewList', {
		ofs: page,
		ps,
		...conditions,
	});
};

// waste-water
// 【废水处理量】
// 获取主数据列表
api.getWasteWaterList = (conditions) => {
	const {page, ps} = conditions;
	return buildFetcher(commonPrefix + 'waste/recordViewList', {
		ofs: page,
		ps,
		...conditions,
	});
};

// safe-env-certificates
// 【安环证照管理】
// 获取主数据列表
api.getSafeEnvCertificatesList = (conditions) => {
	const {page, ps} = conditions;
	return buildFetcher(commonPrefix + 'safecardMain/list', {
		ofs: page,
		ps,
		...conditions,
		isUpload: 1,
	});
};

// educating-stand-book
// 【教育培训台账】
// 获取主数据列表
api.getEducatingStandBook = (conditions) => {
	const {page, ps} = conditions;
	return buildFetcher(commonPrefix + 'HseEduTraining/list', {
		ofs: page,
		ps,
		...conditions,
		isUpload: 1,
	});
};

// relationship-info
// 【相关方信息】
// 获取主数据列表
api.getRelationshipInfoList = (conditions) => {
	const {page, ps} = conditions;
	return buildFetcher(commonPrefix + 'thirdMain/list', {
		ofs: page,
		ps,
		...conditions,
	});
};

// danger-chemical
// 【危险化学品管理】
// 获取主数据列表
api.getDangerChemicalList = (conditions) => {
	const {page, ps} = conditions;
	return buildFetcher(commonPrefix + 'DangerousChemicals/list', {
		ofs: page,
		ps,
		...conditions,
	});
};

// law-standard
// 【法律法规标准】
// 获取主数据列表
api.getLawStandardList = (conditions) => {
	const {page, ps} = conditions;
	return buildFetcher(commonPrefix + 'RecordLaw/list', {
		ofs: page,
		ps,
		...conditions,
	});
};

// duties-report
// 【履职报告】
// 获取主数据列表
api.getDutiesReportList = (conditions) => {
	const {page, ps} = conditions;
	return buildFetcher(commonPrefix + 'DutiesReport/list', {
		ofs: page,
		ps,
		...conditions,
	});
};

// file-notice
// 【文件通知】
// 获取主数据列表
api.getFileNoticeList = (conditions) => {
	const {page, ps} = conditions;
	return buildFetcher(commonPrefix + 'RecordNotice/list', {
		ofs: page,
		ps,
		...conditions,
	});
};

// abnormal-info-group
// 【异常信息（集团）】
// 获取主数据列表
api.getAbnormalInfoGroupList = (conditions) => {
	const {page, ps} = conditions;
	return buildFetcher(commonPrefix + 'exception/list', {
		ofs: page,
		ps,
		...conditions,
	});
};

// abnormal-info-enterprise
// 【异常信息（企业）】
// 获取主数据列表
api.getAbnormalInfoEnterpriseList = (conditions) => {
	const {page, ps} = conditions;
	return buildFetcher(commonPrefix + 'exception/list', {
		ofs: page,
		ps,
		...conditions,
	});
};

// abnormal-info-enterprise
// 【异常信息（企业）】
// 编辑
api.abnormalInfoEnterpriseEdit = (conditions) => {
	return buildFetcher(commonPrefix + 'exception/list', conditions, 'post');
};

// archives-safe
// 【安全档案资料】
// 获取主数据列表
api.getArchivesSafeList = (conditions) => {
	const {page, ps} = conditions;
	let conditionObj = {
		ofs: page,
		ps,
		classify: 1,
		category: 1,
		...conditions,
	};
	console.log(conditionObj);
	return buildFetcher(commonPrefix + 'HseArchive/list', conditionObj);
};

// archives-env
// 【环保档案资料】
// 获取主数据列表
api.getArchivesEnvList = (conditions) => {
	const {page, ps} = conditions;
	let conditionObj = {
		ofs: page,
		ps,
		classify: 2,
		category: 1,
		...conditions,
	};
	console.log(conditionObj);
	return buildFetcher(commonPrefix + 'HseArchive/list', conditionObj);
};

// archives-occupation
// 【职业卫生档案资料】
// 获取主数据列表
api.getArchivesOccupationList = (conditions) => {
	const {page, ps} = conditions;
	let conditionObj = {
		ofs: page,
		ps,
		classify: 3,
		category: 1,
		...conditions,
	};
	console.log(conditionObj);
	return buildFetcher(commonPrefix + 'HseArchive/list', conditionObj);
};

// archives-rules
// 【规章制度资料】
// 获取主数据列表
api.getArchivesRulesList = (conditions) => {
	const {page, ps} = conditions;
	let conditionObj = {
		ofs: page,
		ps,
		category: 2,
		...conditions,
	};
	console.log(conditionObj);
	return buildFetcher(commonPrefix + 'HseArchive/list', conditionObj);
};

// archives-others
// 【其他档案资料】
// 获取主数据列表
api.getArchivesOthersList = (conditions) => {
	const {page, ps} = conditions;
	let conditionObj = {
		ofs: page,
		ps,
		category: 3,
		...conditions,
	};
	console.log(conditionObj);
	return buildFetcher(commonPrefix + 'HseArchive/list', conditionObj);
};

// ecology-repair-info
// 【生态修复信息】
// 获取生态修复信息主数据列表
api.getEcologyRepairList = (conditions) => {
	return buildFetcher(commonPrefix + 'Repair/list', conditions);
};

// safe-producting-calendar
// 【安全生产日历】
// 获取安全生产日历数据
api.getSafeCalendarData = (conditions) => {
	return buildFetcher(commonPrefix + 'AccidentAnalyse/queryByYear', conditions);
};

// fire-control-data-list
// 【消防资料查询】
// 获取消防资料列表
api.getFireControlDataList = (conditions) => {
	return buildFetcher(commonPrefix + 'firecontrolMain/list', {
		ofs: 0,
		ps: 999,
		...conditions,
	});
};

// news-approval
// 【新闻审批】
// 获取审批列表
api.getNewsApprovalList = (conditions) => {
	conditions = {
		nodeState: 2,
		...conditions,
	};
	return buildFetcher(commonPrefix + 'News/list', conditions);
};

// news-approval
// 【新闻审批】
// 点击单条新闻
api.getNewsDetail = (id) => {
	return buildFetcher(commonPrefix + `News/${id}`);
};

// news-approval
// 【新闻审批】
// 查看此条的流程
api.viewNewsApprovalProccess = (condtions) => {
	return buildFetcher(commonPrefix + 'FlowInfoRuns/steps', condtions);
};

// news-approval
// 【新闻审批】
// 审核通过
api.newsApprovalPass = (conditions) => {
	return buildFetcher(
		commonPrefix + 'FlowInfoRuns/approve',
		conditions,
		'post',
	);
};

// news-approval
// 【新闻审核】
// 驳回审核
api.newsApprovalReject = (conditions) => {
	return buildFetcher(commonPrefix + 'FlowInfoRuns/reject', conditions, 'post');
};

// news-overview
// 【新闻预览】
// 查看具体内容
api.viewNewsDetail = (id) => {
	return buildFetcher(commonPrefix + `News/${id}`);
};

// danger-screening-administer
// 【隐患排查治理】
// 获取整改公示内容列表
api.getDangerRectificationList = () => {
	return buildFetcher(commonPrefix + 'HiddenTroubleNotice/list', {
		type: 2,
		ofs: 0,
		ps: 999,
	});
};

// danger-screening-administer
// 【隐患排查治理】
// 获取表格数据
api.queryDangerTable = (condition) => {
	return buildFetcher(commonPrefix + 'HiddenTrouble/list', {
		...condition,
		ofs: 0,
		ps: 9999,
	});
};

// danger-screening-administer
// 【隐患排查治理】
// 点击表格更多
api.queryMoreInfo = (id) => {
	return buildFetcher(commonPrefix + 'HiddenTrouble/listDetailFile', {
		id,
		ofs: 0,
		ps: 1,
	});
};

// danger-screening-administer
// 【隐患排查治理】
// 获取检查公示内容列表
api.getDangerCheckList = () => {
	return buildFetcher(commonPrefix + 'HiddenTroubleNotice/list', {
		type: 1,
		ofs: 0,
		ps: 999,
	});
};

// main-video
// 【视频监控】
// 获取map数据
api.getMapData = () => {
	return buildFetcher(
		commonPrefix + 'message/mainList',
		{ofs: 1, ps: 20},
		'get',
	);
};

// monitor-oldata-list
// 【实时监控数据】
// 获取住列表
api.getMonitorOlDataList = (conditions) => {
	const {page, ps, type = 1, avgType = 1} = conditions;
	let conditionObj = {
		ofs: page,
		ps,
		type,
		avgType,
		...conditions,
	};
	console.log(conditionObj);
	return buildFetcher(commonPrefix + 'AqhbAdataAuto/list', conditionObj);
};

// monitor-oldata-history
// 【监控历史数据】
// 获取住列表
api.getMonitorOlDataHistoryList = (conditions) => {
	const {page, ps, type = 1, avgType = 1} = conditions;
	let conditionObj = {
		ofs: page,
		ps,
		type,
		avgType,
		...conditions,
	};
	console.log(conditionObj);
	return buildFetcher(commonPrefix + 'AqhbAdataAuto/historyList', conditionObj);
};

// risk-tips-approval
// 【风险提示审批】
// 获取主数据列表
api.getRiskTipsApproval = (conditions) => {
	const {page, ps} = conditions;
	let conditionObj = {
		ofs: 0,
		ps: 20,
		nodeState: 2,
		typeValue: 1,
		...conditions,
	};
	console.log(conditionObj);
	return buildFetcher(commonPrefix + 'riskPoint/list', conditionObj);
};

// risk-tips-approval
// 【风险提示审批】
// 获取流程细节
api.viewRiskTipsApprovalProccess = (condtions) => {
	return buildFetcher(commonPrefix + 'FlowInfoRuns/steps', condtions);
};

// risk-tips-approval
// 【风险提示审批】
// 审核通过
api.riskTipsApprovalPass = (condtions) => {
	return buildFetcher(commonPrefix + 'FlowInfoRuns/approve', condtions);
};

// risk-tips-approval
// 【风险提示审批】
// 驳回审核
api.riskTipsApprovalReject = () => {
	return buildFetcher(commonPrefix + 'FlowInfoRuns/reject', condtions);
};

// acidic-reservoir-edit
// 【酸性水库编辑】-新增
api.acidicReservoirSubmitAdd = (condtions) => {
	return buildFetcher(commonPrefix + 'keyAreas/addRecord', condtions, 'post');
};

// acidic-reservoir-edit
// 【酸性水库编辑】-编辑
api.acidicReservoirSubmitEdit = (condtions) => {
	return buildFetcher(
		commonPrefix + 'keyAreas/updateRecord',
		condtions,
		'post',
	);
};

// rain-info-edit
// 【降雨量编辑】-新增
api.rainInfoSubmitAdd = (condtions) => {
	return buildFetcher(commonPrefix + 'rain/addRecord', condtions, 'post');
};

// rain-info-edit
// 【降雨量编辑】-编辑
api.rainInfoSubmitEdit = (condtions) => {
	return buildFetcher(commonPrefix + 'rain/updateRecord', condtions, 'post');
};

// waste-water-edit
// 【废水厂编辑】-新增
api.wasteWaterSubmitAdd = (condtions) => {
	return buildFetcher(commonPrefix + 'waste/addRecord', condtions, 'post');
};

// waste-water-edit
// 【废水厂编辑】-编辑
api.wasteWaterSubmitEdit = (condtions) => {
	return buildFetcher(commonPrefix + 'waste/updateRecord', condtions, 'post');
};

// abnormal-info-enterprise-edit
// 【异常信息（企业）】-编辑
api.abnormalInfoEnterpriseEdit = (condtions) => {
	return buildFetcher(commonPrefix + 'exception/add', condtions, 'post');
};

export default api;
