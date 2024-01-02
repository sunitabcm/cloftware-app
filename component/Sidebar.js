// Sidebar.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const Sidebar = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sidebar Header</Text>
      </View>
      <DrawerItemList {...props} />
      {/* Add custom items or additional content here */}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 18,
    //fontWeight: 600,
  },
});

export default Sidebar;
