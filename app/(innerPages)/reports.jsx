import { View, Text, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import { stylesGlobal } from '../../styles/global';
import AppIcon from '../../component/GlobalComps/AppIcon';
import BtnGlobal from '../../component/GlobalComps/BtnGlobal';
export default function Reports() {
    const authToken = useSelector((state) => state.auth.authToken);
    const userCred = useSelector((state) => state.userDetails.user);
    const toast = useToast();
    const [apiData, setApiData] = useState(null);
  return (
    <ScrollView className='h-full bg-lightergrey p-5'>
      <Text>UpdateProfile</Text>
    </ScrollView>
  )
}