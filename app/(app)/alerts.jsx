import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import LoggedInHeader from '../../component/GlobalComps/LoggedInHeader'

export default function Alerts() {
  return (
    <>
      <LoggedInHeader />
      <ScrollView className='bg-body'>
        <View className='rounded-t-[24px] p-5 bg-light w-full h-full min-h-[600px]'>
          <Text>Alerts Page</Text>
        </View>
      </ScrollView>
    </>
  )
}