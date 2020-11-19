import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import styles from './style.js';
import {connect} from 'react-redux';
import {login, setMMB4} from '../../redux/actions';
import defaultAvatar from './photo.png';
import storage from '../../core/storage.js';
import Confirm from '../../components/Confirm/index';

class Item extends React.Component {
  render() {
    const {text, style} = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.pressItem}>
        <View style={[styles.listItem, style]}>
          <Text style={styles.listItemText}>{text}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  pressItem = () => {
    const {onPress} = this.props;
    if (typeof onPress === 'function') {
      onPress();
    }
  };
}

class Default extends Component {
  state = {
    avatar: null,
    user_name: null,
    user_roleName: null,
    user_email: null,
  };

  componentDidMount() {
    // //清空小红点
    // const {clearBadges} = this.props;
    // clearBadges();
    // storage.getData('jcapp_user_name').then((user_name) => {
    //   this.setState({
    //     user_name,
    //   });
    // });
    // storage.getData('jcapp_user_roleName').then((user_roleName) => {
    //   this.setState({
    //     user_roleName,
    //   });
    // });
    // storage.getData('jcapp_user_email').then((user_email) => {
    //   this.setState({
    //     user_email,
    //   });
    // });
  }

  render() {
    const {avatar, user_name, user_roleName, user_email} = this.state;
    return (
      <View style={styles.container}>
        {/*<View style={styles.identityContainer}>
          {
            <Image
              alt={'头像'}
              source={avatar ? avatar : defaultAvatar}
              style={styles.avatar}
            />
          }
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{user_name ? user_name : '姓名'}</Text>
            <Text style={styles.roleName}>
              {user_roleName ? user_roleName : '账号信息账号信息'}
            </Text>
            <Text style={styles.email}>
              绑定邮箱：{user_email ? user_email : '账号信息账号信息'}
            </Text>
          </View>
        </View>*/}
        <View style={styles.listContainer}>
          {/*<Item
            text="修改密码"
            onPress={() => {
              this.pressItem('xgmm');
            }}
          />*/}
          <Item
            text="退出登录"
            onPress={() => {
              this.pressItem('tcdl');
            }}
          />
        </View>
        <Confirm ref="confirm" />
      </View>
    );
  }

  pressItem = (str) => {
    //修改密码
    if (str === 'xgmm') {
      const {
        navigation: {navigate},
      } = this.props;
      navigate('changePsw');
    }
    //退出登录
    else if (str === 'tcdl') {
      const {
        navigation: {navigate},
        logout,
      } = this.props;

      this.refs.confirm.show('确认退出？', () => {
        logout();
      });
      return;
    }
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(login(false));
    },
    clearBadges: () => {
      dispatch(setMMB4(0));
    },
  };
};

export default connect(null, mapDispatchToProps)(Default);
