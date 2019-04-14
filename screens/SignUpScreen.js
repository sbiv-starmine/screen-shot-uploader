import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  Modal,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import { SecureStore } from 'expo';
import firebase from 'firebase';
// import { StackActions, NavigationActions } from 'react-navigation';
import LoadingModal from '../components/LoadingModal';

class SignupScreen extends React.Component {
  static navigationOptions = {
    title: 'スクショアップローダー',
  };

  state = {
    email: '',
    password: '',
    isLoading: false,
    msg: null,
  }

  _signUpAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };

  handleSubmit = () => {
    this.setState({ isLoading: true });
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        SecureStore.setItemAsync('email', this.state.email);
        SecureStore.setItemAsync('password', this.state.password);
        this._signUpAsync();
      })
      .catch((error) => {
        this.setState({ isLoading: false, msg: 'メールアドレスまたはパスワードの形式が不正です。' });
        console.log(error);
      });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding' keyboardVerticalOffset={80}>
        <LoadingModal isLoading={this.state.isLoading} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            登録する
          </Text>
          <Text style={styles.msg}>
            {this.state.msg}
          </Text>
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
          onPress={this.handleSubmit}
          underlayColor="#cccccc"
        >
          <Text style={styles.buttonTitle}>送信する</Text>
        </TouchableHighlight>

        <TouchableOpacity
          style={styles.signIn}
          onPress={() => { this.props.navigation.navigate('SignIn'); }}
        >
          <Text style={styles.signInText}>ログインする</Text>
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
    height: 48,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 18,
  },
  signIn: {
    marginTop: 16,
    alignSelf: 'center',
  },
  signInText: {
    fontSize: 16,
  },
});

export default SignupScreen;
