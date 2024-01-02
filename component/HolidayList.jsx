import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const HolidayList = ({ data }) => {
    console.log(data, 'holidays')
  const organizeDataByMonth = () => {
    const organizedData = {};

    data.forEach((holiday) => {
      const month = new Date(holiday.date).toLocaleString('default', { month: 'long' });

      if (!organizedData[month]) {
        organizedData[month] = [];
      }

      organizedData[month].push(holiday);
    });

    return organizedData;
  };

  const renderHolidays = () => {
    const organizedData = organizeDataByMonth();

    return Object.keys(organizedData).map((month) => (
      <View key={month} style={styles.monthContainer}>
        <Text style={styles.monthHeading}>{month}</Text>
        {organizedData[month].map((holiday) => (
          <View key={holiday.holiday_id} style={styles.holidayContainer}>
            <Text style={styles.holidayDate}>{new Date(holiday.date).getDate()}</Text>
            <View>
              <Text style={styles.holidayTitle}>{holiday.title}</Text>
              <Text style={styles.holidayDescription}>{holiday.description}</Text>
            </View>
          </View>
        ))}
      </View>
    ));
  };

  return <ScrollView contentContainerStyle={styles.container}>{renderHolidays()}</ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  monthContainer: {
    marginBottom: 20,
  },
  monthHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  holidayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  holidayDate: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: 'bold',
  },
  holidayTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  holidayDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default HolidayList;
