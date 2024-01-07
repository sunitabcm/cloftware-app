import { View, Text, StyleSheet, ScrollView } from 'react-native';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import HolidayList from '../../component/HolidayList';
import { useToast } from 'react-native-toast-notifications';

export default function Events() {
  const authToken = useSelector((state) => state.auth.authToken)
  const [showCalender, setShowCalender] = useState(false);
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const toast = useToast();

  const [apiData, setApiData] = useState({
    "success": true,
    "code": 200,
    "message": "Data found successfully",
    "body": [
        {
            "event_id": 5,
            "year_id": 1,
            "school_id": 1,
            "title": "Cricket Champiships",
            "description": "football",
            "date": "2023-11-29",
            "event_status": "Active",
            "created_by": 1,
            "updated_by": null,
            "created_at": "2023-11-26T15:18:46.000Z",
            "updated_at": "2023-12-14T09:02:42.000Z"
        },
        {
            "event_id": 6,
            "year_id": 1,
            "school_id": 1,
            "title": "Football Champiships",
            "description": "football",
            "date": "2023-11-28",
            "event_status": "Active",
            "created_by": 1,
            "updated_by": null,
            "created_at": "2023-11-26T16:08:22.000Z",
            "updated_at": "2023-12-14T09:02:17.000Z"
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
