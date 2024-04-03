import { View, Text, TouchableOpacity, ScrollView, Pressable, FlatList, Dimensions, ImageBackground } from 'react-native';
import dayjs from 'dayjs';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { getNoticeBoardList } from '../../ApiCalls';
import { stylesGlobal } from '../../styles/global';
import AppIcon from '../../component/GlobalComps/AppIcon';
import BtnGlobal from '../../component/GlobalComps/BtnGlobal';
import AttachedUibox from '../../component/GlobalComps/AttachedUibox';
import EmptyScreen from '../../component/GlobalComps/EmptyScreen'
import { Image } from 'expo-image';
import { Video } from 'expo-av';
import ModalScreen from '../../component/GlobalComps/ModalScreen';
import { Link } from 'expo-router';

export default function NoticeBoard() {
  const authToken = useSelector((state) => state.auth.authToken);
  const userCred = useSelector((state) => state.userDetails.user);
  const screenWidth = Dimensions.get('window').width - 40;
  const toast = useToast();
  const [apiData, setApiData] = useState(null);
  const [apiDataFilters, setApiDataFilters] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState('');
  const [page, setPage] = useState(null);
  const videoRef = useRef(null);
  const [showImage, setShowImage] = useState(false);
  const [showImagePath, setShowImagePath] = useState('');
  const screenWidthFull = Dimensions.get('window').width;

  const [status, setStatus] = useState({});
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
    if (userCred && Object.keys(userCred).length > 0) {
      fetchData();
    }
  }, [userCred]);

  const fetchData = async () => {
    try {
      const response = await getNoticeBoardList(userCred?.school_id, authToken);
      if (response) {
        // toast.show(response?.message, { type: 'success' });
        setApiData(response?.body);
        setApiDataFilters(response?.body)
      } else {
        // toast.show('An error occurred, Please try again', { type: 'danger' });
      }
    } catch (error) {
      // toast.show('An error occurred, Please try again', { type: 'danger' });
    }
  };

  const filterData = (selectedDate) => {
    // Filter the existing data based on the selected date
    const filteredData = apiData.filter((item) => dayjs(item.created_at).format('MMM, YYYY') === selectedDate);
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
            <View className='pb-16 mb-10'>
              {apiDataFilters && apiDataFilters.length > 0 ? (
                <View className='flex flex-col items-center w-full '>
                  {Object.values(apiDataFilters).map((item) => (
                    <AttachedUibox press={(e) => setPage(item)} key={item.title} item={item} />
                  ))}
                </View>
              ) : (
                <EmptyScreen />
              )}
            </View>
          </ScrollView>
        </>
        :
        <ScrollView className='p-5'>
          <View className='pb-16 mb-10'>
            <View className='flex flex-row items-center'>
              <BtnGlobal
                styleClassName="closeBtn"
                icon={true}
                onPress={() => setPage(null)}
                classNames={'mr-5 mt-2'}
                iconName={'arrowleft'}
                iconType={'AntDesign'}
                iconSize={22}
                iconColor={'#2A2D32'}
              />
              {/* <Image
              source={'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/speaker.svg}
              style={[{ width: 50, height: 50 }]}
              contentFit="cover"
            /> */}
            </View>
            <Text style={[stylesGlobal.title]} className='my-4'>{page.title}</Text>
            <View className='flex flex-row pb-5 border-b border-lightergrey'>
              <AppIcon type='AntDesign' name='calendar' color='#999999' size={20} />
              <Text className='ml-4 text-lightgrey text-sm '>{dayjs(page.created_at).format('DD MMM, YYYY')}</Text>
            </View>
            {page.notice_images && page.notice_videos && (page.notice_images.length > 0 || page.notice_videos.length > 0) &&
              <View className='flex flex-col justify-center items-center mt-5'>
                <ScrollView className='h-[175px] w-full' persistentScrollbar={true} horizontal>
                  {page.notice_videos && page.notice_videos.length > 0 ? (
                    <Video
                      source={{ uri: page.notice_videos[0].media }}
                      ref={videoRef}
                      style={{ width: screenWidth, height: 170, borderRadius: 10, marginRight: 10 }}
                      useNativeControls={true}
                      onPlaybackStatusUpdate={status => setStatus(() => status)}

                    />
                  ) : null}
                  {page.notice_images && page.notice_images.length > 0 ? (
                    <TouchableOpacity className='w-full' onPress={() => { setShowImagePath(page.notice_images[0].media); setShowImage(true) }}>
                      <Image
                        source={{ uri: page.notice_images[0].media }}
                        style={{ width: screenWidth, height: 170, borderRadius: 10 }}
                        contentFit="fill"
                      />
                    </TouchableOpacity>
                  ) : null}
                </ScrollView>
                {page.notice_videos && page.notice_videos.length > 0 || page.notice_images && page.notice_images.length > 0 ? (
                  <ScrollView horizontal style={{ marginTop: 10 }}>
                    {page.notice_videos && page.notice_videos.length > 0 && (
                      <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#2A2D32', marginHorizontal: 5 }} />
                    )}
                    {page.notice_images && page.notice_images.length > 0 && (
                      <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#2A2D32', marginHorizontal: 5 }} />
                    )}
                  </ScrollView>
                ) : null}
              </View>
            }
            <Text className='mt-4 text-lightgrey text-sm'>
              {page.description}
            </Text>
          </View>
        </ScrollView>
      }
      <ModalScreen isVisible={showImage} onClose={() => { setShowImagePath(''); setShowImage(false) }} outsideClick={false} modalWidth={'w-full'} otherClasses={` h-full rounded-none p-0`}>
        <Link href={showImagePath} className='text-lg text-lightgrey font-bold text-center mt-5'>Download <AppIcon type='AntDesign' name='arrowdown' size={20} color='#999999' /></Link>
        <ImageBackground
          source={{ uri: showImagePath }}
          style={{ width: screenWidthFull, flex: 1, borderRadius: 10, justifyContent: 'flex-start', marginTop: 30, marginBottom: 20 }}
        />
      </ModalScreen>
    </View >
  );
}
