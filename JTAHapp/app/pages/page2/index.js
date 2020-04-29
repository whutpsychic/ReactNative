import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

const App: () => React$Node = ({navigation}) => {
  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" />
      <View style={styles.sectionContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('page1');
          }}>
          <Text style={styles.sectionTitle}>page2</Text>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
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

export default App;
