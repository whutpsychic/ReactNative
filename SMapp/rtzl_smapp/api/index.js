import soap from './soap.js';
import Toast from '../components/ToastModule/index';

const api = {};

//安排读取返回的字段
const arrange = (xml, fields) => {
	let result = {};

	for (let i of fields) {
		let strResult = xml.split(`<${i}>`)[1]
			? xml.split(`<${i}>`)[1].split(`</${i}>`)[0]
			: '';

		result[i] = strResult;
	}

	return result;
};

//将某标签从xml字符串里分离出来,以数组的方式
const getTabArr = (xml, strArr) => {
	const spliter = 'Table';
	let dataArr = xml.split(`</${spliter}>`);
	dataArr.pop();
	let arr = dataArr.map((item, i) => {
		let result = {};
		strArr.forEach(_item => {
			let __item__ = item;
			let _res = __item__.split(`<${_item}>`)[1];
			if (_res) {
				result['key'] = 'tabItem' + i;
				result[_item] = _res;
				result[_item] = _res.split(`</${_item}>`)[0];
			}
		});
		return result;
	});

	return arr;
};

//将字段转换为表格适配字段
const transPortArr = (arr, arr1, arr2) => {
	return arr.map((item, i) => {
		//对每一个对象说话
		arr1.forEach((_item, _i) => {
			if (item[_item]) {
				item[arr2[_i]] = item[_item];
				delete item[_item];
			}
		});
		return item;
	});
};

// ===============================================================
// ===============================================================
// ===============================================================

//登录
api.login = condition => {
	return soap('GetUser', condition).then(res => {
		const {_response} = res;
		let result = arrange(_response, ['USER_ID', 'USER_NAME']);
		return result;
	});
};

//获取拣配单
api.getJIANPEIDAN = condition => {
	return soap('GetPickHeadData', condition).then(res => {
		let result = getTabArr(res._response, [
			'拣配日期',
			'车号',
			'收货单位',
			'拣配状态',
			'合同号',
			'发货单号',
			'收货单位',
			'产品编码',
			'产品名称',
			'批次号',
			'计量单位',
			'重量',
			'数量',
			'仓库',
			'备注',
			'拣配人',
			'拣配单号',
		]);
		result = transPortArr(
			result,
			[
				'拣配日期',
				'车号',
				'收货单位',
				'拣配状态',
				'合同号',
				'发货单号',
				'收货单位',
				'产品编码',
				'产品名称',
				'批次号',
				'计量单位',
				'重量',
				'数量',
				'仓库',
				'备注',
				'拣配人',
				'拣配单号',
			],
			[
				'date',
				'number',
				'unit',
				'state',
				'hetonghao',
				'fahuodanhao',
				'shouhuodanwei',
				'chanpinbianma',
				'chanpinmingcheng',
				'picihao',
				'jiliangdanwei',
				'zhongliang',
				'shuliang',
				'cangku',
				'beizhu',
				'jianpeiren',
				'jianpeidanhao',
			],
		);

		//额外处理：拣配日期只匹配到YYYY-MM-DD
		result = result.map(item => {
			let reg = /^[0-9]+-[0-9]+-[0-9]+/;
			let res = reg.exec(item.date);
			item.date = res[0];
			return item;
		});

		return result;
	});
};

//获取拣配单明细
api.getJianpeidanDetail = condition => {
	return soap('GetPickListData', condition)
		.then(res => {
			const {_response} = res;
			let result = getTabArr(_response, [
				'拣配单号',
				'批次号',
				'批次编码',
				'重量',
				'块数',
				'计量单位',
			]);
			//字段命名
			result = transPortArr(
				result,
				['拣配单号', '批次号', '批次编码', '重量', '块数', '计量单位'],
				['jianpeidan', 'picihao', 'picibianma', 'weight', 'kuaishu', 'unit'],
			);
			return result;
		})
		.catch(err => {
			console.log(err);
			Toast.show('请求发生错误，请检查您的网络连接');
		});
};

//查询出库单
api.getCHUKUDAN = condition => {
	return soap('GetPlanMain', condition).then(res => {
		//重新整理该条数据的必要信息
		//发货单号、收货单位、计划重量、已发数量、发货单日期、计划日期、订单号、序号、产品编码、产品名称、批次号、计量单位、库房名称、运输区分、车号、计划类型
		let result = getTabArr(res._response, [
			'发货单号',
			'收货单位',
			'计划重量',
			'已发数量',
			'发货单日期',
			'计划日期',
			'订单号',
			'序号',
			'产品编码',
			'产品名称',
			'批次号',
			'计量单位',
			'库房名称',
			'运输区分',
			'计划类型',
			'车号',
		]);
		//字段命名
		result = transPortArr(
			result,
			[
				'发货单号',
				'收货单位',
				'计划重量',
				'已发数量',
				'发货单日期',
				'计划日期',
				'订单号',
				'序号',
				'产品编码',
				'产品名称',
				'批次号',
				'计量单位',
				'库房名称',
				'运输区分',
				'计划类型',
				'车号',
			],
			[
				'name',
				'unit',
				'weight',
				'yifsl',
				'fahdrq',
				'jihrq',
				'dingdh',
				'xuh',
				'chanpbm',
				'chanpmc',
				'pich',
				'jildw',
				'kufmc',
				'yunsqf',
				'jihlx',
				'cheh',
			],
		);
		return result;
	});
};

//查询选择车号
api.chooseCHEHAO = condition => {
	condition.strTruckNo = ``;
	return soap('GetTruckNo', condition).then(res => {
		let result = getTabArr(res._response, ['车号', '单据号', '秤房']);
		result = transPortArr(
			result,
			['车号', '单据号', '秤房'],
			['number', 'danjuhao', 'chengfang'],
		);
		return result;
	});
};

//验证条码是否已拣配
api.checkBatchNo = condition => {
	return soap('CheckBatchNo', condition).then(res => {
		const {_response} = res;
		let result = arrange(_response, ['CheckBatchNoResult']);
		result.CheckBatchNoResult === 'false'
			? (result.CheckBatchNoResult = false)
			: (result.CheckBatchNoResult = true);
		return result;
	});
};

//将扫描记录存储到数据库
api.uploadBarcodes = condition => {
	return soap('ScanConfirm3', condition)
		.then(res => {
			const {_response} = res;
			let result = arrange(_response, ['ScanConfirm3Result', 'strMsg']);
			result.ScanConfirm3Result === 'false'
				? (result.result = false)
				: (result.result = true);
			return result;
		})
		.catch(err => {
			Toast.show('请求发生错误，请检查您的网络连接');
		});
};

//根据批次号和编号查询条码
api.getBarcodeByPB = condition => {
	return soap('GetBarcode', condition)
		.then(res => {
			const {_response} = res;
			let result = arrange(_response, ['F_BARCODE']);
			return result['F_BARCODE'];
		})
		.catch(err => {
			console.log(err);
			Toast.show('请求发生错误，请检查您的网络连接');
		});
};

//删除拣配单查询结果中的一条数据
api.deletePickNo = condition => {
	return soap('DeletePickNo', condition)
		.then(res => {
			const {_response} = res;
			let result = arrange(_response, ['DeletePickNoResult', 'strError']);
			result['DeletePickNoResult'] === 'false'
				? (result['DeletePickNoResult'] = false)
				: (result['DeletePickNoResult'] = true);
			return result;
		})
		.catch(err => {
			console.log(err);
			Toast.show('请求发生错误，请检查您的网络连接');
		});
};

export default api;
