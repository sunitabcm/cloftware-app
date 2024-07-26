import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import AppIcon from './GlobalComps/AppIcon';
import EmptyScreen from './GlobalComps/EmptyScreen';

const HolidayList = ({ data, fetchData, date }) => {
  const currentYear = dayjs().year();
  const academicYearStart = currentYear - 1;
  const [selectedDate, setSelectedDate] = useState(date !== '' ? date : 'Select Date');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState(null);

  const openModal = (holiday) => {
    setSelectedHoliday(holiday);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const onArrowPress = (increment) => {
    let dateSelect;
    let newDate;
    let newYear = newDate.year();
    if (selectedDate === 'Select Date') {
      dateSelect = dayjs(new Date()).format('YYYY-MM')
      newDate = dayjs(dateSelect).add(increment, 'month');
    } else {
      newDate = dayjs(selectedDate).add(increment, 'month');
    }

    if (newYear >= academicYearStart && newYear <= currentYear) {
      setSelectedDate(newDate.format('YYYY-MM'));
      fetchData(newDate.format('YYYY-MM'));
    }
  };


  const organizeDataByMonth = () => {
    const organizedData = {};

    data && data.forEach((holiday) => {
      const holidayYear = dayjs(holiday.date).year();

      if (holidayYear >= academicYearStart && holidayYear <= currentYear) {
        const month = new Date(holiday.date).toLocaleString('default', { month: 'long' });

        if (!organizedData[month]) {
          organizedData[month] = [];
        }

        organizedData[month].push(holiday);
      }
    });

    return organizedData;
  };

  const renderHolidays = () => {
    const organizedData = organizeDataByMonth();

    return Object.keys(organizedData).map((month) => (
      <View key={month} style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{month}</Text>
        {organizedData[month].map((holiday) => (
          <View key={holiday.holiday_id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <View style={{ backgroundColor: '#FFD700', height: 60, width: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{new Date(holiday.date).getDate()}</Text>
            </View>
            <Text style={{ fontSize: 16, flex: 1, marginLeft: 10 }}>{holiday.title}</Text>
          </View>
        ))}
      </View>
    ));
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
        <TouchableOpacity onPress={() => onArrowPress(-1)}>
          <AppIcon type='AntDesign' name='caretleft' size={20} color='#A3A3A3' />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{selectedDate !== 'Select Date' ? dayjs(selectedDate).format('MMMM YYYY'): selectedDate}</Text>
        <TouchableOpacity onPress={() => onArrowPress(1)}>
          <AppIcon type='AntDesign' name='caretright' size={20} color='#A3A3A3' />
        </TouchableOpacity>
      </View>
      {renderHolidays()}
      {data.length === 0 && <EmptyScreen url='https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/pencil.png' text1='Looks like its a relaxing day' text2='The day is too long so no need of homework today' />}
    </View>
  );
};

export default HolidayList;
