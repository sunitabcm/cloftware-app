import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { getStudentAttendanceCalendar } from '../ApiCalls';
import Buttons from './Buttons';
import { useRouter } from 'expo-router';
const MyCalendar = () => {
  const router = useRouter()
  const [selectedYear, setSelectedYear] = useState(dayjs().format('YYYY'));
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format('MM'));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const authToken = useSelector((state) => state.auth.authToken)
  const [apiData, setApiData] = useState({
    "success": true,
    "code": 200,
    "message": "Data found successfully",
    "body": {
        "year": "2023",
        "month": "November",
        "attendance_percentage": "6.67%",
        "attended": 2,
        "absent": 1,
        "leave": 1,
        "attendance": [
            {
                "date": "2023-11-20",
                "status": "Present"
            },
            {
                "date": "2023-11-23",
                "status": "Present"
            },
            {
                "date": "2023-11-09",
                "status": "Absent"
            },
            {
                "date": "2023-11-09",
                "status": "Leave"
            }
        ]
    }
});

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setSelectedDate(dayjs(date).format('YYYY-MM-DD'));
  };

  const fetchApiData = async () => {
    try {
      const data = await getStudentAttendanceCalendar(authToken?.token, authToken?.school_id, authToken?.school_id, selectedYear , selectedMonth);
      setApiData(data?.body)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const onYearChange = (text) => {
    setSelectedYear(text);
  };

  const onMonthChange = (text) => {
    setSelectedMonth(text);
  };
  const onSearchPress = () => {
    // Validate input fields and fetch data
    if (selectedYear && selectedMonth) {
      fetchApiData();
    } else {
      Alert.alert('Error', 'Please select both year and month.');
    }
  };

  const renderCalendar = () => {
    const markedDates = {};

    if (apiData) {
      apiData.body.attendance.forEach((attendance) => {
        markedDates[attendance.date] = {
          selected: true,
          selectedColor:
            attendance.status === 'Present'
              ? 'green'
              : attendance.status === 'Absent'
                ? 'red'
                : attendance.status === 'Leave'
                  ? 'pink'
                  : 'gray',
        };
      });
    }

    const defaultSelectedDate = dayjs(selectedDate).format('YYYY-MM-DD');
    markedDates[defaultSelectedDate] = {
      selected: true,
      selectedColor: '#ccc',
    };

    return (
      <Calendar
        markedDates={markedDates}
        onDayPress={(day) => console.log('selected day', day)}
        current={`${selectedYear}-${selectedMonth}-01`} // Set the current month
      />
    );
  };
  return (
    <View style={styles.formFields}>
      <View style={styles.normalInput}>
        <TextInput
          placeholder="Enter Year"
          keyboardType="numeric"
          style={styles.input}
          onChangeText={onYearChange}
          value={selectedYear}
        />
      </View>
      <View style={styles.normalInput}>
        <TextInput
          placeholder="Enter Month"
          keyboardType="numeric"
          style={styles.input}
          onChangeText={onMonthChange}
          value={selectedMonth}
        />
      </View>
      <Buttons title="Search" onPress={onSearchPress} />
      {/* <Buttons title="Show Date Picker" onPress={showDatePicker} /> */}
      {/* <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="year"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      /> */}
      {renderCalendar()}
      <View className='absolute bottom-4'>
      <Buttons title="Request Leaves" onPress={()=> router.push('/requestLeave')} />
      </View>
    </View>
  );
};

export default MyCalendar;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 5,
    width: "100%",
  },
  mobilelabel:{
    flexDirection: "row",
    marginBottom:10
  },
  mobile:{
    fontSize:16,
    fontWeight:'bold',
    marginRight:5,
    color:'#2A2D32'
  },
  masked:{
    fontSize:16,
    color:'#FF6F1B'
  },

  label: {
    marginBottom: 5,
    fontSize: 13,
    //fontWeight: 400,
    color: "#a4a4a4",
  },
  input: {
    borderWidth: 1,
    borderColor: "#f6f5fa",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 13,
    backgroundColor: "#f4f4f4",
    color: "#444",
    height: 41,
  },
  normalInput: {
    width: "100%",
  },
  ifNumberBox: {
    width: "100%",
  },
  emailNumberInput: {
    borderWidth: 1,
    borderColor: "#f4f4f4",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    paddingLeft: 55,
    fontSize: 13,
    backgroundColor: "#f4f4f4",
    color: "#444",
    height: 41,
  },

  emailNumber: {
    width: 46,
    borderColor: "#f4f4f4",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    height: 41,
    zIndex:7777,
    borderRadius: 8,
  },
  flag:{
    width:38,
    height:16,
    position:'absolute',
    zIndex:999999
  },
  plusNine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'#f4f4f4'
  },
  plusNineText: {
    color: '#000',
    fontSize: 16,
    //fontWeight: 700,
  },
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
    width: "100%",
    paddingBottom: 20,
    position: 'relative'
},
inputFields: {
    paddingBottom: 15,
    width: "100%",
},
textcontainer: {
    paddingTop: 30,
    paddingBottom: 30
},
title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000'
},
innertext: {
    fontSize: 16,
    color: '#999999'
},
button_2: {
    alignItems: 'center',
    paddingTop: 20
},
passwd: {
    fontSize: 14,
    color: '#FF6F1B'
},
inputFieldsLinks: {
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
},
logInText: {
    marginBottom: 3,
},
logText: {
    fontSize: 16,
    paddingBottom: 20,
    // color: thirdColorBlack,
},
btnLink: {
    //fontWeight: 500,
},

});
