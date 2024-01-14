import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar, Agenda } from 'react-native-calendars';
import dayjs from 'dayjs';
import AppIcon from './GlobalComps/AppIcon';
import { SmallPopup } from './GlobalComps/SmallPopup';

const BookSchedules = ({ data, fetchData }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const [isLoading, setIsLoading] = useState(false);

  const onArrowPress = (increment) => {
    const newDate = dayjs(selectedDate).add(increment, 'month').format('YYYY-MM-DD');
    setSelectedDate(newDate);
    fetchData(newDate);
  };

  const generateDummyData = (month, year) => {
    const daysInMonth = dayjs(`${year}-${month}-01`).daysInMonth();
    const dummyAgendaData = {};

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = dayjs(`${year}-${month}-${day}`).format('YYYY-MM-DD');
      dummyAgendaData[currentDate] = [];
    }

    dummyAgendaData['2024-01-10'] = [{ name: 'Event 2' }];
    dummyAgendaData['2024-01-14'] = [{ name: 'Event 3' }];
    dummyAgendaData['2024-01-16'] = [{ name: 'Event 3' }];
    dummyAgendaData['2024-01-17'] = [
      { name: 'item 3 - any js object' },
      { name: 'any js object' },
    ];
    dummyAgendaData['2024-01-18'] = [{ name: 'Event 3' }];

    return dummyAgendaData;
  };

  const currentMonth = dayjs(selectedDate).format('MM');
  const currentYear = dayjs(selectedDate).format('YYYY');
  const dummyAgendaData = generateDummyData(currentMonth, currentYear);

  useEffect(() => {
    setIsLoading(true);

    // Simulate fetching data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [selectedDate]);

  const hasEvents = Object.keys(dummyAgendaData).some((date) =>
    dayjs(date).isSame(selectedDate, 'month')
  );

  const customTheme = {
    calendarBackground: 'white',
    agendaKnobColor: '#A3A3A3',
    agendaDayTextColor: 'green',
    agendaDayNumColor: 'green',
    agendaTodayColor: 'red',
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
        <TouchableOpacity onPress={() => onArrowPress(-1)}>
          <AppIcon type='AntDesign' name='caretleft' size={20} color='#A3A3A3'/>
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{dayjs(selectedDate).format('MMMM YYYY')}</Text>
        <TouchableOpacity onPress={() => onArrowPress(1)}>
          <AppIcon type='AntDesign' name='caretright' size={20} color='#A3A3A3'/>
        </TouchableOpacity>
      </View>

      <Agenda
        items={dummyAgendaData}
        selected={selectedDate}
        renderItem={(item) => (
          <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' }}>
            <Text>{item.name}</Text>
          </View>
        )}
        hideKnob={true}
        style={{ height: 500, backgroundColor: 'transparent', borderRadius: 10 }}
        theme={customTheme}
        onDayPress={() => {}}
        renderEmptyDate={() => (
          <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' }}>
            <Text>No Schedules</Text>
          </View>
        )}
      />
    </View>
  );
};

export default BookSchedules;
