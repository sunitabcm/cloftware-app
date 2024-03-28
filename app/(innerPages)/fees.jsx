import { View, Text, ScrollView, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useRouter, Link } from 'expo-router';
import { getFeeList } from '../../ApiCalls';
import dayjs from 'dayjs';
import AppIcon from '../../component/GlobalComps/AppIcon';

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
    <ScrollView className="h-full bg-light p-5">
      <View className="pb-10">
      {apiData ? apiData?.body.map((fee, index) => (
          <View className='mb-5'>
            <View key={index} className='p-4 border-lightgrey border rounded-xl'>
              <TouchableOpacity onPress={() => toggleAccordion(index)} className='flex flex-row items-start justify-between'>
                <View className='mr-5 flex flex-row items-center'>
                  <AppIcon type='AntDesign' name='checkcircle' size={25} color={'#10B981'} />
                  <Text className='font-bold text-body ml-2 text-base'>{dayjs(fee.start_date).format('MMM, YYYY')}</Text>
                </View>
                <View>
                  <Text className='font-bold text-body text-base'>Rs. {fee.amount}</Text>
                  <Link href={fee.invoice_url} className='text-secondary text-sm'>Download invoice</Link>
                </View>
              </TouchableOpacity>
            </View>
            {expandedIndex === index && (
              <View className='bg-lightergrey rounded-xl mt-4 p-5'>
                <View className='flex flex-row items-center justify-between'>
                  <Text className='text-body text-base'>Submission Date: </Text>
                  <Text className='font-bold text-body text-base w-[35%]'>{dayjs(fee.submission_date).format('DD MMM, YYYY')}</Text>
                </View>
                <View className='flex flex-row items-center justify-between'>
                  <Text className='text-body text-base'>Payment Mode: </Text>
                  <Text className='font-bold text-body text-base w-[35%]'>{fee?.payment_mode}</Text>
                </View>
                <View className='flex flex-row items-center justify-between'>
                  <Text className='text-body text-base'>Fee Category: </Text>
                  <Text className='font-bold text-body text-base w-[35%]'>{fee?.fee_category_name}</Text>
                </View>
                <View className='flex flex-row items-center justify-between'>
                  <Text className='text-body text-base'>Other Category: </Text>
                  <Text className='font-bold text-body text-base w-[35%]'>{fee?.category_name}</Text>
                </View>
              </View>
            )}
          </View>
        ))
        :
        <Text className='text-body font-bold text-lg'>No Data Found</Text>
      }
      </View>
    </ScrollView>
  );
}