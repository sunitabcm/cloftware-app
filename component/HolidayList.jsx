import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { Calendar, Agenda } from 'react-native-calendars';
import dayjs from 'dayjs';
import AppIcon from './GlobalComps/AppIcon';
import { SmallPopup } from './GlobalComps/SmallPopup';
import EmptyScreen from './GlobalComps/EmptyScreen';

const HolidayList = ({ data, fetchData }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
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
    const newDate = dayjs(selectedDate).add(increment, 'month').format('YYYY-MM');
    setSelectedDate(newDate);
    fetchData(newDate);
  };

  const organizeDataByMonth = () => {
    const organizedData = {};

    data && data.forEach((holiday) => {
      const month = new Date(holiday.date).toLocaleString('default', { month: 'long' });

      if (!organizedData[month]) {
        organizedData[month] = [];
      }

      organizedData[month].push(holiday);
    });

    return organizedData;
  };

  const renderHolidays = () => {
    const organizedData = organizeDataByMonth();

    return Object.keys(organizedData).map((month) => (
      <View key={month} className='mb-4'>
        <Text className='text-body font-bold mb-5'>{month}</Text>
        {organizedData[month].map((holiday) => (
          <View key={holiday.holiday_id} className='flex flex-row justify-between items-center'>
            <View className='flex flex-row gap-3 mb-5 items-center'>
              <View className='text-body font-bold bg-gold h-[60px] w-[60px] flex justify-center items-center text-2xl rounded-full'><Text className='text-body font-bold text-2xl'>{new Date(holiday.date).getDate()}</Text></View>
              <Text className='text-body font-bold'>{holiday.title}</Text>
            </View>
            {/* <Pressable onPress={() => openModal(holiday)} className='-mt-3'>
              <AppIcon type='MaterialIcons' name='sticky-note-2' size={32} color={'#999999'} />
            </Pressable>
            <SmallPopup isVisible={modalVisible && selectedHoliday === holiday} closeModal={closeModal}>
              <Text className='text-body p-3 pt-7'>{holiday.description}</Text>
            </SmallPopup> */}
          </View>
        ))}
      </View>
    ));
  };

  return (
    <>
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
        <TouchableOpacity onPress={() => onArrowPress(-1)}>
          <AppIcon type='AntDesign' name='caretleft' size={20} color='#A3A3A3'/>
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{dayjs(selectedDate).format('MMMM YYYY')}</Text>
        <TouchableOpacity onPress={() => onArrowPress(1)}>
        <AppIcon type='AntDesign' name='caretright' size={20} color='#A3A3A3'/>
        </TouchableOpacity>
      </View>
      {renderHolidays()}
    </View>
    {data.length === 0 && <EmptyScreen/>}
    </>
  );
};

export default HolidayList;
