import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
export default function AvatarIcon({ styleSize = 49, styleChange }) {
    return (
        <Image
            source={require("../../assets/Avatars.svg")}
            style={{ width: styleSize, height: styleSize }}
            className={styleChange}
            contentFit="cover"
        />
    )
}