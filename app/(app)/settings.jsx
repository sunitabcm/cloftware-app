import { View, Text, ScrollView, Pressable } from 'react-native'
import React from 'react'
import AppIcon from '../../component/GlobalComps/AppIcon'
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from 'react-redux';
import { deleteAuthTeacherData, deleteAuthToken, deleteAuthUserData } from '../../authStorage';
import { setAuthToken } from '../../store/slices/authSlice';
import { logout } from '../../ApiCalls';
import { stylesGlobal } from '../../styles/global';
import { updateUser } from '../../store/slices/userSlice';
import LoggedInHeader from '../../component/GlobalComps/LoggedInHeader';
import { updateUserTeacher } from '../../store/slices/teacherSlice';
export default function Settings() {
  const router = useRouter();
  const authToken = useSelector((state) => state.auth.authToken)
  const userCred = useSelector((state) => state.userDetails.user);
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      const response = await logout(authToken);
    } catch (error) {
    }
  };
  const logoutFunction = () => {
    fetchData()
    dispatch(setAuthToken(null));
    deleteAuthToken()
    dispatch(updateUser(null))
    dispatch(updateUserTeacher(null))
    deleteAuthUserData()
    deleteAuthTeacherData()
    // setTimeout(() => {
    router.replace('/login')
    // }, 2000);
  }
  return (
    <>
      <LoggedInHeader />
      <ScrollView className='bg-body'>
        <View className='rounded-t-[24px] p-5 bg-light w-full h-full min-h-[600px]'>
          <View className='h-full flex flex-col items-start gap-y-5 mb-auto'>
            {userCred && Object.keys(userCred).length > 0 &&
              userCred?.role_id === 4 &&
              <Pressable onPress={() => router.push('/updateProfile')} className='flex flex-row items-center'>
                <View className='w-[40px] flex items-center'><AppIcon type='EvilIcons' name='pencil' size={40} color={'#535353'} /></View>
                <Text className='font-bold text-body ml-5 mt-2 text-base'>Update Profile</Text>
              </Pressable>
            }
            <Pressable onPress={() => router.push('/support')} className='flex flex-row items-center'>
              <View className='w-[40px] flex items-center'><AppIcon type='AntDesign' name='customerservice' size={28} color={'#535353'} /></View>
              <Text className='font-bold text-body ml-5 text-base'>Support</Text>
            </Pressable>
            <Pressable onPress={() => router.push('/updatePassword')} className='flex flex-row items-center'>
              <View className='w-[40px] flex items-center'><AppIcon type='MaterialCommunityIcons' name='form-textbox-password' size={28} color={'#535353'} /></View>
              <Text className='font-bold text-body ml-5 text-base'>Change your Password</Text>
            </Pressable>
            <Pressable onPress={logoutFunction} className='flex flex-row items-center'>
              <View className='w-[40px] flex items-center'><AppIcon type='AntDesign' name='logout' size={28} color={'#535353'} /></View>
              <Text className='font-bold text-body ml-5 text-base'>Logout</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </>
  )
}