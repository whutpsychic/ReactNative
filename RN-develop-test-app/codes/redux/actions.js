const seturl = (value) => {
	return {
		type: 'SETURL',
		value,
	};
};

const setport = (value) => {
	return {
		type: 'SETPORT',
		value,
	};
};

export {seturl, setport};
