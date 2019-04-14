import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';

export default class LoadingModal extends React.Component {
  render() {
    const { isLoading } = this.props;

    return (
      <Modal
        visible={isLoading}
        animationType={'none'}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
});