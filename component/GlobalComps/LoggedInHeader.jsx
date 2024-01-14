import { Pressable, Text, View } from 'react-native';
import React from 'react'
import AppIcon from './AppIcon';
import IconHeader from './IconHeader';
import AvatarIcon from './AvatarIcon';
import { useSelector, useDispatch } from 'react-redux';

export default function LoggedInHeader() {
    const authToken = useSelector((state) => state.auth.authToken)
    return (
        <View className='bg-body p-5'>
            <View className='mt-6'>
                <IconHeader />
            </View>
            <View className='flex flex-row items-center justify-between mt-10'>
                <View className='flex flex-row items-center mt-3'>
                    <AvatarIcon />
                    {authToken && Object.keys(authToken).length > 0 ?
                        <View className='flex flex-col items-start ml-4'>
                            <Text className='font-bold text-light'>{authToken.first_name} {authToken?.last_name}</Text>
                            <Text className='font-light text-light'>{authToken.class_name}</Text>
                        </View>
                        :
                        <Text></Text>
                    }
                </View>
                {/* <AppIcon type='MaterialCommunityIcons' name='arrow-down-drop-circle' size={35} color={'#fff'} /> */}
            </View>
        </View>
    )
}