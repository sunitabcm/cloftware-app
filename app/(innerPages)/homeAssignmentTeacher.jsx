import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import { stylesGlobal } from "../../styles/global";
import { useToast } from 'react-native-toast-notifications';
import { ClassViewData, addEditApplyLeave, getAssignmentList, getProfileData } from "../../ApiCalls";
import { Link, usePathname, useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import GlobalDatePicker from '../../component/GlobalComps/GlobalDatePicker';
import GlobalInputs from '../../component/GlobalComps/GlobalInputs';
import BtnGlobal from '../../component/GlobalComps/BtnGlobal';
import AttendanceBox from '../../component/AttendanceBar';
import ClassDropdown from '../../component/ClassDropdown';
import AppIcon from '../../component/GlobalComps/AppIcon';
import { Image } from 'expo-image';
import FixedFooter from '../../component/GlobalComps/FixedFooter';
const TeacherHomeAssignment = () => {
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
      const response = await getAssignmentList(authToken, selectedClass?.class_id, selectedClass?.section_id);
      if (response) {
        setDataView(response.body)
      } else {
        setDataView(null)
      }
    } catch (error) {
      setDataView(null)
    }
  };

  useEffect(() => {
    if (authToken && selectedClass && Object.keys(selectedClass).length > 0) {
      loginPostFunc()
    }
  }, [authToken, selectedClass]);

  return (
    <>
      <ScrollView className='h-full bg-lightergrey'>
        <View className='bg-light p-5'>
          <ClassDropdown />
        </View>
        <View style={styles.section}>
          {dataView && dataView.length > 0 ? (
            <View >
              {dataView.map((assignment, index) => (
                <View key={index} className='border border-lightergrey p-4 rounded-xl mb-4 bg-light'>
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
            </View>
          ) : (
            <Text style={styles.noDataText}>No Assignments Available</Text>
          )}
        </View>
      </ScrollView>
      <FixedFooter />
    </>
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


export default TeacherHomeAssignment;
