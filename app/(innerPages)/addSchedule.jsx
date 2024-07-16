import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DocumentPicker from 'react-native-document-picker';
import { Image } from 'expo-image';
import RNPickerSelect from 'react-native-picker-select';
import { useToast } from 'react-native-toast-notifications';
import GlobalInputs from '../../component/GlobalComps/GlobalInputs';
import BtnGlobal from '../../component/GlobalComps/BtnGlobal';
import { uploadFileAPI, addEditSchedule } from '../../ApiCalls';
import { Link, usePathname, useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router';
import LoadingAnimation from '../../component/GlobalComps/loadingAnimation';
const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  class: Yup.string().required('Class is required'),
  file: Yup.mixed().required('A file is required'),
});

const AssignmentScheduleForm = () => {
  const params = useLocalSearchParams();
  const {
    assignment_id,
    class_id,
    class_name,
    classwise_subject_id,
    created_at,
    description,
    flag,
    image,
    section_id,
    section_name,
    status,
    subject_name,
    teacher_id,
    teacher_name,
    title
  } = params || {};
  const authToken = useSelector((state) => state.auth.authToken);
  const selectedClass = useSelector((state) => state.class.selectedClass);
  const userTeacherCred = useSelector((state) => state.userDetailsTeacher.user);
  const [uploadedFileDetails, setUploadedFileDetails] = useState(null);
  const [classes, setClasses] = useState(userTeacherCred?.teacherSections || []);
  const toast = useToast();
  const [fileError, setFileError] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleFilePicker = async (setFieldValue) => {
    setLoader(true)
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });

      if (!res) {
        setFileError(true)
        return;
      }
      setFileError(false)
      const formData = new FormData();
      formData.append('folder', 'assignment');
      formData.append('file', {
        uri: res[0].uri,
        type: res[0].type,
        name: res[0].name,
        filename: 'imageFile',
      });

      const uploadResponse = await uploadFileAPI(formData, authToken);

      if (uploadResponse.success) {
        setUploadedFileDetails({ uri: uploadResponse.body.fileURL, flag: uploadResponse.body.flag });
        setFieldValue('file', { uri: uploadResponse.body.fileURL, name: res[0].name });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        setFileError(true)
      } else {
        setFileError(true)
        console.error('Error picking file or uploading:', err);
      }
    }
    setLoader(false)
  };

  const handleSubmit = async (values, { resetForm }) => {
    setLoader(true)
    try {
      const assignmentData = {
        class_id: values.class,
        section_id: selectedClass?.section_id,
        title: values.title,
        file_upload: values.file.uri,
        flag: uploadedFileDetails?.flag,
      };
      if (assignment_id) {
        assignmentData.book_schedule_id = assignment_id;
      }
      const responseValue = await addEditSchedule(assignmentData, authToken);
      setUploadedFileDetails(null);
      resetForm();
      toast.show(responseValue?.message, { type: "success" })
    } catch (error) {
      console.error('Error uploading file or adding assignment:', error);
    }
    setLoader(false)
  };

  return (
    <ScrollView className='h-full bg-light p-5'>
      <View className='mb-20 relative'>
        {loader &&
        <View className='absolute z-[10] top-0 bottom-0 left-0 right-0 flex justify-center items-center h-screen w-full'>
          <LoadingAnimation />
          </View>
        }
          <Formik
            initialValues={{
              title: title || '',
              class: class_id ? class_id.toString() : '',
              file: image ? { uri: image, name: image.split('/').pop() } : null
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched, isSubmitting }) => (
              <View>
                <GlobalInputs
                  label="Title"
                  placeholder="Enter title"
                  value={values.title}
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  error={errors.title}
                  touched={touched.title}
                  mainClass={'mb-5'}
                  star={true}
                />

                <Text className='mb-1.5 capitalize text-sm font-bold text-body'>Class<Text className='text-error'>*</Text></Text>
                <View className='rounded-md capitalize bg-[#f4f4f4]'>
                  <RNPickerSelect
                    onValueChange={(value) => {
                      setFieldValue('class', value);
                    }}
                    placeholder={{ label: 'Select Class', value: null }}
                    items={classes.map((cls) => ({
                      label: `${cls.class_details.class_name} - ${cls.section_name}`,
                      value: cls.class_details.class_id,
                    }))}
                    // style={pickerSelectStyles}
                    value={values.class}
                  />
                </View>
                {errors.class && touched.class && <Text style={styles.errorText}>{errors.class}</Text>}
                <View className='mt-5'>
                  <Text className='text-body font-bold'>Select PDF/Image<Text className='text-error'>*</Text></Text>
                  <TouchableOpacity onPress={() => handleFilePicker(setFieldValue)}>
                    <View
                      className='mt-3 mb-5 flex justify-center items-center flex-col'
                      style={{
                        paddingLeft: 10,
                        height: 200,
                        marginBottom: 10,
                        borderWidth: 3,
                        borderStyle: 'dashed',
                        borderColor: '#999999',
                        borderTopColor: 'white',
                      }}
                    >
                      <Text className='text-body'>Drop your PDF/Image here, or <Text className='text-primary'>Browse</Text></Text>
                    </View>
                  </TouchableOpacity>
                  {!values.file && touched.file && errors.file && <Text style={styles.errorText}>A file is required</Text>}
                  {values.file && (
                    <View className='w-[90%]'
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        // marginBottom: 15,
                      }}>
                      <Image
                        source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/pdfImage.svg' }}
                        style={{ width: 45, height: 60 }}
                        contentFit="cover"
                      />
                      <View className='flex flex-col ml-5'>
                        <Text className=' text-body text-lg font-bold'>{values.file.name}</Text>
                      </View>
                    </View>
                  )}
                </View>
                <View className='mt-10'>
                  <BtnGlobal
                    styleClassName="button"
                    title="Save"
                    onPress={handleSubmit}
                    classNames={'w-full'}
                  />
                </View>
              </View>
            )}
          </Formik>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginTop: 10,
    paddingBottom: 0,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginTop: 10,
    paddingBottom: 0,
  },
});

export default AssignmentScheduleForm;
