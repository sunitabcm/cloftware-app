import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';


const Buttons = ({children, title, onPress,updatedstyle, disabled, ...rest }) => {
  const containerStyles = [styles.button];
  const textStyles = [styles.buttonText];

  if (disabled) {
    containerStyles.push(styles.disabledButton);
    textStyles.push(styles.disabledButtonText);
  }

  return (
    <TouchableOpacity
      style={!updatedstyle ? containerStyles : styles.updatedbutton}
      onPress={onPress}
      disabled={disabled}
      {...rest}
    >
     {children ? <Text style={!updatedstyle ? textStyles : styles.textNewcolor}>{title} {children}</Text> : <Text style={!updatedstyle ? textStyles : styles.textNewcolor}>{title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor:'#2A2D32',
    borderRadius: 56,
    justifyContent: 'center',
    alignItems: 'center',
    width: 312,
    height: 51
  },
  updatedbutton:{
    backgroundColor:'#fff',
    borderWidth: 1, // Border width
    borderColor: '#2A2D32', // Border color
    borderRadius: 56,
    justifyContent: 'center',
    alignItems: 'center',
    width: 312,
    height: 51
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    //fontWeight: 600,
    alignItems: 'center',
    display: "flex",
  },
  textNewcolor:{
    color: '#2A2D32',
    fontSize: 16,
    fontWeight:'bold',
    //fontWeight: 600,
    alignItems: 'center',
    display: "flex",
  },
  disabledButton: {
    backgroundColor: '#ccc', // Change color for disabled state
  },
  disabledButtonText: {
    color: '#999', // Change text color for disabled state
  },
});

export default Buttons;
