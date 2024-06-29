// BtnGlobal.js
import React, { useState } from 'react';
import { Pressable, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import AppIcon from './AppIcon';
const BtnGlobal = ({ title, styleClassName, onPress, isDisabled = false, classNames, icon, iconName, iconType, iconColor, iconSize, bgColor = '#2A2D32' }) => {
    const [isPressed, setIsPressed] = useState(false);

    const handlePressIn = () => {
        setIsPressed(true);
    };

    const handlePressOut = () => {
        setIsPressed(false);
    };
    const dynamicStyles = {
        borderColor: bgColor,
        backgroundColor: bgColor,
    };
    return (
        <TouchableOpacity
            style={[
                dynamicStyles,
                styles[styleClassName],
                isPressed && styles[`${styleClassName}Hover`],
                isPressed && styles[`${styleClassName}Active`],
                isDisabled && styles[`${styleClassName}Disabled`],
            ]}
            className={`${classNames} rounded-[56px]`}
            onPress={!isDisabled ? onPress : undefined}
            onPressIn={!isDisabled ? handlePressIn : undefined}
            onPressOut={handlePressOut}
            disabled={isDisabled}
        >
            {title !== undefined && <Text style={[styles[`${styleClassName}Text`],
            isPressed && styles[`${styleClassName}TextHover`],
            isPressed && styles[`${styleClassName}TextActive`],
            isDisabled && styles[`${styleClassName}TextDisabled`],]} className='whitespace-nowrap'>{title}</Text>}
            {icon !== undefined && <AppIcon type={iconType} name={iconName} size={iconSize} color={iconColor} />}
        </TouchableOpacity>
    );
};

export default BtnGlobal;

const styles = StyleSheet.create({
    button: {
        // backgroundColor: bgColor,
        borderRadius: 56,
        textAlign: 'center',
        paddingVertical: 15,
        paddingHorizontal: 40,
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
        borderRadius: 56,
        textAlign: 'center',
        paddingVertical: 15,
        paddingHorizontal: 40,
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    updatedbutton: {
        backgroundColor: '#fff',
        borderWidth: 1, // Border width
        // borderColor: bgColor, // Border color
        borderRadius: 56,
        textAlign: 'center',
        paddingVertical: 15,
        paddingHorizontal: 40,
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    updatedbuttonDisabled: {
        backgroundColor: '#ccc',
        borderWidth: 1, // Border width
        // borderColor: bgColor, // Border color
        borderRadius: 56,
        textAlign: 'center',
        paddingVertical: 15,
        paddingHorizontal: 40,
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        //fontWeight: 600,
        alignItems: 'center',
        display: "flex",
    },

    updatedbuttonText: {
        color: '#535353',
        fontSize: 14,
        fontWeight: 600,
        alignItems: 'center',
        display: "flex",
    },

    buttonDisabledText: {
        color: '#999',
    },
    updatedbuttonDisabledText: {
        color: '#999',
    },
    closeBtn: {
        backgroundColor: '#E1E1E1',
        fontSize: 28,
        lineHeight: 32,
        // color: bgColor,
        padding: 6,
        borderRadius: 35,
        cursor: 'pointer',
        borderWidth: 0,
        // whiteSpace: 'nowrap',
        fontWeight: '600',
        alignSelf: 'flex-start',
    },
    buttonSmall: {
        // backgroundColor: bgColor,
        borderRadius: 56,
        textAlign: 'center',
        paddingVertical: 5,
        paddingHorizontal: 40,
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    buttonSmallDisabled: {
        backgroundColor: '#ccc',
        borderRadius: 56,
        textAlign: 'center',
        paddingVertical: 5,
        paddingHorizontal: 40,
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    updatedbuttonSmall: {
        backgroundColor: '#fff',
        borderWidth: 1, // Border width
        // borderColor: bgColor, // Border color
        borderRadius: 56,
        textAlign: 'center',
        paddingVertical: 5,
        paddingHorizontal: 40,
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    updatedbuttonSmallDisabled: {
        backgroundColor: '#ccc',
        borderWidth: 1, // Border width
        // borderColor: bgColor, // Border color
        borderRadius: 56,
        textAlign: 'center',
        paddingVertical: 5,
        paddingHorizontal: 40,
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    buttonSmallText: {
        color: 'white',
        fontSize: 14,
        //fontWeight: 600,
        alignItems: 'center',
        display: "flex",
    },

    updatedbuttonSmallText: {
        color: '#535353',
        fontSize: 14,
        fontWeight: 600,
        alignItems: 'center',
        display: "flex",
    },

    buttonSmallDisabledText: {
        color: '#999',
    },
    updatedbuttonDisabledText: {
        color: '#999',
    },
});