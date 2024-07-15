import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RoleSelection = ({ setRoleid, roleid, setbuttondisabled }) => {

  const handleRoleChange = (role) => {
    setRoleid(role);
    // setbuttondisabled(false)
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            roleid === 3 ? styles.selectedButton : styles.unselectedButton,
            { borderRadius: 10 },
          ]}
          onPress={() => handleRoleChange(3)}
        >
          <Text style={roleid === 3 ? styles.selectedText : styles.unselectedText}>Teacher</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            roleid === 4 ? styles.selectedButton : styles.unselectedButton,
            { borderRadius: 10 },
          ]}
          onPress={() => handleRoleChange(4)}
        >
          <Text style={roleid === 4 ? styles.selectedText : styles.unselectedText}>Student</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#F6F6F6',
    padding: 10
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    flex: 1,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#1F1F1F',  // Dark background for selected button
  },
  unselectedButton: {
    backgroundColor: '#F6F6F6',  // Light background for unselected button
  },
  selectedText: {
    color: '#FFFFFF',  // White text for selected button
    fontWeight: 'bold',
  },
  unselectedText: {
    color: '#1F1F1F',  // Dark text for unselected button
    fontWeight: 'bold',
  },
});

export default RoleSelection;
