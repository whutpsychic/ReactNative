import {AsyncStorage} from 'react-native';

const storage = {};

//保存数据：
storage.setData = async (key, values) => {
	try {
		await AsyncStorage.setItem(key, values);
	} catch (error) {
		// Error saving data
	}
};

//读取数据：
storage.getData = async key => {
	try {
		const value = await AsyncStorage.getItem(key);
		if (value !== null) {
			// We have data!!
			console.log(value);
		}
	} catch (error) {
		// Error retrieving data
	}
};

export default storage;
//所有用到的字段
//isLogin ------------------------- 是否是已登录状态









