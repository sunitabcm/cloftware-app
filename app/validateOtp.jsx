import React, { useState, useContext, useEffect } from "react";
import { View, Text, Button, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import Buttons from "../component/Buttons";
import { useRouter } from "expo-router";
import InputeFields from "../component/InputeFields";
import { fiveColorBlack } from "../component/stylesheet";
import WelcomeSchool from "../pageComponent/welcome/WelcomeSchool";
import Messages from "../component/Messages";
import { loginViaOtp, verifyLoginOtp } from "../ApiCalls";
import { useToast } from 'react-native-toast-notifications';
import { SmallPopup } from "../component/GlobalComps/SmallPopup";
import { stylesGlobal } from "../styles/global";
import { useSelector, useDispatch } from 'react-redux';
import AppIcon from "../component/GlobalComps/AppIcon";
const Otp = () => {
  const router = useRouter();
  const toast = useToast();
  const dispatch = useDispatch();
  const [enteredNumber, setenteredNumber] = useState("");
  const [buttondisabled, setbuttondisabled] = useState(true);
  const [verifyotp, setverifyotp] = useState(false);
  const [otp, setOtp] = useState("");
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
      loginPostFunc(newnum);
    }
  };
  const verifyOtpFunc = async (num) => {
    try {
      const userLogin = await verifyLoginOtp(dispatch, num, otp)
      if (userLogin) {
        dispatch(setAuthToken(userLogin?.body))
        toast.show(userLogin?.message, { type: "success" })
        router.push('/dashboard')
      } else {
        toast.show('An error occured, Please try again', { type: "danger" })
      }
    } catch (error) {
      toast.show('An error occured, Please try again', { type: "danger" })
    }
  };
  const loginPostFunc = async (num) => {
    try {
      const userLogin = await loginViaOtp(num)
      if (userLogin) {
        toast.show(userLogin?.message, { type: "success" })
        setverifyotp(true);
      } else {
        toast.show('An error occured, Please try again', { type: "danger" })
      }
    } catch (error) {
      toast.show('An error occured, Please try again', { type: "danger" })
    }
  };

  useEffect(() => {
    if (enteredNumber.length == 0) {
      seterrormsg('')
    }
  }, [enteredNumber]);
  return (
    <ScrollView
      contentContainerStyle={{ backgroundColor: fiveColorBlack, flex: 1 }}
    >
      <View style={stylesGlobal.container}>

        {/* <Links
          back
          title={"Back"}
          onPress={() => router.push("/login")}
        /> */}
        <View style={stylesGlobal.handlerBox}>
          <WelcomeSchool />
          <View style={stylesGlobal.textcontainer}>
            <Text style={stylesGlobal.title}>Join us via phone number</Text>
            <Text style={stylesGlobal.innertext}>We will text a code to verify you</Text>
          </View>
          <View style={stylesGlobal.formFields}>
            <View style={stylesGlobal.inputFields}>
              {!verifyotp ? (
                <InputeFields
                  label={"Mobile no"}
                  placeholder={"Enter Email or Mobile"}
                  onChangeText={onChangeText}
                  value={enteredNumber}
                  ifEmailNumber
                />
              ) : (
                <InputeFields
                  label={"Enter OTP"}
                  placeholder={"OTP"}
                  onChangeText={(e) => setOtp(e)}
                  value={otp}
                />
              )}
              {error && <Messages title="Please Enter valid Number" />}
              {errormsg && enteredNumber.length !== 0 && <Messages title={errormsg} />}
              {otperrormsg && <Messages title={otperrormsg} />}
              {otpsuccessmsg && <Messages type="success" title={otpsuccessmsg} />}
              <View style={stylesGlobal.buttonContainer}>
                {!verifyotp ? (
                  <>
                    <Buttons
                      title="Get Otp"
                      onPress={onPress}
                      disabled={buttondisabled}
                    />
                    <View style={stylesGlobal.button_2}>
                      <Buttons title="Login using other method" updatedstyle={true} onPress={openModal} />
                    </View>
                  </>
                ) : (
                  <Buttons title="Verify Otp" onPress={handleVerify} />
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
      <SmallPopup isVisible={modalVisible} closeModal={closeModal}>
        <View style={stylesGlobal.flexCenter}>
          <Text style={stylesGlobal.title}>Join us via phone number</Text>
          <View style={[{ display: 'flex', flexDirection: 'row', marginTop: 20 }]}>
            <View style={[stylesGlobal.flexCenter, { width: '30%', backgroundColor: '#ccc', padding: 15, marginRight: 15, borderRadius: 10 }]}>
              <AppIcon type='Fontisto' name='microsoft' size={30} color={'#000'} />
              <Text style={[stylesGlobal.innertext, { marginTop: 5 }]}>Micosoft</Text>
            </View>
            <Pressable onPress={() => { router.push('/login'); closeModal() }} style={[stylesGlobal.flexCenter, { width: '30%', backgroundColor: '#ccc', padding: 15, marginRight: 15, borderRadius: 10 }]}>
              <AppIcon type='AntDesign' name='mail' size={30} color={'#000'} />
              <Text style={[stylesGlobal.innertext, { marginTop: 5 }]}>Mail</Text>
            </Pressable>
            <View style={[stylesGlobal.flexCenter, { width: '30%', backgroundColor: '#ccc', padding: 15, borderRadius: 10 }]}>
              <AppIcon type='AntDesign' name='google' size={30} color={'#000'} />
              <Text style={[stylesGlobal.innertext, { marginTop: 5 }]}>Google</Text>
            </View>
          </View>
        </View>
      </SmallPopup>
    </ScrollView>
  );
};


export default Otp;
