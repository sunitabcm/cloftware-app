import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import { stylesGlobal } from "../../styles/global";
import { useToast } from 'react-native-toast-notifications';
import { addEditApplyLeave } from "../../ApiCalls";
import { Link, usePathname, useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import GlobalDatePicker from '../../component/GlobalComps/GlobalDatePicker';
import GlobalInputs from '../../component/GlobalComps/GlobalInputs';
import BtnGlobal from '../../component/GlobalComps/BtnGlobal';
const RequestLeave = () => {
  const router = useRouter();
  const toast = useToast();
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.auth.authToken)
  const userCred = useSelector((state) => state.userDetails.user);
  const [name, setName] = useState(userCred && Object.keys(userCred).length > 0 ? `${userCred?.first_name} ${userCred?.last_name}` : '');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [reason, setReason] = useState('');
  const [disabled, setDiabled] = useState(false);
  const params = useLocalSearchParams();
  const [leaveDate, setLeaveDate] = useState(Object.keys(params).length > 0 ? params.date : dayjs(new Date()).format('YYYY-MM-DD'));

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setLeaveDate(dayjs(date).format('YYYY-MM-DD'));
  };

  const loginPostFunc = async () => {
    setDiabled(true)
    try {
      const response = await addEditApplyLeave(authToken, userCred?.class_id, userCred?.section_id, userCred?.year_id, reason, dayjs(leaveDate).format('YYYY-MM-DD'), userCred?.student_details?.stu_id);
      if (response) {
        toast.show(response?.message, { type: "success" })
      } else {
        toast.show('An error occured, Please try again', { type: "danger" })
      }
    } catch (error) {
      toast.show('An error occured, Please try again', { type: "danger" })
    }
  };

  const onSubmit = () => {
    if (name && leaveDate && reason) {
      loginPostFunc()
    } else {
      toast.show('Please fill in all fields.', { type: "danger" })
    }
    setDiabled(true)
  };

  return (
    <ScrollView className='h-full bg-light p-5'>
      <View>
        <GlobalInputs
          label="Name"
          placeholder="Enter Name"
          value={name}
          mainClass={'mb-5'}
          onChangeText={(text) => setName(text)}
          disabled={true}
          blurOnSubmit={false}
        />
        <Text className='mb-1.5 capitalize text-sm font-bold text-body'>Select Leave Date</Text>
        <TouchableOpacity style={stylesGlobal.primaryInput} className='' onPress={showDatePicker}>
          <Text className='text-body'>{dayjs(leaveDate).format('DD-MMM-YYYY')}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <GlobalInputs
          label="Reason"
          placeholder="Enter Reason"
          value={reason}
          mainClass={'mt-5'}
          onChangeText={(text) => {setReason(text); setDiabled(false)}}
          blurOnSubmit={false}
        />

        <BtnGlobal
          styleClassName="button"
          title="Request Leave"
          onPress={onSubmit}
          classNames={'w-full mt-8'}
          isDisabled={disabled}
        />
      </View>
    </ScrollView>
  );
};

export default RequestLeave;
