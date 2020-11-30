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

export { treeData, tableColumns, tableData, fakeConditionList };
