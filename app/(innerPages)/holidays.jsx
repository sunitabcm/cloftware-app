import { View, Text, StyleSheet, ScrollView } from 'react-native';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import HolidayList from '../../component/HolidayList';
import { useToast } from 'react-native-toast-notifications';
import axios from 'axios';
export default function Holidays() {
  const authToken = useSelector((state) => state.auth.authToken)
  const [showCalender, setShowCalender] = useState(false);
  const toast = useToast();

  const [apiData, setApiData] = useState({
    "success": true,
    "code": 200,
    "message": "Data found successfully",
    "body": [
        {
            "holiday_id": 2,
            "year_id": 1,
            "school_id": 1,
            "title": "Diwali 2023 ",
            "description": "jsdjffddfdfdfdf",
            "date": "2023-12-21",
            "status": "Active",
            "created_by": 14,
            "updated_by": 14,
            "created_at": "2023-11-26T10:04:01.000Z",
            "updated_at": "2023-12-21T11:42:53.000Z"
        },
        {
            "holiday_id": 4,
            "year_id": 1,
            "school_id": 1,
            "title": "Holi 2023 ",
            "description": "jsdjffddfdfdfdf",
            "date": "2023-12-21",
            "status": "Active",
            "created_by": 14,
            "updated_by": 14,
            "created_at": "2023-11-26T10:04:01.000Z",
            "updated_at": "2023-12-21T11:42:53.000Z"
        }
    ]
});

  const router = useRouter();
  useEffect(() => {
    if (authToken && Object.keys(authToken).length > 0) {
      setShowCalender(true)
      // fetchData()
    } else {
      setShowCalender(false)
    }
  }, [authToken]);


  const fetchData = async () => {
    try {
      const response = await getSchoolHolidayList(authToken?.token, authToken?.year_id);

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
            <HolidayList data={apiData?.body} fetchData={fetchData} />
          :
          <Text>Loading</Text>
        }
      </View>
    </ScrollView>
  )
}
