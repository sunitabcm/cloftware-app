import React, { useState, useEffect } from 'react';
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
import { getProfileTeacher, imageUpload, updateTeacher, uploadFileAPI } from '../ApiCalls';
import { Image } from 'expo-image';
import ImagePicker from 'react-native-image-crop-picker';
import { SmallPopup } from './GlobalComps/SmallPopup';
const validationSchema = yup.object().shape({
    // email: yup.string().email('Invalid email format').required('Email is required'),
    // password: yup.string().required('Password is required'),
    // scl_id: yup.string().required('School ID is required'),
    // title: yup.string().required('Title is required'),
    // first_name: yup.string().required('First name is required'),
    // last_name: yup.string().required('Last name is required'),
    // dob: yup.date().required('Date of birth is required'),
    // gender: yup.string().required('Gender is required'),
    // nationality: yup.string().required('Nationality is required'),
    phone_number: yup.string().length(10, 'Phone number must be exactly 10 digits').required('Phone number is required'),
    // marital_status: yup.string().required('Marital status is required'),
    // languages_spoken: yup.string().required('Languages spoken is required'),
    // address_line1: yup.string().required('Address line 1 is required'),
    // state: yup.string().required('State is required'),
    // city: yup.string().required('City is required'),
    pin_code: yup.string().matches(/^[0-9]+$/, 'Pin code must be digits'),
    // country: yup.string(),
    // job_title: yup.string().required('Job title is required'),
    // employment_status: yup.string().required('Employment status is required'),
    // social_security_number: yup.string().required('Social security number is required'),
    // emergency_contact_name: yup.string().required('Emergency contact name is required'),
    // emergency_contact_relationship: yup.string().required('Emergency contact relationship is required'),
    // emergency_phone_number: yup.string().matches(/^[0-9]+$/, 'Phone number must be digits').required('Emergency phone number is required'),
    // spouse_name: yup.string().required('Spouse name is required'),
    // dependents: yup.string().required('Dependents are required'),
    // educational_qualifications: yup.string().required('Educational qualifications are required'),
    // teaching_certifications: yup.string().required('Teaching certifications are required'),
    // previous_teaching_experience: yup.number().required('Previous teaching experience is required'),
    // address_line2: yup.string().required('Address line 2 is required'),
    // primary_teaching_location: yup.string().required('Primary teaching location is required'),
    // secondary_teaching_location: yup.string().required('Secondary teaching location is required'),
    // professional_development_courses: yup.string().required('Professional development courses are required'),
    // professional_development_certificates: yup.string().required('Professional development certificates are required'),
    // professional_development_goals: yup.string().required('Professional development goals are required'),
    // skills: yup.string().required('Skills are required'),
    // interests: yup.string().required('Interests are required'),
    // hobbies: yup.string().required('Hobbies are required'),
    // emp_id: yup.string(),
    // work_schedule: yup.string(),
    // job_description: yup.string().required('Job description is required'),
    // performance_evaluations: yup.string().required('Performance evaluations are required'),
    // disciplinary_actions: yup.string().required('Disciplinary actions are required'),
    // reason_for_termination: yup.string().required('Reason for termination is required'),
    // salary_amount: yup.string(),
    // pay_frequency: yup.string().required('Pay frequency is required'),
    // bank_name: yup.string().required('Bank name is required'),
    // account_number: yup.string().matches(/^[0-9]+$/, 'Account number must be digits').required('Account number is required'),
    // ifcs_code: yup.string().required('IFCS code is required'),
    // routing_number: yup.string().required('Routing number is required'),
    // tax_information: yup.string().required('Tax information is required'),
    // retirement_plan_information: yup.string().required('Retirement plan information is required'),
    // insurance_information: yup.string().required('Insurance information is required'),
    // background_check_results: yup.string().required('Background check results are required'),
    // drug_test_results: yup.string().required('Drug test results are required'),
    // driving_record: yup.string().required('Driving record is required'),
    // teacher_id: yup.string().required('Teacher ID is required'),
    // middle_name: yup.string(),
    // profile_image: yup.string().url('Invalid URL format').required('Profile image is required'),
});

const UserProfileFormTeach = ({ apiData, onSubmit, disabled, setDisabled }) => {
    const authToken = useSelector((state) => state.auth.authToken);
    const userCred = useSelector((state) => state.userDetails.user);
    const toast = useToast();
    const dispatch = useDispatch()
    const [isSubmitting, setIsSubmitting] = useState(true)
    const [randomNumber, setRandomNumber] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const userTeacherCred = useSelector((state) => state.userDetailsTeacher.user);

    const generateRandomNumber = () => {
        const newRandomNumber = Math.floor(Math.random() * 100) + 1;
        setRandomNumber(newRandomNumber);
    };

    useEffect(() => {
        generateRandomNumber();
    }, []);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const initialValues = {
        first_name: apiData?.first_name || '',
        middle_name: apiData?.middle_name || '',
        last_name: apiData?.last_name || '',
        phone_number: apiData?.phone_number || '',
        emergency_phone_number: apiData?.emergency_phone_number || '',
        emergency_contact_name: apiData?.emergency_contact_name || '',
        email: apiData?.email_id || '',
        password: '',  // Assuming password is not part of apiData
        scl_id: apiData?.scl_id || '',
        title: apiData?.title || '',
        dob: apiData?.dob || '',
        gender: apiData?.gender || '',
        nationality: apiData?.nationality || '',
        marital_status: apiData?.marital_status || '',
        languages_spoken: apiData?.languages_spoken || '',
        address_line1: apiData?.address_line1 || '',
        state: apiData?.state || '',
        city: apiData?.city || '',
        pin_code: apiData?.pin_code || '',
        country: apiData?.country || '',
        job_title: apiData?.teacher_other_details.job_title || '',
        date_hiring: apiData?.teacher_other_details.date_hiring || '',
        employment_status: apiData?.teacher_other_details.employment_status || '',
        social_security_number: apiData?.social_security_number || '',
        spouse_name: apiData?.spouse_name || '',
        dependents: apiData?.dependents || '',
        educational_qualifications: apiData?.educational_qualifications || '',
        teaching_certifications: apiData?.teaching_certifications || '',
        previous_teaching_experience: apiData?.previous_teaching_experience || '',
        address_line2: apiData?.address_line2 || '',
        primary_teaching_location: apiData?.primary_teaching_location || '',
        secondary_teaching_location: apiData?.secondary_teaching_location || '',
        professional_development_courses: apiData?.professional_development_courses || '',
        professional_development_certificates: apiData?.professional_development_certificates || '',
        professional_development_goals: apiData?.professional_development_goals || '',
        skills: apiData?.skills || '',
        interests: apiData?.interests || '',
        hobbies: apiData?.hobbies || '',
        emp_id: apiData?.teacher_other_details.emp_id || 0,
        work_schedule: apiData?.teacher_other_details.work_schedule || '',
        job_description: apiData?.teacher_other_details.job_description || '',
        performance_evaluations: apiData?.teacher_other_details.performance_evaluations || '',
        disciplinary_actions: apiData?.teacher_other_details.disciplinary_actions || '',
        reason_for_termination: apiData?.teacher_other_details.reason_for_termination || '',
        salary_amount: apiData?.teacher_other_details.salary_amount || '',
        pay_frequency: apiData?.teacher_other_details.pay_frequency || '',
        bank_name: apiData?.teacher_other_details.bank_name || '',
        account_number: apiData?.teacher_other_details.account_number || '',
        ifcs_code: apiData?.teacher_other_details.ifcs_code || '',
        routing_number: apiData?.teacher_other_details.routing_number || '',
        tax_information: apiData?.teacher_other_details.tax_information || '',
        retirement_plan_information: apiData?.teacher_other_details.retirement_plan_information || '',
        insurance_information: apiData?.teacher_other_details.insurance_information || '',
        background_check_results: apiData?.teacher_other_details.background_check_results || '',
        drug_test_results: apiData?.teacher_other_details.drug_test_results || '',
        driving_record: apiData?.teacher_other_details.driving_record || '',
        teacher_id: apiData?.teacher_id || '',
        // profile_image: apiData?.profile_image || ''
    };
    
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
            const formData = new FormData();
            formData.append('folder', 'assignment');
            formData.append('file', {
              uri: result.path,
              type: 'image/*',
              name: `choosenImage${randomNumber}.jpg`,
              filename: 'imageFile',
            });
            const resultImage = await uploadFileAPI(formData, authToken);

            if (resultImage) {
                const value = await updateTeacher(authToken, userTeacherCred, resultImage?.body.fileURL, apiData?.teacher_id, apiData?.scl_id);

                if (value) {
                    toast.show(resultImage?.message, { type: 'success' });
                    const data = await getProfileTeacher(dispatch, authToken);
                }
            } else {
                toast.show('Something went wrong ', { type: 'danger' });
            }
        } catch (err) {
            if (err.code !== 'E_PICKER_CANCELLED') {
                console.error(err);
            }
        }
        generateRandomNumber();
        closeModal()
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
                const resultImage = await imageUpload(cameraResult.path, `cameraPic${randomNumber}.jpg`, authToken, 'profile_images/teacher');

                if (resultImage) {
                    const value = await updateTeacher(authToken, userTeacherCred, resultImage?.body.fileURL, apiData?.teacher_id, apiData?.scl_id);

                    if (value) {
                        toast.show(resultImage?.message, { type: 'success' });
                        const data = await getProfileTeacher(dispatch, authToken);
                    }
                } else {
                    toast.show('Something went wrong ', { type: 'danger' });
                }
            }
        } catch (err) {
            console.error(err);
        }
        generateRandomNumber();
        closeModal()
    };

    const enableButton = () => {
        setDisabled(false);
    };

    return (
        <View className='relative w-full'>
            <View className='flex flex-row justify-between items-center'>
                <View className='flex flex-row items-start'>
                    <View className='relative h-[60px] w-[60px]'>
                        <AvatarIcon styleChange={'rounded-full'} styleSize={60} />
                        <Pressable onPress={() => openModal()} className='absolute bottom-0 right-0 bg-body rounded-full p-0.5'>
                            <AppIcon type='AntDesign' name='edit' size={20} color={'#fff'} />
                        </Pressable>
                    </View>
                    {userTeacherCred && Object.keys(userTeacherCred).length > 0 ?
                        <View className='flex flex-col items-start ml-4'>
                            <Text className='font-bold text-body'>{userTeacherCred.first_name} {userTeacherCred?.last_name}</Text>
                            <Text className='font-light text-body'>{userTeacherCred.class_name} {userTeacherCred.section_name}</Text>
                        </View>
                        :
                        <Text>Loading</Text>
                    }
                </View>
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
                                name="email"
                                label="Email ID"
                                value={values.email}
                                mainClass={'mt-5'}
                                disabled={true}
                            />

                            <GlobalInputs
                                placeholder="Date of Birth"
                                name="dob"
                                label="Date of Birth"
                                onChangeText={handleChange('dob')}
                                onBlur={handleBlur('dob')}
                                value={values.dob}
                                error={errors.dob}
                                touched={touched.dob}
                                mainClass="mt-5"
                                disabled={true}
                            />

                            <GlobalInputs
                                placeholder="Gender"
                                name="gender"
                                label="Gender"
                                onChangeText={handleChange('gender')}
                                onBlur={handleBlur('gender')}
                                value={values.gender}
                                error={errors.gender}
                                touched={touched.gender}
                                mainClass="mt-5"
                                disabled={true}
                            />

                            <GlobalInputs
                                placeholder="Nationality"
                                name="nationality"
                                label="Nationality"
                                onChangeText={handleChange('nationality')}
                                onBlur={handleBlur('nationality')}
                                value={values.nationality}
                                error={errors.nationality}
                                touched={touched.nationality}
                                mainClass="mt-5"
                                disabled={true}
                            />
                            <GlobalInputs
                                placeholder="Job Title"
                                name="job_title"
                                label="Job Title"
                                onChangeText={handleChange('job_title')}
                                onBlur={handleBlur('job_title')}
                                value={values.job_title}
                                error={errors.job_title}
                                touched={touched.job_title}
                                mainClass="mt-5"
                                enableButton={enableButton}
                                disabled={true}
                            />

                            <GlobalInputs
                                placeholder="Date of Hiring"
                                name="date_hiring"
                                label="Date of Hiring"
                                onChangeText={handleChange('date_hiring')}
                                onBlur={handleBlur('date_hiring')}
                                value={values.date_hiring}
                                error={errors.date_hiring}
                                touched={touched.date_hiring}
                                mainClass="mt-5"
                                enableButton={enableButton}
                                disabled={true}
                            />

                            <GlobalInputs
                                placeholder="Employment Status"
                                name="employment_status"
                                label="Employment Status"
                                onChangeText={handleChange('employment_status')}
                                onBlur={handleBlur('employment_status')}
                                value={values.employment_status}
                                error={errors.employment_status}
                                touched={touched.employment_status}
                                mainClass="mt-5"
                                enableButton={enableButton}
                                disabled={true}
                            />

                            <GlobalInputs
                                placeholder="Phone Number"
                                name="phone_number"
                                label="Phone Number"
                                onChangeText={handleChange('phone_number')}
                                onBlur={handleBlur('phone_number')}
                                value={values.phone_number}
                                error={errors.phone_number}
                                touched={touched.phone_number}
                                mainClass="mt-5"
                                type='number'
                                keyboardType={'number'}
                                enableButton={enableButton}
                            />

                            <GlobalInputs
                                placeholder="Marital Status"
                                name="marital_status"
                                label="Marital Status"
                                onChangeText={handleChange('marital_status')}
                                onBlur={handleBlur('marital_status')}
                                value={values.marital_status}
                                error={errors.marital_status}
                                touched={touched.marital_status}
                                mainClass="mt-5"
                                enableButton={enableButton}
                            />

                            <GlobalInputs
                                placeholder="Languages Spoken"
                                name="languages_spoken"
                                label="Languages Spoken"
                                onChangeText={handleChange('languages_spoken')}
                                onBlur={handleBlur('languages_spoken')}
                                value={values.languages_spoken}
                                error={errors.languages_spoken}
                                touched={touched.languages_spoken}
                                mainClass="mt-5"
                                enableButton={enableButton}
                            />

                            <GlobalInputs
                                placeholder="Address Line 1"
                                name="address_line1"
                                label="Address Line 1"
                                onChangeText={handleChange('address_line1')}
                                onBlur={handleBlur('address_line1')}
                                value={values.address_line1}
                                error={errors.address_line1}
                                touched={touched.address_line1}
                                mainClass="mt-5"
                                enableButton={enableButton}
                            />

                            <GlobalInputs
                                placeholder="State"
                                name="state"
                                label="State"
                                onChangeText={handleChange('state')}
                                onBlur={handleBlur('state')}
                                value={values.state}
                                error={errors.state}
                                touched={touched.state}
                                mainClass="mt-5"
                                enableButton={enableButton}
                            />

                            <GlobalInputs
                                placeholder="City"
                                name="city"
                                label="City"
                                onChangeText={handleChange('city')}
                                onBlur={handleBlur('city')}
                                value={values.city}
                                error={errors.city}
                                touched={touched.city}
                                mainClass="mt-5"
                                enableButton={enableButton}
                            />

                            <GlobalInputs
                                placeholder="Pin Code"
                                name="pin_code"
                                label="Pin Code"
                                onChangeText={handleChange('pin_code')}
                                onBlur={handleBlur('pin_code')}
                                value={values.pin_code}
                                error={errors.pin_code}
                                touched={touched.pin_code}
                                mainClass="mt-5"
                                type="number"
                                keyboardType="number-pad"
                                enableButton={enableButton}
                            />

                            <GlobalInputs
                                placeholder="Country"
                                name="country"
                                label="Country"
                                onChangeText={handleChange('country')}
                                onBlur={handleBlur('country')}
                                value={values.country}
                                error={errors.country}
                                touched={touched.country}
                                mainClass="mt-5"
                                enableButton={enableButton}
                            />

                            {/* <GlobalInputs
                                placeholder="Educational Qualifications"
                                name="educational_qualifications"
                                label="Educational Qualifications"
                                onChangeText={handleChange('educational_qualifications')}
                                onBlur={handleBlur('educational_qualifications')}
                                value={values.educational_qualifications}
                                error={errors.educational_qualifications}
                                touched={touched.educational_qualifications}
                                mainClass="mt-5"
                                enableButton={enableButton}
                            />

                            <GlobalInputs
                                placeholder="Teaching Certifications"
                                name="teaching_certifications"
                                label="Teaching Certifications"
                                onChangeText={handleChange('teaching_certifications')}
                                onBlur={handleBlur('teaching_certifications')}
                                value={values.teaching_certifications}
                                error={errors.teaching_certifications}
                                touched={touched.teaching_certifications}
                                mainClass="mt-5"
                                enableButton={enableButton}
                            />

                            <GlobalInputs
                                placeholder="Previous Teaching Experience"
                                name="previous_teaching_experience"
                                label="Previous Teaching Experience"
                                onChangeText={handleChange('previous_teaching_experience')}
                                onBlur={handleBlur('previous_teaching_experience')}
                                value={values.previous_teaching_experience}
                                error={errors.previous_teaching_experience}
                                touched={touched.previous_teaching_experience}
                                mainClass="mt-5"
                                enableButton={enableButton}
                            />

                            <GlobalInputs
                                placeholder="Address Line 2"
                                name="address_line2"
                                label="Address Line 2"
                                onChangeText={handleChange('address_line2')}
                                onBlur={handleBlur('address_line2')}
                                value={values.address_line2}
                                error={errors.address_line2}
                                touched={touched.address_line2}
                                mainClass="mt-5"
                                enableButton={enableButton}
                            />

                            <GlobalInputs
                                placeholder="Primary Teaching Location"
                                name="primary_teaching_location"
                                label="Primary Teaching Location"
                                onChangeText={handleChange('primary_teaching_location')}
                                onBlur={handleBlur('primary_teaching_location')}
                                value={values.primary_teaching_location}
                                error={errors.primary_teaching_location}
                                touched={touched.primary_teaching_location}
                                mainClass="mt-5"
                                enableButton={enableButton}
                            />

                            <GlobalInputs
                                placeholder="Secondary Teaching Location"
                                name="secondary_teaching_location"
                                label="Secondary Teaching Location"
                                onChangeText={handleChange('secondary_teaching_location')}
                                onBlur={handleBlur('secondary_teaching_location')}
                                value={values.secondary_teaching_location}
                                error={errors.secondary_teaching_location}
                                touched={touched.secondary_teaching_location}
                                mainClass="mt-5"
                                enableButton={enableButton}
                            />

                            <GlobalInputs
                                placeholder="Professional Development Courses"
                                name="professional_development_courses"
                                label="Professional Development Courses"
                                onChangeText={handleChange('professional_development_courses')}
                                onBlur={handleBlur('professional_development_courses')}
                                value={values.professional_development_courses}
                                error={errors.professional_development_courses}
                                touched={touched.professional_development_courses}
                                mainClass="mt-5"
                                enableButton={enableButton}
                            />

                            <GlobalInputs
                                placeholder="Professional Development Certificates"
                                name="professional_development_certificates"
                                label="Professional Development Certificates"
                                onChangeText={handleChange('professional_development_certificates')}
                                onBlur={handleBlur('professional_development_certificates')}
                                value={values.professional_development_certificates}
                                error={errors.professional_development_certificates}
                                touched={touched.professional_development_certificates}
                                mainClass="mt-5"
                                enableButton={enableButton}
                            />

                            <GlobalInputs
                                placeholder="Professional Development Goals"
                                name="professional_development_goals"
                                label="Professional Development Goals"
                                onChangeText={handleChange('professional_development_goals')}
                                onBlur={handleBlur('professional_development_goals')}
                                value={values.professional_development_goals}
                                error={errors.professional_development_goals}
                                touched={touched.professional_development_goals}
                                mainClass="mt-5"
                                enableButton={enableButton}
                            />

                            <GlobalInputs
                                placeholder="Skills"
                                name="skills"
                                label="Skills"
                                onChangeText={handleChange('skills')}
                                onBlur={handleBlur('skills')}
                                value={values.skills}
                                error={errors.skills}
                                touched={touched.skills}
                                mainClass="mt-5"
                                enableButton={enableButton}
                            />

                            <GlobalInputs
                                placeholder="Interests"
                                name="interests"
                                label="Interests"
                                onChangeText={handleChange('interests')}
                                onBlur={handleBlur('interests')}
                                value={values.interests}
                                error={errors.interests}
                                touched={touched.interests}
                                mainClass="mt-5"
                                enableButton={enableButton}
                            />

                            <GlobalInputs
                                placeholder="Hobbies"
                                name="hobbies"
                                label="Hobbies"
                                onChangeText={handleChange('hobbies')}
                                onBlur={handleBlur('hobbies')}
                                value={values.hobbies}
                                error={errors.hobbies}
                                touched={touched.hobbies}
                                mainClass="mt-5"
                                enableButton={enableButton}
                            /> */}

                            {/* <GlobalInputs
                                placeholder="Work Schedule"
                                name="work_schedule"
                                label="Work Schedule"
                                onChangeText={handleChange('work_schedule')}
                                onBlur={handleBlur('work_schedule')}
                                value={values.work_schedule}
                                error={errors.work_schedule}
                                touched={touched.work_schedule}
                                mainClass="mt-5"
                                enableButton={enableButton}
                            /> */}

                            {/* <GlobalInputs
                                placeholder="Job Description"
                                name="job_description"
                                label="Job Description"
                                onChangeText={handleChange('job_description')}
                                onBlur={handleBlur('job_description')}
                                value={values.job_description}
                                error={errors.job_description}
                                touched={touched.job_description}
                                mainClass="mt-5"
                                enableButton={enableButton}
                            />

                            <GlobalInputs
                                placeholder="Performance Evaluations"
                                name="performance_evaluations"
                                label="Performance Evaluations"
                                onChangeText={handleChange('performance_evaluations')}
                                onBlur={handleBlur('performance_evaluations')}
                                value={values.performance_evaluations}
                                error={errors.performance_evaluations}
                                touched={touched.performance_evaluations}
                                mainClass="mt-5"
                                enableButton={enableButton}
                            />

                            <GlobalInputs
                                placeholder="Salary Amount"
                                name="salary_amount"
                                label="Salary Amount"
                                onChangeText={handleChange('salary_amount')}
                                onBlur={handleBlur('salary_amount')}
                                value={values.salary_amount}
                                error={errors.salary_amount}
                                touched={touched.salary_amount}
                                mainClass="mt-5"
                                type="number"
                                keyboardType="number-pad"
                                enableButton={enableButton}
                            />

                            <GlobalInputs
                                placeholder="Pay Frequency"
                                name="pay_frequency"
                                label="Pay Frequency"
                                onChangeText={handleChange('pay_frequency')}
                                onBlur={handleBlur('pay_frequency')}
                                value={values.pay_frequency}
                                error={errors.pay_frequency}
                                touched={touched.pay_frequency}
                                mainClass="mt-5"
                                enableButton={enableButton}
                            />

                            <GlobalInputs
                                placeholder="Bank Name"
                                name="bank_name"
                                label="Bank Name"
                                onChangeText={handleChange('bank_name')}
                                onBlur={handleBlur('bank_name')}
                                value={values.bank_name}
                                error={errors.bank_name}
                                touched={touched.bank_name}
                                mainClass="mt-5"
                                enableButton={enableButton}
                            />

                            <GlobalInputs
                                placeholder="Account Number"
                                name="account_number"
                                label="Account Number"
                                onChangeText={handleChange('account_number')}
                                onBlur={handleBlur('account_number')}
                                value={values.account_number}
                                error={errors.account_number}
                                touched={touched.account_number}
                                mainClass="mt-5"
                                type="number"
                                keyboardType="number-pad"
                                enableButton={enableButton}
                            />

                            <GlobalInputs
                                placeholder="IFCS Code"
                                name="ifcs_code"
                                label="IFCS Code"
                                onChangeText={handleChange('ifcs_code')}
                                onBlur={handleBlur('ifcs_code')}
                                value={values.ifcs_code}
                                error={errors.ifcs_code}
                                touched={touched.ifcs_code}
                                mainClass="mt-5"
                                enableButton={enableButton}
                            />

                            <GlobalInputs
                                placeholder="Routing Number"
                                name="routing_number"
                                label="Routing Number"
                                onChangeText={handleChange('routing_number')}
                                onBlur={handleBlur('routing_number')}
                                value={values.routing_number}
                                error={errors.routing_number}
                                touched={touched.routing_number}
                                mainClass="mt-5"
                                type="number"
                                keyboardType="number-pad"
                                enableButton={enableButton}
                            />

                            <GlobalInputs
                                placeholder="Tax Information"
                                name="tax_information"
                                label="Tax Information"
                                onChangeText={handleChange('tax_information')}
                                onBlur={handleBlur('tax_information')}
                                value={values.tax_information}
                                error={errors.tax_information}
                                touched={touched.tax_information}
                                mainClass="mt-5"
                                enableButton={enableButton}
                            />

                            <GlobalInputs
                                placeholder="Retirement Plan Information"
                                name="retirement_plan_information"
                                label="Retirement Plan Information"
                                onChangeText={handleChange('retirement_plan_information')}
                                onBlur={handleBlur('retirement_plan_information')}
                                value={values.retirement_plan_information}
                                error={errors.retirement_plan_information}
                                touched={touched.retirement_plan_information}
                                mainClass="mt-5"
                                enableButton={enableButton}
                            /> */}

                            {/* <GlobalInputs
                                placeholder="Insurance Information"
                                name="insurance_information"
                                label="Insurance Information"
                                onChangeText={handleChange('insurance_information')}
                                onBlur={handleBlur('insurance_information')}
                                value={values.insurance_information}
                                error={errors.insurance_information}
                                touched={touched.insurance_information}
                                mainClass="mt-5"
                                enableButton={enableButton}
                            /> */}

                            {/* <GlobalInputs
                                placeholder="Background Check Results"
                                name="background_check_results"
                                label="Background Check Results"
                                onChangeText={handleChange('background_check_results')}
                                onBlur={handleBlur('background_check_results')}
                                value={values.background_check_results}
                                error={errors.background_check_results}
                                touched={touched.background_check_results}
                                mainClass="mt-5"
                                enableButton={enableButton}
                            /> */}

                            {/* <GlobalInputs
                                placeholder="Drug Test Results"
                                name="drug_test_results"
                                label="Drug Test Results"
                                onChangeText={handleChange('drug_test_results')}
                                onBlur={handleBlur('drug_test_results')}
                                value={values.drug_test_results}
                                error={errors.drug_test_results}
                                touched={touched.drug_test_results}
                                mainClass="mt-5"
                                enableButton={enableButton}
                            /> */}

                            {/* <GlobalInputs
                                placeholder="Driving Record"
                                name="driving_record"
                                label="Driving Record"
                                onChangeText={handleChange('driving_record')}
                                onBlur={handleBlur('driving_record')}
                                value={values.driving_record}
                                error={errors.driving_record}
                                touched={touched.driving_record}
                                mainClass="mt-5"
                                enableButton={enableButton}
                            /> */}

                            <BtnGlobal
                                styleClassName="button"
                                title="Update Profile"
                                onPress={handleSubmit}
                                classNames={'w-full mt-5'}
                                isDisabled={disabled}
                            />
                        </View>
                    )}
                </Formik>
            </View>
            <SmallPopup isVisible={modalVisible} closeModal={closeModal} customModalClass={'h-[20%]'}>
                <View className='flex flex-col gap-5 items-start'>
                    <Pressable onPress={handleOpenCamera} className='flex flex-row items-center'>
                        <AppIcon type='Entypo' name='camera' size={30} color={'#535353'} />
                        <Text className='text-body pl-5'>Capture Picture</Text>
                    </Pressable>
                    <Pressable onPress={handleFilePicker} className='flex flex-row items-center'>
                        <AppIcon type='Feather' name='image' size={30} color={'#535353'} />
                        <Text className='text-body pl-5'>Import from files</Text>
                    </Pressable>
                </View>
            </SmallPopup>
        </View>
    );
};

export default UserProfileFormTeach;
