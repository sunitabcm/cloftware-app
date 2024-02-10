import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import GlobalInputs from './GlobalComps/GlobalInputs';
import BtnGlobal from './GlobalComps/BtnGlobal';
import AppIcon from './GlobalComps/AppIcon';
import AvatarIcon from './GlobalComps/AvatarIcon';
import { useDispatch, useSelector } from 'react-redux';
// import DocumentPicker from 'react-native-document-picker';
import { useToast } from 'react-native-toast-notifications';
import { getStudentProfile, imageUpload, updateProfile } from '../ApiCalls';
import { Image } from 'expo-image';
import ImagePicker from 'react-native-image-crop-picker';
const validationSchema = yup.object().shape({
    current_address: yup.string().required('Current Address is required'),
    phone_number: yup.string().required('Phone Number is required'),
    emg_contact_number: yup.string(),
    emg_contact_name: yup.string(),
    emg_email_id: yup.string().email('Invalid email'),
    emg_relationship_to_student: yup.string(),
});

const UserProfileForm = ({ apiData, onSubmit }) => {
    const authToken = useSelector((state) => state.auth.authToken);
    const userCred = useSelector((state) => state.userDetails.user);
    const toast = useToast();
    const dispatch = useDispatch()
    const [isSubmitting, setIsSubmitting] = useState(true)
    const initialValues = {
        year_title: apiData?.year_title,
        first_name: apiData?.first_name,
        last_name: apiData?.last_name,
        email_id: apiData?.email_id,
        phone_number: apiData?.phone_number,
        current_address: apiData?.student_details.stu_current_address,
        emg_contact_number: apiData?.student_details.emg_contact_number,
        emg_contact_name: apiData?.student_details.emg_contact_name,
        emg_email_id: apiData?.student_details.emg_email_id,
        emg_relationship_to_student: apiData?.student_details.emg_relationship_to_student,
    };
    // const handleFilePicker = async () => {
    //     try {
    //         const result = await DocumentPicker.pick({
    //             type: [DocumentPicker.types.images],
    //         });
    //         const resultImage = await imageUpload(result[0].uri, result[0].name, authToken)
    //         if (resultImage) {
    //             const value = await updateProfile(authToken, resultImage.fileURL, true)
    //             if (value) {
    //                 toast.show('Image Uploaded', { type: "success" })
    //                 const data = await getStudentProfile(dispatch, authToken)
    //             }
    //         } else {
    //             toast.show('Something went wrong ', { type: "success" })
    //         }
    //     } catch (err) {
    //         if (DocumentPicker.isCancel(err)) {
    //             // Handle document picker cancellation
    //         } else {
    //             console.error(err);
    //         }
    //     }
    // };

    const handleFilePicker = async () => {
        try {
            const result = await ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
                cropperToolbarTitle: 'Crop your image',
                cropperActiveWidgetColor: '#3498db',
                cropperStatusBarColor: '#3498db',
                cropperToolbarColor: '#3498db',
            });
            const resultImage = await imageUpload(result.path, 'choosenImage.jpg', authToken);

            if (resultImage) {
                const value = await updateProfile(authToken, resultImage.fileURL, true);

                if (value) {
                    toast.show('Image Uploaded', { type: 'success' });
                    const data = await getStudentProfile(dispatch, authToken);
                }
            } else {
                toast.show('Something went wrong ', { type: 'success' });
            }
        } catch (err) {
            if (err.code !== 'E_PICKER_CANCELLED') {
                console.error(err);
            }
        }
    };

    const handleOpenCamera = async () => {
        try {
            const cameraResult = await ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
                cropperToolbarTitle: 'Crop your image',
                cropperActiveWidgetColor: '#3498db',
                cropperStatusBarColor: '#3498db',
                cropperToolbarColor: '#3498db',
            });
            if (cameraResult) {
                const resultImage = await imageUpload(cameraResult.path, 'cameraPic.jpg', authToken);

                if (resultImage) {
                    const value = await updateProfile(authToken, resultImage.fileURL, true);

                    if (value) {
                        toast.show('Image Uploaded', { type: 'success' });
                        const data = await getStudentProfile(dispatch, authToken);
                    }
                } else {
                    toast.show('Something went wrong ', { type: 'success' });
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <View className='relative w-full'>
            <View className='flex flex-row justify-between items-center'>
                    <View className='flex flex-row items-start'>
                        <View className='relative h-[60px] w-[60px]'>
                            <AvatarIcon styleChange={'rounded-full'} styleSize={60} />
                            <Pressable onPress={handleFilePicker} className='absolute bottom-0 right-0 bg-body rounded-full p-0.5'>
                                <AppIcon type='AntDesign' name='edit' size={20} color={'#fff'} />
                            </Pressable>
                        </View>
                        {userCred && Object.keys(userCred).length > 0 ?
                            <View className='flex flex-col items-start ml-4'>
                                <Text className='font-bold text-body'>{userCred.first_name} {userCred?.last_name}</Text>
                                <Text className='font-light text-body'>{userCred.class_name}</Text>
                            </View>
                            :
                            <Text>Loading</Text>
                        }
                </View>
                <Pressable onPress={handleOpenCamera} className=''>
                        <AppIcon type='Entypo' name='camera' size={30} color={'#9747FF'} />
                    </Pressable>
                <Pressable onPress={() => setIsSubmitting((prev) => !prev)} className=''>
                    <AppIcon type='MaterialCommunityIcons' name='account-edit' size={30} color={'#FF6F1B'} />
                </Pressable>
            </View>
            <View className='mt-5 pb-10 mb-10'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                        setFieldValue,
                    }) => (
                        <View>
                            {/* <GlobalInputs
                            placeholder={`Year Title`}
                            name="year_title"
                            label="Year Title"
                            value={values.year_title}
                            mainClass={'mt-5'}
                            disabled={true}
                        /> */}

                            <GlobalInputs
                                placeholder={`First Name`}
                                name="first_name"
                                label="First Name"
                                value={values.first_name}
                                mainClass={'mt-5'}
                                disabled={true}
                            />

                            <GlobalInputs
                                placeholder={`Last Name`}
                                name="last_name"
                                label="Last Name"
                                value={values.last_name}
                                mainClass={'mt-5'}
                                disabled={true}
                            />

                            <GlobalInputs
                                placeholder={`Email ID`}
                                name="email_id"
                                label="Email ID"
                                value={values.email_id}
                                mainClass={'mt-5'}
                                disabled={true}
                            />

                            <GlobalInputs
                                placeholder={`Current Address`}
                                name="current_address"
                                label="Current Address"
                                onChangeText={handleChange('current_address')}
                                onBlur={handleBlur('current_address')}
                                value={values.current_address}
                                error={errors.current_address}
                                touched={touched}
                                mainClass={'mt-5'}
                                disabled={isSubmitting}
                            />

                            <GlobalInputs
                                placeholder={`Phone Number`}
                                name="phone_number"
                                label="Phone Number"
                                onChangeText={handleChange('phone_number')}
                                onBlur={handleBlur('phone_number')}
                                value={values.phone_number}
                                error={errors.phone_number}
                                touched={touched}
                                type='number'
                                keyboardType={'number'}
                                mainClass={'mt-5'}
                                disabled={isSubmitting}
                            />

                            <GlobalInputs
                                placeholder={`Emergency Contact Number`}
                                name="emg_contact_number"
                                label="Emergency Contact Number"
                                onChangeText={handleChange('emg_contact_number')}
                                onBlur={handleBlur('emg_contact_number')}
                                value={values.emg_contact_number}
                                error={errors.emg_contact_number}
                                touched={touched}
                                type='number'
                                keyboardType={'number'}
                                mainClass={'mt-5'}
                                disabled={isSubmitting}
                            />

                            <GlobalInputs
                                placeholder={`Emergency Contact Name`}
                                name="emg_contact_name"
                                label="Emergency Contact Name"
                                onChangeText={handleChange('emg_contact_name')}
                                onBlur={handleBlur('emg_contact_name')}
                                value={values.emg_contact_name}
                                error={errors.emg_contact_name}
                                touched={touched}
                                mainClass={'mt-5'}
                                disabled={isSubmitting}
                            />

                            <GlobalInputs
                                placeholder={`Emergency Email ID`}
                                name="emg_email_id"
                                label="Emergency Email ID"
                                onChangeText={handleChange('emg_email_id')}
                                onBlur={handleBlur('emg_email_id')}
                                value={values.emg_email_id}
                                error={errors.emg_email_id}
                                keyboardType={'email'}
                                touched={touched}
                                mainClass={'mt-5'}
                                disabled={isSubmitting}
                            />

                            <GlobalInputs
                                placeholder={`Relationship to Student`}
                                name="emg_relationship_to_student"
                                label="Relationship to Student"
                                onChangeText={handleChange('emg_relationship_to_student')}
                                onBlur={handleBlur('emg_relationship_to_student')}
                                value={values.emg_relationship_to_student}
                                error={errors.emg_relationship_to_student}
                                touched={touched}
                                mainClass={'mt-5'}
                                disabled={isSubmitting}
                            />

                            {!isSubmitting && <BtnGlobal
                                styleClassName="button"
                                title="Update Profile"
                                onPress={handleSubmit}
                                classNames={'w-full mt-5'}
                            />}
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    );
};

export default UserProfileForm;
