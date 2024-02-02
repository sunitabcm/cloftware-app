import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Link, usePathname, useRouter } from 'expo-router'
import BtnGlobal from './BtnGlobal';
import AppIcon from './AppIcon';
export default function TopBackHeader({ TitleName = '/Page' }) {
    const router = useRouter();
    const pathname = usePathname();
    const [pageName , setPageName] = useState(TitleName);
    useEffect(() => {
      if(pathname === '/requestLeave'){
        setPageName('Request Leaves')
      }
      if(pathname === '/bookSchedule'){
        setPageName('Book Schedules')
      }
      if(pathname === '/homeAssignment'){
        setPageName('Home Assignments')
      }
      if(pathname === '/noticeBoard'){
        setPageName('Notice Board')
      }
      if(pathname === '/updateProfile'){
        setPageName('Update Profile')
      }
      if(pathname === '/updatePassword'){
        setPageName('Update Password')
      }
      if(pathname === '/studentStats'){
        setPageName('school details')
      }
      if(pathname === '/timeTable'){
        setPageName('Timetable Management')
      }
      }, [pathname]);
      
    return (
        <View className='bg-body w-full h-[64px] relative flex flex-row justify-center items-center'>
            <Link href={'../'} className='absolute left-5'>
                <AppIcon type='AntDesign' name='arrowleft' color='#fff' size={26} />
            </Link>
            <Text className='text-center capitalize text-light font-bold text-lg'>{pageName?.replace('/', '')}</Text>
        </View>
    )
}