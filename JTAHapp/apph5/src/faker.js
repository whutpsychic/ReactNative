import React from "react";

const treeData = [
	{
		value: "390090725934497792",
		label: "江西铜业集团有限公司",
		parentId: "0",
		sort: 0,
		level: 1,
		children: [
			{
				value: "436932209262198784",
				label: "德兴铜矿",
				parentId: "390090725934497792",
				sort: 1,
				level: 2,
				children: [],
				title: "德兴铜矿",
				key: "436932209262198784"
			},
			{
				value: "436933485161086976",
				label: "城门山铜矿",
				parentId: "390090725934497792",
				sort: 2,
				level: 2,
				children: [],
				selectable: false,
				title: "城门山铜矿",
				key: "436933485161086976"
			},
			{
				value: "436934554456948736",
				label: "永平铜矿",
				parentId: "390090725934497792",
				sort: 3,
				level: 2,
				children: [],
				selectable: false,
				title: "永平铜矿",
				key: "436934554456948736"
			},
			{
				value: "436935221909127168",
				label: "武山铜矿",
				parentId: "390090725934497792",
				sort: 4,
				level: 2,
				children: [],
				selectable: false,
				title: "武山铜矿",
				key: "436935221909127168"
			},
			{
				value: "436935493695832064",
				label: "银山矿业",
				parentId: "390090725934497792",
				sort: 5,
				level: 2,
				children: [],
				selectable: false,
				title: "银山矿业",
				key: "436935493695832064"
			},
			{
				value: "436936484168138752",
				label: "东同矿业",
				parentId: "390090725934497792",
				sort: 6,
				level: 2,
				children: [],
				selectable: false,
				title: "东同矿业",
				key: "436936484168138752"
			},
			{
				value: "436936900947738624",
				label: "四川稀土",
				parentId: "390090725934497792",
				sort: 7,
				level: 2,
				children: [],
				selectable: false,
				title: "四川稀土",
				key: "436936900947738624"
			},
			{
				value: "436937049254133760",
				label: "七宝山矿业",
				parentId: "390090725934497792",
				sort: 8,
				level: 2,
				children: [],
				selectable: false,
				title: "七宝山矿业",
				key: "436937049254133760"
			},
			{
				value: "436937866908532736",
				label: "贵溪冶炼厂",
				parentId: "390090725934497792",
				sort: 9,
				level: 2,
				children: [],
				selectable: false,
				title: "贵溪冶炼厂",
				key: "436937866908532736"
			},
			{
				value: "436942583181082624",
				label: "铅锌公司",
				parentId: "390090725934497792",
				sort: 10,
				level: 2,
				children: [],
				selectable: false,
				title: "铅锌公司",
				key: "436942583181082624"
			},
			{
				value: "436942983275741184",
				label: "金德铅业",
				parentId: "390090725934497792",
				sort: 11,
				level: 2,
				children: [],
				selectable: false,
				title: "金德铅业",
				key: "436942983275741184"
			},
			{
				value: "436943904206487552",
				label: "江铜清远",
				parentId: "390090725934497792",
				sort: 12,
				level: 2,
				children: [],
				selectable: false,
				title: "江铜清远",
				key: "436943904206487552"
			},
			{
				value: "436948078520434688",
				label: "铜加工事业部",
				parentId: "390090725934497792",
				sort: 13,
				level: 2,
				children: [],
				selectable: false,
				title: "铜加工事业部",
				key: "436948078520434688"
			},
			{
				value: "436944350979555328",
				label: "铜板带公司",
				parentId: "390090725934497792",
				sort: 14,
				level: 2,
				children: [],
				selectable: false,
				title: "铜板带公司",
				key: "436944350979555328"
			},
			{
				value: "436944640503971840",
				label: "铜箔公司",
				parentId: "390090725934497792",
				sort: 15,
				level: 2,
				children: [],
				selectable: false,
				title: "铜箔公司",
				key: "436944640503971840"
			},
			{
				value: "436945762669035520",
				label: "铜材公司",
				parentId: "390090725934497792",
				sort: 16,
				level: 2,
				children: [],
				selectable: false,
				title: "铜材公司",
				key: "436945762669035520"
			},
			{
				value: "462948831454035968",
				label: "广州铜材",
				parentId: "390090725934497792",
				sort: 17,
				level: 2,
				children: [],
				selectable: false,
				title: "广州铜材",
				key: "462948831454035968"
			},
			{
				value: "481028643292708864",
				label: "江铜物流",
				parentId: "390090725934497792",
				sort: 18,
				level: 2,
				children: [],
				selectable: false,
				title: "江铜物流",
				key: "481028643292708864"
			},
			{
				value: "481029125448925184",
				label: "南方公司",
				parentId: "390090725934497792",
				sort: 19,
				level: 2,
				children: [],
				selectable: false,
				title: "南方公司",
				key: "481029125448925184"
			}
		],
		selectable: false,
		title: "江西铜业集团有限公司",
		key: "390090725934497792"
	}
];

const selectData = [
	{ label: "全部", value: 0 },
	{ label: "第一个选项", value: 1 },
	{ label: "第二个选项", value: 2 },
	{ label: "第三个选项", value: 3 },
	{ label: "第四个选项", value: 4 },
	{ label: "第五个选项", value: 5 }
];

const tableColumns = L => {
	const arr = [];

	for (let i = 0; i < L; i++) {
		arr.push({
			title: `列头${i}`,
			dataIndex: `string${i}`,
			key: `name${i}`
		});
	}

	return arr;
};

const tableData = (cs, L) => {
	const arr = [];

	for (let i = 0; i < L; i++) {
		let obj = { key: `${i}` };
		for (let j = 0; j < cs; j++) {
			obj[`string${j}`] = `第${i + 1}行第${j + 1}列数据`;
		}
		arr.push(obj);
	}

	return arr;
};

const fakeConditionList = () => {
	return [
		{
			label: "单位",
			field: "institution",
			type: "selecttree",
			data: treeData
		},
		{
			label: "类型",
			field: "type",
			type: "select",
			data: selectData
		}
	];
};


const tb2 = [{"id":2,"institutionName":"东同矿业","areaName":"总排口","dtaValue":null,"warnUpValue":null,"warnDownValue":null,"dataTime":"2020-12-08 17:03:30","mnNumber":"57237971010003","andan":null,"andanWarnUp":null,"andanAlarmUp":null,"andanWarnDown":null,"andanAlarmDown":null,"ph":7.8906,"phWarnUP":8.5,"phWarnDown":6.5,"phAlarmUp":9,"phAlarmDown":6,"xuyang":14.2058,"xuyangWarnUp":55,"xuyangAlarmUp":60,"xuyangWarnDown":6,"xuyangAlarmDown":6,"liuliang":50.2451,"liuliangWarnUp":1000,"liuliangAlarmUp":1000,"liuliangWarnDown":11,"liuliangAlarmDown":11,"yanchen":null,"yanchenWarnUp":null,"yanchenAlarmUp":null,"yanchenWarnDown":null,"yanchenAlarmDown":null,"so2":null,"so2WarnUp":null,"so2AlarmUp":null,"so2WarnDown":null,"so2AlarmDown":null,"danyang":null,"danyangWarnUp":null,"danyangAlarmUp":null,"danyangWarnDown":null,"danyangAlarmDown":null,"yanqishidu":null,"yanqishiduWarnUp":null,"yanqishiduAlarmUp":null,"yanqishiduWarnDown":null,"yanqishiduAlarmDown":null,"yanqiyali":null,"yanqiyaliWarnUp":null,"yanqiyaliAlarmUp":null,"yanqiyaliWarnDown":null,"yanqiyaliAlarmDown":null,"yangqihanliang":null,"yangqihanliangWarnUp":null,"yangqihanliangAlarmUp":null,"yangqihanliangWarnDown":null,"yangqihanliangAlarmDown":null,"yanqiwendu":null,"yanqiwenduWarnUp":null,"yanqiwenduAlarmUp":null,"yanqiwenduWarnDown":null,"yanqiwenduAlarmDown":null,"yanqiliusu":null,"yanqiliusuWarnUp":null,"yanqiliusuAlarmUp":null,"yanqiliusuWarnDown":null,"yanqiliusuAlarmDown":null,"yanqiliulaing":null,"yanqiliulaingWarnUp":null,"yanqiliulaingAlarmUp":null,"yanqiliulaingWarnDown":null,"yanqiliulaingAlarmDown":null,"yanqidongya":null,"yanqidongyaWarnUp":null,"yanqidongyaAlarmUp":null,"yanqidongyaWarnDown":null,"yanqidongyaAlarmDown":null,"warnUp":null,"warnDown":null,"alarmUp":null,"alarmDown":null},{"id":3,"institutionName":"铅锌公司","areaName":"废水总排口","dtaValue":null,"warnUpValue":null,"warnDownValue":null,"dataTime":"2020-12-08 17:03:00","mnNumber":"62617640410069","andan":null,"andanWarnUp":null,"andanAlarmUp":null,"andanWarnDown":null,"andanAlarmDown":null,"ph":6.775,"phWarnUP":8.5,"phWarnDown":7,"phAlarmUp":9,"phAlarmDown":7,"xuyang":11.847,"xuyangWarnUp":55,"xuyangAlarmUp":60,"xuyangWarnDown":11,"xuyangAlarmDown":11,"liuliang":61.93,"liuliangWarnUp":1000,"liuliangAlarmUp":1000,"liuliangWarnDown":null,"liuliangAlarmDown":null,"yanchen":null,"yanchenWarnUp":null,"yanchenAlarmUp":null,"yanchenWarnDown":null,"yanchenAlarmDown":null,"so2":null,"so2WarnUp":null,"so2AlarmUp":null,"so2WarnDown":null,"so2AlarmDown":null,"danyang":null,"danyangWarnUp":null,"danyangAlarmUp":null,"danyangWarnDown":null,"danyangAlarmDown":null,"yanqishidu":null,"yanqishiduWarnUp":null,"yanqishiduAlarmUp":null,"yanqishiduWarnDown":null,"yanqishiduAlarmDown":null,"yanqiyali":null,"yanqiyaliWarnUp":null,"yanqiyaliAlarmUp":null,"yanqiyaliWarnDown":null,"yanqiyaliAlarmDown":null,"yangqihanliang":null,"yangqihanliangWarnUp":null,"yangqihanliangAlarmUp":null,"yangqihanliangWarnDown":null,"yangqihanliangAlarmDown":null,"yanqiwendu":null,"yanqiwenduWarnUp":null,"yanqiwenduAlarmUp":null,"yanqiwenduWarnDown":null,"yanqiwenduAlarmDown":null,"yanqiliusu":null,"yanqiliusuWarnUp":null,"yanqiliusuAlarmUp":null,"yanqiliusuWarnDown":null,"yanqiliusuAlarmDown":null,"yanqiliulaing":null,"yanqiliulaingWarnUp":null,"yanqiliulaingAlarmUp":null,"yanqiliulaingWarnDown":null,"yanqiliulaingAlarmDown":null,"yanqidongya":null,"yanqidongyaWarnUp":null,"yanqidongyaAlarmUp":null,"yanqidongyaWarnDown":null,"yanqidongyaAlarmDown":null,"warnUp":null,"warnDown":null,"alarmUp":null,"alarmDown":null},{"id":4,"institutionName":"四川稀土","areaName":"漫水湾冶炼分离厂废水总排口","dtaValue":null,"warnUpValue":null,"warnDownValue":null,"dataTime":"2020-12-08 17:03:00","mnNumber":"45666291110136","andan":0.718,"andanWarnUp":12,"andanAlarmUp":15,"andanWarnDown":5,"andanAlarmDown":5,"ph":7.184,"phWarnUP":8.5,"phWarnDown":6.5,"phAlarmUp":9,"phAlarmDown":6,"xuyang":15.716,"xuyangWarnUp":65,"xuyangAlarmUp":70,"xuyangWarnDown":11,"xuyangAlarmDown":11,"liuliang":0.699,"liuliangWarnUp":1000,"liuliangAlarmUp":1000,"liuliangWarnDown":11,"liuliangAlarmDown":11,"yanchen":null,"yanchenWarnUp":null,"yanchenAlarmUp":null,"yanchenWarnDown":null,"yanchenAlarmDown":null,"so2":null,"so2WarnUp":null,"so2AlarmUp":null,"so2WarnDown":null,"so2AlarmDown":null,"danyang":null,"danyangWarnUp":null,"danyangAlarmUp":null,"danyangWarnDown":null,"danyangAlarmDown":null,"yanqishidu":null,"yanqishiduWarnUp":null,"yanqishiduAlarmUp":null,"yanqishiduWarnDown":null,"yanqishiduAlarmDown":null,"yanqiyali":null,"yanqiyaliWarnUp":null,"yanqiyaliAlarmUp":null,"yanqiyaliWarnDown":null,"yanqiyaliAlarmDown":null,"yangqihanliang":null,"yangqihanliangWarnUp":null,"yangqihanliangAlarmUp":null,"yangqihanliangWarnDown":null,"yangqihanliangAlarmDown":null,"yanqiwendu":null,"yanqiwenduWarnUp":null,"yanqiwenduAlarmUp":null,"yanqiwenduWarnDown":null,"yanqiwenduAlarmDown":null,"yanqiliusu":null,"yanqiliusuWarnUp":null,"yanqiliusuAlarmUp":null,"yanqiliusuWarnDown":null,"yanqiliusuAlarmDown":null,"yanqiliulaing":null,"yanqiliulaingWarnUp":null,"yanqiliulaingAlarmUp":null,"yanqiliulaingWarnDown":null,"yanqiliulaingAlarmDown":null,"yanqidongya":null,"yanqidongyaWarnUp":null,"yanqidongyaAlarmUp":null,"yanqidongyaWarnDown":null,"yanqidongyaAlarmDown":null,"warnUp":null,"warnDown":null,"alarmUp":null,"alarmDown":null},{"id":5,"institutionName":"铜箔公司","areaName":"工艺废水排放口","dtaValue":null,"warnUpValue":null,"warnDownValue":null,"dataTime":"2020-12-08 17:01:00","mnNumber":"88888880000001","andan":9.1,"andanWarnUp":40,"andanAlarmUp":45,"andanWarnDown":11,"andanAlarmDown":11,"ph":6.68,"phWarnUP":8.5,"phWarnDown":6.5,"phAlarmUp":9,"phAlarmDown":6,"xuyang":14.2,"xuyangWarnUp":450,"xuyangAlarmUp":500,"xuyangWarnDown":11,"xuyangAlarmDown":11,"liuliang":8.19,"liuliangWarnUp":1000,"liuliangAlarmUp":1000,"liuliangWarnDown":11,"liuliangAlarmDown":11,"yanchen":null,"yanchenWarnUp":null,"yanchenAlarmUp":null,"yanchenWarnDown":null,"yanchenAlarmDown":null,"so2":null,"so2WarnUp":null,"so2AlarmUp":null,"so2WarnDown":null,"so2AlarmDown":null,"danyang":null,"danyangWarnUp":null,"danyangAlarmUp":null,"danyangWarnDown":null,"danyangAlarmDown":null,"yanqishidu":null,"yanqishiduWarnUp":null,"yanqishiduAlarmUp":null,"yanqishiduWarnDown":null,"yanqishiduAlarmDown":null,"yanqiyali":null,"yanqiyaliWarnUp":null,"yanqiyaliAlarmUp":null,"yanqiyaliWarnDown":null,"yanqiyaliAlarmDown":null,"yangqihanliang":null,"yangqihanliangWarnUp":null,"yangqihanliangAlarmUp":null,"yangqihanliangWarnDown":null,"yangqihanliangAlarmDown":null,"yanqiwendu":null,"yanqiwenduWarnUp":null,"yanqiwenduAlarmUp":null,"yanqiwenduWarnDown":null,"yanqiwenduAlarmDown":null,"yanqiliusu":null,"yanqiliusuWarnUp":null,"yanqiliusuAlarmUp":null,"yanqiliusuWarnDown":null,"yanqiliusuAlarmDown":null,"yanqiliulaing":null,"yanqiliulaingWarnUp":null,"yanqiliulaingAlarmUp":null,"yanqiliulaingWarnDown":null,"yanqiliulaingAlarmDown":null,"yanqidongya":null,"yanqidongyaWarnUp":null,"yanqidongyaAlarmUp":null,"yanqidongyaWarnDown":null,"yanqidongyaAlarmDown":null,"warnUp":null,"warnDown":null,"alarmUp":null,"alarmDown":null},{"id":6,"institutionName":"武山铜矿","areaName":"黄桥排口","dtaValue":null,"warnUpValue":null,"warnDownValue":null,"dataTime":"2020-12-08 17:04:00","mnNumber":"53360050410055","andan":0,"andanWarnUp":7.5,"andanAlarmUp":8,"andanWarnDown":6,"andanAlarmDown":5,"ph":7.373,"phWarnUP":8.5,"phWarnDown":6.5,"phAlarmUp":9,"phAlarmDown":6,"xuyang":10.0694,"xuyangWarnUp":55,"xuyangAlarmUp":60,"xuyangWarnDown":11,"xuyangAlarmDown":11,"liuliang":58.5446,"liuliangWarnUp":1000,"liuliangAlarmUp":1000,"liuliangWarnDown":111,"liuliangAlarmDown":111,"yanchen":null,"yanchenWarnUp":null,"yanchenAlarmUp":null,"yanchenWarnDown":null,"yanchenAlarmDown":null,"so2":null,"so2WarnUp":null,"so2AlarmUp":null,"so2WarnDown":null,"so2AlarmDown":null,"danyang":null,"danyangWarnUp":null,"danyangAlarmUp":null,"danyangWarnDown":null,"danyangAlarmDown":null,"yanqishidu":null,"yanqishiduWarnUp":null,"yanqishiduAlarmUp":null,"yanqishiduWarnDown":null,"yanqishiduAlarmDown":null,"yanqiyali":null,"yanqiyaliWarnUp":null,"yanqiyaliAlarmUp":null,"yanqiyaliWarnDown":null,"yanqiyaliAlarmDown":null,"yangqihanliang":null,"yangqihanliangWarnUp":null,"yangqihanliangAlarmUp":null,"yangqihanliangWarnDown":null,"yangqihanliangAlarmDown":null,"yanqiwendu":null,"yanqiwenduWarnUp":null,"yanqiwenduAlarmUp":null,"yanqiwenduWarnDown":null,"yanqiwenduAlarmDown":null,"yanqiliusu":null,"yanqiliusuWarnUp":null,"yanqiliusuAlarmUp":null,"yanqiliusuWarnDown":null,"yanqiliusuAlarmDown":null,"yanqiliulaing":null,"yanqiliulaingWarnUp":null,"yanqiliulaingAlarmUp":null,"yanqiliulaingWarnDown":null,"yanqiliulaingAlarmDown":null,"yanqidongya":null,"yanqidongyaWarnUp":null,"yanqidongyaAlarmUp":null,"yanqidongyaWarnDown":null,"yanqidongyaAlarmDown":null,"warnUp":null,"warnDown":null,"alarmUp":null,"alarmDown":null},{"id":7,"institutionName":"武山铜矿","areaName":"南桥排口","dtaValue":null,"warnUpValue":null,"warnDownValue":null,"dataTime":"2020-12-08 17:04:30","mnNumber":"47568770410064","andan":0.0938,"andanWarnUp":1000,"andanAlarmUp":1000,"andanWarnDown":10,"andanAlarmDown":1000,"ph":7.5958,"phWarnUP":1000,"phWarnDown":10,"phAlarmUp":1000,"phAlarmDown":1000,"xuyang":18.5458,"xuyangWarnUp":1000,"xuyangAlarmUp":1000,"xuyangWarnDown":10,"xuyangAlarmDown":1000,"liuliang":94.2085,"liuliangWarnUp":1000,"liuliangAlarmUp":1000,"liuliangWarnDown":10,"liuliangAlarmDown":1000,"yanchen":null,"yanchenWarnUp":null,"yanchenAlarmUp":null,"yanchenWarnDown":null,"yanchenAlarmDown":null,"so2":null,"so2WarnUp":null,"so2AlarmUp":null,"so2WarnDown":null,"so2AlarmDown":null,"danyang":null,"danyangWarnUp":null,"danyangAlarmUp":null,"danyangWarnDown":null,"danyangAlarmDown":null,"yanqishidu":null,"yanqishiduWarnUp":null,"yanqishiduAlarmUp":null,"yanqishiduWarnDown":null,"yanqishiduAlarmDown":null,"yanqiyali":null,"yanqiyaliWarnUp":null,"yanqiyaliAlarmUp":null,"yanqiyaliWarnDown":null,"yanqiyaliAlarmDown":null,"yangqihanliang":null,"yangqihanliangWarnUp":null,"yangqihanliangAlarmUp":null,"yangqihanliangWarnDown":null,"yangqihanliangAlarmDown":null,"yanqiwendu":null,"yanqiwenduWarnUp":null,"yanqiwenduAlarmUp":null,"yanqiwenduWarnDown":null,"yanqiwenduAlarmDown":null,"yanqiliusu":null,"yanqiliusuWarnUp":null,"yanqiliusuAlarmUp":null,"yanqiliusuWarnDown":null,"yanqiliusuAlarmDown":null,"yanqiliulaing":null,"yanqiliulaingWarnUp":null,"yanqiliulaingAlarmUp":null,"yanqiliulaingWarnDown":null,"yanqiliulaingAlarmDown":null,"yanqidongya":null,"yanqidongyaWarnUp":null,"yanqidongyaAlarmUp":null,"yanqidongyaWarnDown":null,"yanqidongyaAlarmDown":null,"warnUp":null,"warnDown":null,"alarmUp":null,"alarmDown":null},{"id":8,"institutionName":"银山矿业","areaName":"尾矿库排口","dtaValue":null,"warnUpValue":null,"warnDownValue":null,"dataTime":"2020-12-08 17:02:30","mnNumber":"47568771110023","andan":3.852,"andanWarnUp":7.5,"andanAlarmUp":8,"andanWarnDown":7,"andanAlarmDown":6,"ph":7.324,"phWarnUP":8.5,"phWarnDown":6.5,"phAlarmUp":9,"phAlarmDown":6,"xuyang":21.62,"xuyangWarnUp":55,"xuyangAlarmUp":60,"xuyangWarnDown":11,"xuyangAlarmDown":11,"liuliang":186.188,"liuliangWarnUp":1000,"liuliangAlarmUp":1000,"liuliangWarnDown":11,"liuliangAlarmDown":11,"yanchen":null,"yanchenWarnUp":null,"yanchenAlarmUp":null,"yanchenWarnDown":null,"yanchenAlarmDown":null,"so2":null,"so2WarnUp":null,"so2AlarmUp":null,"so2WarnDown":null,"so2AlarmDown":null,"danyang":null,"danyangWarnUp":null,"danyangAlarmUp":null,"danyangWarnDown":null,"danyangAlarmDown":null,"yanqishidu":null,"yanqishiduWarnUp":null,"yanqishiduAlarmUp":null,"yanqishiduWarnDown":null,"yanqishiduAlarmDown":null,"yanqiyali":null,"yanqiyaliWarnUp":null,"yanqiyaliAlarmUp":null,"yanqiyaliWarnDown":null,"yanqiyaliAlarmDown":null,"yangqihanliang":null,"yangqihanliangWarnUp":null,"yangqihanliangAlarmUp":null,"yangqihanliangWarnDown":null,"yangqihanliangAlarmDown":null,"yanqiwendu":null,"yanqiwenduWarnUp":null,"yanqiwenduAlarmUp":null,"yanqiwenduWarnDown":null,"yanqiwenduAlarmDown":null,"yanqiliusu":null,"yanqiliusuWarnUp":null,"yanqiliusuAlarmUp":null,"yanqiliusuWarnDown":null,"yanqiliusuAlarmDown":null,"yanqiliulaing":null,"yanqiliulaingWarnUp":null,"yanqiliulaingAlarmUp":null,"yanqiliulaingWarnDown":null,"yanqiliulaingAlarmDown":null,"yanqidongya":null,"yanqidongyaWarnUp":null,"yanqidongyaAlarmUp":null,"yanqidongyaWarnDown":null,"yanqidongyaAlarmDown":null,"warnUp":null,"warnDown":null,"alarmUp":null,"alarmDown":null},{"id":9,"institutionName":"城门山铜矿","areaName":"入河排污口","dtaValue":null,"warnUpValue":null,"warnDownValue":null,"dataTime":"2020-12-08 17:03:30","mnNumber":"57237970410025","andan":0.787037014961243,"andanWarnUp":7.5,"andanAlarmUp":8,"andanWarnDown":7,"andanAlarmDown":6,"ph":7.37673616409302,"phWarnUP":7.5,"phWarnDown":7,"phAlarmUp":8,"phAlarmDown":6,"xuyang":26.4467582702637,"xuyangWarnUp":7.5,"xuyangAlarmUp":8,"xuyangWarnDown":7,"xuyangAlarmDown":6,"liuliang":null,"liuliangWarnUp":null,"liuliangAlarmUp":null,"liuliangWarnDown":null,"liuliangAlarmDown":null,"yanchen":null,"yanchenWarnUp":null,"yanchenAlarmUp":null,"yanchenWarnDown":null,"yanchenAlarmDown":null,"so2":null,"so2WarnUp":null,"so2AlarmUp":null,"so2WarnDown":null,"so2AlarmDown":null,"danyang":null,"danyangWarnUp":null,"danyangAlarmUp":null,"danyangWarnDown":null,"danyangAlarmDown":null,"yanqishidu":null,"yanqishiduWarnUp":null,"yanqishiduAlarmUp":null,"yanqishiduWarnDown":null,"yanqishiduAlarmDown":null,"yanqiyali":null,"yanqiyaliWarnUp":null,"yanqiyaliAlarmUp":null,"yanqiyaliWarnDown":null,"yanqiyaliAlarmDown":null,"yangqihanliang":null,"yangqihanliangWarnUp":null,"yangqihanliangAlarmUp":null,"yangqihanliangWarnDown":null,"yangqihanliangAlarmDown":null,"yanqiwendu":null,"yanqiwenduWarnUp":null,"yanqiwenduAlarmUp":null,"yanqiwenduWarnDown":null,"yanqiwenduAlarmDown":null,"yanqiliusu":null,"yanqiliusuWarnUp":null,"yanqiliusuAlarmUp":null,"yanqiliusuWarnDown":null,"yanqiliusuAlarmDown":null,"yanqiliulaing":null,"yanqiliulaingWarnUp":null,"yanqiliulaingAlarmUp":null,"yanqiliulaingWarnDown":null,"yanqiliulaingAlarmDown":null,"yanqidongya":null,"yanqidongyaWarnUp":null,"yanqidongyaAlarmUp":null,"yanqidongyaWarnDown":null,"yanqidongyaAlarmDown":null,"warnUp":null,"warnDown":null,"alarmUp":null,"alarmDown":null},{"id":10,"institutionName":"贵溪冶炼厂","areaName":"废水总排口","dtaValue":null,"warnUpValue":null,"warnDownValue":null,"dataTime":"2020-12-08 17:03:00","mnNumber":"57237970610001","andan":null,"andanWarnUp":null,"andanAlarmUp":null,"andanWarnDown":null,"andanAlarmDown":null,"ph":null,"phWarnUP":null,"phWarnDown":null,"phAlarmUp":null,"phAlarmDown":null,"xuyang":null,"xuyangWarnUp":null,"xuyangAlarmUp":null,"xuyangWarnDown":null,"xuyangAlarmDown":null,"liuliang":null,"liuliangWarnUp":null,"liuliangAlarmUp":null,"liuliangWarnDown":null,"liuliangAlarmDown":null,"yanchen":null,"yanchenWarnUp":null,"yanchenAlarmUp":null,"yanchenWarnDown":null,"yanchenAlarmDown":null,"so2":null,"so2WarnUp":null,"so2AlarmUp":null,"so2WarnDown":null,"so2AlarmDown":null,"danyang":null,"danyangWarnUp":null,"danyangAlarmUp":null,"danyangWarnDown":null,"danyangAlarmDown":null,"yanqishidu":null,"yanqishiduWarnUp":null,"yanqishiduAlarmUp":null,"yanqishiduWarnDown":null,"yanqishiduAlarmDown":null,"yanqiyali":null,"yanqiyaliWarnUp":null,"yanqiyaliAlarmUp":null,"yanqiyaliWarnDown":null,"yanqiyaliAlarmDown":null,"yangqihanliang":null,"yangqihanliangWarnUp":null,"yangqihanliangAlarmUp":null,"yangqihanliangWarnDown":null,"yangqihanliangAlarmDown":null,"yanqiwendu":null,"yanqiwenduWarnUp":null,"yanqiwenduAlarmUp":null,"yanqiwenduWarnDown":null,"yanqiwenduAlarmDown":null,"yanqiliusu":null,"yanqiliusuWarnUp":null,"yanqiliusuAlarmUp":null,"yanqiliusuWarnDown":null,"yanqiliusuAlarmDown":null,"yanqiliulaing":null,"yanqiliulaingWarnUp":null,"yanqiliulaingAlarmUp":null,"yanqiliulaingWarnDown":null,"yanqiliulaingAlarmDown":null,"yanqidongya":null,"yanqidongyaWarnUp":null,"yanqidongyaAlarmUp":null,"yanqidongyaWarnDown":null,"yanqidongyaAlarmDown":null,"warnUp":null,"warnDown":null,"alarmUp":null,"alarmDown":null}]

export { treeData, tableColumns, tableData, fakeConditionList,tb2 };
