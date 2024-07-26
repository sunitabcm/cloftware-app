import { View, Text, StyleSheet, ScrollView } from 'react-native';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import EventList from '../../component/EventList';
import { useToast } from 'react-native-toast-notifications';
import { getProfileData } from '../../ApiCalls';
import LoadingAnimation from '../../component/GlobalComps/loadingAnimation';
import TeacherHomeAssignment from '../../component/TeacherHomeAssignment';
import FixedFooter from '../../component/GlobalComps/FixedFooter';
export default function HomeAssignment() {
  const authToken = useSelector((state) => state.auth.authToken)
  const userCred = useSelector((state) => state.userDetails.user);
  const [showCalender, setShowCalender] = useState(false);
  const toast = useToast();
  const selectedClass = useSelector((state) => state.class.selectedClass);
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'));

  const [apiData, setApiData] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if (selectedClass && Object.keys(selectedClass).length > 0) {
      setShowCalender(true)
      fetchData(selectedDate)
    } else {
      setShowCalender(false)
    }
  }, [selectedClass]);


  const fetchData = async (date) => {
    try {
      const response = await getProfileData(authToken, selectedClass?.class_id, selectedClass?.section_id, selectedClass?.class_details.school_id, date);
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
    <>
      <ScrollView className='h-full bg-lightergrey'>
        <View>
          {showCalender && apiData && apiData?.code === 200 ?
            <TeacherHomeAssignment data={apiData} fetchData={fetchData} setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
            :
            <LoadingAnimation />
          }
        </View>
      </ScrollView>
      <FixedFooter />
    </>
  )
}
