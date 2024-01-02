import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import Buttons from "../component/Buttons";
import InputeFields from "../component/InputeFields";
import Links from "../component/Links";
import WelcomeSchool from "../pageComponent/welcome/WelcomeSchool";
import WelcomeFooter from "../pageComponent/welcome/WelcomeFooter";
import Heading from "../component/Heading";
import Messages from "../component/Messages";
import { thirdColorBlack, fiveColorBlack } from "../component/stylesheet";
import { stylesGlobal } from "../styles/global";
import { useToast } from 'react-native-toast-notifications';
import { addEditApplyLeave } from "../ApiCalls";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from 'react-redux';

const RequestLeave = () => {
  const router = useRouter();
  const toast = useToast();
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.auth.authToken)
  const [name, setName] = useState(authToken && Object.keys(authToken).length > 0 ? `${authToken?.first_name} ${authToken?.last_name}` : '');
  const [leaveDate, setLeaveDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [reason, setReason] = useState('');

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
    try {
        const response = await addEditApplyLeave(authToken?.token, authToken?.class_id, authToken?.section_id, authToken?.year_id, reason, leaveDate, authToken?.student_id) ;
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
    // Validate input fields and handle submission
    if (name && leaveDate && reason) {
      loginPostFunc()
    } else {
      Alert.alert('Error', 'Please fill in all fields.');
    }
  };

  return (
    <ScrollView >
    <View style={styles.container}>
      <View style={styles.backarrow}>
        <Links
          back
          onPress={() => router.push("/dashboard")}
        />
      </View>
    <View style={styles.formFields}>
      <InputeFields
        label="Name"
        placeholder="Enter Name"
        value={name}
        onChangeText={(text) => setName(text)}
        disabled={true}
      />
      <TouchableOpacity style={styles.datePickerContainer} onPress={showDatePicker}>
        <Text style={styles.datePickerLabel}>Select Leave Date: {dayjs(leaveDate).format('YYYY-MM-DD')}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <InputeFields
        label="Reason"
        placeholder="Enter Reason"
        value={reason}
        onChangeText={(text) => setReason(text)}
      />
      <Buttons title="Submit" onPress={onSubmit} />
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  backarrow: {
    paddingTop: 20
  },
  handlerBox: {
    width: "100%"
  },
  formFields: {
    width: '100%',
    padding: 20,
  },
  datePickerContainer: {
    marginBottom: 15,
  },
  datePickerLabel: {
    fontSize: 13,
    color: '#a4a4a4',
  },
});

export default RequestLeave;
