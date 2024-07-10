import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RoleSelection = ({ setRoleid, roleid }) => {

    const handleRoleChange = (role) => {
        setRoleid(role);
    };

    return (
        <View className='mt-4'>

            <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => handleRoleChange(4)}
            >
                <View style={[styles.checkbox, roleid === 4 && styles.checkedCheckbox]} />
                <Text className='text-body text-sm'>Student</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => handleRoleChange(3)}
            >
                <View style={[styles.checkbox, roleid === 3 && styles.checkedCheckbox]} />
                <Text className='text-body text-sm'>Teacher</Text>
            </TouchableOpacity>
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
        fontSize: 20,
        marginBottom: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#000',
        marginRight: 10,
    },
    checkedCheckbox: {
        backgroundColor: '#000',
    },
    checkboxLabel: {
        fontSize: 18,
    },
});

export default RoleSelection;
