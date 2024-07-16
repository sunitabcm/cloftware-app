import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { getScheduleList } from "../../ApiCalls";
import { Link, usePathname, useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import ClassDropdown from '../../component/ClassDropdown';
import FixedFooter from '../../component/GlobalComps/FixedFooter';
import TeachScheduleUI from '../../component/TeachScheduleUI';
import EmptyScreen from '../../component/GlobalComps/EmptyScreen'
const ScheduleTeacher = () => {
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
      const response = await getScheduleList(authToken, selectedClass?.class_id, selectedClass?.section_id);
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
      <ScrollView className='h-full bg-light'>
        <View className='bg-light p-5 border-b border-lightergrey'>
          <ClassDropdown />
        </View>
        <View style={styles.section}>
          {dataView && dataView.length > 0 ? (
            <View >
              {dataView.map((schedule, index) => (
                <TeachScheduleUI schedule={schedule} index={index}/>
              ))}
            </View>
          ) : (
            <EmptyScreen url='https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/pencil.png' text1='Looks like its a relaxing day' text2='The day is too long so no need of homework today'/>
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


export default ScheduleTeacher;
