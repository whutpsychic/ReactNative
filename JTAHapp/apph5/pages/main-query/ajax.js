const ajax = {};

ajax.query = () => {
	return new Promise((resolve, reject) => {
		const mockData = [
			{
				name: "risk",
				title: "风险管控",
				children: [
					{ label: "隐患排查", position: "hell" },
					{ label: "风险管控", position: "hell" }
				]
			},
			{
				name: "publish",
				title: "信息发布",
				children: [
					{ label: "新闻审批", position: "hell" },
					{ label: "风险审批", position: "hell" }
				]
			},
			{
				name: "urgency",
				title: "应急管理",
				children: [
					{ label: "应急预案", position: "hell" },
					{ label: "救援与评估", position: "hell" }
				]
			},
			{
				name: "accident",
				title: "事故管理",
				children: [
					{ label: "事故快报", position: "hell" },
					{ label: "安全生产", position: "hell" },
					{ label: "事故查询", position: "hell" }
				]
			},
			{
				name: "importantArea",
				title: "重点区域管理",
				children: [
					{ label: "酸性水库", position: "hell" },
					{ label: "降雨量", position: "hell" },
					{ label: "废水处理", position: "hell" }
				]
			},
			{
				name: "identity",
				title: "证照管理",
				children: [{ label: "安环证照", position: "hell" }]
			},
			{
				name: "train",
				title: "培训管理",
				children: [{ label: "教育培训", position: "hell" }]
			},
			{
				name: "about",
				title: "相关方信息",
				children: [{ label: "相关方信息", position: "hell" }]
			},
			{
				name: "danger",
				title: "危险品",
				children: [{ label: "危险品信息", position: "hell" }]
			},
			{
				name: "ecology",
				title: "生态修复",
				children: [
					{ label: "生态修复", position: "hell" },
					{ label: "生态修复2", position: "hell" }
				]
			},
			{
				name: "fireexit",
				title: "消防管理",
				children: [{ label: "消防资料", position: "hell" }]
			},
			{
				name: "file",
				title: "档案管理",
				children: [
					{ label: "法律法规", position: "hell" },
					{ label: "档案管理-档案管理-所有", position: "hell" },
					{ label: "履职报告", position: "hell" },
					{ label: "文件通知", position: "hell" }
				]
			}
		];

		setTimeout(() => {
			resolve(mockData);
		}, 10);
	});
};

export default ajax;
