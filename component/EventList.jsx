import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Pressable, ScrollView, ImageBackground, Dimensions } from 'react-native';
import { Calendar, Agenda } from 'react-native-calendars';
import dayjs from 'dayjs';
import AppIcon from './GlobalComps/AppIcon';
import { SmallPopup } from './GlobalComps/SmallPopup';
import { Image } from 'expo-image';
import EmptyScreen from './GlobalComps/EmptyScreen';
import ModalScreen from './GlobalComps/ModalScreen';
import { Link } from 'expo-router';

const HolidayList = ({ data, fetchData }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [showImagePath, setShowImagePath] = useState('');
  const screenWidthFull = Dimensions.get('window').width;

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
      <View key={month} className='mb-10'>
        {organizedData[month].map((holiday) => (
          <View key={holiday.holiday_id} className='flex flex-col w-full justify-between items-center my-3 bg-light p-4 rounded-xl'>
            {holiday.image && holiday.image !== '' &&
              <TouchableOpacity className='w-full' onPress={() => { setShowImagePath(holiday.image); setShowImage(true) }}>
                <Image
                  source={holiday.image}
                  style={{ width: '100%', height: 190 }}
                  contentFit="fill"
                  className='rounded-xl border border-lightgrey'
                />
              </TouchableOpacity>
            }
            <View className='flex flex-row w-full gap-3 mt-1 items-start'>
              <View className='text-body font-bold bg-body h-[60px] w-[46px] flex justify-center items-center text-2xl rounded-xl'>
                <Text className='text-light text-center text-xs'>{dayjs(holiday.date).format('ddd')}</Text>
                <Text className='text-light text-center font-bold text-2xl'>{new Date(holiday.date).getDate()}</Text>
              </View>
              <View className='w-[80%]'>
                <Text className='text-body font-bold capitalize'>{holiday.title}</Text>
                <Text className='text-lightgrey text-sm capitalize mt-1'>{holiday.description}</Text>
              </View>
            </View>
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
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{dayjs(selectedDate).format('MMMM YYYY')}</Text>
        <TouchableOpacity onPress={() => onArrowPress(1)}>
          <AppIcon type='AntDesign' name='caretright' size={20} color='#A3A3A3' />
        </TouchableOpacity>
      </View>
      {data.length === 0 && <EmptyScreen url='https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/pencil.png' text1='Looks like its a relaxing day' text2='The day is too long so no need of homework today'/>}
      {renderHolidays()}
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
