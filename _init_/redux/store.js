import {createStore, combineReducers} from 'redux';
import {
  initializingReducer,
  isLoginReducer,
  set_MMBN1_Reducer,
  set_MMBN2_Reducer,
  set_MMBN3_Reducer,
  set_MMBN4_Reducer,
  set_NETWORKSTATE_Reducer,
} from './reducers';

const store = createStore(
  combineReducers({
    //是否正在进行初始化
    initializing: initializingReducer,
    //当前是否已经是登录状态
    isLogin: isLoginReducer,

    //首页小红点
    mainMenuBadge1: set_MMBN1_Reducer,
    //学习小红点
    mainMenuBadge2: set_MMBN2_Reducer,
    //考试小红点
    mainMenuBadge3: set_MMBN3_Reducer,
    //我的小红点
    mainMenuBadge4: set_MMBN4_Reducer,

    //网络连接状态
    network: set_NETWORKSTATE_Reducer,
  }),
);

export default store;
