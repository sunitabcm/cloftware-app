// BtnGlobal.js
import React, { useState } from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { globalstyles } from '../../styles/global';
import { Link } from 'expo-router';
import AppIcon from './AppIcon';
const BtnGlobal = ({ title, styleClassName, onPress, isDisabled = false, links, isLink = false, classNames, icon, iconName, iconType, iconColor, iconSize }) => {
    const [isPressed, setIsPressed] = useState(false);

    const handlePressIn = () => {
        setIsPressed(true);
    };

    const handlePressOut = () => {
        setIsPressed(false);
    };

    return (
        <>
            {isLink === true ?
                <Link onPressIn={!isDisabled ? handlePressIn : undefined}
                    onPressOut={handlePressOut} href={links} style={[
                        globalstyles[styleClassName],
                        isPressed && globalstyles[`${styleClassName}Hover`],
                        isPressed && globalstyles[`${styleClassName}Active`]]}
                    className={`${classNames}`}>
                    {title !== undefined && <Text style={[globalstyles.ButtonText, globalstyles[`${styleClassName}Text`],
                    isPressed && globalstyles[`${styleClassName}TextHover`],
                    isPressed && globalstyles[`${styleClassName}TextActive`],
                    isDisabled && globalstyles[`${styleClassName}TextDisabled`],]} className=''>{title}</Text>}
                    {icon !== undefined && <AppIcon type={iconType} name={iconName} size={iconSize} color={iconColor} />}
                </Link>
                :
                <Pressable
                    style={[
                        globalstyles[styleClassName],
                        isPressed && globalstyles[`${styleClassName}Hover`],
                        isPressed && globalstyles[`${styleClassName}Active`],
                        isDisabled && globalstyles[`${styleClassName}Disabled`],
                    ]}
                    className={`${classNames}`}
                    onPress={!isDisabled ? onPress : undefined}
                    onPressIn={!isDisabled ? handlePressIn : undefined}
                    onPressOut={handlePressOut}
                    disabled={isDisabled}
                >
                    {title !== undefined && <Text style={[globalstyles.ButtonText, globalstyles[`${styleClassName}Text`],
                    isPressed && globalstyles[`${styleClassName}TextHover`],
                    isPressed && globalstyles[`${styleClassName}TextActive`],
                    isDisabled && globalstyles[`${styleClassName}TextDisabled`],]} className='whitespace-nowrap'>{title}</Text>}
                    {icon !== undefined && <AppIcon type={iconType} name={iconName} size={iconSize} color={iconColor} />}
                </Pressable>
            }
        </>
    );
};

export default BtnGlobal;
