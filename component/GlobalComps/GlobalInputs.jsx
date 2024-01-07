import React, { useState } from 'react';
import { View, TextInput, Text, Pressable, TouchableWithoutFeedback } from 'react-native';
import AppIcon from './AppIcon';
import { stylesGlobal } from '../../styles/global';
const GlobalInputs = ({ label, name, mainClass, placeholder, type = 'text', secureTextEntry, value, onChangeText, error, disabled, width = 'w-full', onBlur, keyboardType, blurOnSubmit = false, touched, styleChange, clickable = false ,onClick = {} }) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const inputStyles = `${width} ${disabled && !clickable ? 'opacity-50' : ''}`;

    return (
        <View className={`${width} ${mainClass}`}>
            {label && (
                <Text className='mb-1.5 capitalize text-sm font-bold text-body'>{label}</Text>
            )}
            <TouchableWithoutFeedback onPress={clickable === true ? onClick : () => {}}>
                <View className="relative">
                    <TextInput
                        className={`${inputStyles} ${styleChange} ${value?.length < 2 ? 'capitalize' : ''}`}
                        style={stylesGlobal.primaryInput}
                        placeholder={placeholder}
                        secureTextEntry={secureTextEntry && !isPasswordVisible}
                        keyboardType={type === 'number' ? 'numeric' : (keyboardType || 'default')}
                        value={value}
                        name={label ? label : ''}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={onChangeText}
                        editable={!disabled}
                        placeholderTextColor="#666"
                        onBlur={blurOnSubmit !== false ? onBlur : undefined}
                        blurOnSubmit={blurOnSubmit}
                    />
                    {secureTextEntry && (
                        <View className="absolute top-0 right-0 w-[40px] h-[45px] justify-center flex items-center">
                            <Pressable onPress={togglePasswordVisibility}>
                                <AppIcon type={'MaterialCommunityIcons'} name={isPasswordVisible ? 'eye' : 'eye-off'} size={20} color='#37374E' />
                            </Pressable>
                        </View>
                    )}
                </View>
            </TouchableWithoutFeedback>
            {touched && error && <Text className='capitalize text-sm text-error'>{error}</Text>}
        </View>
    );
};

export default GlobalInputs;


//import GlobalInputs from '../components/GlobalComps/GlobalInputs';
//    const [email, setEmail] = useState('');
// const [password, setPassword] = useState('');
// const [error, setError] = useState('');
// const [disabled, setDisabled] = useState(false);
{/* <GlobalInputs
label="Email"
placeholder="Enter your email"
value={email}
onChangeText={setEmail}
error={error}
disabled={disabled}
width='w-full'
/> */}