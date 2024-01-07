import React, { useState } from 'react';
import { View, TextInput, Text, Button, Alert, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { getStudentAttendanceCalendar } from '../ApiCalls';
import Buttons from './Buttons';
import { useRouter } from 'expo-router';
import { stylesGlobal } from '../styles/global';
import GlobalInputs from './GlobalComps/GlobalInputs';
import BtnGlobal from './GlobalComps/BtnGlobal';
const MyCalendar = () => {
  const router = useRouter()
  const [selectedYear, setSelectedYear] = useState(dayjs().format('YYYY'));
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format('MM'));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const authToken = useSelector((state) => state.auth.authToken)
  const [apiData, setApiData] = useState({
    "success": true,
    "code": 200,
    "message": "Data found successfully",
    "body": {
      "year": "2023",
      "month": "November",
      "attendance_percentage": "6.67%",
      "attended": 2,
      "absent": 1,
      "leave": 1,
      "attendance": [
        {
          "date": "2023-11-20",
          "status": "Present"
        },
        {
          "date": "2023-11-23",
          "status": "Present"
        },
        {
          "date": "2023-11-09",
          "status": "Absent"
        },
        {
          "date": "2023-11-09",
          "status": "Leave"
        }
      ]
    }
  });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setSelectedDate(dayjs(date).format('YYYY-MM-DD'));
  };

  const fetchApiData = async () => {
    try {
      const data = await getStudentAttendanceCalendar(authToken?.token, authToken?.school_id, authToken?.school_id, selectedYear, selectedMonth);
      setApiData(data?.body)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const onYearChange = (text) => {
    setSelectedYear(text);
  };

  const onMonthChange = (text) => {
    setSelectedMonth(text);
  };
  const onSearchPress = () => {
    // Validate input fields and fetch data
    if (selectedYear && selectedMonth) {
      fetchApiData();
    } else {
      Alert.alert('Error', 'Please select both year and month.');
    }
  };

  const renderCalendar = () => {
    const markedDates = {};

    if (apiData) {
      apiData.body.attendance.forEach((attendance) => {
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
        onDayPress={(day) => console.log('selected day', day)}
        current={`${selectedYear}-${selectedMonth}-01`}
      />
    );
  };

  return (
    <View className='mt-5 mb-10'>
      <View className='flex flex-col w-full gap-y-2 mb-10 p-5'>
        <GlobalInputs
          placeholder={`Enter Year`}
          name="enterYear"
          mainClass={''}
          type='number'
          onChangeText={(number) => onYearChange(number)}
          value={selectedYear}
          blurOnSubmit={false}
        />
        <GlobalInputs
          placeholder={`Enter Month`}
          name="enterMonth"
          mainClass={'mt-5'}
          type='number'
          onChangeText={(number) => onMonthChange(number)}
          value={selectedMonth}
          blurOnSubmit={false}
        />
        <BtnGlobal
          styleClassName="button"
          title="Search"
          onPress={onSearchPress}
          classNames={'w-full mt-5'}
          isDisabled={selectedMonth === '' || selectedYear === ''}
        />
      </View>

      {renderCalendar()}
      <View className='mt-5 border-t border-lightgrey p-5'>
        <View className='flex flex-row items-center justify-between mb-5'>
          <Text style={stylesGlobal.title}>Overview</Text>
          <Text className='text-secondary text-base'>view activity</Text>
        </View>
        <View style={stylesGlobal.flexCenter} className=''>
          <View className='w-full' style={[{ display: 'flex', flexDirection: 'row', marginTop: 20, flexWrap: 'wrap', gap: 10, justifyContent: 'center', }]}>
            <View className='p-3 w-[48%] flex flex-row border border-lightgrey rounded-3xl'>
              <View className='w-4 h-4 rounded-sm mt-1.5 mr-3 ml-1 bg-success'></View>
              <View className='flex flex-col'>
                <Text className='text-body text-base'>Present</Text>
                <Text className='text-body text-base font-bold'>{apiData ? apiData?.body?.attended || 0 : 0}</Text>
              </View>
            </View>
            <View className='p-3 w-[48%] flex flex-row border border-lightgrey rounded-3xl'>
              <View className='w-4 h-4 rounded-sm mt-1.5 mr-3 ml-1 bg-error'></View>
              <View className='flex flex-col'>
                <Text className='text-body text-base'>Absent</Text>
                <Text className='text-body text-base font-bold'>{apiData ? apiData?.body?.absent || 0 : 0}</Text>
              </View>
            </View>
            <View className='p-3 w-[48%] flex flex-row border border-lightgrey rounded-3xl'>
              <View className='w-4 h-4 rounded-sm mt-1.5 mr-3 ml-1 bg-body'></View>
              <View className='flex flex-col'>
                <Text className='text-body text-base'>Leave</Text>
                <Text className='text-body text-base font-bold'>{apiData ? apiData?.body?.leave || 0 : 0}</Text>
              </View>
            </View>
            <View className='p-3 w-[48%] flex flex-row border border-lightgrey rounded-3xl'>
              <View className='w-4 h-4 rounded-sm mt-1.5 mr-3 ml-1 bg-gold'></View>
              <View className='flex flex-col'>
                <Text className='text-body text-base'>Holiday</Text>
                <Text className='text-body text-base font-bold'>{apiData ? apiData?.body?.holidays || 0 : 0}</Text>
              </View>
            </View>
          </View>
        </View>
        <BtnGlobal
          styleClassName="updatedbutton"
          title="Request Leave"
          onPress={() => router.push('/requestLeave')}
          classNames={'w-full mt-5'}
        />
      </View>
    </View>
  );
};

export default MyCalendar;