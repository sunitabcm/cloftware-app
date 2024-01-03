import React, { useState } from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";
import Buttons from "./Buttons";

const Logo = ({center}) => {

  const logoImgStyle = center
  ? { marginLeft: "auto", marginRight: "auto", marginBottom: "auto" }
  : {}; 

  return (
    <View style={[logoImgStyle]}>
      <Image
        source={{ uri: "https://cloftware.com/images/clof.png" }}
        style={styles.logoImg}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logoImg: {
    width: 130,
    height: 17,
    marginBottom: 0,
  },
});

export default Logo;
