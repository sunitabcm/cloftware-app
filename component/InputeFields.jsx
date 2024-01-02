import React, { useState } from "react";
import { View, TextInput,Image, Text, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/Ionicons";
import { secondaryColor, sixColor } from "./stylesheet";

const InputeFields = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  numeric,
  ifEye,
  ifEmailNumber,
  disabled = false,
}) => {

  const inputType = secureTextEntry
    ? "password"
    : numeric
    ? "numeric"
    : "default";

  const [isEye, setIsEye] = useState(false);

  return (
    <View style={styles.inputContainer}>
      {label &&  <View style={styles.mobilelabel}><Text style={styles.mobile}>{label}</Text><Text style={styles.masked}>*</Text></View>}
      {ifEye ? (
        <View style={styles.eyeOnOff}>
            <Pressable
              onPress={() => setIsEye(!isEye)}
              style={[
                styles.eyeOnOffBox,
                value.length === 0 && { opacity: 0.6 },
              ]}
              disabled={value.length === 0}
            >
              <Icon2
                name={isEye ? "eye" : "eye-off"}
                size={17}
                color={secondaryColor}
              />
            </Pressable>

          <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            onChangeText={onChangeText}
            secureTextEntry={!isEye ? secureTextEntry : false}
          />
        </View>
      ) : (
        <View style={styles.normalInput}>
          {!ifEmailNumber ? (
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              value={value}
              disabled={disabled}
              onChangeText={onChangeText}
              secureTextEntry={secureTextEntry}
              keyboardType={inputType}
              maxLength={numeric ? 10 : 100}
            />
          ) : (
            <View style={styles.ifNumberBox}>
              <View style={styles.emailNumber}>
                {!value.trim() ? (
                  <Image
                  source={require("../assets/flag-arrw.png")}
                  style={styles.flag}
                />
                  //<Icon name="email" size={20} color={whitte} />
                ) : !isNaN(value) ? (
                  <View style={styles.plusNine}>
                    <Icon name="plus" size={17} color={secondaryColor} />
                    <Text style={styles.plusNineText}>91</Text>
                    
                  </View>
                ) : (
                  <Icon name="email" size={20} color={secondaryColor} />
                )}
              </View>
              <TextInput
                style={styles.emailNumberInput}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                disabled={disabled}
                maxLength={!isNaN(value) ? 10 : 100}
                keyboardType="default"
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default InputeFields;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 5,
    width: "100%",
  },
  mobilelabel:{
    flexDirection: "row",
    marginBottom:10
  },
  mobile:{
    fontSize:16,
    fontWeight:'bold',
    marginRight:5,
    color:'#2A2D32'
  },
  masked:{
    fontSize:16,
    color:'#FF6F1B'
  },

  label: {
    marginBottom: 5,
    fontSize: 13,
    //fontWeight: 400,
    color: "#a4a4a4",
  },
  input: {
    borderWidth: 1,
    borderColor: "#f6f5fa",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 13,
    backgroundColor: "#f4f4f4",
    color: "#444",
    height: 41,
  },
  normalInput: {
    width: "100%",
  },
  ifNumberBox: {
    width: "100%",
  },
  emailNumberInput: {
    borderWidth: 1,
    borderColor: "#f4f4f4",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    paddingLeft: 55,
    fontSize: 13,
    backgroundColor: "#f4f4f4",
    color: "#444",
    height: 41,
  },

  emailNumber: {
    width: 46,
    borderColor: "#f4f4f4",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    height: 41,
    zIndex:7777,
    borderRadius: 8,
  },
  flag:{
    width:38,
    height:16,
    position:'absolute',
    zIndex:999999
  },
  plusNine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'#f4f4f4'
  },
  plusNineText: {
    color: '#000',
    fontSize: 16,
    //fontWeight: 700,
  },
  eyeOnOff: {
    width: "100%",
    position: "relative",
  },
  eyeOnOffBox: {
    width: 40,
    backgroundColor: sixColor,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
    height: 41,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});
