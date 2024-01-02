import { View, Text, Pressable } from 'react-native'
import React from 'react'
import NetworkLogger from 'react-native-network-logger';
import { router } from 'expo-router';
export default function Network() {
  return (
    <View className='h-full w-full'>
        <Pressable onPress={()=> router.push('../')}><Text>Go back</Text></Pressable>
      <NetworkLogger theme="dark"/>
    </View>
  )
}