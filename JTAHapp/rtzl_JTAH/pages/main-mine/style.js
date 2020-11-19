import {StyleSheet} from 'react-native';
import sa from '../../core/style-adaption.js';

const {vw} = sa;
const listItemPadding = [16, 4, 16, 16];
const avatarSize = 25 * vw;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  identityContainer: {
    width: '100%',
    height: 160,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  avatar: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
  },
  infoContainer: {
    flexBasis: '60%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  name: {
    flexBasis: '100%',
    fontSize: 24,
    color: '#333',
    paddingBottom: 4,
  },
  roleName: {
    flexBasis: '100%',
    fontSize: 14,
    color: '#999',
  },
  email: {
    flexBasis: '100%',
    fontSize: 14,
    color: '#999',
  },
  listContainer: {
    marginTop: 8,
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: listItemPadding[0],
    paddingRight: listItemPadding[1],
    paddingBottom: listItemPadding[2],
    paddingLeft: listItemPadding[3],
    marginBottom: 8,
    // borderBottomWidth: 1,
    // borderColor: '#ccc',
  },
  withBottomborder: {
    borderBottomWidth: 0,
  },
  listItemText: {
    fontSize: 15,
    color: '#333',
  },
  listItemArrow: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 10,
  },
});

export default styles;
