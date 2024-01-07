import React, { useEffect } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import SchoolIcon from "../component/GlobalComps/SchoolIcon";
import { stylesGlobal } from "../styles/global";
import { loadAuthToken } from '../authStorage';
import { setAuthToken } from "../store/slices/authSlice";
import { useSelector, useDispatch } from 'react-redux';
const SplashScreen = () => {
  const router = useRouter();
  const authToken = useSelector((state) => state.auth.authToken)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (authToken && Object.keys(authToken).length > 0) {
        router.replace("/dashboard");
      } else {
        router.replace("/slideshow");
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [router, authToken]);

  return (
    <View style={stylesGlobal.containerFlexWhite}>
      <View style={stylesGlobal.circle_1} />
      <View style={stylesGlobal.circle_2} />
      <View style={stylesGlobal.circle_3} />
      <SchoolIcon styleSize={115} />
    </View>
  );
};

export default SplashScreen;
