import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import dayjs from 'dayjs';
import AppIcon from './GlobalComps/AppIcon';
import { Image } from 'expo-image';
import EmptyScreen from './GlobalComps/EmptyScreen';
import ModalScreen from './GlobalComps/ModalScreen';
import { Link } from 'expo-router';

const HolidayList = ({ data, fetchData }) => {
  const [selectedDate, setSelectedDate] = useState('Select Date');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [showImagePath, setShowImagePath] = useState('');
  const screenWidthFull = Dimensions.get('window').width;

  // useEffect(() => {
  //   if (fetchData && selectedDate) {
  //     fetchData(dayjs(selectedDate).format('YYYY-MM'));
  //   }
  // }, [selectedDate]);

  const openModal = (holiday) => {
    setSelectedHoliday(holiday);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const onArrowPress = (increment) => {
    let dateSelect;
    if (selectedDate === 'Select Date') {
      dateSelect = dayjs(new Date()).format('YYYY-MM')
      const newDate = dayjs(dateSelect).add(increment, 'month').format('YYYY-MM');
      setSelectedDate(newDate);
      fetchData(dayjs(newDate).format('YYYY-MM'))
    } else {
      const newDate = dayjs(selectedDate).add(increment, 'month').format('YYYY-MM');
      setSelectedDate(newDate);
      fetchData(dayjs(newDate).format('YYYY-MM'))
    }
  };

  const filterDataByMonth = () => {
    const filteredData = data.filter((holiday) => {
      return dayjs(holiday.date).format('YYYY-MM');
    });
    return filteredData;
  };

  const renderHolidays = () => {
    const filteredData = filterDataByMonth();
    const sortedData = filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));

    return sortedData && sortedData.length > 0 ? sortedData.map((holiday) => (
      <View key={holiday.id} className='flex flex-col w-full justify-between items-center border-b border-b-lightgrey mb-4'>
        {holiday.image && holiday.image.length !== 0 &&
          <TouchableOpacity className='w-full' onPress={() => { setShowImagePath(holiday.image); setShowImage(true) }}>
            <Image
              source={holiday.image}
              style={{ width: '100%', height: 190 }}
              contentFit="fill"
              className='rounded-xl border border-lightgrey'
            />
          </TouchableOpacity>
        }
        <View className='flex flex-row w-full gap-3 mb-5 mt-1 items-start'>
          <View className='text-body font-bold bg-[#38A7F6] h-[60px] w-[46px] flex justify-center items-center text-2xl rounded-xl'>
            <Text className='text-light text-center text-xs'>{dayjs(holiday.date).format('MMM')}</Text>
            <Text className='text-light text-center font-bold text-2xl'>{new Date(holiday.date).getDate()}</Text>
          </View>
          <View className='w-[80%]'>
            <Text className='text-body font-bold capitalize'>{holiday.title}</Text>
            <Text className='text-lightgrey text-sm capitalize mt-1'>{holiday.description}</Text>
          </View>
        </View>
      </View>
    ))
      :
      <EmptyScreen url='https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/pencil.png' text1='Looks like its a relaxing day' text2='The day is too long so no need of homework today' />
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
      <ScrollView className='pb-10'>
        {renderHolidays()}
      </ScrollView>
      <ModalScreen isVisible={showImage} onClose={() => { setShowImagePath(''); setShowImage(false) }} outsideClick={false} modalWidth={'w-full'} otherClasses={` h-screen rounded-none p-0`}>
        <Image
          source={{ uri: showImagePath }}
          contentFit="contain"
          style={{ width: screenWidthFull, flex: 1 }}
        />
        <Link href={showImagePath} className='text-lg text-[#6bac98] font-bold text-center mt-5 mb-10'>Download <AppIcon type='MaterialCommunityIcons' name='tray-arrow-down' size={20} color='#6bac98' /></Link>
      </ModalScreen>
    </View>
  );
};

export default HolidayList;
