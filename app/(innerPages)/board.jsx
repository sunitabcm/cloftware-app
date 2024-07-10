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
import TeachAssignmentUI from '../../component/TeachAssignmentUI';
import TeachScheduleUI from '../../component/TeachScheduleUI';
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
  const pathname = usePathname();

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
  }, [authToken, selectedClass, router, pathname]);

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
          {dataView && dataView.schedule_list.length > 0 && (
            <View className='p-5 pt-0'>
              {dataView.schedule_list.slice(0, 3).map((schedule, index) => (
                <TeachScheduleUI schedule={schedule} index={index}/>
              ))}
              <Link href={'/scheduleTeacher'} className='text-body font-bold text-xl'>{`See All Scheduled books`} <AppIcon type='AntDesign' name='right' size={18} color='#2A2D32' /></Link>
            </View>
          )}
        </View>
      </View>
      <View style={styles.section}>
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
            {dataView && dataView.assignment_list.length > 0 && (
              <View className='p-5 pt-0'>
                {dataView.assignment_list.slice(0, 3).map((assignment, index) => (
                  <TeachAssignmentUI assignment={assignment} index={index} pressFunction={()=> router.push({ pathname: "/homeAssignmentTeacher", params: { assignment_id: assignment.assignment_id } })}/>
                ))}
                <Link href={'/homeAssignmentTeacher'} className='text-body font-bold text-xl'>{`See All Assignments`} <AppIcon type='AntDesign' name='right' size={18} color='#2A2D32' /></Link>

              </View>
            )}
          </View>
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
