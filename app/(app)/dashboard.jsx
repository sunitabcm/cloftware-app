import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { stylesGlobal } from '../../styles/global';
import { useRouter } from "expo-router";
import { Image } from 'expo-image';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAuthTeacherData, deleteAuthToken, deleteAuthUserData } from '../../authStorage';
import { setAuthToken } from '../../store/slices/authSlice';
import { getProfileTeacher, logout } from '../../ApiCalls';
import { updateUser } from '../../store/slices/userSlice';
import AppIcon from '../../component/GlobalComps/AppIcon';
import LoggedInHeader from '../../component/GlobalComps/LoggedInHeader';
import { updateUserTeacher } from '../../store/slices/teacherSlice';
import { setSelectedClass } from '../../store/slices/classSlice';
export default function dashboard() {
  const router = useRouter();
  const authToken = useSelector((state) => state.auth.authToken)
  const userCred = useSelector((state) => state.userDetails.user);
  const userTeacherCred = useSelector((state) => state.userDetailsTeacher.user);
  const dispatch = useDispatch();
  const selectedClass = useSelector((state) => state.class.selectedClass);
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

  const fetchData2 = async (authToken) => {
    try {
      const response = await getProfileTeacher(dispatch, authToken)
    } catch (error) {
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      if (authToken && userCred && Object.keys(userCred).length > 0 && userCred?.role_id === 3) {
        if (userTeacherCred && Object.keys(userTeacherCred).length > 0) {
          const defaultClass = userTeacherCred.teacherSections.find((cls) => cls.is_class_teacher === 1);
          if (defaultClass) {
            dispatch(setSelectedClass(defaultClass));
          }
        } else {
          fetchData2(authToken)
        }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [authToken, userCred]);

  return (
    <>
      <LoggedInHeader />
      <ScrollView className='h-full bg-body'>
        <View className='rounded-t-[24px] p-5 bg-light w-full pb-10'>
          {userCred && Object.keys(userCred).length > 0 ?
            userCred?.role_id === 3 ?
              <View style={stylesGlobal.flexCenter} className=''>
                <View className='w-full' style={[{ display: 'flex', flexDirection: 'row', marginTop: 20, flexWrap: 'wrap', gap: 10, justifyContent: 'start', }]}>
                <Pressable style={[stylesGlobal.flexCenter, { width: '47%', padding: 0, marginBottom: 24 }]} onPress={() => router.push('/classes')}>
                    <Image
                      source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/events_svg.svg' }}
                      style={{ width: 50, height: 50 }}
                      contentFit="cover"
                    />
                    <Text style={[stylesGlobal.innertext, { marginTop: 5 }]} className='text-center'>Classes</Text>
                  </Pressable>
                  <Pressable style={[stylesGlobal.flexCenter, { width: '47%', padding: 0, marginBottom: 24 }]} onPress={() => router.push('/attendanceTeacher')}>
                    <Image
                      source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/attendance_svg.svg' }}
                      style={[{ width: 50, height: 50 }]}
                      className=''
                      contentFit="cover"
                    />
                    <Text style={[stylesGlobal.innertext, { marginTop: 5 }]} className='text-center'>Attendance</Text>
                  </Pressable>
                  <Pressable style={[stylesGlobal.flexCenter, { width: '47%', padding: 0, marginBottom: 24 }]} onPress={() => router.push('/holidays')}>
                    <Image
                      source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/holidays_svg.svg' }}
                      style={{ width: 50, height: 50 }}
                      contentFit="cover"
                    />
                    <Text style={[stylesGlobal.innertext, { marginTop: 5 }]} className='text-center'>Holidays</Text>
                  </Pressable>
                  <Pressable style={[stylesGlobal.flexCenter, { width: '47%', padding: 0, marginBottom: 24 }]} onPress={() => router.push('/scheduleTeacher')}>
                    <Image
                      source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/schedules_svg.svg' }}
                      style={{ width: 50, height: 50 }}
                      contentFit="cover"
                    />
                    <Text style={[stylesGlobal.innertext, { marginTop: 5 }]} className='text-center'>Schedules</Text>
                  </Pressable>
                  <Pressable style={[stylesGlobal.flexCenter, { width: '47%', padding: 0, marginBottom: 24 }]} onPress={() => router.push('/timeTable')}>
                    <Image
                      source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/timeTable_svg.svg' }}
                      style={{ width: 50, height: 50 }}
                      contentFit="cover"
                    />
                    <Text style={[stylesGlobal.innertext, { marginTop: 5 }]} className='text-center'>Time Table</Text>
                  </Pressable>
                  <Pressable style={[stylesGlobal.flexCenter, { width: '47%', padding: 0, marginBottom: 24 }]} onPress={() => router.push('/homeAssignmentTeacher')}>
                    <Image
                      source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/assignment_svg.svg' }}
                      style={{ width: 50, height: 50 }}
                      contentFit="cover"
                    />
                    <Text style={[stylesGlobal.innertext, { marginTop: 5 }]} className='text-center'>Home Assignment</Text>
                  </Pressable>
                  <Pressable style={[stylesGlobal.flexCenter, { width: '47%', padding: 0, marginBottom: 24 }]} onPress={() => router.push('/noticeBoard')}>
                    <Image
                      source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/notice_svg.svg' }}
                      style={{ width: 50, height: 50 }}
                      contentFit="cover"
                    />
                    <Text style={[stylesGlobal.innertext, { marginTop: 5 }]} className='text-center'>Notice Board</Text>
                  </Pressable>
                  <Pressable style={[stylesGlobal.flexCenter, { width: '47%', padding: 0, marginBottom: 24 }]} onPress={() => router.push('/importantDates')}>
                    <Image
                      source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/importantDate.svg' }}
                      style={{ width: 50, height: 50 }}
                      contentFit="cover"
                    />
                    <Text style={[stylesGlobal.innertext, { marginTop: 5 }]} className='text-center'>Important Days</Text>
                  </Pressable>
                  <Pressable style={[stylesGlobal.flexCenter, { width: '47%', padding: 0, marginBottom: 24 }]} onPress={() => router.push('/exams')}>
                    <Image
                      source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/exam_svg.svg' }}
                      style={{ width: 50, height: 50 }}
                      contentFit="cover"
                    />
                    <Text style={[stylesGlobal.innertext, { marginTop: 5 }]} className='text-center'>Exams</Text>
                  </Pressable>
                </View>
              </View>
              :
              <View style={stylesGlobal.flexCenter} className=''>
                <View className='w-full' style={[{ display: 'flex', flexDirection: 'row', marginTop: 20, flexWrap: 'wrap', gap: 10, justifyContent: 'start', }]}>
                  <Pressable style={[stylesGlobal.flexCenter, { width: '31%', padding: 12 }]} onPress={() => router.push('/attendance')}>
                    <Image
                      source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/attendance_svg.svg' }}
                      style={[{ width: 50, height: 50 }]}
                      className=''
                      contentFit="cover"
                    />
                    <Text style={[stylesGlobal.innertext, { marginTop: 5 }]} className='text-center'>Attendance</Text>
                  </Pressable>
                  <Pressable style={[stylesGlobal.flexCenter, { width: '31%', padding: 12 }]} onPress={() => router.push('/holidays')}>
                    <Image
                      source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/holidays_svg.svg' }}
                      style={{ width: 50, height: 50 }}
                      contentFit="cover"
                    />
                    <Text style={[stylesGlobal.innertext, { marginTop: 5 }]} className='text-center'>Holidays</Text>
                  </Pressable>
                  <Pressable style={[stylesGlobal.flexCenter, { width: '31%', padding: 12 }]} onPress={() => router.push('/events')}>
                    <Image
                      source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/events_svg.svg' }}
                      style={{ width: 50, height: 50 }}
                      contentFit="cover"
                    />
                    <Text style={[stylesGlobal.innertext, { marginTop: 5 }]} className='text-center'>Events</Text>
                  </Pressable>
                  <Pressable style={[stylesGlobal.flexCenter, { width: '31%', padding: 12 }]} onPress={() => router.push('/bookSchedule')}>
                    <Image
                      source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/schedules_svg.svg' }}
                      style={{ width: 50, height: 50 }}
                      contentFit="cover"
                    />
                    <Text style={[stylesGlobal.innertext, { marginTop: 5 }]} className='text-center'>Schedules</Text>
                  </Pressable>
                  <Pressable style={[stylesGlobal.flexCenter, { width: '31%', padding: 12 }]} onPress={() => router.push('/fees')}>
                    <Image
                      source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/fees_svg.svg' }}
                      style={{ width: 50, height: 50 }}
                      contentFit="cover"
                    />
                    <Text style={[stylesGlobal.innertext, { marginTop: 5 }]} className='text-center'>Fees</Text>
                  </Pressable>
                  <Pressable style={[stylesGlobal.flexCenter, { width: '31%', padding: 12 }]} onPress={() => router.push('/timeTable')}>
                    <Image
                      source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/timeTable_svg.svg' }}
                      style={{ width: 50, height: 50 }}
                      contentFit="cover"
                    />
                    <Text style={[stylesGlobal.innertext, { marginTop: 5 }]} className='text-center'>Time Table</Text>
                  </Pressable>
                  <Pressable style={[stylesGlobal.flexCenter, { width: '31%', padding: 12 }]} onPress={() => router.push('/homeAssignment')}>
                    <Image
                      source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/assignment_svg.svg' }}
                      style={{ width: 50, height: 50 }}
                      contentFit="cover"
                    />
                    <Text style={[stylesGlobal.innertext, { marginTop: 5 }]} className='text-center'>Home Assignment</Text>
                  </Pressable>
                  <Pressable style={[stylesGlobal.flexCenter, { width: '31%', padding: 12 }]} onPress={() => router.push('/noticeBoard')}>
                    <Image
                      source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/notice_svg.svg' }}
                      style={{ width: 50, height: 50 }}
                      contentFit="cover"
                    />
                    <Text style={[stylesGlobal.innertext, { marginTop: 5 }]} className='text-center'>Notice Board</Text>
                  </Pressable>
                  <Pressable style={[stylesGlobal.flexCenter, { width: '31%', padding: 12 }]} onPress={() => router.push('/importantDates')}>
                    <Image
                      source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/importantDate.svg' }}
                      style={{ width: 50, height: 50 }}
                      contentFit="cover"
                    />
                    <Text style={[stylesGlobal.innertext, { marginTop: 5 }]} className='text-center'>Important Days</Text>
                  </Pressable>
                  <Pressable style={[stylesGlobal.flexCenter, { width: '31%', padding: 12 }]} onPress={() => router.push('/exams')}>
                    <Image
                      source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/exam_svg.svg' }}
                      style={{ width: 50, height: 50 }}
                      contentFit="cover"
                    />
                    <Text style={[stylesGlobal.innertext, { marginTop: 5 }]} className='text-center'>Exams</Text>
                  </Pressable>
                </View>
              </View>
            :
            <View style={stylesGlobal.flexCenter} className=''>
            </View>
          }
          {/* <View className='w-full mt-10'>
          <Text style={stylesGlobal.title}>Latest Events</Text>
          <Image
            source={require("../../assets/dash_image.png")}
            style={{ width: '100%', height: 190 }}
            contentFit="cover"
          />
        </View> */}
        </View>
      </ScrollView>
    </>
  )
}