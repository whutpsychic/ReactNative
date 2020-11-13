const data = {};

data.mainQueryData = [
	{
		name: 'risk',
		title: '风险管控',
		children: [
			{label: '隐患排查', position: 'danger_screening_administer'},
			{label: '风险管控', position: 'risk_grade_control'},
		],
	},
	{
		name: 'publish',
		title: '信息发布',
		children: [
			{label: '新闻审批', position: 'news_approval'},
			{label: '风险审批', position: 'risk_tips_approval'},
		],
	},
	{
		name: 'urgency',
		title: '应急管理',
		children: [
			{label: '应急预案', position: 'emergency_reserve_plan'},
			{label: '救援与评估', position: 'rescue_drill'},
		],
	},
	{
		name: 'accident',
		title: '事故管理',
		children: [
			{label: '事故快报', position: 'accident_quick_report'},
			{label: '安全生产', position: 'safe_producing_calendar'},
			{label: '事故查询', position: 'accident_query'},
		],
	},
	{
		name: 'importantArea',
		title: '重点区域管理',
		children: [
			{label: '酸性水库', position: 'acidic_reservoir_info'},
			{label: '降雨量', position: 'rain_info'},
			{label: '废水处理', position: 'waste_water'},
		],
	},
	{
		name: 'identity',
		title: '证照管理',
		children: [{label: '安环证照', position: 'safe_env_certificates'}],
	},
	{
		name: 'train',
		title: '培训管理',
		children: [{label: '教育培训', position: 'educating_stand_book'}],
	},
	{
		name: 'about',
		title: '相关方信息',
		children: [{label: '相关方信息', position: 'relationship_info'}],
	},
	{
		name: 'danger',
		title: '危险品',
		children: [{label: '危险品信息', position: 'danger_chemical'}],
	},
	{
		name: 'ecology',
		title: '生态修复',
		children: [{label: '生态修复', position: 'ecology_repair_info'}],
	},
	{
		name: 'fireexit',
		title: '消防管理',
		children: [{label: '消防管理', position: 'fire_control_manage'}],
	},
	{
		name: 'file',
		title: '档案管理',
		children: [
			{label: '法律法规', position: 'law_standard'},
			{label: '履职报告', position: 'duties_report'},
			{label: '文件通知', position: 'file_notice'},
			{label: '安全档案', position: 'archives_safe'},
			{label: '环保档案', position: 'archives_env'},
			{label: '职业卫生', position: 'archives_occupation'},
			{label: '规章制度', position: 'archives_rules'},
			{label: '其他档案', position: 'archives_others'},
		],
	},
	{
		name: 'checkol',
		title: '在线监测',
		children: [
			{label: '异常（集团）', position: 'abnormal_info_group'},
			{label: '异常（企业）', position: 'abnormal_info_enterprise'},
			{label: '实时数据', position: 'monitor_oldata_list'},
		],
	},
];

export default data;
