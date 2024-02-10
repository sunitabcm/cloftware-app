import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
export default function CloftwareLogo() {
  return (
    <View className='mx-auto mt-5 flex justify-center items-center'>
    <Image
      source={require("../../assets/CloftwareGroup.svg")}
      style={{ width: 200, height: 15 }}
      contentFit="contain"
    />
  </View>
  )
}