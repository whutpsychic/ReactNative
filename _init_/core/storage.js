import AsyncStorage from "@react-native-community/async-storage";

//本地数据缓存技术
const LocalStorage = {
	//获取本地数据
	getData: async key => {
		try {
			const value = await AsyncStorage.getItem(key);
			if (typeof value === "string") return value;
			return JSON.parse(value);
		} catch (error) {
			console.log(error);
		}
	},

	//写入本地数据
	setData: async (key, value) => {
		if (typeof value === "string") {
		} else {
			value = JSON.stringify(value);
		}
		try {
			await AsyncStorage.setItem(key, value);
		} catch (error) {
			console.log(error);
		}
	}
};

export default LocalStorage;

//所有字段值标注:
// jcapp_userName:""登录名
// jcapp_psw:""登录密码
// jcapp_token:""用户token
// jcapp_studySearchHistory:[]学习资料历史搜索
// jcapp_identity: 用户id
// jcapp_examId: 当前考试的id（用于记录作弊嫌疑）

//用于展示的用户个人信息
// jcapp_user_name:"" 用户名
// jcapp_user_roleName:""角色名
// jcapp_user_email:""用户邮箱

// ===========================暂时未用到===========================
// jcapp_JpushTags: []当前推送标签







// ===========================废弃===========================
// backgroundTimes: 切换后台次数
