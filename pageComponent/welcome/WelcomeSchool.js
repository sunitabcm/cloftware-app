import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { primaryColor } from "../../component/stylesheet";

const WelcomeSchool = () => {
  return (
      <View style={styles.holderInn}>

        <View style={styles.schoolLogo}>
            <Image
              source={require("../../assets/Small-rectangle-16.png")}
              style={{ width: 49, height: 49 }}
            />
          </View>
      </View>
  );
};

const styles = StyleSheet.create({

  holderInn : {
  width: "100%",
  
  paddingTop:20
  },

  schoolLogo:{
   
   alignItems: "start",
  },
});

export default WelcomeSchool;
