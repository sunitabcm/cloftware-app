import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from 'lottie-react-native';

const LoadingAnimation = () => {

  return (
    <View style={styles.container}>
      <View style={styles.welcome}>
        <LottieView style={{ flex: 1 }} source={require('../../assets/loading.json')} autoPlay loop />
      </View>
    </View>
  );
};

export default LoadingAnimation;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    height: '100%',
    width: '100%',
  },
  welcome: {
    height: 80,
    width: 80,
    aspectRatio: 3 / 2,
    // backgroundColor: '#000',
    padding: 0,
  },
});