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

import GlobalInputs from '../../component/GlobalComps/GlobalInputs';
import BtnGlobal from '../../component/GlobalComps/BtnGlobal';
import { uploadFileAPI, addEditAssignmentAPI, getClassListAPI, getSubjectListAPI } from '../../ApiCalls';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  class: Yup.string().required('Class is required'),
  subject: Yup.string().required('Subject is required'),
  dueDate: Yup.date().required('Due date is required'),
  description: Yup.string().required('Description is required'),
  file: Yup.mixed().required('A file is required'),
});

const AssignmentForm = () => {
  const authToken = useSelector((state) => state.auth.authToken);
  const selectedClass = useSelector((state) => state.class.selectedClass);
  const userTeacherCred = useSelector((state) => state.userDetailsTeacher.user);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [leaveDate, setLeaveDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [classes, setClasses] = useState(userTeacherCred && userTeacherCred.teacherSections || []);
  const [subjects, setSubjects] = useState([]);
console.log(subjects)
  const fetchSubjects = async (classId, sectionId) => {
    try {
      const subjectList = await getSubjectListAPI(classId, sectionId, authToken);
      setSubjects(subjectList.body);
    } catch (error) {
      console.error('Error fetching subjects:', error);
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
    setLeaveDate(dayjs(date).format('YYYY-MM-DD'));
  };

  const handleFilePicker = async (setFieldValue) => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });

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
        setUploadedFiles([...uploadedFiles, uploadResponse.body.fileURL]);
        setFieldValue('file', { uri: uploadResponse.body.fileURL, name: res[0].name });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the file picker');
      } else {
        throw err;
      }
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const addAssignmentData = {
        class_id: values.class,
        section_id: selectedClass?.section_id,
        subject_id: values.subject,
        due_date: values.dueDate,
        title: values.title,
        description: values.description,
        image: values.file.uri,
      };

      await addEditAssignmentAPI(addAssignmentData, authToken);
      resetForm();
    } catch (error) {
      console.error('Error uploading file or adding assignment:', error);
    }
  };

  return (
    <ScrollView className='h-full bg-light p-5'>
      <View className='mb-20'>
        <Formik
          initialValues={{ title: '', class: '', subject: '', dueDate: '', description: '', file: null }}
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
              <RNPickerSelect
                onValueChange={(value) => {
                  handleChange('class');
                  fetchSubjects(value, selectedClass?.section_id);
                }}
                items={classes.map((cls) => ({
                  label: cls.class_details.class_name,
                  value: cls.class_details.class_id,
                }))}
                style={pickerSelectStyles}
                value={values.class}
              />
              {errors.class && touched.class && <Text style={styles.errorText}>{errors.class}</Text>}
              <Text className='mb-1.5 capitalize text-sm font-bold text-body'>Subject<Text className='text-error'>*</Text></Text>
              <RNPickerSelect
                onValueChange={handleChange('subject')}
                items={subjects.map((subj) => ({
                  label: subj.subject_name,
                  value: subj.classwise_id,
                }))}
                style={pickerSelectStyles}
                value={values.subject}
              />
              {errors.subject && touched.subject && <Text style={styles.errorText}>{errors.subject}</Text>}
              <Text className='mb-1.5 capitalize text-sm font-bold text-body'>Select Due Date<Text className='text-error'>*</Text></Text>
              <TouchableOpacity style={{ borderWidth: 0,
                  borderRadius: 8,
                  paddingHorizontal: 14,
                  paddingVertical: 12,
                  fontSize: 13,
                  backgroundColor: "#f4f4f4",
                  color: "#444",
                  marginBottom: 20 }} onPress={showDatePicker}>
                <Text>{dayjs(leaveDate).format('YYYY-MM-DD')}</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
              <Text className='mb-1.5 capitalize text-sm font-bold text-body'>Description<Text className='text-error'>*</Text></Text>
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
                    <Text className='text-body'>Drop your image/pdf here, or <Text className='text-primary'>Browse</Text></Text>
                  </View>
                </TouchableOpacity>
                {values.file && (
                  <Image
                    source={{ uri: values.file.uri }}
                    style={{ width: 100, height: 100, marginBottom: 10 }}
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
