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

export default function StudenStats() {
  const authToken = useSelector((state) => state.auth.authToken);
  const toast = useToast();
  const [apiData, setApiData] = useState(null);
  const ResetPass = async () => {
    try {
      const response = await getSchoolDetails(authToken?.token);
      if (response) {
        toast.show(response?.message, { type: "success" })
        setApiData(response)
      } else {
        toast.show('Something went wrong', { type: "danger" })
      }
    } catch (error) {
      toast.show('Something went wrong', { type: "danger" })
    }
  };
  useEffect(() => {
    ResetPass()
  }, []);
  return (
    <ScrollView className='h-full bg-light p-5'>
      <Text style={stylesGlobal.title}>School Details</Text>
      <View className='pb-10'>
        {apiData && Object.values(apiData?.body).length > 0 ?
        <SchoolDetails schoolDetails={apiData}/>
        :
        <ActivityIndicator/>
}
      </View>
    </ScrollView>
  )
}