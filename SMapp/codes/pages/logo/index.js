import React from 'react';
import {StyleSheet, View, Text, StatusBar, Image} from 'react-native';

import {connect} from 'react-redux';
import {initializing, login} from '../../redux/actions.js';
import storage from '../../core/storage.js';
import logo from './logo.png';

// import sa from '../../core/style-adaption.js';
// const {vw, vh} = sa;

class Default extends React.Component {
  componentDidMount() {
    const {setLoginState} = this.props;
    //检查是否已登录状态设定
    storage.getData('smapp_isLoggin').then(state => {
      setLoginState(!!state);
    });

    //停留两秒
    setTimeout(() => {
      const {setInitializingState} = this.props;

      //结束初始化
      setInitializingState(false);
    }, 2000);
  }

  render() {
    return (
      <React.Fragment>
        <StatusBar
          hidden={true}
          backgroundColor={'transparent'}
          translucent={true}
        />
        <View style={styles.sectionContainer}>
          <Image style={styles.bg} resizeMode={'contain'} source={logo} />
        </View>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    setInitializingState: v => {
      dispatch(initializing(v));
    },
    setLoginState: v => {
      dispatch(login(v));
    },
  };
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: 'darkblue',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bg: {},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Default);
