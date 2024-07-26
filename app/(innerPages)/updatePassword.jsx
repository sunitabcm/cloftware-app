import { View, Text, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import { stylesGlobal } from '../../styles/global';
import AppIcon from '../../component/GlobalComps/AppIcon';
import BtnGlobal from '../../component/GlobalComps/BtnGlobal';
import GlobalInputs from '../../component/GlobalComps/GlobalInputs';
import { changePassword } from '../../ApiCalls';
export default function UpdatePassword() {
  const authToken = useSelector((state) => state.auth.authToken);
  const userCred = useSelector((state) => state.userDetails.user);
  const toast = useToast();
  const passwordValidationSchema = yup.object().shape({
    oldPassword: yup.string().required('Old Password is required'),
    newPassword: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 special character, 1 numeric digit, and be at least 8 characters long'
      )
      .min(3, 'New Password must be at least 3 characters')
      .notOneOf([yup.ref('oldPassword')], 'New Password must be different from Old Password')
      .required('New Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const ResetPass = async (oldPass, newPass, confirmPass) => {
    try {
      const response = await changePassword(oldPass, newPass, authToken);
      if (response) {
        toast.show(response?.message, { type: "success" })
      } else {
        toast.show(response?.message, { type: "danger" })
      }
    } catch (error) {
      toast.show('Credentials didnt matched', { type: "danger" })
    }
    setButtonDisabled(true)
  };
  const handlePasswordSubmit = (values) => {
    setButtonDisabled(true)
    ResetPass(values.oldPassword, values.newPassword, values.confirmPassword)
  };

  const enableButton = () => {
    setButtonDisabled(false);
  };

  return (
    <ScrollView className='h-full bg-light p-5'>
      <Formik
        initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
        validationSchema={passwordValidationSchema}
        onSubmit={handlePasswordSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <GlobalInputs
              placeholder={`Old Password`}
              name="oldPassword"
              label="Old Password"
              onChangeText={handleChange('oldPassword')}
              onBlur={handleBlur('oldPassword')}
              value={values.oldPassword}
              secureTextEntry
              error={errors.oldPassword}
              touched={touched}
              styleChange={'mb-1'}
              mainClass={'mt-4'}
              enableButton={()=> values.oldPassword !== '' && values.confirmPassword !== '' && values.newPassword !== '' ? enableButton() : {}}
            />

            <GlobalInputs
              placeholder={`New Password`}
              name="newPassword"
              label="New Password"
              onChangeText={handleChange('newPassword')}
              onBlur={handleBlur('newPassword')}
              value={values.newPassword}
              secureTextEntry
              error={errors.newPassword}
              touched={touched}
              styleChange={'mb-1'}
              mainClass={'mt-4'}
              enableButton={()=> values.oldPassword !== '' && values.confirmPassword !== '' && values.newPassword !== '' ? enableButton() : {}}
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
              enableButton={()=> values.oldPassword !== '' && values.confirmPassword !== '' && values.newPassword !== '' ? enableButton() : {}}
            />

            <BtnGlobal
              styleClassName="button"
              title="Update Password"
              onPress={handleSubmit}
              classNames={'w-full mt-5'}
              isDisabled={buttonDisabled}
            />
          </View>
        )}
      </Formik>
    </ScrollView>
  )
}