import React, { useState, useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from "react-native";
import Buttons from "../component/Buttons";
import InputeFields from "../component/InputeFields";
import Links from "../component/Links";
import WelcomeSchool from "../pageComponent/welcome/WelcomeSchool";
import Heading from "../component/Heading";
import SchoolIcon from "../component/GlobalComps/SchoolIcon";
import BtnGlobal from "../component/GlobalComps/BtnGlobal";
import Messages from "../component/Messages";
import { thirdColorBlack, fiveColorBlack } from "../component/stylesheet";
import { stylesGlobal } from "../styles/global";
import { useToast } from 'react-native-toast-notifications';
import { login, verifyLoginOtp } from "../ApiCalls";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from 'react-redux';
import { setAuthToken } from "../store/slices/authSlice";
import { saveAuthToken } from "../authStorage";
const Login = () => {
    const router = useRouter();
    const toast = useToast();
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({});
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [buttondisabled, setbuttondisabled] = useState(true);
    const [emailNum, setEmailNum] = useState("");
    const [errormsg, seterrormsg] = useState("");
    const [err, seterr] = useState(false);
    const [passwderr, setpasswderr] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        const formList = {
            email: email,
            password: password,
        };
        if (isNaN(formList.email) || formList.email == 0) {
            const validationErrors = validate(formList);
            if (Object.keys(validationErrors).length === 0) {
                loginPostFunc(email);
            } else {
                setErrors(validationErrors);
            }
        }
        else {
            const validationErrors = validatenumberfield(formList);
            var numm = '91' + email
            if (Object.keys(validationErrors).length === 0) {
                loginPostFunc(numm);
            } else {
                setErrors(validationErrors);
            }
        }
    };
    const validatenumberfield = (values) => {
        const errors = {};
        if (values.email.length < 10) {
            errors.email = "Valid Mobile Number is required!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 3) {
            errors.password = "Password must be more than 3 characters";
        }
        return errors;
    };
    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 3) {
            errors.password = "Password must be more than 3 characters";
        }
        return errors;
    };
    const loginPostFunc = async (valuee) => {
        try {
            const response = await login(valuee, password);
            if (response) {
                dispatch(setAuthToken(response?.body))
                saveAuthToken(JSON.stringify(response?.body))
                toast.show(response?.message, { type: "success" })
                router.push('/dashboard')
            } else {
                toast.show('An error occured, Please try again', { type: "danger" })
                setErrors({});
            }
        } catch (error) {
            toast.show('An error occured, Please try again', { type: "danger" })
        }
    };

    const chnageemail = (e) => {
        setErrors('');
        seterrormsg('')
        if (e.length == 0) {
            seterr(true)
            setbuttondisabled(true)
        }
        else {
            seterr(false)
            setbuttondisabled(false)
        }
        setemail(e)
    }

    const changepasswd = (e) => {
        setErrors('');
        seterrormsg('')
        if (e.length == 0) {
            setpasswderr(true)
            setbuttondisabled(true)
        }
        else {
            setpasswderr(false)
            setbuttondisabled(false)
        }
        setpassword(e)
    }

    return (
        <ScrollView className='bg-light h-full p-5'>
            <View>
                <BtnGlobal
                    styleClassName="closeBtn"
                    icon={true}
                    onPress={() => router.push('/validateOtp')}
                    classNames={'mb-5'}
                    iconName={'arrowleft'}
                    iconType={'AntDesign'}
                    iconSize={22}
                    iconColor={'#2A2D32'}
                />
                <SchoolIcon styleSize={60} />
                <View style={styles.formFields}>
                    <View style={styles.textcontainer}>
                        <Text style={styles.title}>Login to your account</Text>
                        <Text style={styles.innertext}>Welcome back please enter your details</Text>
                    </View>
                    <View style={styles.inputFields}>
                        <InputeFields
                            label={"Email/Username"}
                            placeholder={"Enter Email"}
                            value={email}
                            onChangeText={(e) => chnageemail(e)}
                            ifEmailNumber
                        />
                        {err && <Messages title="Email is Required" />}
                        {errors.email && !err && <Messages title={errors.email} />}
                    </View>

                    <View style={styles.inputFields}>
                        <InputeFields
                            label={"Password"}
                            placeholder={"Enter Password"}
                            value={password}
                            secureTextEntry
                            onChangeText={(e) => changepasswd(e)}
                            ifEye
                        />
                        {errormsg && (
                            <Messages title={errormsg} />
                        )}
                        {passwderr && <Messages title="Password is Required" />}
                        {errors.password && (password.length == 0) && <Messages title={errors.password} />}
                        <View style={styles.inputFieldsLinks}>
                            <Links
                                title={"Don’t remember your password?"}
                                onPress={() => router.push("/forgotPassword")}
                                style={styles.btnLink}
                            />
                        </View>
                    </View>
                    <BtnGlobal
                        styleClassName="button"
                        title="Login to account"
                        onPress={handleSubmit}
                        classNames={'w-full'}
                        isDisabled={buttondisabled}
                    />
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

export default Login;
