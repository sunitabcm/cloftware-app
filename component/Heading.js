
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Heading = ({ title, style }) => {
  return <Text style={[styles.heading, style && style]}>{title}</Text>;
};

const styles = StyleSheet.create({
  heading: {
    width: '100%',
    fontSize: 18,
    //fontWeight: 600,
    marginBottom: 16,
    color:'#34495E'
  },
});

export default Heading;
