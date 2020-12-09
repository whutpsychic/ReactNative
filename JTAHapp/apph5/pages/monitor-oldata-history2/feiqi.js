import React from "react";

const judgeColor = (value, warnUp, warnDown, alarmUp, alarmDown) => {
	if (value != null) {
		if (alarmUp != null) {
			if (value > alarmUp) {
				//红色
				return "red";
			}
		}
		if (alarmDown != null) {
			if (value < alarmDown) {
				//红色
				return "red";
			}
		}
		if (warnUp != null) {
			if (value > warnUp) {
				//绿色
				return "orange";
			}
		}
		if (warnDown != null) {
			if (value < warnDown) {
				//绿色
				return "orange";
			}
		}
		if (value <= 0) {
			//红色
			return "red";
		}
		//正常
		return "";
	}
};

const columns = [
	{
		title: `监控点名称`,
		dataIndex: `areaName`,
		key: `areaName`,
		width: 180,
		fixed: "left"
	},
	{
		title: `监测时间`,
		dataIndex: `dataTime`,
		key: `dataTime`,
		width: 180,
		fixed: "left"
	},
	{
		title: `企业名称`,
		dataIndex: `institutionName`,
		key: `institutionName`
	},
	{
		title: `烟气流速(米/秒)`,
		dataIndex: `yanqiliusu`,
		key: `yanqiliusu`,
		render: (x, line) => {
			const {
				yanqiliusu,
				yanqiliusuWarnUp,
				yanqiliusuWarnDown,
				yanqiliusuAlarmUp,
				yanqiliusuAlarmDown
			} = line;
			return (
				<span
					className={judgeColor(
						yanqiliusu,
						yanqiliusuWarnUp,
						yanqiliusuWarnDown,
						yanqiliusuAlarmUp,
						yanqiliusuAlarmDown
					)}
				>
					{x}
				</span>
			);
		}
	},
	{
		title: `流量(立方米/秒)`,
		dataIndex: `yanqiliuliang`,
		key: `yanqiliuliang`,
		render: (x, line) => {
			const {
				yanqiliuliang,
				yanqiliuliangWarnUp,
				yanqiliuliangWarnDown,
				yanqiliuliangAlarmUp,
				yanqiliuliangAlarmDown
			} = line;
			return (
				<span
					className={judgeColor(
						yanqiliuliang,
						yanqiliuliangWarnUp,
						yanqiliuliangWarnDown,
						yanqiliuliangAlarmUp,
						yanqiliuliangAlarmDown
					)}
				>
					{x}
				</span>
			);
		}
	},
	{
		title: `烟气温度(°C)`,
		dataIndex: `yanqiwendu`,
		key: `yanqiwendu`,
		render: (x, line) => {
			const {
				yanqiwendu,
				yanqiwenduWarnUp,
				yanqiwenduWarnDown,
				yanqiwenduAlarmUp,
				yanqiwenduAlarmDown
			} = line;
			return (
				<span
					className={judgeColor(
						yanqiwendu,
						yanqiwenduWarnUp,
						yanqiwenduWarnDown,
						yanqiwenduAlarmUp,
						yanqiwenduAlarmDown
					)}
				>
					{x}
				</span>
			);
		}
	},
	{
		title: `氧含量(%)`,
		dataIndex: `yangqihanliang`,
		key: `yangqihanliang`,
		render: (x, line) => {
			const {
				yangqihanliang,
				yangqihanliangWarnUp,
				yangqihanliangWarnDown,
				yangqihanliangAlarmUp,
				yangqihanliangAlarmDown
			} = line;
			return (
				<span
					className={judgeColor(
						yangqihanliang,
						yangqihanliangWarnUp,
						yangqihanliangWarnDown,
						yangqihanliangAlarmUp,
						yangqihanliangAlarmDown
					)}
				>
					{x}
				</span>
			);
		}
	},
	{
		title: `烟气湿度(%)`,
		dataIndex: `yanqishidu`,
		key: `yanqishidu`,
		render: (x, line) => {
			const {
				yanqishidu,
				yanqishiduWarnUp,
				yanqishiduWarnDown,
				yanqishiduAlarmUp,
				yanqishiduAlarmDown
			} = line;
			return (
				<span
					className={judgeColor(
						yanqishidu,
						yanqishiduWarnUp,
						yanqishiduWarnDown,
						yanqishiduAlarmUp,
						yanqishiduAlarmDown
					)}
				>
					{x}
				</span>
			);
		}
	},
	{
		title: `烟气压力(KPa)`,
		dataIndex: `yanqiyali`,
		key: `yanqiyali`,
		render: (x, line) => {
			const {
				yanqiyali,
				yanqiyaliWarnUp,
				yanqiyaliWarnDown,
				yanqiyaliAlarmUp,
				yanqiyaliAlarmDown
			} = line;
			return (
				<span
					className={judgeColor(
						yanqiyali,
						yanqiyaliWarnUp,
						yanqiyaliWarnDown,
						yanqiyaliAlarmUp,
						yanqiyaliAlarmDown
					)}
				>
					{x}
				</span>
			);
		}
	},
	{
		title: `烟尘(毫克/立方米)`,
		dataIndex: `yanchen`,
		key: `yanchen`,
		render: (x, line) => {
			const {
				yanchen,
				yanchenWarnUp,
				yanchenWarnDown,
				yanchenAlarmUp,
				yanchenAlarmDown
			} = line;
			return (
				<span
					className={judgeColor(
						yanchen,
						yanchenWarnUp,
						yanchenWarnDown,
						yanchenAlarmUp,
						yanchenAlarmDown
					)}
				>
					{x}
				</span>
			);
		}
	},
	{
		title: `SO2(毫克/立方米)`,
		dataIndex: `so2`,
		key: `so2`,
		render: (x, line) => {
			const { so2, so2WarnUp, so2WarnDown, so2AlarmUp, so2AlarmDown } = line;
			return (
				<span
					className={judgeColor(
						so2,
						so2WarnUp,
						so2WarnDown,
						so2AlarmUp,
						so2AlarmDown
					)}
				>
					{x}
				</span>
			);
		}
	},
	{
		title: `氮氧化物(毫克/立方米)`,
		dataIndex: `danyang`,
		key: `danyang`,
		render: (x, line) => {
			const {
				danyang,
				danyangWarnUp,
				danyangWarnDown,
				danyangAlarmUp,
				danyangAlarmDown
			} = line;
			return (
				<span
					className={judgeColor(
						danyang,
						danyangWarnUp,
						danyangWarnDown,
						danyangAlarmUp,
						danyangAlarmDown
					)}
				>
					{x}
				</span>
			);
		}
	},
	{
		title: `烟气动压(KPa)`,
		dataIndex: `yanqidongya`,
		key: `yanqidongya`,
		render: (x, line) => {
			const {
				yanqidongya,
				yanqidongyaWarnUp,
				yanqidongyaWarnDown,
				yanqidongyaAlarmUp,
				yanqidongyaAlarmDown
			} = line;
			return (
				<span
					className={judgeColor(
						yanqidongya,
						yanqidongyaWarnUp,
						yanqidongyaWarnDown,
						yanqidongyaAlarmUp,
						yanqidongyaAlarmDown
					)}
				>
					{x}
				</span>
			);
		}
	}
];

export default columns;
