import React, { useState, useCallback } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const UseModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const showModal = useCallback((content) => {
    setModalContent(content);
    setIsVisible(true);
  }, []);

  const hideModal = useCallback(() => {
    setIsVisible(false);
  }, []);

  const ModalComponent = () => (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
      <ScrollView style={{flexGrow: 1}}>

        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={hideModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          {modalContent}
        </View>
        </ScrollView>
      </View>
    </Modal>
  );

  return { showModal, hideModal, ModalComponent };
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    padding: 10,

  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '100%'
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 20,

    zIndex:11
  },
  closeButtonText:{
    color: 'blue',
    textAlign: 'center',
    //fontWeight:700,
  }
});

export default UseModal;
