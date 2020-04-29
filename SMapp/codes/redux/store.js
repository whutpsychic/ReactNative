import {createStore, combineReducers} from 'redux';
import {initializingReducer, isLoginReducer} from './reducers';

const store = createStore(
	combineReducers({
		//是否正在进行初始化
		initializing: initializingReducer,
		//当前是否已经是登录状态
		isLogin: isLoginReducer,
	}),
);

export default store;
