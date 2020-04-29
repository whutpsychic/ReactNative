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

export {initializing, login};
