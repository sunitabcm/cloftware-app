import { View, Text, ScrollView, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useRouter, Link } from 'expo-router';
import { getFeeList } from '../../ApiCalls';
import dayjs from 'dayjs';
import AppIcon from '../../component/GlobalComps/AppIcon';
import { Image } from 'expo-image';
import EmptyScreen from '../../component/GlobalComps/EmptyScreen';

export default function Fees() {
  const authToken = useSelector((state) => state.auth.authToken)
  const userCred = useSelector((state) => state.userDetails.user);
  const [apiData, setApiData] = useState(null);
  const router = useRouter();
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    if (authToken) {
      fetchData()
    }
  }, [authToken]);


  const fetchData = async () => {
    try {
      const response = await getFeeList(authToken);
      if (response) {
        setApiData(response)
      } else {
      }
    } catch (error) {
    }
  };

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View className='bg-body h-full'>
      {apiData && Object.keys(apiData?.body)?.length > 0 && apiData?.body?.due_details && Object.keys(apiData?.body?.due_details).length > 0 && (
        <View className='mb-4 p-5'>
          <View className='flex flex-col items-start'>
            <Text className='text-lightgrey text-base'>Due Amount ({apiData.body.due_details.month_name || ''})</Text>
            <Text className='font-bold text-lightergrey text-[40px]'>
              Rs. {apiData.body.due_details.dueAmount || ''}
            </Text>
          </View>
        </View>
      )}
      <ScrollView className=" bg-light rounded-t-3xl p-5">
        <View className="pb-10">
          {apiData && Object.keys(apiData?.body)?.length > 0 && Array.isArray(apiData?.body?.payment_term) && apiData?.body?.payment_term?.length > 0 ? apiData?.body?.payment_term.slice().sort((a, b) => new Date(a.start_date) - new Date(b.start_date)).map((fee, index) => (
            <View className='mb-5' key={fee.fee_submission_id}>
              <View key={index} className={`p-4 border-lightergrey border ${expandedIndex === index ? 'rounded-t-xl' : 'rounded-xl'}`}>
                <TouchableOpacity onPress={() => toggleAccordion(index)} className='flex flex-row items-center justify-between'>
                  <View className='mr-5 flex flex-row items-center'>
                    {fee?.fee_status === "Paid" ?
                      <AppIcon type='AntDesign' name='checkcircle' size={25} color={'#10B981'} />
                      :
                      <AppIcon type='Entypo' name='circle-with-cross' size={25} color={'#FE0A0A'} />
                    }
                    <View className='flex flex-col ml-3'>
                      <Text className='font-bold text-body text-base'>{dayjs(fee.created_at).format('MMM, YYYY')}</Text>
                      <Text className='text-body text-base'>{fee.invoice_id}</Text>
                    </View>
                  </View>
                  <View className='flex flex-row items-center'>
                    <Text className='font-bold text-body text-base'>Rs. {fee.grand_total}</Text>
                    {fee.invoice_url && <Link href={fee.invoice_url} className='text-secondary text-sm ml-2'><AppIcon type='MaterialCommunityIcons' name='tray-arrow-down' size={20} color='#6bac98' /></Link>}
                  </View>
                </TouchableOpacity>
              </View>
              {expandedIndex === index && (
                <View className='bg-lightergrey rounded-b-xl p-5'>
                  <View className='flex flex-row items-center justify-between'>
                    <Text className='text-body text-base'>Submission Date: </Text>
                    <Text className='font-bold text-body text-base w-[35%]'>
                      {dayjs(fee.submission_date).format('DD MMM, YYYY')}
                    </Text>
                  </View>
                  <View className='flex flex-row items-center justify-between'>
                    <Text className='text-body text-base'>Payment Mode: </Text>
                    <Text className='font-bold text-body text-base w-[35%]'>
                      {fee?.payment_mode}
                    </Text>
                  </View>
                  <View className='flex flex-row items-center justify-between'>
                    <Text className='text-body text-base'>Fee Status: </Text>
                    <Text className='font-bold text-body text-base w-[35%]'>
                      {fee?.fee_status}
                    </Text>
                  </View>
                  <View className='mt-4'>
                    <Text className='text-body text-base font-bold'>Fee plan:</Text>
                    {fee?.fee_category_json && (
                      (() => {
                        try {
                          const decodedJsonString = JSON.parse(fee.fee_category_json);
                          const feeCategories = JSON.parse(decodedJsonString);
                          return feeCategories.map((category, i) => (
                            <View key={i} className='flex flex-row items-center justify-between mt-2'>
                              <Text className='text-body text-base capitalize'>
                                {category.fee_category_name || 'Other Category'}:
                              </Text>
                              <Text className='font-bold text-body text-base w-[35%]'>
                                Rs. {category.amount}
                              </Text>
                            </View>
                          ));
                        } catch (error) {
                          console.error("Error parsing fee_category_json:", error);
                          return <Text>Error parsing fee categories.</Text>;
                        }
                      })()
                    )}
                  </View>
                </View>
              )}

            </View>
          ))
            :
            <EmptyScreen url={'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/emptyFolder.png'} text1='Looks like there is nothing yet!' text2='Hold back teacher will upload this soon' />
          }
        </View>
      </ScrollView>
    </View>
  );
}