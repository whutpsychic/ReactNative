const judgeColor = (value, warnUp, warnDown, alarmUp, alarmDown) => {
	if (value != null) {
		if (alarmUp != null) {
			if (value > alarmUp) {
				//红色
				return 'red';
			}
		}
		if (alarmDown != null) {
			if (value < alarmDown) {
				//红色
				return 'red';
			}
		}
		if (warnUp != null) {
			if (value > warnUp) {
				//绿色
				return 'orange';
			}
		}
		if (warnDown != null) {
			if (value < warnDown) {
				//绿色
				return 'orange';
			}
		}
		if (value <= 0) {
			//红色
			return 'red';
		}
		//正常
		return '';
	}
};

const getDetail = (type, dataSource) => {
	const {
		liuliang,
		liuliangAlarmDown,
		liuliangAlarmUp,
		liuliangWarnDown,
		liuliangWarnUp,
	} = dataSource;
	const {ph, phAlarmDown, phAlarmUp, phWarnDown, phWarnUp} = dataSource;
	const {
		xuyang,
		xuyangAlarmDown,
		xuyangAlarmUp,
		xuyangWarnDown,
		xuyangWarnUp,
	} = dataSource;
	const {
		andan,
		andanAlarmDown,
		andanAlarmUp,
		andanWarnDown,
		andanWarnUp,
	} = dataSource;
	// =============================================
	const {
		yanqiliusu,
		yanqiliusuAlarmDown,
		yanqiliusuAlarmUp,
		yanqiliusuWarnDown,
		yanqiliusuWarnUp,
	} = dataSource;
	const {
		yanqiliulaing,
		yanqiliulaingAlarmDown,
		yanqiliulaingAlarmUp,
		yanqiliulaingWarnDown,
		yanqiliulaingWarnUp,
	} = dataSource;
	const {
		yanqiwendu,
		yanqiwenduAlarmDown,
		yanqiwenduAlarmUp,
		yanqiwenduWarnDown,
		yanqiwenduWarnUp,
	} = dataSource;
	const {
		yangqihanliang,
		yangqihanliangAlarmDown,
		yangqihanliangAlarmUp,
		yangqihanliangWarnDown,
		yangqihanliangWarnUp,
	} = dataSource;
	const {
		yanqishidu,
		yanqishiduAlarmDown,
		yanqishiduAlarmUp,
		yanqishiduWarnDown,
		yanqishiduWarnUp,
	} = dataSource;
	const {
		yanqiyali,
		yanqiyaliAlarmDown,
		yanqiyaliAlarmUp,
		yanqiyaliWarnDown,
		yanqiyaliWarnUp,
	} = dataSource;
	const {
		yanchen,
		yanchenAlarmDown,
		yanchenAlarmUp,
		yanchenWarnDown,
		yanchenWarnUp,
	} = dataSource;
	const {so2, so2AlarmDown, so2AlarmUp, so2WarnDown, so2WarnUp} = dataSource;
	const {
		danyang,
		danyangAlarmDown,
		danyangAlarmUp,
		danyangWarnDown,
		danyangWarnUp,
	} = dataSource;
	const {
		yanqidongya,
		yanqidongyaAlarmDown,
		yanqidongyaAlarmUp,
		yanqidongyaWarnDown,
		yanqidongyaWarnUp,
	} = dataSource;

	// 废液
	if (type === 1) {
		return [
			{label: '企业名称', content: `${dataSource.institutionName}`},
			{label: '监控点名称', content: `${dataSource.areaName}`},
			{label: '监测时间', content: `${dataSource.dataTime}`},
			{
				label: '流量',
				content: `${liuliang || '未知'}(升/秒)`,
				color: judgeColor(
					liuliang,
					liuliangAlarmDown,
					liuliangAlarmUp,
					liuliangWarnDown,
					liuliangWarnUp,
				),
			},
			{
				label: 'pH',
				content: `${ph || '未知'}(无量纲)`,
				color: judgeColor(ph, phAlarmDown, phAlarmUp, phWarnDown, phWarnUp),
			},
			{
				label: '化学需氧量',
				content: `${xuyang || '未知'}(毫克/升)`,
				color: judgeColor(
					xuyang,
					xuyangAlarmDown,
					xuyangAlarmUp,
					xuyangWarnDown,
					xuyangWarnUp,
				),
			},
			{
				label: '氨氮',
				content: `${andan || '未知'}(毫克/升)`,
				color: judgeColor(
					andan,
					andanAlarmDown,
					andanAlarmUp,
					andanWarnDown,
					andanWarnUp,
				),
			},
		];
	}
	// 废气
	else {
		return [
			{label: '企业名称', content: dataSource.institutionName},
			{label: '监控点名称', content: dataSource.areaName},
			{label: '监测时间', content: dataSource.dataTime},
			{
				label: '烟气流速',
				content: `${dataSource.yanqiliusu || '未知'}(米/秒)`,
				color: judgeColor(
					yanqiliusu,
					yanqiliusuAlarmDown,
					yanqiliusuAlarmUp,
					yanqiliusuWarnDown,
					yanqiliusuWarnUp,
				),
			},
			{
				label: '流量',
				content: `${dataSource.yanqiliulaing || '未知'}(立方米/秒)`,
				color: judgeColor(
					yanqiliulaing,
					yanqiliulaingAlarmDown,
					yanqiliulaingAlarmUp,
					yanqiliulaingWarnDown,
					yanqiliulaingWarnUp,
				),
			},
			{
				label: '烟气温度',
				content: `${dataSource.yanqiwendu || '未知'}(°C)`,
				color: judgeColor(yanqiwendu, yanqiwenduAlarmDown, yanqiwenduAlarmUp, yanqiwenduWarnDown, yanqiwenduWarnUp),
			},
			{
				label: '氧含量',
				content: `${dataSource.yangqihanliang || '未知'}(%)`,
				color: judgeColor(yangqihanliang, yangqihanliangAlarmDown, yangqihanliangAlarmUp, yangqihanliangWarnDown, yangqihanliangWarnUp),
			},
			{
				label: '烟气湿度',
				content: `${dataSource.yanqishidu || '未知'}(%)`,
				color: judgeColor(yanqishidu, yanqishiduAlarmDown, yanqishiduAlarmUp, yanqishiduWarnDown, yanqishiduWarnUp),
			},
			{
				label: '烟气压力',
				content: `${dataSource.yanqiyali || '未知'}(KPa)`,
				color: judgeColor(yanqiyali, yanqiyaliAlarmDown, yanqiyaliAlarmUp, yanqiyaliWarnDown, yanqiyaliWarnUp),
			},
			{
				label: '烟尘',
				content: `${dataSource.yanchen || '未知'}(毫克/立方米)`,
				color: judgeColor(yanchen, yanchenAlarmDown, yanchenAlarmUp, yanchenWarnDown, yanchenWarnUp),
			},
			{
				label: 'SO2',
				content: `${dataSource.so2 || '未知'}(毫克/立方米)`,
				color: judgeColor(so2, so2AlarmDown, so2AlarmUp, so2WarnDown, so2WarnUp),
			},
			{
				label: '氮氧化合物',
				content: `${dataSource.danyang || '未知'}(毫克/立方米)`,
				color: judgeColor(danyang, danyangAlarmDown, danyangAlarmUp, danyangWarnDown, danyangWarnUp),
			},
			{
				label: '烟气动压',
				content: `${dataSource.yanqidongya || '未知'}(KPa)`,
				color: judgeColor(yanqidongya, yanqidongyaAlarmDown, yanqidongyaAlarmUp, yanqidongyaWarnDown, yanqidongyaWarnUp),
			},
		];
	}
};

export default getDetail;
