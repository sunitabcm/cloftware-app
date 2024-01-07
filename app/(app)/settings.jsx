import { View, Text, ScrollView, Pressable } from 'react-native'
import React from 'react'
import AppIcon from '../../component/GlobalComps/AppIcon'
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from 'react-redux';
import { deleteAuthToken } from '../../authStorage';
import { setAuthToken } from '../../store/slices/authSlice';
import { logout } from '../../ApiCalls';
export default function Settings() {
  const router = useRouter();
  const authToken = useSelector((state) => state.auth.authToken)

  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      const response = await logout(authToken?.token);
    } catch (error) {
    }
  };
  const logoutFunction = () => {
    fetchData()
    dispatch(setAuthToken(null));
    deleteAuthToken()
    setTimeout(() => {
      router.replace('/validateOtp')
    }, 2000);
  }
  return (
    <ScrollView className='bg-body'>
      <View className='rounded-t-[24px] p-5 bg-light w-full h-full min-h-[600px]'>
        <View className='h-full flex flex-col items-start gap-y-5 mb-auto'>
          <Pressable onPress={'/dashboard'} className='flex flex-row items-center'>
            <View className='w-[40px] flex items-center'><AppIcon type='EvilIcons' name='pencil' size={40} color={'#535353'} /></View>
            <Text className='font-bold text-body ml-5 mt-2 text-base'>Update Profile</Text>
          </Pressable>
          <Pressable onPress={'/dashboard'} className='flex flex-row items-center'>
            <View className='w-[40px] flex items-center'><AppIcon type='Ionicons' name='bar-chart-outline' size={25} color={'#535353'} /></View>
            <Text className='font-bold text-body ml-5 text-base'>Student Stats</Text>
          </Pressable>
          <Pressable onPress={'/dashboard'} className='flex flex-row items-center'>
            <View className='w-[40px] flex items-center'><AppIcon type='FontAwesome' name='file-text-o' size={25} color={'#535353'} /></View>
            <Text className='font-bold text-body ml-5 text-base'>Reports</Text>
          </Pressable>
          <Pressable onPress={'/dashboard'} className='flex flex-row items-center'>
            <View className='w-[40px] flex items-center'><AppIcon type='AntDesign' name='customerservice' size={28} color={'#535353'} /></View>
            <Text className='font-bold text-body ml-5 text-base'>Support</Text>
          </Pressable>
          <Pressable onPress={logoutFunction} className='flex flex-row items-center'>
            <View className='w-[40px] flex items-center'><AppIcon type='AntDesign' name='logout' size={28} color={'#535353'} /></View>
            <Text className='font-bold text-body ml-5 text-base'>Logout</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  )
}