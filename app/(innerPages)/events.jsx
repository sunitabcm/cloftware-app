import { View, Text, StyleSheet, ScrollView } from 'react-native';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import HolidayList from '../../component/HolidayList';
import { useToast } from 'react-native-toast-notifications';
import { getSchoolEventList } from '../../ApiCalls';
export default function Events() {
  const authToken = useSelector((state) => state.auth.authToken)
  const [showCalender, setShowCalender] = useState(false);
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const toast = useToast();

  const [apiData, setApiData] = useState(null);

  const router = useRouter();
  useEffect(() => {
    if (authToken && Object.keys(authToken).length > 0) {
      setShowCalender(true)
      fetchData()
    } else {
      setShowCalender(false)
    }
  }, [authToken]);


  const fetchData = async () => {
    try {
      const response = await getSchoolEventList(authToken?.token, authToken?.year_id);
      if (response) {
        toast.show(response?.message, { type: "success" })
        setApiData(response)
      } else {
        toast.show('An error occured, Please try again', { type: "danger" })
      }
    } catch (error) {
      toast.show('An error occured, Please try again', { type: "danger" })
    }
  };


  return (
    <ScrollView className='h-full bg-light p-5'>
      <View>
        {showCalender && apiData && Object.values(apiData?.body).length > 0 ?
          <>
            {/* <YearChanger onYearChange={handleYearChange} /> */}
            <HolidayList data={apiData?.body} fetchData={fetchData}/>
          </>
          :
          <Text>Loading</Text>
        }
      </View>
    </ScrollView>
  )
}
