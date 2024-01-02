import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import dayjs from 'dayjs';

const YearChanger = ({ onYearChange }) => {
  const [currentYear, setCurrentYear] = useState(dayjs().year());

  const incrementYear = () => {
    setCurrentYear(currentYear + 1);
    onYearChange(currentYear + 1);
  };

  const decrementYear = () => {
    setCurrentYear(currentYear - 1);
    onYearChange(currentYear - 1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={decrementYear} style={styles.button}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>

      <Text style={styles.yearText}>{currentYear}</Text>

      <TouchableOpacity onPress={incrementYear} style={styles.button}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
  },
  yearText: {
    fontSize: 20,
  },
  button: {
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default YearChanger;
