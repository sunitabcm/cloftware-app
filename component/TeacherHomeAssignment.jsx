import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, ImageBackground, FlatList } from 'react-native';
import dayjs from 'dayjs';
import AppIcon from './GlobalComps/AppIcon';
import { stylesGlobal } from '../styles/global';
import EmptyScreen from './GlobalComps/EmptyScreen';
import CalendarStrip from 'react-native-calendar-strip';
import AttendanceBox from './AttendanceBar';
import ClassDropdown from './ClassDropdown';

const HorizontalDateScroll = ({ selectedDate, onDateSelect }) => {
  const startDate = dayjs(selectedDate).startOf('month').format('YYYY-MM-DD');
  const endDate = dayjs(selectedDate).endOf('month').format('YYYY-MM-DD');

  const onDateSelected = (date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    onDateSelect(formattedDate);
  };

  return (
    <CalendarStrip
      selectedDate={selectedDate}
      onDateSelected={onDateSelected}
      style={{ height: 50 }}
      calendarColor={'white'}
      calendarHeaderStyle={{ color: 'black' }}
      dateNumberStyle={{ color: 'black' }}
      dateNameStyle={{ color: 'black' }}
      highlightDateNumberStyle={{ color: '#ffffff' }}
      highlightDateNameStyle={{ color: '#ffffff' }}
      disabledDateNameStyle={{ color: 'grey' }}
      disabledDateNumberStyle={{ color: 'grey' }}
      showMonth={false}
      showYear={false}
      minDate={startDate}
      maxDate={endDate}
      daySelectionAnimation={{ type: 'background', highlightColor: '#2A2D32', duration: 200, borderWidth: 1, borderHighlightColor: '#2A2D32' }}
      scrollable={true}
    />

  );
};

const StudentListItem = ({ student, stat }) => {
  const statusColor = {
    'Present': '#10B981',
    'Absent': '#FE0A0A',
    'Leave': '#5F6369'
  };

  const statusLabel = {
    'Present': 'P',
    'Absent': 'A',
    'Leave': 'L'
  };

  return (
    <View className='border border-[#DFDFDF] flex flex-row justify-between mb-5 items-center rounded-lg p-4'>
      <View className='flex flex-row gap-x-3'>
        <Text className='text-body font-bold capitalize'>{student.stu_first_name} {student.stu_last_name}</Text>
      </View>
      <View style={{ backgroundColor: statusColor[stat] }} className={`rounded-[20px] p-2.5 w-[40px] h-[40px] flex justify-center items-center text-center`}>
        <Text className={` text-light font-bold capitalize`}>{statusLabel[stat]}</Text>
      </View>
    </View>
  );
};

const TeacherHomeAssignment = ({ data, fetchData }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'));

  const onArrowPress = (increment) => {
    const newDate = dayjs(selectedDate).add(increment, 'month').format('YYYY-MM-DD');
    setSelectedDate(newDate);
    fetchData(newDate);
  };

  return (
    <ScrollView style={{ flex: 1 }} className='bg-light h-full'>
      <View className='mb-20 h-full bg-light'>
        <View style={{ padding: 20 }}><ClassDropdown /></View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
          <TouchableOpacity onPress={() => onArrowPress(-1)}>
            <AppIcon type='AntDesign' name='caretleft' size={20} color='#A3A3A3' />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{dayjs(selectedDate).format('MMMM YYYY')}</Text>
          <TouchableOpacity onPress={() => onArrowPress(1)}>
            <AppIcon type='AntDesign' name='caretright' size={20} color='#A3A3A3' />
          </TouchableOpacity>
        </View>
        <HorizontalDateScroll key={data} selectedDate={selectedDate} onDateSelect={(date) => { setSelectedDate(date); fetchData(date); }} />
        <View style={{ padding: 20 }}>
          {data && data.body && Array.isArray(data.body.studentlist) && data.body.studentlist.length !== 0 ? (
            <View style={{ marginBottom: 20 }}>
              <AttendanceBox present={data.body.present} absent={data.body.absent} leave={data.body.leave} />
              <FlatList
                data={data.body.studentlist}
                renderItem={({ item }) => <StudentListItem student={item.student} stat={item.status} />}
                keyExtractor={(item) => item.student.stu_id.toString()}
              />
            </View>
          ) : (
            <EmptyScreen height={false} />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default TeacherHomeAssignment;
