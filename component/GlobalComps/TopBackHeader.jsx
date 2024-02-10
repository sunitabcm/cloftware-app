import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Link, usePathname, useRouter } from 'expo-router'
import BtnGlobal from './BtnGlobal';
import AppIcon from './AppIcon';
export default function TopBackHeader({ TitleName = '/Page' }) {
  const router = useRouter();
  const pathname = usePathname();
  const [pageName, setPageName] = useState(TitleName);

  useEffect(() => {
    if (pathname === '/requestLeave') {
      setPageName('Request Leave')
    }
    else if (pathname === '/bookSchedule') {
      setPageName('Book Schedules')
    }
    else if (pathname === '/homeAssignment') {
      setPageName('Home Assignments')
    }
    else if (pathname === '/noticeBoard') {
      setPageName('Notice Board')
    }
    else if (pathname === '/updateProfile') {
      setPageName('Update Profile')
    }
    else if (pathname === '/updatePassword') {
      setPageName('Update Password')
    }
    else if (pathname === '/studentStats') {
      setPageName('school details')
    }
    else if (pathname === '/timeTable') {
      setPageName('Timetable Management')
    }
    else {
      setPageName(pathname)
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