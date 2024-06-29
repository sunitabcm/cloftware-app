import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Button, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';
import { attendanceGetStudentList, markAttendance } from '../../ApiCalls';
import { useSelector, useDispatch } from 'react-redux';
import { stylesGlobal } from '../../styles/global';
import BtnGlobal from '../../component/GlobalComps/BtnGlobal';
import AppIcon from '../../component/GlobalComps/AppIcon';
import { useToast } from 'react-native-toast-notifications';

const MarkAttendance = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [selectedValue, setSelectedValue] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const authToken = useSelector((state) => state.auth.authToken)
  const userCred = useSelector((state) => state.userDetails.user);
  const selectedClass = useSelector((state) => state.class.selectedClass);
  const [selectAll, setSelectAll] = useState(false);
  const selectedCount = Object.values(attendance).filter(value => value).length;

  const fetchStudents = async () => {
    try {
      const response = await attendanceGetStudentList(authToken, selectedClass.class_id, selectedClass.section_id);
      if (response.body) {
        return response.body;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    const getStudents = async () => {
      const studentList = await fetchStudents();
      setStudents(studentList);
    };
    getStudents();
  }, []);

  const toggleSelectAll = () => {
    setAttendance({})
    const newAttendance = {};
    students.forEach(student => {
      newAttendance[student.stu_id] = !selectAll;
    });
    setAttendance(newAttendance);
    setSelectAll(!selectAll);
    setSelectedValue(false);
  };

  const toggleAttendance = (studentId) => {
    if(selectedValue === true){
      setAttendance({})
    }
    setAttendance((prevState) => ({
      ...prevState,
      [studentId]: !prevState[studentId],
    }));
    setSelectedValue(false);
  };

  const selectPorA = (status) => {
    const newAttendance = {};
    Object.keys(attendance).forEach((studentId) => {
      if (attendance[studentId]) {
        newAttendance[studentId] = status;
      }
    });
    setAttendance(newAttendance);
    setSelectedValue(true);
  };

  const submitAttendance = async () => {
    const attendanceArray = students.map(student => ({
      student_id: student.stu_id,
      year_id: student.scl_id,
      class_id: student.class_id,
      section_id: student.section_id,
      status: attendance[student.stu_id] || 'Absent',
    }));

    const formData = new FormData();
    formData.append('attendanceArray', JSON.stringify(attendanceArray));

    try {
      const response = await markAttendance(authToken, formData)
      toast.show(response?.message, { type: "success" })
    } catch (error) {
      console.error(error);
    }
    setSelectedValue(false)
    setAttendance({})
  };

  return (
    <ScrollView className='bg-light h-full'>
      <View className='p-5 min-h-[500px]'>
        <View className='flex flex-row justify-between items-center mb-5'>
          <Text style={stylesGlobal.title}>Student List</Text>
          <View className='flex flex-row items-center'>
            <TouchableOpacity onPress={() => toggleSelectAll()} ><Text className='text-body font-bold'>Select All</Text></TouchableOpacity>
          </View>
        </View>
        {selectedClass && (
          <View className='mb-5 text-body'>
            <Text className='text-lightgrey'>Class- {selectedClass.class_details.class_name} {selectedClass.section_name}</Text>
          </View>
        )}
        <FlatList
          data={students}
          keyExtractor={item => item.stu_id.toString()}
          renderItem={({ item }) => (
            <View className='border border-[#DFDFDF] flex flex-row justify-between mb-5 items-center rounded-lg p-4'>
              <View className='flex flex-row gap-x-3'>
                <Checkbox
                  value={attendance[item.stu_id] === true}
                  onValueChange={() => toggleAttendance(item.stu_id)}
                />
                <Text className='text-body font-bold capitalize'>{item.stu_first_name} {item.stu_last_name}</Text>
              </View>
              <View className='flex flex-row gap-x-3'>
                <TouchableOpacity className='rounded-[20px] bg-error p-2.5 w-[40px] h-[40px] flex justify-center items-center text-center' onPress={() => toggleAttendance(item.stu_id)}>
                  {attendance[item.stu_id] === 'Absent' ? <AppIcon type='AntDesign' name='check' size={20} color='#ffffff' /> : <Text className='text-light font-bold'>A</Text>}
                </TouchableOpacity>
                <TouchableOpacity className='rounded-[20px] bg-success p-2.5 w-[40px] h-[40px] flex justify-center items-center text-center' onPress={() => toggleAttendance(item.stu_id)}>
                {attendance[item.stu_id] === 'Present' ? <AppIcon type='AntDesign' name='check' size={20} color='#ffffff' /> : <Text className='text-light font-bold'>P</Text>}
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      <View className='border-t border-t-[#DFDFDF] p-5'>
        {selectedValue ?
          <BtnGlobal
            styleClassName="button"
            title="Submit Attendance"
            onPress={submitAttendance}
            classNames={'w-full'}
            bgColor='#FF6F1B'
          />
          :
          <View className='w-full flex flex-row items-center justify-between'>
            <BtnGlobal
              styleClassName="button"
              title={`Mark${selectedCount !== 0 ? ` ${selectedCount} ` : ' '}absent`}
              onPress={() => selectPorA('Absent')}
              classNames={'w-fit'}
              isDisabled={selectedCount === 0}
              bgColor='#FE0A0A'
            />
            <BtnGlobal
              styleClassName="button"
              title={`Mark${selectedCount !== 0 ? ` ${selectedCount} ` : ' '}present`}
              onPress={() => selectPorA('Present')}
              classNames={'w-fit'}
              isDisabled={selectedCount === 0}
              bgColor='#10B981'
            />
          </View>
        }
      </View>
    </ScrollView>
  );
};


export default MarkAttendance;