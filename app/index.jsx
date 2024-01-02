import React, { useEffect } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from 'react-redux';
const SplashScreen = () => {
  const router = useRouter();
  const authToken = useSelector((state) => state.auth.authToken)
  useEffect(() => {
    const timer = setTimeout(() => {
      if(authToken && Object.keys(authToken).length > 0){
      router.replace("/dashboard");
      } else {
        router.replace("/slideshow");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [router, authToken]);

  return (
    <View style={styles.container}>
        <View style={styles.circle_1} />
        <View style={styles.circle_2} />
        <View style={styles.circle_3} />
      {/* Centered Image */}
      <Image
        source={require("../assets/Rectangle-16.png")}
        //style={{ width: 115, height: 115 }}{/* Replace with your image source */}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.below_logo}>
        <Image
            source={require("../assets/Frame-64.png")}
            //style={{ width: 115, height: 115 }}{/* Replace with your image source */}
            
            resizeMode="contain"
        />
      </View>
    </View>
  );
};

// Remaining styles remain the same...


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    position:'relative',
    alignItems: "center",
    backgroundColor: "#fff", // Set your desired background color
  },
  below_logo:{
    position: "absolute",
    bottom: 20, // Adjust this value to position the frame image as needed
    alignItems: "center",
  },
  circle_1:{
    width:633,
    height:633,
    position:'absolute',
    borderWidth: 50,
    borderColor: "#FFF3E4",
    borderRadius: 1000,
    borderStyle: "solid",
  },
  circle_2:{
    width:455,
    height:455,
    position:'absolute',
    borderWidth: 50,
    borderColor: "#FFF3E4",
    borderRadius: 1000,
    borderStyle: "solid",
  },
  circle_3:{
    width:253,
    height:253,
    position:'absolute',
    borderWidth: 50,
    borderColor: "#FFF3E4",
    borderRadius: 1000,
    borderStyle: "solid",
  },
  image: {
    width: 110,
    height: 110,
    // Additional styles for your image
  },
});

export default SplashScreen;
