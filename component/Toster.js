import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Toster = ({ message, type, duration = 5000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      //onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return visible ? (
    <View style={[styles.toast, type === 'success' ? styles.success : styles.error]}>
      <Text style={styles.text}>{message}</Text>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 10,
    borderRadius: 5,
  },
  success: {
    backgroundColor: 'green',
  },
  error: {
    backgroundColor: 'red',
  },
  text: {
    color: 'white',
  },
});

export default Toster;
