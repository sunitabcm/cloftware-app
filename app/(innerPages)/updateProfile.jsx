import { View, Text, TouchableOpacity, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import UserProfileForm from '../../component/UserProfileForm';
import { getStudentProfile, updateProfile } from '../../ApiCalls';
export default function UpdateProfile() {
  const authToken = useSelector((state) => state.auth.authToken);
  const toast = useToast();
  const [apiData, setApiData] = useState(null);

  const getData = async () => {
    try {
      const response = await getStudentProfile(authToken?.token, authToken?.year_id);
      if (response) {
        toast.show(response?.message, { type: "success" })
        setApiData(response)
      } else {
        toast.show('An error occured, Please try again', { type: "danger" })
      }
    } catch (error) {
      toast.show('Something went wrong', { type: "danger" })
    }
  };
  useEffect(() => {
    getData()
  }, []);
  const ResetPass = async () => {
    try {
      const response = await updateProfile(authToken?.token);
      if (response.status === 200 || response.status === 201) {
        toast.show(response?.message, { type: "success" })
      } else {
        toast.show('Something went wrong', { type: "danger" })
      }
    } catch (error) {
      toast.show('Something went wrong', { type: "danger" })
    }
  };

  const handleProfileUpdate = (values) => {
    // Add logic to send updated profile data to the server
    console.log('Updated Profile:', values);
  };

  return (
    <ScrollView className='h-full bg-light p-5'>
      {apiData && Object.values(apiData?.body).length > 0 ?
        <UserProfileForm apiData={apiData?.body} onSubmit={handleProfileUpdate} />
        :
        <ActivityIndicator />
      }
    </ScrollView>
  )
}