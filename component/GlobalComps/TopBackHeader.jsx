import { View, Text, TouchableOpacity, Pressable } from 'react-native'
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
      setPageName('Schedule Management')
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
    else if (pathname === '/importantDates') {
      setPageName('Important Days')
    }
    else if (pathname === '/addAssignment') {
      setPageName('Add assignment')
    }
    else if (pathname === '/addSchedule') {
      setPageName('Add schedule')
    }
    else if (pathname === '/attendanceTeacher') {
      setPageName('Attendance')
    }
    else if (pathname === '/classes') {
      setPageName('My classes')
    }
    else if (pathname === '/board') {
      setPageName('Board')
    }
    else if (pathname === '/markAttendance') {
      setPageName('Mark attendance')
    }
    else if (pathname === '/homeAssignmentTeacher') {
      setPageName('Assignment')
    }
    else if (pathname === '/scheduleTeacher') {
      setPageName('Schedule')
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