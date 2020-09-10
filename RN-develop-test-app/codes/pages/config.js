import React from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {connect} from 'react-redux';
import {seturl, setport} from '../redux/actions.js';
import storage from '../core/storage.js';

class Default extends React.Component {
  state = {
    url: '',
    port: '',
  };

  componentDidMount() {
    storage.getData('url').then((url) => {
      this.setState({
        url,
      });
    });

    storage.getData('port').then((port) => {
      this.setState({
        port,
      });
    });
  }

  render() {
    const {url, port} = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputItem}
          onChangeText={this.setUrl}
          value={url}
        />
        <TextInput
          style={styles.inputItem}
          onChangeText={this.setPort}
          value={port}
        />
        <TouchableOpacity onPress={this.onPressGo}>
          <View style={styles.btn}>
            <Text style={{color: '#fff'}}>Go！</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  onPressGo = () => {
    const {setUrl, setPort, navigation} = this.props;
    const {url, port} = this.state;

    storage.setData('url', url);
    storage.setData('port', port);

    setUrl(url);
    setPort(port);

    navigation.navigate('web');
  };

  setUrl = (url) => {
    this.setState({
      url,
    });
  };

  setPort = (port) => {
    this.setState({
      port,
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputItem: {
    // width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 20,
    marginVertical: 20,
    marginBottom: 0,
  },
  btn: {
    backgroundColor: '#389edc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginVertical: 20,
    marginHorizontal: 80,
  },
});

const mapStateToProps = (state, props) => {
  return {...state};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    setUrl: (url) => {
      dispatch(seturl(url));
    },
    setPort: (port) => {
      dispatch(setport(port));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Default);
