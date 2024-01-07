import { View, Text,ScrollView } from 'react-native'
import React from 'react'

export default function Contacts() {
  return (
    <ScrollView className='bg-body'>
      <View className='rounded-t-[24px] p-5 bg-light w-full h-full min-h-[600px]'>
        <Text>Contacts Page</Text>
      </View>
    </ScrollView>
  )
}