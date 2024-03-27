import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import LoggedInHeader from '../../component/GlobalComps/LoggedInHeader'
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import { getNotificationList, markNotificationAsRead } from '../../ApiCalls';
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

  const ReadNotification = async (id) => {
    try {
      const response = await markNotificationAsRead(authToken, id);
    } catch (error) {
    }
    fetchData()
  };

  return (
    <>
      <LoggedInHeader />
      <ScrollView className='bg-body'>
        <View className='rounded-t-[24px] p-5 bg-light w-full h-full min-h-[600px]'>
          <Text className='text-body font-bold text-lg mb-5'>Alerts and Notifications</Text>
          <AlertsComp apiData={apiData} ReadNotification={ReadNotification}/>
        </View>
      </ScrollView>
    </>
  )
}