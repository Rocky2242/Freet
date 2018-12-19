import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import IndexView from './app/screens/index.js';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <IndexView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
  },
});
