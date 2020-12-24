import React from "react";
import util from "../util/index";
import { UnorderedListOutlined } from "@ant-design/icons";

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
		width: 100,
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
		key: `institutionName`,
		width: 100,
		fixed: "left"
	},
	{
		title: `流量（升/秒）`,
		dataIndex: `liuliang`,
		key: `liuliang`,
		render: (x, line) => {
			const {
				liuliang,
				liuliangWarnUp,
				liuliangWarnDown,
				liuliangAlarmUp,
				liuliangAlarmDown
			} = line;
			return (
				<span
					className={judgeColor(
						liuliang,
						liuliangWarnUp,
						liuliangWarnDown,
						liuliangAlarmUp,
						liuliangAlarmDown
					)}
				>
					{x}
				</span>
			);
		}
	},
	{
		title: `pH（无量纲）`,
		dataIndex: `ph`,
		key: `ph`,
		render: (x, line) => {
			const { ph, phWarnUp, phWarnDown, phAlarmUp, phAlarmDown } = line;
			return (
				<span
					className={judgeColor(
						ph,
						phWarnUp,
						phWarnDown,
						phAlarmUp,
						phAlarmDown
					)}
				>
					{x}
				</span>
			);
		}
	},
	{
		title: `化学需氧量（毫克/升）`,
		dataIndex: `xuyang`,
		key: `xuyang`,
		render: (x, line) => {
			const {
				xuyang,
				xuyangWarnUp,
				xuyangWarnDown,
				xuyangAlarmUp,
				xuyangAlarmDown
			} = line;
			return (
				<span
					className={judgeColor(
						xuyang,
						xuyangWarnUp,
						xuyangWarnDown,
						xuyangAlarmUp,
						xuyangAlarmDown
					)}
				>
					{x}
				</span>
			);
		}
	},
	{
		title: `氨氮（毫克/升）`,
		dataIndex: `andan`,
		key: `andan`,
		render: (x, line) => {
			const {
				andan,
				andanWarnUp,
				andanWarnDown,
				andanAlarmUp,
				andanAlarmDown
			} = line;
			return (
				<span
					className={judgeColor(
						andan,
						andanWarnUp,
						andanWarnDown,
						andanAlarmUp,
						andanAlarmDown
					)}
				>
					{x}
				</span>
			);
		}
	},
	{
		title: `历史数据`,
		key: `history`,
		render: (x, line) => {
			return (
				<UnorderedListOutlined
					style={{ color: "#389edc" }}
					onClick={() => {
						util.traceBack("history", { line });
					}}
				/>
			);
		}
	}
];

export default columns;
