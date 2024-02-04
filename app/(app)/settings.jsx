import { View, Text, ScrollView, Pressable } from 'react-native'
import React from 'react'
import AppIcon from '../../component/GlobalComps/AppIcon'
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from 'react-redux';
import { deleteAuthToken, deleteAuthUserData } from '../../authStorage';
import { setAuthToken } from '../../store/slices/authSlice';
import { logout } from '../../ApiCalls';
import { stylesGlobal } from '../../styles/global';
import { updateUser } from '../../store/slices/userSlice';
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
    deleteAuthUserData()
    setTimeout(() => {
      router.replace('/validateOtp')
    }, 2000);
  }
  return (
    <ScrollView className='bg-body'>
      <View className='rounded-t-[24px] p-5 bg-light w-full h-full min-h-[600px]'>
        <View className='h-full flex flex-col items-start gap-y-5 mb-auto'>
          <Pressable onPress={()=> router.push('/updateProfile')} className='flex flex-row items-center'>
            <View className='w-[40px] flex items-center'><AppIcon type='EvilIcons' name='pencil' size={40} color={'#535353'} /></View>
            <Text className='font-bold text-body ml-5 mt-2 text-base'>Update Profile</Text>
          </Pressable>
          <Pressable onPress={()=> router.push('/studentStats')} className='flex flex-row items-center'>
            <View className='w-[40px] flex items-center'><AppIcon type='Ionicons' name='bar-chart-outline' size={25} color={'#535353'} /></View>
            <Text className='font-bold text-body ml-5 text-base'>School details</Text>
          </Pressable>
          {/* <Pressable onPress={()=> router.push('/reports')} className='flex flex-row items-center'>
            <View className='w-[40px] flex items-center'><AppIcon type='FontAwesome' name='file-text-o' size={25} color={'#535353'} /></View>
            <Text className='font-bold text-body ml-5 text-base'>Reports</Text>
          </Pressable> */}
          <Pressable onPress={()=> router.push('/support')} className='flex flex-row items-center'>
            <View className='w-[40px] flex items-center'><AppIcon type='AntDesign' name='customerservice' size={28} color={'#535353'} /></View>
            <Text className='font-bold text-body ml-5 text-base'>Support</Text>
          </Pressable>
          <Pressable onPress={()=> router.push('/updatePassword')} className='flex flex-row items-center'>
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
  )
}