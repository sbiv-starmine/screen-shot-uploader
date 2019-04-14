import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'アップロード',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
})