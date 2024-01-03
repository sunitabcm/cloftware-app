import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Links from "../../component/Links";
import Logo from "../../component/Logo";
import { fourColorBlack, secondaryColor, secondaryColorBlack } from "../../component/stylesheet";

const WelcomeFooter = ({logoHide}) => {
  return (
      <View style={styles.welcomeFooter}>
        {!logoHide && <View style={styles.poweredBy}>
          <Text style={styles.poweredByText}>Powered By:</Text>
          <Logo />
        </View>}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By using Our App, you agree and concept to our: 
          <Links 
          title={"Terms and Condition"}
          onPress={() => {}}
          style={styles.link}
          />
          <Links 
            title={"Privacy Plocy"}
            onPress={() => {}}
            style={styles.link}
            />
        </Text>
      </View>
      </View>
  );
};

const styles = StyleSheet.create({

  welcomeFooter : {
  width: "100%",
  marginTop: "auto"
  },
  poweredBy:{
    alignItems: "center",
    justifyContent: "center",
  },
  poweredByText: {
    fontSize: 14,
    marginBottom: 10,
    //fontWeight: 500,
    marginTop: 10,
    color: secondaryColor,
    textAlign: "center",
  },
  footer: {
    backgroundColor: fourColorBlack,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 15,
    textAlign: "center"
  },
  footerText: {
    fontSize: 13,
    lineHeight: 18,
    //fontWeight: 500,
    color: secondaryColorBlack,
    textAlign: "center"
  },
  link:{
    color: secondaryColor,
    marginRight: 5,
  },
});

export default WelcomeFooter;
