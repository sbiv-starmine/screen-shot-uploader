import React from 'react';
import { AsyncStorage, Button, StyleSheet, View, } from 'react-native';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: '設定',
  };

  _signOutAsync = async () => {
    // await AsyncStorage.clear();
    await AsyncStorage.removeItem('userToken');
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="サインアウト" onPress={this._signOutAsync} />
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