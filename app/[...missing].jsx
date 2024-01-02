import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router';
import { useToast } from 'react-native-toast-notifications';
const Missing = () => {
  const toast = useToast();
  return (
    <View className='bg-light h-full p-4'>
      <Pressable 
      onPress={()=> toast.show('This Page Doest Exist in this App', {type: "danger"})}
    ><Text>Missing page</Text></Pressable>
    </View>
  )
}

export default Missing
