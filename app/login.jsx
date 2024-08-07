import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from "react-native";
import InputeFields from "../component/InputeFields";
import Links from "../component/Links";
import SchoolIcon from "../component/GlobalComps/SchoolIcon";
import BtnGlobal from "../component/GlobalComps/BtnGlobal";
import Messages from "../component/Messages";
import { thirdColorBlack, fiveColorBlack } from "../component/stylesheet";
import { useToast } from 'react-native-toast-notifications';
import { getStudentProfile, login } from "../ApiCalls";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from 'react-redux';
import { setAuthToken } from "../store/slices/authSlice";
import { saveAuthToken } from "../authStorage";
import CloftwareLogo from "../component/GlobalComps/CloftwareLogo";
import NonLoggedInBlur from "../component/GlobalComps/NonLoggedInBlur";
import RoleSelection from "../component/RoleSelection";
import LoadingAnimation from "../component/GlobalComps/loadingAnimation";
const Login = () => {
    const router = useRouter();
    const toast = useToast();
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({});
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [buttondisabled, setbuttondisabled] = useState(true);
    const [roleid, setRoleid] = useState(3);
    const [errormsg, seterrormsg] = useState("");
    const [err, seterr] = useState(false);
    const [loader, setLoader] = useState(false);
    const [passwderr, setpasswderr] = useState(false);
    const authToken = useSelector((state) => state.auth.authToken)
    const userCred = useSelector((state) => state.userDetails.user);

    const fetchData = async () => {
        try {
            const response = await getStudentProfile(dispatch, response.body)
            setTimeout(() => {
                router.replace("/dashboard");
            }, 1000);
        } catch (error) {
        }
    };

    useEffect(() => {
        if (authToken && userCred && Object.keys(userCred).length > 0) {
            router.replace("/dashboard");
        } else {
            if (authToken && userCred && Object.keys(userCred).length === 0) {
                fetchData(authToken)
            }
        }
    }, [router, authToken, userCred]);

    useEffect(() => {
        if (password.length !== 0 && email.length !== 0) {
            setbuttondisabled(false)
        } else {
            setbuttondisabled(true)
        }
    }, [buttondisabled, password, email, roleid]);

    const handleSubmit = (event) => {
        setbuttondisabled(true)
        event.preventDefault();
        const formList = {
            email: email,
            password: password,
        };
        // if (isNaN(formList.email) || formList.email == 0) {
        const validationErrors = validate(formList);
        if (Object.keys(validationErrors).length === 0) {
            loginPostFunc(email);
        } else {
            setErrors(validationErrors);
        }
        // }
        // else {
        //     const validationErrors = validatenumberfield(formList);
        //     var numm = '91' + email
        //     if (Object.keys(validationErrors).length === 0) {
        //         loginPostFunc(numm);
        //     } else {
        //         setErrors(validationErrors);
        //     }
        // }
    };
    // const validatenumberfield = (values) => {
    //     const errors = {};
    //     if (values.email.length < 10) {
    //         errors.email = "Valid Mobile Number is required!";
    //     }
    //     if (!values.password) {
    //         errors.password = "Password is required";
    //     } else if (values.password.length < 3) {
    //         errors.password = "Password must be more than 3 characters";
    //     }
    //     return errors;
    // };
    const validate = (values) => {
        const errors = {};
        if (!values.email) {
            errors.email = "Email/Username is required!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 3) {
            errors.password = "Password must be more than 3 characters";
        }
        return errors;
    };
    const loginPostFunc = async (valuee) => {
        setLoader(true)
        try {
            const response = await login(valuee, password, roleid);
            if (response.success === true) {
                dispatch(setAuthToken(response.body));
                saveAuthToken(response.body);
                await getStudentProfile(dispatch, response.body);
                toast.show(response.message, { type: "success" });
                router.replace('/dashboard');
                setLoader(false)
            } else {
                toast.show(response.message, { type: "danger" });
            }
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            toast.show(errorMessage, { type: "danger" });
        }
        // setbuttondisabled(false);
        setLoader(false)
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
        <ScrollView className='bg-light h-full'>
            {loader ?
                <LoadingAnimation />
                :
                <View className='pb-10'>
                    <NonLoggedInBlur hidden={false} />
                    <View style={styles.formFields} className='p-5 pt-0'>
                        <View style={styles.textcontainer}>
                            <Text style={styles.title}>Login to your account</Text>
                            {/* <Text style={styles.innertext}>Welcome back please enter your details</Text> */}
                        </View>
                        <View className='mb-4'>
                            <Text style={styles.mobile}>Select your role</Text>
                            <RoleSelection setRoleid={setRoleid} roleid={roleid} setbuttondisabled={setbuttondisabled} />
                        </View>
                        <View style={styles.inputFields}>
                            <InputeFields
                                label={"Email/Username"}
                                placeholder={"Enter Email/Username"}
                                value={email}
                                onChangeText={(e) => chnageemail(e)}
                            />
                            {err && <Messages title="Email/Username is Required" />}
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
                                    onPress={() => router.push({ pathname: "/forgotPassword", params: { roleid: roleid } })}
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
                    <CloftwareLogo />
                </View>
            }
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
        // paddingTop: 30,
        paddingBottom: 8
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
    mobile: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#2A2D32'
    },
});

export default Login;
