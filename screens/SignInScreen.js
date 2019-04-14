import React from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  AsyncStorage,
  KeyboardAvoidingView,
} from 'react-native';
import { SecureStore } from 'expo';
import firebase from 'firebase';

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'スクショアップローダー',
  };

  state = {
    email: '',
    password: '',
    isLoading: false,
    msg: null,
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };

  handleSubmit = () => {
    this.setState({ isLoading: true });
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        SecureStore.setItemAsync('email', this.state.email);
        // SecureStore.setItemAsync('password', this.state.password);
        this._signInAsync();
      })
      .catch((error) => {
        this.setState({ isLoading: false, msg: 'メールアドレスまたはパスワードが不正です。' });
        console.log(error);
      });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding' keyboardVerticalOffset={80}>
        <Modal
          visible={this.state.isLoading}
          animationType={'none'}
        >
          <View style={styles.modalContainer}>
            <ActivityIndicator size="large" />
          </View>
        </Modal>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>ログイン</Text>
          <Text style={styles.msg}>{this.state.msg}</Text>
        </View>
        <TextInput
          style={styles.input}
          value={this.state.email}
          onChangeText={(text) => { this.setState({ email: text, msg: '' }); }}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email Address"
        />
        <TextInput
          style={styles.input}
          value={this.state.password}
          onChangeText={(text) => { this.setState({ password: text, msg: '' }); }}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Password"
          secureTextEntry
        />
        <TouchableHighlight
          style={styles.button}
          // onPress={this._signInAsync}
          onPress={this.handleSubmit}
          underlayColor="#cccccc"
        >
          <Text style={styles.buttonTitle}>ログインする</Text>
        </TouchableHighlight>

        <TouchableOpacity
          style={styles.signup}
          onPress={() => { this.props.navigation.navigate('SignUp'); }}
        >
          <Text style={styles.signupText}>メンバー登録する</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  titleContainer: {
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#eee',
    width: '80%',
    height: 40,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
  },
  title: {
    fontSize: 28,
    marginTop: 20,
    marginBottom: 5,
  },
  msg: {
    color: 'red',
  },
  button: {
    backgroundColor: '#E31676',
    width: '70%',
    height: 48,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 18,
  },
  signup: {
    marginTop: 16,
    alignSelf: 'center',
  },
  signupText: {
    fontSize: 16,
  },
});

export default SignInScreen;
