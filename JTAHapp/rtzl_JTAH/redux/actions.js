const initializing = value => {
	return {
		type: 'INITIALIZING',
		value,
	};
};

const login = value => {
	return {
		type: 'ISLOGIN',
		value,
	};
};

//设置第一个菜单的 badge
const setMMB1 = value => ({
	type: 'SET_MAIN_MENU_BADGE1',
	value,
});

//设置第二个菜单的 badge
const setMMB2 = value => ({
	type: 'SET_MAIN_MENU_BADGE2',
	value,
});

//设置第三个菜单的 badge
const setMMB3 = value => ({
	type: 'SET_MAIN_MENU_BADGE3',
	value,
});

//设置第四个菜单的 badge
const setMMB4 = value => ({
	type: 'SET_MAIN_MENU_BADGE4',
	value,
});

//设置第五个菜单的 badge
const setMMB5 = value => ({
	type: 'SET_MAIN_MENU_BADGE5',
	value,
});

//设置网络状态
const setNetworkState = value => ({
	type: 'SET_NETWORK_STATE',
	isConnected: value.isConnected,
	connectionType: value.connectionType,
});

export {
	initializing,
	login,
	setMMB1,
	setMMB2,
	setMMB3,
	setMMB4,
	setMMB5,
	setNetworkState,
};
