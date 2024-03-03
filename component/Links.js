import React from 'react';
import { TouchableOpacity,Image, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { fourColor, secondaryColor } from './stylesheet';
const Links = ({ title, onPress, iconName, iconPosition, style, back }) => {
  return (
    <View style={styles.button}>
    <TouchableOpacity onPress={onPress}>
      {back ? <View style={[styles.backButton, style && style]}><Image
              source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/ArrowLeft.png' }}
              // style={{ width: 49, height: 49 }}
            /></View>
      : 
      <Text style={[styles.buttonText, style && style]}>{title}</Text>
      }
    </TouchableOpacity>
    </View>
  );
};

  {/* {iconPosition === 'left' && iconName && <Icon name={iconName} size={20} color="#3D5EE1" style={styles.icon} />} */}
   
      {/* {iconPosition === 'right' && iconName && <Icon name={iconName} size={20} color="#3D5EE1" style={styles.icon} />} */}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row', // To align icon and text horizontally
    alignItems: 'center', // To vertically center align icon and text
    marginBottom: 10,
  },
  buttonText: {
    color: secondaryColor,
    fontSize: 14,
    //fontWeight: 400,
  },
  icon: {
    marginHorizontal: 5, // Add some space to the left or right of the icon
  },
  backButton:{
   flexDirection: "row",

  },
  buttonTextBack:{
     color: fourColor,
     //fontWeight:600
  }
});

export default Links;
