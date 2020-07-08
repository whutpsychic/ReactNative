//这是一个自适应模块
//由于不同型号的手机屏幕大小不一，按比例调整显示大小
import {Dimensions} from 'react-native';

const _default = {};

_default.vw = Dimensions.get('window').width / 100;
_default.vh = Dimensions.get('window').height / 100;

export default _default;
