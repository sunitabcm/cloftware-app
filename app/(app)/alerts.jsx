import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import LoggedInHeader from '../../component/GlobalComps/LoggedInHeader'
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import { getNotificationList } from '../../ApiCalls';
import AlertsComp from '../../component/AlertsComp';
export default function Alerts() {
  const authToken = useSelector((state) => state.auth.authToken)
  const userCred = useSelector((state) => state.userDetails.user);
  const [apiData, setApiData] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if (authToken) {
      fetchData()
    }
  }, [authToken]);


  const fetchData = async () => {
    try {
      const response = await getNotificationList(authToken);
      if (response) {
        setApiData(response)
      } else {
      }
    } catch (error) {
    }
  };
  return (
    <>
      <LoggedInHeader />
      <ScrollView className='bg-body'>
        <View className='rounded-t-[24px] p-5 bg-light w-full h-full min-h-[600px]'>
          <AlertsComp apiData={apiData}/>
        </View>
      </ScrollView>
    </>
  )
}