import React, { useState, useEffect } from "react";
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
import CloftwareLogo from "../component/GlobalComps/CloftwareLogo";
import NonLoggedInBlur from "../component/GlobalComps/NonLoggedInBlur";
import { Formik } from 'formik';
import * as yup from 'yup';
import GlobalInputs from "../component/GlobalComps/GlobalInputs";
import { useLocalSearchParams } from 'expo-router';

const ForgotPassword = () => {
    const params = useLocalSearchParams();
    const passwordValidationSchema = yup.object().shape({
        Password: yup
            .string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 special character, 1 numeric digit, and be at least 8 characters long'
            )
            .required('New Password is required'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('Password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const router = useRouter();
    const authToken = useSelector((state) => state.auth.authToken)
    const userCred = useSelector((state) => state.userDetails.user);
    const [buttonDisabled, setButtonDisabled] = useState(true);

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
    const [ID, setID] = useState("");
    const [err, seterr] = useState(false);
    const [passwderr, setpasswderr] = useState(false);

    useEffect(() => {
        console.log(params)
      }, [params]);

    const enableButton = () => {
        setButtonDisabled(false);
    };

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
            const response = await forgotPassword(valuee, params.roleid);
            if (response.success === true) {
                toast.show(response?.message, { type: "success" });
                setShowEmailButton(false);
                setShowOtpButton(true);
                setEmailValid(true);
            } else {
                toast.show(response?.message, { type: "danger" });
                setEmailValid(false);
                seterr(true);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                toast.show(error.response.data.message, { type: "danger" });
            } else {
                toast.show('An error occurred, Please try again', { type: "danger" });
            }
        }
        setbuttondisabled(true);
    };


    const verifyForgotPassOtp = async (email, otp) => {

        try {
            const response = await verifyOtpPasswordReset(email, otp);
            if (response?.success === true) {
                setID(response?.body?.id)
                toast.show(response?.message, { type: "success" })
                setShowOtpButton(false);
                setButtondisabledOtp(true);
                setShowPasswordFields(true);
            } else {
                toast.show(response?.message, { type: "danger" })
            }
        } catch (error) {
            toast.show('Unable to validate', { type: "danger" })
        }
        setOtpValid(true);
    };

    const ResetPass = async (newPass, confirmPass) => {

        try {
            const response = await resetPassword(newPass, confirmPass, ID);

            if (response) {
                toast.show(response?.message, { type: "success" })
                router.replace('/login')
            } else {
                toast.show(response?.message, { type: "danger" });
            }
        } catch (error) {
            if (error.response && error.response.data) {
                toast.show(error.response.data.message, { type: "danger" });
            } else {
                toast.show('An error occurred, Please try again', { type: "danger" });
            }
        }
    }

    const handleEmailSubmit = () => {
        forgotPass(email);
    };

    const handleOtpSubmit = () => {
        setOtpValid(true);
        if (validateOtp(otp)) {
            verifyForgotPassOtp(email, otp);
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

    const handlePasswordSubmit = (values) => {
        setButtonDisabled(true)
        ResetPass(values.Password, values.confirmPassword)
    };

    return (
        <ScrollView className='bg-light h-full'>
            <View>
                <NonLoggedInBlur onPressBtn={() => router.push('/login')} />
                <View style={styles.formFields} className='p-5'>
                    <View style={styles.textcontainer}>
                        <Text style={styles.title}>Forgot Password?</Text>
                    </View>
                    <View style={styles.inputFields}>
                        <InputeFields
                            label={"Email/Username"}
                            placeholder={"Enter Email/Username"}
                            value={email}
                            disabled={!showEmailButton}
                            onChangeText={(e) => chnageemail(e)}
                        />
                        {err && <Messages title="Invalid Email/Username" />}
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
                                onChangeText={(e) => { setOtp(e); setOtpValid(false) }}
                                value={otp}
                                numeric={true}
                            />
                            <BtnGlobal
                                styleClassName="button"
                                title="Verify OTP"
                                onPress={handleOtpSubmit}
                                classNames={'w-full mt-5'}
                                isDisabled={otp?.length === 6 ? !otpValid ? false : true : true}
                            />
                        </>
                    )}

                    {showPasswordFields && (
                        <>
                            <Formik
                                initialValues={{ Password: '', confirmPassword: '' }}
                                validationSchema={passwordValidationSchema}
                                onSubmit={handlePasswordSubmit}
                            >
                                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                    <View>

                                        <GlobalInputs
                                            placeholder={`Password`}
                                            name="Password"
                                            label="Password"
                                            onChangeText={handleChange('Password')}
                                            onBlur={handleBlur('Password')}
                                            value={values.Password}
                                            secureTextEntry
                                            error={errors.Password}
                                            touched={touched}
                                            styleChange={'mb-1'}
                                            mainClass={'mt-4'}
                                            enableButton={enableButton}
                                        />

                                        <GlobalInputs
                                            placeholder={`Confirm Password`}
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            onChangeText={handleChange('confirmPassword')}
                                            onBlur={handleBlur('confirmPassword')}
                                            value={values.confirmPassword}
                                            secureTextEntry
                                            error={errors.confirmPassword}
                                            touched={touched}
                                            styleChange={'mb-1'}
                                            mainClass={'mt-4'}
                                            enableButton={enableButton}
                                        />

                                        <BtnGlobal
                                            styleClassName="button"
                                            title="Reset Password"
                                            onPress={handleSubmit}
                                            classNames={'w-full mt-5'}
                                            isDisabled={buttonDisabled}
                                        />
                                    </View>
                                )}
                            </Formik>
                        </>
                    )}

                </View>
            </View>
            <CloftwareLogo />
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
