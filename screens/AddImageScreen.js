import React from 'react';
import { View, Button, Image } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import firebase from 'firebase';
import LoadingModal from '../components/LoadingModal';

class ImageListScreen extends React.Component {
  static navigationOptions = {
    title: 'スクショの追加',
  };

  state = {
    hasCameraRollPermission: null,
    uri: null,
    isLoading: false,
  };

  async componentWillMount() {
    // カメラロールに対するPermissionを許可
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraRollPermission: status === 'granted' });
  };

  uploadImage = async () => {
    this.setState({ isLoading: true });
    const { uri } = this.state;
    // blobに関しては下記を参考にした
    // https://github.com/expo/firebase-storage-upload-example/blob/master/App.js
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const { currentUser } = firebase.auth();
    var uploadTask = firebase.storage()
      .ref()
      .child(`users/${currentUser.uid}/images/` + new Date().getTime())
      .put(blob) //, { contentType: 'image/jpeg' })

    uploadTask.on('state_changed', (snapshot) => { },
      (error) => {
        console.log(error)
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
          const db = firebase.firestore();
          db.collection(`users/${currentUser.uid}/images`)
            .add({
              url: downloadURL,
              createdOn: new Date(),
            })
            .then(() => {
              console.log('isLoading', this.state.isLoading);
              this.setState({ isLoading: false });
              // alert('アップロードしました');
            })
            .catch((error) => {
              this.setState({ isLoading: false });
              console.log(error)
            })
        });
      });
  };

  render() {
    let { hasCameraRollPermission, uri } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <LoadingModal isLoading={this.state.isLoading} />
        <Button
          title="カメラロールから画像を選択"
          onPress={this._pickImage}
        />
        {hasCameraRollPermission && uri &&
          <Image source={{ uri: uri }} style={{ width: 200, height: 200 }} />}

        <Button title='送信' onPress={this.uploadImage.bind(this)} />
      </View>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ uri: result.uri });
    }
  };
}

export default ImageListScreen;