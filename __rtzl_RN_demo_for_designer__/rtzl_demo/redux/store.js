import {createStore, combineReducers} from 'redux';
import {
  initializingReducer,
  set_MMBN1_Reducer,
  set_MMBN2_Reducer,
  set_MMBN3_Reducer,
  set_MMBN4_Reducer,
} from './reducers';

const store = createStore(
  combineReducers({
    //是否正在进行初始化
    initializing: initializingReducer,

    //首页小红点
    mainMenuBadge1: set_MMBN1_Reducer,
    //信息维护小红点
    mainMenuBadge2: set_MMBN2_Reducer,
    //信息查询小红点
    mainMenuBadge3: set_MMBN3_Reducer,
    //视频小红点
    mainMenuBadge4: set_MMBN4_Reducer,
  }),
);

export default store;
