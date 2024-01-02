import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Links from '../component/Links';
import WelcomeSchool from '../pageComponent/welcome/WelcomeSchool';
import { useSelector, useDispatch } from 'react-redux';
import Calender from '../component/Calender';
import { useRouter } from 'expo-router';
export default function Attendance() {
  const authToken = useSelector((state) => state.auth.authToken)
  const [showCalender, setShowCalender] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (authToken && Object.keys(authToken).length > 0) {
      setShowCalender(true)
    } else {
      setShowCalender(false)
    }
  }, [authToken]);

  return (
    <ScrollView >
      <View style={styles.container}>
        <View style={styles.backarrow}>
          <Links
            back
            onPress={() => router.push("../")}
          />
        </View>
        <View style={styles.handlerBox}>
          {/* <WelcomeSchool /> */}
          {showCalender ?
            <Calender />
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
