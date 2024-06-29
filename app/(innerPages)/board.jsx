import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import { stylesGlobal } from "../../styles/global";
import { useToast } from 'react-native-toast-notifications';
import { ClassViewData, addEditApplyLeave, getProfileData } from "../../ApiCalls";
import { Link, usePathname, useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import GlobalDatePicker from '../../component/GlobalComps/GlobalDatePicker';
import GlobalInputs from '../../component/GlobalComps/GlobalInputs';
import BtnGlobal from '../../component/GlobalComps/BtnGlobal';
import AttendanceBox from '../../component/AttendanceBar';
import ClassDropdown from '../../component/ClassDropdown';
import AppIcon from '../../component/GlobalComps/AppIcon';
import { Image } from 'expo-image';
const Board = () => {
  const router = useRouter();
  const toast = useToast();
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.auth.authToken)
  const userCred = useSelector((state) => state.userDetails.user);
  const [dataView, setDataView] = useState(null);
  const [data, setData] = useState(null);
  const params = useLocalSearchParams();
  const selectedClass = useSelector((state) => state.class.selectedClass);

  const loginPostFunc = async () => {
    try {
      const response = await ClassViewData(authToken, selectedClass?.class_id, selectedClass?.section_id);
      const response2 = await await getProfileData(authToken, selectedClass?.class_id, selectedClass?.section_id, selectedClass?.class_details.school_id, dayjs(new Date()).format('YYYY-MM-DD'));
      if (response2) {
        setData(response2)
      } else {
        setData(null)
      }
      if (response) {
        setDataView(response.body)
      } else {
        setDataView(null)
      }
    } catch (error) {
      setDataView(null)
      setData(null)

    }
  };

  useEffect(() => {
    if (authToken && selectedClass && Object.keys(selectedClass).length > 0) {
      loginPostFunc()
    }
  }, [authToken, selectedClass]);

  return (
    <ScrollView className='h-full bg-lightergrey'>
      <View className='bg-light p-5'>
        <ClassDropdown />
      </View>
      <View style={styles.section}>
        {data && data.body && data.body.length > 0 &&
          <View className='bg-light rounded-xl'>
            <View className='flex flex-row items-center justify-between border-b border-b-lightergrey mb-5 p-5'>
              <View className='flex flex-row items-center'>
                <Image
                  source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/attendance_svg.svg' }}
                  style={{ width: 50, height: 50 }}
                  contentFit="cover"
                />
                <Text style={styles.sectionTitle} className='ml-5'>Attendance</Text>
              </View>
              {/* <AppIcon type='AntDesign' name='plus' size={25} color='#2A2D32' /> */}
            </View>
            <View className='p-5 pt-0'>
              <AttendanceBox present={data.body.present} absent={data.body.absent} leave={data.body.leave} />
              <Link href={'/attendanceTeacher'} className='text-body font-bold text-xl'>{`Check attendance`} <AppIcon type='AntDesign' name='right' size={18} color='#2A2D32' /></Link>
            </View>
          </View>
        }
        {dataView && dataView.schedule_list.length > 0 ? (
          <View className='bg-light rounded-xl'>
            <View className='flex flex-row items-center justify-between border-b border-b-lightergrey mb-5 p-5'>
              <View className='flex flex-row items-center'>
                <Image
                  source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/schedules_svg.svg' }}
                  style={{ width: 50, height: 50 }}
                  contentFit="cover"
                />
                <Text style={styles.sectionTitle} className='ml-5'>Schedules</Text>
              </View>
              <Link href={'/addSchedule'} className='text-body font-bold text-xl'><AppIcon type='AntDesign' name='plus' size={25} color='#2A2D32' /></Link>
            </View>
            <View className='p-5 pt-0'>
              {dataView.schedule_list.slice(0, 3).map((schedule, index) => (
                <View key={index} className='w-full flex flex-row items-center justify-between mb-4'>
                  <View className='w-[90%]'
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      // marginBottom: 15,
                    }}>
                    <Image
                      source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/pdfImage.svg' }}
                      style={{ width: 45, height: 60 }}
                      contentFit="cover"
                    />
                    <View key={index} className='flex flex-col ml-5'>
                      <Text className=' text-body text-lg font-bold'>{schedule.title}</Text>
                      <Text className=' text-body'>Uploaded on {new Date(schedule.created_at).toLocaleDateString()}</Text>
                    </View>
                  </View>
                </View>
              ))}
              <Link href={'/scheduleTeacher'} className='text-body font-bold text-xl'>{`See All Scheduled books`} <AppIcon type='AntDesign' name='right' size={18} color='#2A2D32' /></Link>
            </View>
          </View>
        ) : (
          <Text style={styles.noDataText}>No Schedules Available</Text>
        )}
      </View>

      <View style={styles.section}>
        {dataView && dataView.assignment_list.length > 0 ? (
          <View className='bg-light rounded-xl'>
            <View className='flex flex-row items-center justify-between border-b border-b-lightergrey mb-5 p-5'>
              <View className='flex flex-row items-center'>
                <Image
                  source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/assignment_svg.svg' }}
                  style={{ width: 50, height: 50 }}
                  contentFit="cover"
                />
                <Text style={styles.sectionTitle} className='ml-5'>Home Assignment</Text>
              </View>
              <Link href={'/addAssignment'} className='text-body font-bold text-xl'><AppIcon type='AntDesign' name='plus' size={25} color='#2A2D32' /></Link>
            </View>
            <View className='p-5 pt-0'>
              {dataView.assignment_list.slice(0, 3).map((assignment, index) => (
                <View key={index} className='border border-lightergrey p-4 rounded-xl mb-4'>
                  <Text style={{ backgroundColor: assignment.status === 'Active' ? '#10B981' : '#FE0A0A' }} className='text-light p-2 font-bold mb-2 rounded-lg w-[80px] text-center'>{assignment.status}</Text>
                  <Text style={stylesGlobal.title}>{assignment.title}</Text>
                  <Text className='text-lightgrey font-bold w-[90%] mt-2'>{assignment.description}</Text>
                  <View className='flex flex-row items-center justify-between mt-2'>
                    <View>
                      <Text className='text-body'>Created at</Text>
                      <View className='flex flex-row items-center'>
                        <AppIcon type='AntDesign' name='calendar' size={25} color='#999999' />
                        <Text className='text-lightgrey ml-2'>{new Date(assignment.created_at).toLocaleDateString()}</Text>
                      </View>
                    </View>
                    <View>
                      <Text className='text-body'>Due date</Text>
                      <View className='flex flex-row items-center'>
                        <AppIcon type='AntDesign' name='calendar' size={25} color='#999999' />
                        <Text className='text-lightgrey ml-2'>{assignment.due_date ? new Date(assignment.due_date).toLocaleDateString() : 'N/A'}</Text>
                      </View>
                    </View>
                  </View>
                  <View className='flex flex-col my-2'>
                    <Text className='text-body'>Assigned by</Text>
                    <Text className='text-body'>{assignment.teacher_name}</Text>
                  </View>
                </View>
              ))}
              <Link href={'/homeAssignmentTeacher'} className='text-body font-bold text-xl'>{`See All Assignments`} <AppIcon type='AntDesign' name='right' size={18} color='#2A2D32' /></Link>

            </View>
          </View>
        ) : (
          <Text style={styles.noDataText}>No Assignments Available</Text>
        )}

      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    // marginBottom: 24,
    padding: 20
    // backgroundColor: '#EEEEEE'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    // marginBottom: 12,
  },
  item: {
    backgroundColor: '#F5F5F7',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    marginVertical: 8,
  },
  itemDate: {
    fontSize: 12,
    color: '#777',
  },
  assignedBy: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  noDataText: {
    fontSize: 16,
    color: '#777',
  },
});


export default Board;
