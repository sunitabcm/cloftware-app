import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { getStudentAttendanceCalendar } from '../ApiCalls';
import { useRouter } from 'expo-router';
import stylesGlobal from '../styles/global'
import BtnGlobal from './GlobalComps/BtnGlobal';
const MyCalendar = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const authToken = useSelector((state) => state.auth.authToken);
  const userCred = useSelector((state) => state.userDetails.user);
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    // Fetch initial data when the component mounts
    fetchApiData(selectedDate);
  }, [selectedDate]);

  const fetchApiData = async (date) => {
    try {
      const data = await getStudentAttendanceCalendar(
        authToken,
        userCred?.school_id,
        userCred?.school_id,
        dayjs(date).format('YYYY'),
        dayjs(date).format('MM')
      );
      setApiData(data?.body);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const onDayPress = (day) => {
    // Handle day press if needed
    console.log('selected day', day);
  };

  const onMonthChange = (month) => {
    const newDate = dayjs(month.dateString).format('YYYY-MM-DD');
    setSelectedDate(newDate);
    fetchApiData(newDate);
  };

  const renderCalendar = () => {
    const markedDates = {};

    if (apiData && Object.values(apiData).length > 0) {
      apiData?.attendance.forEach((attendance) => {
        markedDates[attendance.date] = {
          selected: true,
          selectedColor:
            attendance.status === 'Present'
              ? '#10B981'
              : attendance.status === 'Absent'
                ? '#FE0A0A'
                : attendance.status === 'Leave'
                  ? '#2A2D32'
                  : '#FEC532',
        };
      });
    }

    const defaultSelectedDate = dayjs(selectedDate).format('YYYY-MM-DD');
    markedDates[defaultSelectedDate] = {
      selected: true,
      selectedColor: '#ccc',
    };

    return (
      <Calendar
        markedDates={markedDates}
        onDayPress={onDayPress}
        onMonthChange={onMonthChange}
        current={selectedDate}
        hideExtraDays={true}
      />
    );
  };

  return (
    <View className='mt-0 mb-10'>
      <View className='p-2'>
        {renderCalendar()}
      </View>
      <View className='mt-5 border-t border-lightergrey p-5'>
        <View className='flex flex-row items-center justify-between mb-5'>
          <Text className='text-xl font-bold'>Overview</Text>
          <Text className='text-secondary text-base'>view activity</Text>
        </View>
        <View className=''>
          <View className='w-full' style={[{ display: 'flex', flexDirection: 'row', marginTop: 20, flexWrap: 'wrap', gap: 10, justifyContent: 'center', }]}>
            <View className='p-3 w-[48%] flex flex-row border border-lightergrey rounded-3xl'>
              <View className='w-4 h-4 rounded-md mt-1.5 mr-3 ml-1 bg-success'></View>
              <View className='flex flex-col'>
                <Text className='text-body text-base'>Present</Text>
                <Text className='text-body text-base font-bold'>{apiData && Object.values(apiData).length > 0 ? apiData?.attended || 0 : 0}</Text>
              </View>
            </View>
            <View className='p-3 w-[48%] flex flex-row border border-lightergrey rounded-3xl'>
              <View className='w-4 h-4 rounded-md mt-1.5 mr-3 ml-1 bg-error'></View>
              <View className='flex flex-col'>
                <Text className='text-body text-base'>Absent</Text>
                <Text className='text-body text-base font-bold'>{apiData && Object.values(apiData).length > 0 ? apiData?.absent || 0 : 0}</Text>
              </View>
            </View>
            <View className='p-3 w-[48%] flex flex-row border border-lightergrey rounded-3xl'>
              <View className='w-4 h-4 rounded-md mt-1.5 mr-3 ml-1 bg-body'></View>
              <View className='flex flex-col'>
                <Text className='text-body text-base'>Leave</Text>
                <Text className='text-body text-base font-bold'>{apiData && Object.values(apiData).length > 0 ? apiData?.leave || 0 : 0}</Text>
              </View>
            </View>
            <View className='p-3 w-[48%] flex flex-row border border-lightergrey rounded-3xl'>
              <View className='w-4 h-4 rounded-md mt-1.5 mr-3 ml-1 bg-gold'></View>
              <View className='flex flex-col'>
                <Text className='text-body text-base'>Holiday</Text>
                <Text className='text-body text-base font-bold'>{apiData && Object.values(apiData).length > 0 ? apiData?.holidays || 0 : 0}</Text>
              </View>
            </View>
          </View>
        </View>
        <BtnGlobal
          styleClassName="button"
          title="Request Leave"
          onPress={() => router.push('/requestLeave')}
          classNames={'w-full mt-5'}
        />
      </View>
    </View>
  );
};

export default MyCalendar;
