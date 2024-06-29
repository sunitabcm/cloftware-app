import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AttendanceBox = ({ present, leave, absent }) => {
  const totalStudents = present + leave + absent;
  const presentPercentage = (present / totalStudents) * 100;
  const leavePercentage = (leave / totalStudents) * 100;
  const absentPercentage = (absent / totalStudents) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.countsContainer}>
        <View className='flex justify-start items-start flex-col'>
          <Text style={styles.countText}>{present}</Text>
          <View className='flex flex-row items-center'>
            <View className='h-[10px] w-[10px] bg-success rounded-xl mr-1'></View>
            <Text style={styles.countLabel}>Present</Text>
          </View>
        </View>
        <View className='flex justify-center items-center flex-col'>
          <Text style={styles.countText}>{leave} </Text>
          <View className='flex flex-row items-center'>
            <View className='h-[10px] w-[10px] bg-leave rounded-xl mr-1'></View>
            <Text style={styles.countLabel}>Leave</Text>
          </View>
        </View>
        <View className='flex justify-end items-end flex-col'>
          <Text style={styles.countText}>{absent} </Text>
          <View className='flex flex-row items-center'>
            <View className='h-[10px] w-[10px] bg-error rounded-xl mr-1'></View>
            <Text style={styles.countLabel}>Absent</Text>
          </View>
        </View>
      </View>
      <View style={styles.barContainer}>
        <View style={[styles.barSegment, { backgroundColor: '#10B981', width: `${presentPercentage}%` }]} />
        <View style={[styles.barSegment, { backgroundColor: '#5F6369', width: `${leavePercentage}%` }]} />
        <View style={[styles.barSegment, { backgroundColor: '#FE0A0A', width: `${absentPercentage}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#F5F5F7',
    padding: 16,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  countsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  countText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  countLabel: {
    fontSize: 14,
    color: '#888',
  },
  barContainer: {
    flexDirection: 'row',
    height: 20,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
    marginTop: 10,
  },
  barSegment: {
    height: '100%',
  },
  linkText: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

export default AttendanceBox;
