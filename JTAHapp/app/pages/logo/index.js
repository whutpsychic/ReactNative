import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
import {initializing, login} from '../../redux/actions.js';

class Default extends React.Component {
  componentDidMount() {
    //伪检验过程
    // setTimeout(() => {
      const {setInitializingState, setLoginState} = this.props;
      //结束初始化
      setInitializingState(false);
      let bool = Math.random() < 0.5;
      console.log(bool);
      //是否已登录状态设定
      setLoginState(bool);
    // }, 10);
    //关闭黄色警告
    console.disableYellowBox = true;
  }

  render() {
    return (
      <React.Fragment>
        <StatusBar hidden={true} />
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('login');
            }}>
            <Text style={styles.sectionTitle}>Logo</Text>
          </TouchableOpacity>
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
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Default);
