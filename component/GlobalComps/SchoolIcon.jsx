import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
export default function SchoolIcon({ styleSize = 49 }) {
    return (
        <Image
            source={require("../../assets/school_logo.svg")}
            style={{ width: styleSize, height: styleSize }}
            contentFit="cover"
        />
    )
}