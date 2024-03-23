import { Pressable, Text, View } from 'react-native';
import React from 'react'
import AppIcon from './AppIcon';
import IconHeader from './IconHeader';
import AvatarIcon from './AvatarIcon';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';

export default function LoggedInHeader() {
    const authToken = useSelector((state) => state.auth.authToken)
    const userCred = useSelector((state) => state.userDetails.user);
    const router = useRouter()
    return (
        <View className='bg-body p-5'>
            <View className='mt-6'>
                <IconHeader />
            </View>
            <View className='flex flex-row items-center justify-between mt-10'>
                <Pressable onPress={()=> router.push('/updateProfile')} className='flex flex-row items-center mt-3'>
                    <AvatarIcon />
                    {userCred && Object.keys(userCred).length > 0 ?
                        <View className='flex flex-col items-start ml-4'>
                            <Text className='font-bold text-light'>{userCred.first_name} {userCred?.last_name}</Text>
                            <Text className='font-light text-light'>{userCred.class_name} {userCred.section_name}</Text>
                        </View>
                        :
                        <Text></Text>
                    }
                </Pressable>
                {/* <AppIcon type='MaterialCommunityIcons' name='arrow-down-drop-circle' size={35} color={'#fff'} /> */}
            </View>
        </View>
    )
}