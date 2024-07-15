import { View, Text, TouchableOpacity, ScrollView, Pressable, FlatList, Dimensions, ImageBackground } from 'react-native';
import dayjs from 'dayjs';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import { getNoticeBoardList } from '../../ApiCalls';
import { stylesGlobal } from '../../styles/global';
import AppIcon from '../../component/GlobalComps/AppIcon';
import BtnGlobal from '../../component/GlobalComps/BtnGlobal';
import AttachedUibox from '../../component/GlobalComps/AttachedUibox';
import EmptyScreen from '../../component/GlobalComps/EmptyScreen'
import { Image } from 'expo-image';
import { Video } from 'expo-av';
import ModalScreen from '../../component/GlobalComps/ModalScreen';
import RNPickerSelect from 'react-native-picker-select';

const months = [
  { label: 'January', value: '01' }, { label: 'February', value: '02' },
  { label: 'March', value: '03' }, { label: 'April', value: '04' },
  { label: 'May', value: '05' }, { label: 'June', value: '06' },
  { label: 'July', value: '07' }, { label: 'August', value: '08' },
  { label: 'September', value: '09' }, { label: 'October', value: '10' },
  { label: 'November', value: '11' }, { label: 'December', value: '12' }
];

const years = Array.from(new Array(30), (val, index) => ({ label: (2024 - index).toString(), value: (2024 - index).toString() }));

export default function NoticeBoard() {
  const authToken = useSelector((state) => state.auth.authToken);
  const userCred = useSelector((state) => state.userDetails.user);
  const screenWidth = Dimensions.get('window').width - 40;
  const toast = useToast();
  const [apiData, setApiData] = useState(null);
  const [apiDataFilters, setApiDataFilters] = useState(null);
  const [page, setPage] = useState(null);
  const videoRef = useRef(null);
  const [showImage, setShowImage] = useState(false);
  const [showImagePath, setShowImagePath] = useState('');
  const screenWidthFull = Dimensions.get('window').width;
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [status, setStatus] = useState({});

  useEffect(() => {
    if (userCred && Object.keys(userCred).length > 0) {
      fetchData();
    }
  }, [userCred]);

  const fetchData = async () => {
    try {
      const response = await getNoticeBoardList(userCred?.school_id, authToken);
      if (response) {
        setApiData(response?.body);
        setApiDataFilters(response?.body)
      }
    } catch (error) {
      // Handle error
    }
  };

  const filterData = () => {
    let filteredData = apiData;
    if (selectedMonth) {
      filteredData = filteredData.filter((item) => dayjs(item.created_at).format('MM') === selectedMonth);
    }
    if (selectedYear) {
      filteredData = filteredData.filter((item) => dayjs(item.created_at).format('YYYY') === selectedYear);
    }
    setApiDataFilters(filteredData);
  };

  useEffect(() => {
    filterData();
  }, [selectedMonth, selectedYear]);

  return (
    <View className='h-full bg-light w-full'>
      {!page ?
        <>
          <View className='flex flex-row justify-between items-center p-4 w-full'>
            <Text className='text-body font-bold text-base'>Filter by</Text>
            <View className='flex flex-row justify-between items-center'>
              <View className='rounded-[40px] capitalize bg-[#f4f4f4] w-[150px] h-[30px] mr-2'>
                <RNPickerSelect
                  onValueChange={(value) => setSelectedMonth(value)}
                  items={months}
                  value={selectedMonth}
                  placeholder={{ label: "Month", value: null }}
                  style={{
                    inputIOS: {
                      fontSize: 16,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      color: '#000',
                      paddingRight: 30,
                      marginTop: -13
                    },
                    inputAndroid: {
                      fontSize: 16,
                      borderWidth: 0.5,
                      borderColor: '#ccc',
                      color: '#000',
                      paddingRight: 30,
                      marginTop: -13
                    },
                  }}
                />
              </View>
              <View className='rounded-[40px] capitalize bg-[#f4f4f4] w-[120px] h-[30px]'>
                <RNPickerSelect
                  onValueChange={(value) => setSelectedYear(value)}
                  items={years}
                  value={selectedYear}
                  placeholder={{ label: "Year", value: null }}
                  style={{
                    inputIOS: {
                      fontSize: 16,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      color: '#000',
                      paddingRight: 30,
                      marginTop: -13
                    },
                    inputAndroid: {
                      fontSize: 16,
                      borderWidth: 0.5,
                      borderColor: '#ccc',
                      color: '#000',
                      paddingRight: 30,
                      marginTop: -13
                    },
                  }}
                />
              </View>
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
                <EmptyScreen url='https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/pencil.png' text1='Looks like its a relaxing day' text2='The day is too long so no need of homework today' />
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
              </View>
            }
            <View className='w-full my-5'>
              <Text className='text-lightgrey text-sm'>{page.description}</Text>
            </View>
          </View>
        </ScrollView>
      }
      {showImage ? <ModalScreen show={showImage} closeModal={() => setShowImage(false)}>
        <View className='flex flex-col w-full h-full justify-center items-center'>
          <ImageBackground source={{ uri: showImagePath }} style={{ width: screenWidthFull, height: 550, borderRadius: 15 }} resizeMode='contain' />
          <Pressable className='absolute top-0 right-0 z-50' onPress={() => setShowImage(false)}>
            <AppIcon type='AntDesign' name='closecircle' color='#FFF' size={30} />
          </Pressable>
        </View>
      </ModalScreen> : null}
    </View>
  );
}
