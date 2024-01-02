import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SelectBox = ({ options, selectedValue, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (value) => {
    setModalVisible(false);
    onSelect(value);
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.selectButtonUp}>
      <TouchableOpacity style={styles.selectButton} onPress={() => setModalVisible(true)}>
        <Text>{selectedValue || 'Please select'}</Text>
        <Icon name="angle-down" size={20} color="#34495E" style={styles.iconCls} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelect(item.value)}
              >
                <Text>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  selectButtonUp: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    display: 'flex'
  },
  selectButton: {
    paddingVertical:12,
    paddingHorizontal:10,
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  option: {
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  closeButton: {
    padding: 15,
    backgroundColor: '#34495E',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
  },
  iconCls:{
    position:'absolute',
    right:10,
    top:6
  }
  
});

export default SelectBox;
