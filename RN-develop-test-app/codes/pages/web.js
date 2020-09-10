import React from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {connect} from 'react-redux';

class Default extends React.Component {
  render() {
    const {url, port} = this.props;
    console.log(url);
    console.log(port);
    return (
      <View style={styles.container}>
        <WebView ref="webview" source={{uri: `http://${url}:${port}`}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = (state, props) => {
  return {...state};
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Default);
