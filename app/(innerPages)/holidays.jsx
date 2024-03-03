import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import HolidayList from '../../component/HolidayList';
import { useToast } from 'react-native-toast-notifications';
import { getSchoolHolidayList } from '../../ApiCalls';
import axios from 'axios';
import { Link, usePathname, useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router';
import LoadingAnimation from '../../component/GlobalComps/loadingAnimation';
export default function Holidays() {
  const authToken = useSelector((state) => state.auth.authToken)
  const userCred = useSelector((state) => state.userDetails.user);
  const [showCalender, setShowCalender] = useState(false);
  const toast = useToast();
  const params = useLocalSearchParams();
  const [apiData, setApiData] = useState(null);
  const router = useRouter();
  console.log(params)
  useEffect(() => {
    if (userCred && Object.keys(userCred).length > 0) {
      setShowCalender(true)
      if (Object.keys(params).length > 0 && params.date) {
        fetchData(dayjs(params.date).format('YYYY-MM'))
      } else {
        fetchData()
      }
    } else {
      setShowCalender(false)
    }
  }, [userCred, params]);


  const fetchData = async (date) => {
    try {
      const response = await getSchoolHolidayList(authToken, userCred?.year_id, date);

      if (response) {
        // toast.show(response?.message, { type: "success" })
        setApiData(response)
      } else {
        // toast.show('An error occured, Please try again', { type: "danger" })
      }
    } catch (error) {
      // toast.show('An error occured, Please try again', { type: "danger" })
    }
  };

  return (
    <ScrollView className='h-full bg-light p-5'>
      <View className='h-full'>
        {showCalender && apiData && apiData?.code === 200 ?
          <HolidayList data={apiData?.body} fetchData={fetchData} date={Object.keys(params).length > 0 ? params.date : ''}/>
          :
          <LoadingAnimation />
        }
      </View>
    </ScrollView>
  )
}
