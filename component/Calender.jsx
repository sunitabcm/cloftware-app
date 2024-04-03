import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { getStudentAttendanceCalendar } from '../ApiCalls';
import { Link, useRouter, useLocalSearchParams, usePathname } from 'expo-router';
import stylesGlobal from '../styles/global'
import BtnGlobal from './GlobalComps/BtnGlobal';
import PieChart from 'react-native-pie-chart';
import { SmallPopup } from './GlobalComps/SmallPopup';
const MyCalendar = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const pathname = usePathname();
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const authToken = useSelector((state) => state.auth.authToken);
  const userCred = useSelector((state) => state.userDetails.user);
  const [apiData, setApiData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  let markedDates;
  const openModal = (holiday) => {
    setSelectedHoliday(holiday);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    fetchApiData(selectedDate);
  }, [selectedDate, router, pathname]);

  const fetchApiData = async (date) => {
    try {
      const data = await getStudentAttendanceCalendar(
        authToken,
        userCred?.student_details?.stu_id,
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
    // Check if the date is marked (clickable)
    const clickedDateInfo = markedDates[day.dateString];
    if (clickedDateInfo) {
      const status = clickedDateInfo.type;
      if (status) {
        if (status === 'Present') {
        } else if (status === 'Absent') {
        } else if (status === 'Leave') {
          router.push({ pathname: "/requestLeave", params: { date: day.dateString } })
        } else if (status === 'Holiday') {
          router.push({ pathname: "/holidays", params: { date: day.dateString } })
        } else {
        }
      }
    } else {
    }
  };



  const onMonthChange = (month) => {
    const newDate = dayjs(month.dateString).format('YYYY-MM-DD');
    setSelectedDate(newDate);
    fetchApiData(newDate);
  };

  const renderCalendar = () => {
    markedDates = {};

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
                  : attendance.status === 'Holiday'
                    ? '#FEC532'
                    : '#ffffff',
          type: attendance.status,
        };
      });

      apiData?.holiday_list.forEach((holiday) => {
        markedDates[holiday.date] = {
          selected: true,
          selectedColor: '#FEC532',
          // marked: true,
          type: 'Holiday',
        };
      });
    }

    // const defaultSelectedDate = dayjs(selectedDate).format('YYYY-MM-DD');
    // markedDates[defaultSelectedDate] = {
    //   // selected: true,
    //   // selectedColor: '#ccc',
    // };

    return (
      <Calendar
      key={pathname}
        markedDates={markedDates}
        onDayPress={onDayPress}
        onMonthChange={onMonthChange}
        current={selectedDate}
        hideExtraDays={true}
      />
    );
  };

  const renderDonutChart = () => {
    const totalValue = apiData?.attended + apiData?.absent + apiData?.leave + apiData?.holiday;

    // Check if totalValue is zero or all segments have zero values
    if (!apiData?.attendance || totalValue === 0 || totalValue !== totalValue) {
      return (
        null
      );
    }

    const data = [
      (apiData?.attended || 0) / totalValue,
      (apiData?.absent || 0) / totalValue,
      (apiData?.leave || 0) / totalValue,
      (apiData?.holiday || 0) / totalValue,
    ];

    const sliceColor = ['#10B981', '#FE0A0A', '#2A2D32', '#FEC532'];
    const widthAndHeight = 200

    return (
      <View className='flex items-center mb-5'>
        <PieChart
        key={pathname}
          widthAndHeight={widthAndHeight}
          series={data}
          sliceColor={sliceColor}
          doughnut={true}
          coverRadius={0.65}
          coverFill={'#FFF'}
        /></View>
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
        </View>
        <View className='mb-2'>
          {renderDonutChart()}
          <View className='w-full' style={[{ display: 'flex', flexDirection: 'row', marginTop: 0, flexWrap: 'wrap', gap: 10, justifyContent: 'center', }]}>
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
            <Pressable onPress={() => router.push({ pathname: "/requestLeave", params: { date: selectedDate } })} className='p-3 w-[48%] flex flex-row border border-lightergrey rounded-3xl'>
              <View className='flex flex-row'>
                <View className='w-4 h-4 rounded-md mt-1.5 mr-3 ml-1 bg-body'></View>
                <View className='flex flex-col'>
                  <Text className='text-body text-base'>Leave</Text>
                  <Text className='text-body text-base font-bold'>{apiData && Object.values(apiData).length > 0 ? apiData?.leave || 0 : 0}</Text>
                </View>
              </View>
            </Pressable>
            <Pressable onPress={() => router.push({ pathname: "/holidays", params: { date: selectedDate } })} className='p-3 w-[48%] flex flex-row border border-lightergrey rounded-3xl'>
              <View className='flex flex-row'>
                <View className='w-4 h-4 rounded-md mt-1.5 mr-3 ml-1 bg-gold'></View>
                <View className='flex flex-col'>
                  <Text className='text-body text-base'>Holiday</Text>
                  <Text className='text-body text-base font-bold'>{apiData && Object.values(apiData).length > 0 ? apiData?.holiday || 0 : 0}</Text>
                </View>
              </View>
            </Pressable>
          </View>
        </View>
        {apiData && Object.values(apiData).length > 0 && apiData?.leave !== 0 && apiData?.leave_list && apiData.leave_list.length > 0 &&
          apiData?.leave_list.map((holiday) => (
            <View key={holiday.holiday_id} className='flex flex-row justify-between items-center'>
              <View className='flex flex-row gap-3 mb-5 items-center'>
                <View className='text-light font-bold bg-body h-[60px] w-[60px] flex justify-center items-center text-2xl rounded-full'><Text className='text-light font-bold text-2xl'>{new Date(holiday.date).getDate()}</Text></View>
                <Text className='text-body font-bold'>{holiday.reason ? holiday.reason : 'No Reason Provided'}</Text>
              </View>
              {/* <Pressable onPress={() => openModal(holiday)} className='-mt-3'>
              <AppIcon type='MaterialIcons' name='sticky-note-2' size={32} color={'#999999'} />
            </Pressable>
            <SmallPopup isVisible={modalVisible && selectedHoliday === holiday} closeModal={closeModal}>
              <Text className='text-body p-3 pt-7'>{holiday.description}</Text>
            </SmallPopup> */}
            </View>
          ))}
        {apiData && Object.values(apiData).length > 0 && apiData?.absent !== 0 &&
          <BtnGlobal
            styleClassName="button"
            title="Request Leave"
            onPress={() => router.push('/requestLeave')}
            classNames={'w-full mt-5'}
          />
        }
      </View>
    </View>
  );
};

export default MyCalendar;
