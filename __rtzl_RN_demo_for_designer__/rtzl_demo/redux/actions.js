const initializing = (value) => {
	return {
		type: 'INITIALIZING',
		value,
	};
};

//设置第一个菜单的 badge
const setMMB1 = (value) => ({
	type: 'SET_MAIN_MENU_BADGE1',
	value,
});

//设置第二个菜单的 badge
const setMMB2 = (value) => ({
	type: 'SET_MAIN_MENU_BADGE2',
	value,
});

//设置第三个菜单的 badge
const setMMB3 = (value) => ({
	type: 'SET_MAIN_MENU_BADGE3',
	value,
});

//设置第四个菜单的 badge
const setMMB4 = (value) => ({
	type: 'SET_MAIN_MENU_BADGE4',
	value,
});

export {
	initializing,
	setMMB1,
	setMMB2,
	setMMB3,
	setMMB4,
};
