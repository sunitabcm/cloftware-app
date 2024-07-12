import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RoleSelection = ({ setRoleid, roleid, setbuttondisabled }) => {

    const handleRoleChange = (role) => {
        setRoleid(role);
        setbuttondisabled(false)
    };

    return (
        <View style={styles.container}>
          <Text style={styles.label}>Select Role</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                roleid === 3 ? styles.selectedButton : styles.unselectedButton,
                { borderTopLeftRadius: 25, borderBottomLeftRadius: 25 },
              ]}
              onPress={() => handleRoleChange(3)}
            >
              <Text style={roleid === 3 ? styles.selectedText : styles.unselectedText}>Teacher</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                roleid === 4 ? styles.selectedButton : styles.unselectedButton,
                { borderTopRightRadius: 25, borderBottomRightRadius: 25 },
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
      label: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 15
      },
      buttonContainer: {
        flexDirection: 'row',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#10B981',
        overflow: 'hidden',
      },
      button: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        flex: 1,
        alignItems: 'center',
      },
      selectedButton: {
        backgroundColor: '#10B981',
      },
      unselectedButton: {
        backgroundColor: '#E0E0E0',
      },
      selectedText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
      },
      unselectedText: {
        color: '#000',
        fontWeight: 'bold',
      },
    });
    
    export default RoleSelection;