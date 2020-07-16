const config = {};

config.mode = 'production';
// config.mode = 'develop';
config.xcurl = false;

config.mesurl="http://172.24.63.203:80"

// ******************************
//	样式相关常量
// ******************************
//顶部条高度
config.statusBar = 20;

//底部tab高度
config.bottomTabHeight = 56;

//navigation-title高度
config.navigationTitleHeight = 48;

//各题型题干字体大小
config.questionTitleFontSize = 16;

// ******************************
//	配置常量
// ******************************
//请求考试列表的每页条数
config.pageSize = 20;

//每次查询更多加载条数
config.ps = 10;

export default config;
