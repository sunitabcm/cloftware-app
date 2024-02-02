import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from 'lottie-react-native';

const SplashScreen = () => {

  return (
    <View style={styles.container}>
      <View style={styles.welcome}>
        <LottieView style={{ flex: 1 }} source={require('../../assets/splash.json')} autoPlay loop />
      </View>
    </View>
  );
};

export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 0
  },
  welcome: {
    height: '100%',
    width: '100%',
    aspectRatio: 3 / 2,
  },
});