import { View, Text, StyleSheet, ScrollView } from 'react-native';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import ImportantDatesList from '../../component/ImportantDatesList';
import { useToast } from 'react-native-toast-notifications';
import { getSchoolImportantDatesList } from '../../ApiCalls';
import LoadingAnimation from '../../component/GlobalComps/loadingAnimation';
export default function Events() {
  const authToken = useSelector((state) => state.auth.authToken)
  const userCred = useSelector((state) => state.userDetails.user);
  const [showCalender, setShowCalender] = useState(false);
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const toast = useToast();

  const [apiData, setApiData] = useState(null);

  const router = useRouter();
  useEffect(() => {
    if (userCred && Object.keys(userCred).length > 0) {
      setShowCalender(true)
      fetchData(dayjs(new Date()).format('YYYY-MM'))
    } else {
      setShowCalender(false)
    }
  }, [userCred]);


  const fetchData = async (date) => {
    try {
      const response = await getSchoolImportantDatesList(authToken);
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
      <View>
        {showCalender && apiData && apiData?.code === 200 ?
          <>
            {/* <YearChanger onYearChange={handleYearChange} /> */}
            <ImportantDatesList data={apiData?.body} fetchData={fetchData} />
          </>
          :
          <LoadingAnimation />
        }
      </View>
    </ScrollView>
  )
}
