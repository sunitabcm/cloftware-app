import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView, Pressable } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import AppIcon from './GlobalComps/AppIcon';
import { SmallPopup } from './GlobalComps/SmallPopup';
const HolidayList = ({ data }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [leaveDate, setLeaveDate] = useState(dayjs(new Date()).format('YYYY'));
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState(null);

  const openModal = (holiday) => {
    setSelectedHoliday(holiday);
    setModalVisible(true);
  };


  const closeModal = () => {
    setModalVisible(false);
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setLeaveDate(dayjs(date).format('YYYY'));
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
              <Text className='text-body font-bold bg-gold p-4 text-2xl rounded-full'>{new Date(holiday.date).getDate()}</Text>
              <Text className='text-body font-bold'>{holiday.title}</Text>
            </View>
            <Pressable onPress={() => openModal(holiday)} className='-mt-3'>
              <AppIcon type='MaterialIcons' name='sticky-note-2' size={32} color={'#999999'} />
            </Pressable>
            <SmallPopup isVisible={modalVisible && selectedHoliday === holiday} closeModal={closeModal}>
              <Text className='text-body p-3 pt-7'>{holiday.description}</Text>
            </SmallPopup>
          </View>
        ))}
      </View>
    ));
  };

  return (
    <ScrollView className='h-full bg-light'>
      <View className='flex justify-center items-center pb-4'>
        <TouchableOpacity className='' onPress={showDatePicker}>
          <Text className='text-body font-bold text-lg underline'>{dayjs(leaveDate).format('YYYY')}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      {renderHolidays()}
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  monthContainer: {
    marginBottom: 20,
  },
  monthHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  holidayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  holidayDate: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: 'bold',
  },
  holidayTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  holidayDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default HolidayList;
