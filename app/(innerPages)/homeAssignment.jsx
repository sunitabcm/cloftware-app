import { View, Text, StyleSheet, ScrollView } from 'react-native';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import EventList from '../../component/EventList';
import { useToast } from 'react-native-toast-notifications';
import { getHomeAssignmentList } from '../../ApiCalls';
import LoadingAnimation from '../../component/GlobalComps/loadingAnimation';
import HomeAssigmentList from '../../component/HomeAssigmentList';
export default function HomeAssignment() {
  const authToken = useSelector((state) => state.auth.authToken)
  const userCred = useSelector((state) => state.userDetails.user);
  const [showCalender, setShowCalender] = useState(false);
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const toast = useToast();

  const [apiData, setApiData] = useState({
    "success": true,
    "code": 200,
    "message": "Data found successfully",
    "body": [
        {
            "assignment_id": 1,
            "title": "Home work for holi",
            "description": "Home work for holi",
            "image": null,
            "flag": 0,
            "created_at": "2024-03-20T14:51:32.000Z",
            "subject_name": "Mathematics"
        }
    ]
});

  const router = useRouter();
  useEffect(() => {
    if (userCred && Object.keys(userCred).length > 0) {
      setShowCalender(true)
      fetchData(dayjs(new Date()).format('YYYY-MM-DD'))
    } else {
      setShowCalender(false)
    }
  }, [userCred]);


  const fetchData = async (date) => {
    try {
      const response = await getHomeAssignmentList(authToken, userCred?.class_id, userCred?.section_id, userCred?.year_id, date);
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
    <ScrollView className='h-full bg-lightergrey'>
      <View>
        {showCalender && apiData && apiData?.code === 200 ?
          <HomeAssigmentList data={apiData?.body} fetchData={fetchData} />
          :
          <LoadingAnimation />
        }
      </View>
    </ScrollView>
  )
}
