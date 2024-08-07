import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DocumentPicker from 'react-native-document-picker';
import { Image } from 'expo-image';
import RNPickerSelect from 'react-native-picker-select';
import { useToast } from 'react-native-toast-notifications';
import GlobalInputs from '../../component/GlobalComps/GlobalInputs';
import BtnGlobal from '../../component/GlobalComps/BtnGlobal';
import { uploadFileAPI, addEditAssignmentAPI, getSubjectListAPI } from '../../ApiCalls';
import { useLocalSearchParams, useRouter } from 'expo-router';
import LoadingAnimation from '../../component/GlobalComps/loadingAnimation';
const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  class: Yup.string().required('Class is required'),
  subject: Yup.string().required('Subject is required'),
  dueDate: Yup.date()
    .required('Due date is required')
    .min(dayjs().startOf('day').toDate(), 'Due date cannot be in the past'),
  description: Yup.string().required('Description is required'),
  file: Yup.mixed().required('A file is required'),
});

const AssignmentForm = () => {
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
  const [dueDate, setDueDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [classes, setClasses] = useState(userTeacherCred?.teacherSections || []);
  const [subjects, setSubjects] = useState([]);
  const toast = useToast();
  const router = useRouter();
  const [fileError, setFileError] = useState(false);
  const [loader, setLoader] = useState(false);

  const fetchSubjects = async (classId, sectionId) => {
    if (classId && sectionId) {
      try {
        const subjectList = await getSubjectListAPI(classId, sectionId, authToken);
        if (subjectList && subjectList.body) {
          setSubjects(subjectList.body);
        } else {
          console.error('Invalid subject list response:', subjectList);
        }
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    setDueDate(formattedDate);
  };

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
        subject_id: values.subject,
        due_date: values.dueDate,
        title: values.title,
        description: values.description,
        image: values.file.uri,
        flag: uploadedFileDetails?.flag,
      };
      if (assignment_id) {
        assignmentData.assignment_id = assignment_id;
      }
      const responseapi = await addEditAssignmentAPI(assignmentData, authToken);
      setUploadedFileDetails(null);
      resetForm();
      toast.show(responseapi?.message, { type: "success" })
      // setTimeout(() => {
      //   router.push('/homeAssignmentTeacher')
      // }, 1000);
    } catch (error) {
      console.error('Error uploading file or adding assignment:', error);
    }
    setLoader(false)
  };

  useEffect(() => {
    if (class_id && section_id) {
      fetchSubjects(class_id, section_id)
    }
  }, [class_id, section_id]);

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
            subject: classwise_subject_id ? classwise_subject_id.toString() : '',
            dueDate: created_at || dayjs(new Date()).format('YYYY-MM-DD'),
            description: description || '',
            file: image ? { uri: image, name: image.split('/').pop() } : null
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
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
                    const selectedClass = classes.find(cls => cls.class_details.class_id === value);
                    const sectionId = selectedClass ? selectedClass.section_id : null;
                    if (sectionId) {
                      fetchSubjects(value, sectionId);
                    } else {
                      setSubjects([]);
                    }
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

              {subjects && subjects.length > 0 &&
                <>
                  <Text className='mb-1.5 capitalize text-sm font-bold text-body mt-5'>Subject<Text className='text-error'>*</Text></Text>
                  <View className='rounded-md capitalize bg-[#f4f4f4]'>

                    <RNPickerSelect
                      onValueChange={(value) => setFieldValue('subject', value)}
                      placeholder={{ label: 'Select Subject', value: null }}
                      items={subjects.map((subj) => ({
                        label: subj.subject_name,
                        value: subj.classwise_id,
                      }))}
                      // style={pickerSelectStyles}
                      value={values.subject}
                    />
                  </View>
                  {errors.subject && touched.subject && <Text style={styles.errorText}>{errors.subject}</Text>}
                </>
              }
              <Text className='mb-1.5 capitalize text-sm font-bold text-body mt-5'>Select Due Date<Text className='text-error'>*</Text></Text>
              <TouchableOpacity style={{
                borderWidth: 0,
                borderRadius: 8,
                paddingHorizontal: 14,
                paddingVertical: 12,
                fontSize: 13,
                backgroundColor: "#f4f4f4",
                color: "#444",
                // marginBottom: 20
              }} onPress={showDatePicker}>
                <Text>{dayjs(dueDate).format('DD-MMM-YYYY')}</Text>
              </TouchableOpacity>
              {errors.dueDate && touched.dueDate && <Text style={styles.errorText}>{errors.dueDate}</Text>}
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={(date) => {
                  handleConfirm(date);
                  setFieldValue('dueDate', dayjs(date).format('YYYY-MM-DD'));
                }}
                onCancel={hideDatePicker}
              />
              <Text className='mb-1.5 capitalize text-sm font-bold text-body mt-3'>Description<Text className='text-error'>*</Text></Text>
              <TextInput
                multiline
                numberOfLines={4}
                value={values.description}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                style={{
                  borderWidth: 0,
                  borderRadius: 8,
                  paddingHorizontal: 14,
                  paddingVertical: 12,
                  fontSize: 13,
                  backgroundColor: "#f4f4f4",
                  color: "#444",
                  textAlignVertical: 'top',
                }}
                className='mb-5'
              />
              {errors.description && touched.description && <Text style={styles.errorText}>{errors.description}</Text>}
              <View>
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
                {!values.file && touched.file && errors.file && <Text style={styles.errorText}>{errors.file}</Text>}
                {values.file && (
                  uploadedFileDetails && uploadedFileDetails?.flag === 1 ?
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
                    :
                    <Image
                      source={{ uri: values.file.uri }}
                      style={{ width: 60, height: 60, marginBottom: 10 }}
                    />
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
    marginBottom: 10,
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
    marginBottom: 10,
  },
});

export default AssignmentForm;
