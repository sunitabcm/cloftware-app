import React, { useState, useContext } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    Image,
    ScrollView,
} from "react-native";
import Buttons from "../component/Buttons";
import InputeFields from "../component/InputeFields";
import BtnGlobal from "../component/GlobalComps/BtnGlobal";
import SchoolIcon from "../component/GlobalComps/SchoolIcon";
import Messages from "../component/Messages";
import { thirdColorBlack, fiveColorBlack } from "../component/stylesheet";
import { stylesGlobal } from "../styles/global";
import { useToast } from 'react-native-toast-notifications';
import { forgotPassword, verifyOtpPasswordReset, resetPassword } from '../ApiCalls'
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from 'react-redux';

const ForgotPassword = () => {
    const router = useRouter();
    const authToken = useSelector((state) => state.auth.authToken)
    const userCred = useSelector((state) => state.userDetails.user);
    const toast = useToast();
    const dispatch = useDispatch()
    const [email, setemail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setpassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [buttondisabled, setbuttondisabled] = useState(true);
    const [buttondisabledOtp, setButtondisabledOtp] = useState(true);
    const [emailValid, setEmailValid] = useState(false);
    const [otpValid, setOtpValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
    const [emailChanged, setEmailChanged] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [showEmailButton, setShowEmailButton] = useState(true);
    const [showOtpButton, setShowOtpButton] = useState(false);
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [errors, setErrors] = useState({});
    const [errormsg, seterrormsg] = useState("");
    const [err, seterr] = useState(false);
    const [passwderr, setpasswderr] = useState(false);

    const validateEmail = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        return regex.test(value);
    };

    const validateOtp = (value) => {
        // Add your validation logic for OTP here
        return value.length === 6; // Example: Check if OTP is 6 digits
    };

    const validatePassword = (value) => {
        // Add your validation logic for password here
        return value.length >= 3; // Example: Password must be at least 3 characters
    };

    const validateConfirmPassword = (value) => {
        // Add your validation logic for confirm password here
        return value === password;
    };
    const forgotPass = async (valuee) => {

        try {
            const response = await forgotPassword(valuee);
            if (response) {
                toast.show(response?.message, { type: "success" })
            } else {
            }
        } catch (error) {
            // toast.show('An error occured, Please try again', { type: "danger" })
        }
    };

    const verifyForgotPassOtp = async (email, otp) => {

        try {
            const response = await verifyOtpPasswordReset(email, otp);

            if (response) {
                toast.show(response?.message, { type: "success" })
            }
        } catch (error) {
            // toast.show('An error occured, Please try again', { type: "danger" })
        }
    };

    const ResetPass = async (newPass, confirmPass) => {

        try {
            const response = await resetPassword(newPass, confirmPass);

            if (response) {
                toast.show(response?.message, { type: "success" })
                router.replace('/login')
            } else {
                toast.show('An error occured, Please try again', { type: "danger" })
                // setErrors({});
            }
        } catch (error) {
            toast.show('An error occured, Please try again', { type: "danger" })
        }
    };

    const handleEmailSubmit = () => {
        if (validateEmail(email)) {
            // Call forgot password API
            forgotPass(email);
            setShowEmailButton(false);
            setShowOtpButton(true);
            setbuttondisabled(true);
            setEmailValid(true);
        } else {
            setEmailValid(false);
            seterr(true);
        }
    };

    const handleOtpSubmit = () => {
        if (validateOtp(otp)) {
            // Call verify OTP API
            verifyForgotPassOtp(email, otp);
            setShowOtpButton(false);
            setButtondisabledOtp(true);
            setShowPasswordFields(true);
            setbuttondisabled(true);
            setOtpValid(true);
        } else {
            setOtpValid(false);
        }
    };

    const handlePasswordSubmit = () => {
        if (validatePassword(password) && validateConfirmPassword(confirmPassword)) {
            // Call reset password API
            ResetPass(password, confirmPassword);
            // Additional logic if needed
        } else {
            setPasswordValid(!validatePassword(password));
            setConfirmPasswordValid(!validateConfirmPassword(confirmPassword));
        }
    };

    const chnageemail = (e) => {
        setErrors('');
        seterrormsg('');
        setbuttondisabled(true);
        setEmailValid(false);
        setShowEmailButton(true);
        setShowOtpButton(false);
        setShowPasswordFields(false);

        if (e.length === 0) {
            seterr(true);
        } else {
            seterr(false);
            setEmailChanged(true);
            setbuttondisabled(false);
        }

        setemail(e);
    };

    const changepasswd = (e) => {
        setErrors('');
        seterrormsg('');
        setbuttondisabled(true);
        setpasswderr(!validatePassword(e));
        setPasswordValid(validatePassword(e));
        setPasswordChanged(true);
        if (e.length === 0) {
            setButtondisabledOtp(true);
        } else {
            setButtondisabledOtp(false);
        }
        setpassword(e);
    };

    const changeConfirmPasswd = (e) => {
        setErrors('');
        seterrormsg('');
        setbuttondisabled(true);
        if (e.length === 0) {
            setButtondisabledOtp(true);
        } else {
            setButtondisabledOtp(false);
        }
        setConfirmPasswordValid(validateConfirmPassword(e));
        setConfirmPassword(e);
    };

    return (
        <ScrollView className='bg-light h-full p-5'>
            <View>
                <BtnGlobal
                    styleClassName="closeBtn"
                    icon={true}
                    onPress={() => router.push('/login')}
                    classNames={'mb-5'}
                    iconName={'arrowleft'}
                    iconType={'AntDesign'}
                    iconSize={22}
                    iconColor={'#2A2D32'}
                />
                <SchoolIcon styleSize={60} />
                <View style={styles.formFields}>
                    <View style={styles.textcontainer}>
                        <Text style={styles.title}>Forgot Password?</Text>
                    </View>
                    <View style={styles.inputFields}>
                        <InputeFields
                            label={"Email/Username"}
                            placeholder={"Enter Email"}
                            value={email}
                            disabled={!showEmailButton}
                            onChangeText={(e) => chnageemail(e)}
                            ifEmailNumber
                        />
                        {err && <Messages title="Invalid Email" />}
                    </View>
                    {showEmailButton && (
                        <BtnGlobal
                            styleClassName="button"
                            title="Send OTP"
                            onPress={handleEmailSubmit}
                            classNames={'w-full'}
                            isDisabled={buttondisabled}
                        />
                    )}

                    {showOtpButton && (
                        <>
                            <InputeFields
                                label={"Enter OTP"}
                                placeholder={"OTP"}
                                onChangeText={(e) => setOtp(e)}
                                value={otp}
                            />
                            <BtnGlobal
                                styleClassName="button"
                                title="Verify OTP"
                                onPress={handleOtpSubmit}
                                classNames={'w-full mt-5'}
                                isDisabled={otp?.length === 0}
                            />
                        </>
                    )}

                    {showPasswordFields && (
                        <>
                            <InputeFields
                                label={"Password"}
                                placeholder={"Enter Password"}
                                value={password}
                                secureTextEntry
                                onChangeText={(e) => changepasswd(e)}
                                ifEye
                            />
                            {passwderr && <Messages title="Invalid Password" />}
                            <InputeFields
                                label={"Confirm Password"}
                                placeholder={"Confirm Password"}
                                value={confirmPassword}
                                secureTextEntry
                                onChangeText={(e) => changeConfirmPasswd(e)}
                                ifEye
                            />
                            {!confirmPasswordValid && <Messages title="Passwords do not match" />}
                            <BtnGlobal
                                styleClassName="button"
                                title="Reset Password"
                                onPress={handlePasswordSubmit}
                                classNames={'w-full mt-5'}
                                isDisabled={buttondisabledOtp}
                            />
                        </>
                    )}

                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    backarrow: {
        paddingTop: 20
    },
    handlerBox: {
        width: "100%"
    },
    formFields: {
        width: "100%",
        paddingBottom: 20
    },
    inputFields: {
        paddingBottom: 15,
        width: "100%",
    },
    textcontainer: {
        paddingTop: 30,
        paddingBottom: 30
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000'
    },
    innertext: {
        fontSize: 16,
        color: '#999999'
    },
    button_2: {
        alignItems: 'center',
        paddingTop: 20
    },
    passwd: {
        fontSize: 14,
        color: '#FF6F1B'
    },
    inputFieldsLinks: {
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logInText: {
        marginBottom: 3,
    },
    logText: {
        fontSize: 16,
        paddingBottom: 20,
        color: thirdColorBlack,
    },
    btnLink: {
        //fontWeight: 500,
    },

});

export default ForgotPassword;
