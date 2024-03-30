import { View, Text, TouchableOpacity, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import { stylesGlobal } from '../../styles/global';
import AppIcon from '../../component/GlobalComps/AppIcon';
import BtnGlobal from '../../component/GlobalComps/BtnGlobal';
import { getSchoolDetails } from '../../ApiCalls';
import SchoolDetails from '../../component/SchoolDetails';
import { Image } from 'expo-image';
import LoadingAnimation from '../../component/GlobalComps/loadingAnimation';
import LoggedInHeader from '../../component/GlobalComps/LoggedInHeader';
import IconHeader from '../../component/GlobalComps/IconHeader';
export default function Contacts() {
  const authToken = useSelector((state) => state.auth.authToken);
  const userCred = useSelector((state) => state.userDetails.user);
  const toast = useToast();
  const [apiData, setApiData] = useState(null);
  const schoolData = async () => {
    try {
      const response = await getSchoolDetails(authToken);
      if (response) {
        // toast.show(response?.message, { type: "success" })
        setApiData(response)
      } else {
        // toast.show('Something went wrong', { type: "danger" })
      }
    } catch (error) {
      // toast.show('Something went wrong', { type: "danger" })
    }
  };
  useEffect(() => {
    schoolData()
  }, []);
  return (
    <>
      <ScrollView className='bg-body'>
        <View className='p-5'>
        <IconHeader/>
        </View>
        <View className='bg-body'>
          <Image
            source={require("../../assets/cw.svg")}
            style={{ width: '100%', height: 80 }}
            contentFit="cover"
          />
        </View>
        <View className='rounded-t-[24px] p-5 bg-light w-full h-full min-h-[600px]'>
          {/* <View className='mt-[-60px] '>
            {apiData && Object.values(apiData?.body).length > 0 &&
              <Image
                source={{ uri: apiData.body.other_details.school_logo }}
                style={{ width: 80, height: 80, marginBottom: 0, borderRadius: 18, backgroundColor: '#fff' }}
                contentFit='Cover'
              />
            }
          </View> */}
          <Text style={stylesGlobal.title}>School Details</Text>
          <View className='pb-10'>
            {apiData && Object.values(apiData?.body).length > 0 ?
              <SchoolDetails schoolDetails={apiData} />
              :
              <LoadingAnimation />
            }
          </View>
        </View>
      </ScrollView>
    </>
  )
}