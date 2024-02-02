import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Calender from '../../component/Calender';
import { useRouter } from 'expo-router';
export default function Attendance() {
  const authToken = useSelector((state) => state.auth.authToken)
  const userCred = useSelector((state) => state.userDetails.user);
  const [showCalender, setShowCalender] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (userCred && Object.keys(userCred).length > 0) {
      setShowCalender(true)
    } else {
      setShowCalender(false)
    }
  }, [userCred]);

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
