import React, { useState, useContext, useEffect } from "react";
import { View, Text, Button, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import Buttons from "../component/Buttons";
import { useRouter } from "expo-router";
import InputeFields from "../component/InputeFields";
import Messages from "../component/Messages";
import { getStudentProfile, loginViaOtp, verifyLoginOtp } from "../ApiCalls";
import { useToast } from 'react-native-toast-notifications';
import { SmallPopup } from "../component/GlobalComps/SmallPopup";
import { stylesGlobal } from "../styles/global";
import { useSelector, useDispatch } from 'react-redux';
import AppIcon from "../component/GlobalComps/AppIcon";
import SchoolIcon from "../component/GlobalComps/SchoolIcon";
import BtnGlobal from "../component/GlobalComps/BtnGlobal";
import Loginpopup from "../component/Loginpopup";
import { saveAuthToken } from "../authStorage";
import { setAuthToken } from "../store/slices/authSlice";
import CloftwareLogo from "../component/GlobalComps/CloftwareLogo";
import NonLoggedInBlur from "../component/GlobalComps/NonLoggedInBlur";
const Otp = () => {
  const router = useRouter();
  const toast = useToast();
  const dispatch = useDispatch();
  const [enteredNumber, setenteredNumber] = useState("7406226857");
  const [buttondisabled, setbuttondisabled] = useState(true);
  const [verifyotp, setverifyotp] = useState(false);
  const [otp, setOtp] = useState("942575");
  const [otperror, setotperror] = useState(false);
  const [error, seterror] = useState(false);
  const [otpsuccessmsg, setotpsuccessmsg] = useState("");
  const [errormsg, seterrormsg] = useState("");
  const [otperrormsg, setotperrormsg] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const handleVerify = () => {

    setotpsuccessmsg("");
    if (otp.length < 0) {
      setotperror(true);
    } else {
      setotperror(false);
      const newnum = "91" + enteredNumber;
      verifyOtpFunc(newnum);
    }
  };
  const onChangeText = (e) => {
    setenteredNumber(e);
    if (e.length > 0) {
      setbuttondisabled(false);
      seterror(false);
    } else {
      setbuttondisabled(true);
    }
  };

  const onPress = (e) => {
    if (enteredNumber.length !== 10) {
      seterror(true);
    } else {
      seterror(false);

      const newnum = "91" + enteredNumber;
      // loginPostFunc(newnum);
      setverifyotp(true);
    }
  };
  const verifyOtpFunc = async (num) => {
    try {
      const userLogin = await verifyLoginOtp('917406226857', '942575')
      if (userLogin) {
        dispatch(setAuthToken(userLogin?.body))
        await getStudentProfile(dispatch, response.body)
        saveAuthToken(userLogin?.body)
        toast.show(userLogin?.message, { type: "success" })
        router.push('/dashboard')
      } else {
        toast.show(userLogin?.message, { type: "danger" })
      }
    } catch (error) {
      toast.show('An error occured, Please try again', { type: "danger" })
      // router.push('/')
    }
  };
  // const loginPostFunc = async (num) => {
  //   try {
  //     const userLogin = await loginViaOtp(num)
  //     if (userLogin) {
  //       toast.show(userLogin?.message, { type: "success" })
  //       setverifyotp(true);
  //     } else {
  //       toast.show('An error occured, Please try again', { type: "danger" })
  //     }
  //   } catch (error) {
  //     toast.show('An error occured, Please try again', { type: "danger" })
  //   }
  // };

  useEffect(() => {
    if (enteredNumber.length == 0) {
      seterrormsg('')
    }
  }, [enteredNumber]);
  return (
    <ScrollView className='bg-light h-full'>
      <View>
        <NonLoggedInBlur onPressBtn={() => setverifyotp(false)} hidden={verifyotp}/>
        <View style={stylesGlobal.textcontainer} className='p-5'>
          <Text style={stylesGlobal.title}>Join us via phone number</Text>
          <Text style={stylesGlobal.innertext}>We will text a code to verify you</Text>
        </View>
        <View style={stylesGlobal.formFields} className='p-5'>
          <View style={stylesGlobal.inputFields}>
            {!verifyotp ? (
              <InputeFields
                label={"Mobile no"}
                placeholder={"Enter Mobile number"}
                onChangeText={onChangeText}
                value={enteredNumber}
                type={'number'}
                numeric={true}
                secureTextEntry={false}
                ifEmailNumber
              />
            ) : (
              <InputeFields
                label={"Enter OTP"}
                placeholder={"OTP"}
                onChangeText={(e) => setOtp(e)}
                value={otp}
                numeric={true}
              />
            )}
            {error && <Messages title="Please Enter valid Number" />}
            {errormsg && enteredNumber.length !== 0 && <Messages title={errormsg} />}
            {otperrormsg && <Messages title={otperrormsg} />}
            {otpsuccessmsg && <Messages type="success" title={otpsuccessmsg} />}
            <View className='w-full mt-10'>
              {!verifyotp ? (
                <>
                  <BtnGlobal
                    styleClassName="button"
                    title="Get OTP"
                    onPress={onPress}
                    classNames={' w-full'}
                  />
                  <BtnGlobal
                    styleClassName="updatedbutton"
                    title="Login using other method"
                    onPress={openModal}
                    classNames={'mt-5 w-full'}
                  />
                </>
              ) : (
                <BtnGlobal
                  styleClassName="button"
                  title="Verify OTP"
                  onPress={handleVerify}
                  classNames={' w-full'}
                />
              )}
            </View>
          </View>
        </View>
      </View>
      <SmallPopup isVisible={modalVisible} closeModal={closeModal}>
        <Loginpopup closeModal={closeModal} />
      </SmallPopup>
      <CloftwareLogo/>
    </ScrollView>
  );
};


export default Otp;
