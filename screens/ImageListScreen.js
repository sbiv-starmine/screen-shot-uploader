import React from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import firebase from 'firebase';
// import CircleButton from '../components/CircleButton';

const { height, width } = Dimensions.get('window')
class ImageListScreen extends React.Component {
  static navigationOptions = {
    title: 'スクショ一覧',
  };

  state = {
    imageList: []
  };

  componentWillMount() { // このcomponentが表示される前に実行する
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const db = firebase.firestore();
      db.collection(`users/${currentUser.uid}/images`)
        .onSnapshot((snapshot) => { // リアルタイムに更新するonSnapshot
          const imageList = [];
          snapshot.forEach((doc) => {
            imageList.push({ ...doc.data(), key: doc.id }); // doc.data()とkey:doc.idをくっ付ける
          });
          this.setState({ imageList: imageList });
        });
    }
    else {
      this.props.navigation.navigate('Auth');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={{ flex: 1 }}
          data={this.state.imageList}
          // keyExtractor={key => key}
          numColumns='3'
          renderItem={({ item }) => (
            <View style={{
              width: width / 3, height: width / 3 * 1.7,
              paddingTop: 8, paddingBottom: 2,
              paddingHorizontal: 3
            }}>
              <Image
                source={{ uri: item.url }}
                style={{
                  flex: 1, height: null, width: null,
                  resizeMode: 'cover', borderRadius: 5,
                  borderWidth: 1, borderColor: '#dddddd'
                }}
              />


            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ImageListScreen;