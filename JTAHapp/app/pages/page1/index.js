import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {WebView} from 'react-native-webview';

const url = 'file:///android_asset/h5/page1/index.html';

const App: () => React$Node = ({navigation}) => {
  return (
    <React.Fragment>
      <StatusBar barStyle={'dark-content'} />
      {/*<View style={styles.sectionContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('page2');
          }}>
          <Text style={styles.sectionTitle}>page1</Text>
        </TouchableOpacity>
      </View>*/}
      <WebView source={{uri: url}} />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
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

export default App;
