import { View, Text, TouchableOpacity, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import UserProfileForm from '../../component/UserProfileForm';
import { getStudentProfile, updateProfile } from '../../ApiCalls';
import LoadingAnimation from '../../component/GlobalComps/loadingAnimation'
export default function UpdateProfile() {
  const authToken = useSelector((state) => state.auth.authToken);
  const userCred = useSelector((state) => state.userDetails.user);
  const toast = useToast();
  const [apiData, setApiData] = useState(userCred);
const dispatch = useDispatch()
  const updatePro = async (values) => {
    try {
      const response = await updateProfile(authToken, values);
      // if (response.status === 200 || response.status === 201) {
        toast.show(response?.message, { type: "success" })
      // } else {
        // toast.show('Something went wrong', { type: "danger" })
      // }
      await getStudentProfile(dispatch, authToken)
    } catch (error) {
      // toast.show('Something went wrong', { type: "danger" })
    }
  };

  const handleProfileUpdate = (values) => {
    updatePro(values)
  };

  return (
    <ScrollView className='h-full bg-light p-5'>
      {apiData && Object.values(apiData).length > 0 ?
        <UserProfileForm apiData={apiData} onSubmit={handleProfileUpdate} />
        :
        <LoadingAnimation />
      }
    </ScrollView>
  )
}