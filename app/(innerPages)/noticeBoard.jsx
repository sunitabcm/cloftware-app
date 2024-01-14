import { View, Text, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { getNoticeBoardList } from '../../ApiCalls';
import { stylesGlobal } from '../../styles/global';
import AppIcon from '../../component/GlobalComps/AppIcon';
import BtnGlobal from '../../component/GlobalComps/BtnGlobal';

export default function NoticeBoard() {
  const authToken = useSelector((state) => state.auth.authToken);
  const toast = useToast();
  const [apiData, setApiData] = useState(null);
  const [apiDataFilters, setApiDataFilters] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState('');
  const [page, setPage] = useState(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    hideDatePicker();
    const formattedDate = dayjs(selectedDate).format('MMM, YYYY');
    setDate(dayjs(selectedDate).format('YYYY-MM-DD'));
    filterData(formattedDate);
  };

  useEffect(() => {
    if (authToken && Object.keys(authToken).length > 0) {
      fetchData();
    }
  }, [authToken]);

  const fetchData = async () => {
    try {
      const response = await getNoticeBoardList(authToken?.school_id, authToken?.token);
      if (response) {
        toast.show(response?.message, { type: 'success' });
        setApiData(response?.body);
        setApiDataFilters(response?.body)
      } else {
        toast.show('An error occurred, Please try again', { type: 'danger' });
      }
    } catch (error) {
      toast.show('An error occurred, Please try again', { type: 'danger' });
    }
  };

  const filterData = (selectedDate) => {
    // Filter the existing data based on the selected date
    const filteredData = apiData.filter((item) => dayjs(item.date).format('MMM, YYYY') === selectedDate);
    setApiDataFilters(filteredData);
  };

  return (
    <View className='h-full bg-light'>
      {!page ?
        <>
          <View className='flex flex-row justify-between items-center p-4'>
            <Text>Filter by</Text>
            <View className='flex flex-row justify-between items-center'>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
              <TouchableOpacity className='py-0.5 px-8 border border-lightgrey rounded-full' onPress={showDatePicker}>
                <Text className='text-body'>{date !== '' ? dayjs(date).format('MMM, YYYY') : `Month, Year`}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView className="p-5 bg-lightergrey">
            {apiDataFilters && apiDataFilters.length > 0 ? (
              <View className='flex flex-col items-center w-full gap-y-5'>
                {Object.values(apiDataFilters).map((item) => (
                  <Pressable key={item.notice_id} className='bg-light rounded-lg p-4 w-full' onPress={(e) => setPage(item)}>
                    <Text style={[stylesGlobal.title, { fontSize: 16 }]} className='mb-2'>{item.title}</Text>
                    <Text style={stylesGlobal.innertext} className='mb-4'>
                      {item.description?.length > 30 ? `${item.description?.slice(0, 30)}...` : item.description}
                    </Text>

                    <View className='flex flex-row'>
                      <AppIcon type='AntDesign' name='calendar' color='#000' size={20} />
                      <Text style={[stylesGlobal.innertext, { fontSize: 12 }]} className='ml-4'>{dayjs(item.date).format('DD MMM, YYYY')}</Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            ) : (
              <Text>No Data</Text>
            )}
          </ScrollView>
        </>
        :
        <ScrollView className='p-5'>
          <BtnGlobal
            styleClassName="closeBtn"
            icon={true}
            onPress={() => setPage(null)}
            classNames={'mb-5'}
            iconName={'arrowleft'}
            iconType={'AntDesign'}
            iconSize={22}
            iconColor={'#2A2D32'}
          />
          <BtnGlobal
            styleClassName="closeBtn"
            icon={true}
            onPress={() => setPage(null)}
            classNames={'mb-5 p-3'}
            iconName={'megaphone'}
            iconType={'Entypo'}
            iconSize={25}
            iconColor={'#FF6F1B'}
            isDisabled={true}
          />
          <Text style={[stylesGlobal.title]} className='mb-4'>{page.title}</Text>
          <View className='flex flex-row pb-5 border-b border-lightergrey'>
            <AppIcon type='AntDesign' name='calendar' color='#000' size={20} />
            <Text style={[stylesGlobal.innertext, { fontSize: 12 }]} className='ml-4'>{dayjs(page.date).format('DD MMM, YYYY')}</Text>
          </View>
          <Text style={stylesGlobal.innertext} className='mt-5'>
            {page.description}
          </Text>
        </ScrollView>
      }
    </View >
  );
}
