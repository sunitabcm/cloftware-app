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
      .min(3, 'New Password must be at least 3 characters')
      .required('New Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const ResetPass = async (oldPass, newPass, confirmPass) => {
    try {
      const response = await changePassword(oldPass, newPass, authToken);
      if (response.status === 200 || response.status === 201) {
        toast.show(response?.message, { type: "success" })
      } else {
        toast.show(response?.message, { type: "danger" })
      }
    } catch (error) {
      toast.show('Credentials didnt matched', { type: "danger" })
    }
  };
  const handlePasswordSubmit = (values) => {
    ResetPass(values.oldPassword, values.newPassword, values.confirmPassword)
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
              styleChange={'mb-3'}
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
              styleChange={'mb-3'}
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
              styleChange={'mb-3'}
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