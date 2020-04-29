import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
import {login} from '../../redux/actions.js';

class Default extends React.Component {
  render() {
    return (
      <React.Fragment>
        <StatusBar barStyle="dark-content" />
        <View style={styles.sectionContainer}>
          <TouchableOpacity onPress={this.onJump}>
            <Text style={styles.sectionDescription}>Login</Text>
          </TouchableOpacity>
        </View>
      </React.Fragment>
    );
  }

  onJump = () => {
    const {login} = this.props;
    login();
  };
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    login: () => {
      dispatch(login(true));
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
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Default);
