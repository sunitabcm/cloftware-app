import { View, Text, TouchableOpacity, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import UserProfileFormTeach from '../../component/UserProfileFormTeach';
import { getStudentProfile, updateTeacher } from '../../ApiCalls';
import LoadingAnimation from '../../component/GlobalComps/loadingAnimation'
export default function UpdateProfile() {
  const authToken = useSelector((state) => state.auth.authToken);
  const userCred = useSelector((state) => state.userDetails.user);
  const toast = useToast();
  const [apiData, setApiData] = useState(userCred);
  const [disabled, setDisabled] = useState(true);
  const userTeacherCred = useSelector((state) => state.userDetailsTeacher.user);

const dispatch = useDispatch()
  const updatePro = async (values) => {
    try {
      const response = await updateTeacher(authToken, values);
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
    setDisabled(true)
    updatePro(values)
  };

  return (
    <ScrollView className='h-full bg-light p-5'>
      {Object.values(userTeacherCred).length > 0 && userTeacherCred ?
        <UserProfileFormTeach apiData={userTeacherCred} onSubmit={handleProfileUpdate} disabled={disabled} setDisabled={setDisabled}/>
        :
        <LoadingAnimation />
      }
    </ScrollView>
  )
}