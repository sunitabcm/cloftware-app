import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
export default function TechnoIcon() {
    return (
        <Image
            source={{uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/technoware_text.svg'}}
            style={{ width: 120, height: 30 }}
            contentFit="cover"
        />
    )
}