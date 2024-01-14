import { View, Text, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import { stylesGlobal } from '../../styles/global';
import AppIcon from '../../component/GlobalComps/AppIcon';
import BtnGlobal from '../../component/GlobalComps/BtnGlobal';
export default function HomeAssignment() {
  const authToken = useSelector((state) => state.auth.authToken);
  const toast = useToast();
  const [apiData, setApiData] = useState(null);
  return (
    <ScrollView className='h-full bg-lightergrey p-5'>
      <Text>Today's assignment</Text>
      <View className='mt-7'>
        <View className='bg-light rounded-lg p-4 w-full'>
          <Text style={[stylesGlobal.title, { fontSize: 12 }]} className='mb-4'>Title</Text>
          <Text style={stylesGlobal.innertext} className='mb-4'>
            description
          </Text>
          <BtnGlobal
            styleClassName="buttonSmall"
            title="Mark as complete"
            onPress={() => { }}
            classNames={'w-full'}
          />
        </View>
      </View>
    </ScrollView>
  )
}