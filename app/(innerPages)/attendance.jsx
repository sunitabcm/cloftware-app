import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Links from '../../component/Links';
import { useSelector, useDispatch } from 'react-redux';
import Calender from '../../component/Calender';
import { useRouter } from 'expo-router';
export default function Attendance() {
  const authToken = useSelector((state) => state.auth.authToken)
  const [showCalender, setShowCalender] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (authToken && Object.keys(authToken).length > 0) {
      setShowCalender(true)
    } else {
      setShowCalender(false)
    }
  }, [authToken]);

  return (
    <ScrollView className='bg-light pt-6'>
      {showCalender ?
        <Calender />
        :
        <Text className='p-5'>Loading</Text>
      }
    </ScrollView>
  )
}
