//自制自适应屏幕体制
import {Dimensions} from 'react-native';
const adaption = {};

adaption.vw = Dimensions.get('window').width / 100;
adaption.vh = Dimensions.get('window').height / 100;

export default adaption;
