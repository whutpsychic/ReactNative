import {StyleSheet} from 'react-native';
import AD from '../../tools/adaption.js';

const {vw} = AD;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    width: 300 * vw,
    height: 300 * vw,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  modeSelectorContainer: {
    backgroundColor: '#000',
    width: 100 * vw,
    height: 30 * vw,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modeSelector: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 20,
    marginRight: 20,
  },
  active: {
    color: 'lightgreen',
    fontWeight: 'bold',
  },
  topNavigator: {
    width: 100 * vw,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingLeft: 12,
    paddingRight: 12,
  },
  backBtn: {
    width: 30,
    height: 30,
  },
});

export default styles;
