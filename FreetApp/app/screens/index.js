import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import GridView from './../components/gridView.js';

export default class Index extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <GridView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: Dimensions.get('window').height,
    // backgroundColor: '#00f',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
