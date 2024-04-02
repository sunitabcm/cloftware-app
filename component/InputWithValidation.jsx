import React, { useState } from "react";
import { View, TextInput, Image, Text, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/Ionicons";
import { secondaryColor, sixColor } from "./stylesheet";
import Messages from "./Messages";
import AppIcon from "./GlobalComps/AppIcon";
const InputeFieldsValidation = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  numeric,
  ifEye,
  ifEmailNumber,
  disabled = false,
  type = 'email'
}) => {

  const inputType = secureTextEntry
    ? "password"
    : numeric
      ? "numeric"
      : "default";

  const [isEye, setIsEye] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    isValid: false,
    message: "Password must contain 1 capital letter, 1 lowercase letter, 1 special character, 1 numeric, and be at least 8 characters long",
  });

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValid = passwordRegex.test(password);
    setPasswordValidation({
      isValid,
      message: isValid ? "" : "Password must contain 1 capital letter, 1 lowercase letter, 1 special character, 1 numeric, and be at least 8 characters long",
    });
  };

  const handleInputChange = (text) => {
    if (ifEye) {
      validatePassword(text);
    }
    onChangeText(text);
  };

  const handleBlur = () => {
    if (ifEye) {
      validatePassword(value);
    }
  };

  return (
    <View style={styles.inputContainer}>
      {label && <View style={styles.mobilelabel}><Text style={styles.mobile}>{label}</Text><Text style={styles.masked}>*</Text></View>}
      {ifEye ? (
        <View style={styles.eyeOnOff}>
          <View className="absolute top-0 right-0 w-[40px] h-[45px] justify-center flex items-center z-[3]">
            <Pressable
              onPress={() => setIsEye(!isEye)}
            // style={[
            //   styles.eyeOnOffBox,
            //   value.length === 0 && { opacity: 0.6 },
            // ]}
            // disabled={value.length === 0}
            >
              <AppIcon
                type={'MaterialCommunityIcons'}
                name={isEye ? "eye" : "eye-off"} size={20} color='#37374E'
              />
            </Pressable>
          </View>

          <TextInput
            style={[
              styles.input,
              passwordValidation.isValid ? null : { borderColor: "red" },
            ]}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            onChangeText={handleInputChange}
            onBlur={handleBlur} // Added onBlur event handler
            keyboardType={inputType}
            secureTextEntry={!isEye ? secureTextEntry : false}
          />
          {passwordValidation.isValid ? null : (
            <Messages title={passwordValidation.message} />
          )}
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
                  type === 'number' ?
                    <View style={styles.plusNine}>
                      <Image
                        source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/ind-flag.png' }}
                        style={{ width: 24, height: 16 }}
                        contentFit="cover"
                      />

                    </View>
                    :
                    <View style={styles.plusNine}>
                      <Image
                        source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/ind-flag.png' }}
                        style={{ width: 24, height: 16 }}
                        contentFit="cover"
                      />

                    </View>
                ) : !isNaN(value) ? (
                  <View style={styles.plusNine}>
                    <Image
                      source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/ind-flag.png' }}
                      style={{ width: 24, height: 16 }}
                      contentFit="cover"
                    />
                  </View>
                ) : (
                  // <Icon name="email" size={20} color={secondaryColor} />
                  <View style={styles.plusNine}>
                    <Image
                      source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/ind-flag.png' }}
                      style={{ width: 24, height: 16 }}
                      contentFit="cover"
                    />

                  </View>
                )}
              </View>
              <TextInput
                style={styles.emailNumberInput}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                disabled={disabled}
                maxLength={!isNaN(value) ? 10 : 100}
                keyboardType={inputType}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default InputeFieldsValidation;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 5,
    width: "100%",
  },
  mobilelabel: {
    flexDirection: "row",
    marginBottom: 10
  },
  mobile: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
    color: '#2A2D32'
  },
  masked: {
    fontSize: 16,
    color: '#FF6F1B'
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
    zIndex: 7777,
    borderRadius: 8,
  },
  flag: {
    width: 38,
    height: 16,
    position: 'absolute',
    zIndex: 999999
  },
  plusNine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#f4f4f4'
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
