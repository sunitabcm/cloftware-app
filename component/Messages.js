import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Messages = ({ type, title }) => {
  const containerStyle = type === 'success' ? styles.successContainer : styles.errorContainer;
  const textStyle = type === 'success' ? styles.successText : styles.errorText;

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={textStyle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 2,
  },
  successContainer: {
    color: '#4caf50',
  },
  errorContainer: {
    color: '#ef5350',
  },
  successText: {
    color: '#4caf50',
    fontSize: 12,
  },
  errorText: {
    color: '#ef5350',
    fontSize: 12,
  },
});

export default Messages;
