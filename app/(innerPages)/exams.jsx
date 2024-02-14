import { View, Text, TouchableOpacity, ScrollView, Pressable, FlatList, Dimensions } from 'react-native';
import dayjs from 'dayjs';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import { getExamList } from '../../ApiCalls';
import { stylesGlobal } from '../../styles/global';
import AppIcon from '../../component/GlobalComps/AppIcon';
import BtnGlobal from '../../component/GlobalComps/BtnGlobal';
import AttachedUibox from '../../component/GlobalComps/AttachedUibox';
import EmptyScreen from '../../component/GlobalComps/EmptyScreen'
import { Image } from 'expo-image';

export default function Exams() {
  const authToken = useSelector((state) => state.auth.authToken);
  const userCred = useSelector((state) => state.userDetails.user);
  const screenWidth = Dimensions.get('window').width - 40;
  const toast = useToast();
  const [apiData, setApiData] = useState(null);
  const [apiDataFilters, setApiDataFilters] = useState(null);
  const [page, setPage] = useState(null);

  useEffect(() => {
    if (userCred && Object.keys(userCred).length > 0) {
      fetchData();
    }
  }, [userCred]);

  const fetchData = async () => {
    try {
      const response = await getExamList(authToken, userCred?.school_id, userCred?.class_id, userCred?.section_id);
      if (response) {
        // toast.show(response?.message, { type: 'success' });
        setApiData(response?.body);
      } else {
        // toast.show('An error occurred, Please try again', { type: 'danger' });
      }
    } catch (error) {
      // toast.show('An error occurred, Please try again', { type: 'danger' });
    }
  };

  return (
    <ScrollView className='h-full bg-light'>
      {/* {!page ? */}
        <>
          <ScrollView className="p-5 bg-lightergrey pb-16">
            {apiData && apiData.length > 0 ? (
              <View className='flex flex-col items-center w-full '>
                {apiData.map((item) => (
                  // onPress={() => setPage(item)}
                  <View className='bg-light rounded-xl p-4 w-full my-2.5' >
                    <Text style={[stylesGlobal.title, { fontSize: 16 }]} className='mb-2 capitalize'>{item.subject_name}</Text>
                    {item.exam_type &&
                      <Text style={stylesGlobal.innertext} className='mb-2'>
                        {item.exam_type}
                      </Text>
                    }
                    {item.class_name &&
                      <Text style={stylesGlobal.innertext} className='mb-4'>
                        {item.class_name} {item.section_name}
                      </Text>
                    }
                    <View className='flex flex-row items-center justify-between w-full'>
                      <View className='flex flex-row items-center'>
                        <AppIcon type='AntDesign' name='calendar' color='#999999' size={20} />
                        <Text className='ml-4 text-lightgrey text-sm'>{dayjs(item.exam_date).format('DD MMM, YYYY')}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <EmptyScreen />
            )}
          </ScrollView>
        </>
      {/* //   :
      //   <ScrollView className='p-5'>
      //     <View className='flex flex-row items-center'>
      //       <BtnGlobal
      //         styleClassName="closeBtn"
      //         icon={true}
      //         onPress={() => setPage(null)}
      //         classNames={'mr-5 mt-2'}
      //         iconName={'arrowleft'}
      //         iconType={'AntDesign'}
      //         iconSize={22}
      //         iconColor={'#2A2D32'}
      //       />
      //     </View>
      //     <Text style={[stylesGlobal.title]} className='my-4'>{page.title}</Text>
      //     <View className='flex flex-row pb-5 border-b border-lightergrey'>
      //       <AppIcon type='AntDesign' name='calendar' color='#999999' size={20} />
      //       <Text className='ml-4 text-lightgrey text-sm '>{dayjs(page.date).format('DD MMM, YYYY')}</Text>
      //     </View>
      //     <Text className='mt-4 text-lightgrey text-sm'>
      //       {page.description}
      //     </Text>
      //   </ScrollView>
      // } */}
    </ScrollView >
  );
}
