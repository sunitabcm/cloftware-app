import { View, Text, StyleSheet, ScrollView } from 'react-native';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import Links from '../component/Links';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import YearChanger from '../component/GlobalComps/YearChanger';
import HolidayList from '../component/HolidayList';
import { useToast } from 'react-native-toast-notifications';

export default function Holidays() {
  const authToken = useSelector((state) => state.auth.authToken)
  const [showCalender, setShowCalender] = useState(false);
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const toast = useToast();

  const [apiData, setApiData] = useState([]);

  const router = useRouter();
  useEffect(() => {
    console.log(authToken)
    if (authToken && Object.keys(authToken).length > 0) {
      console.log('2')
      setShowCalender(true)
      fetchData()
    } else {
      setShowCalender(false)
    }
  }, [authToken]);


  const fetchData = async () => {
    console.log('1', authToken?.token, authToken?.year_id)
    try {
      const response = await getSchoolHolidayList(authToken?.token, authToken?.year_id);
      console.log(response)

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
  const handleYearChange = (newYear) => {
    fetchData()
    setCurrentYear(newYear);
  };

  return (
    <ScrollView >
      <View style={styles.container}>
        <View style={styles.backarrow}>
          <Links
            back
            onPress={() => router.push("/dashboard")}
          />
        </View>
        <View style={styles.handlerBox}>
          {showCalender && Object.keys(apiData)?.length > 0 ?
            <>
              <YearChanger onYearChange={handleYearChange} />
              <HolidayList data={apiData} />
            </>
            :
            <Text>Loading</Text>
          }
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  backarrow: {
    paddingTop: 20
  },
  handlerBox: {
    width: "100%"
  },
  formFields: {
    width: "100%",
    paddingBottom: 20
  },
  inputFields: {
    paddingBottom: 15,
    width: "100%",
  },
  textcontainer: {
    paddingTop: 30,
    paddingBottom: 30
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000'
  },
  innertext: {
    fontSize: 16,
    color: '#999999'
  },
  button_2: {
    alignItems: 'center',
    paddingTop: 20
  },
  passwd: {
    fontSize: 14,
    color: '#FF6F1B'
  },
  inputFieldsLinks: {
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logInText: {
    marginBottom: 3,
  },
  logText: {
    fontSize: 16,
    paddingBottom: 20,
    // color: thirdColorBlack,
  },
  btnLink: {
    //fontWeight: 500,
  },

});
