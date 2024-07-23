import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
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
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const dispatch = useDispatch();
  const toast = useToast();
  const authToken = useSelector((state) => state.auth.authToken);
  const selectedClass = useSelector((state) => state.class.selectedClass);

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

  useEffect(() => {
    setSelectedCount(Object.values(attendance).filter(status => status !== null).length);
  }, [attendance]);

  const toggleSelectAll = () => {
    const newAttendance = {};
    students.forEach(student => {
      if (student.attendance_status === 'pending') {
      newAttendance[student.stu_id] = selectAll ? null : 'Present';
      }
    });
    setAttendance(newAttendance);
    setSelectAll(!selectAll);
  };

  const toggleAttendance = (studentId) => {
    setAttendance((prevState) => ({
      ...prevState,
      [studentId]: prevState[studentId] ? null : 'Present',
    }));
  };

  const markAsAbsent = (studentId) => {
    setAttendance((prevState) => ({
      ...prevState,
      [studentId]: 'Absent',
    }));
  };

  const markAsPresent = (studentId) => {
    setAttendance((prevState) => ({
      ...prevState,
      [studentId]: 'Present',
    }));
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
      const response = await markAttendance(authToken, formData);
      toast.show(response?.message, { type: 'success' });
    } catch (error) {
      console.error(error);
    }
    setAttendance({});
    setSelectAll(false);
  };

  return (
    <ScrollView className="bg-light h-full">
      <View className="p-5 min-h-[500px]">
        <View className="flex flex-row justify-between items-center mb-5">
          <Text style={stylesGlobal.title}>Student List</Text>
          <View className="flex flex-row items-center">
            <TouchableOpacity onPress={toggleSelectAll} disabled={selectedClass && selectedClass.is_class_teacher === 0}>
              <Text className={`text-body font-bold ${selectedClass && selectedClass.is_class_teacher === 0 ? 'text-lightgrey' : ''}`}>Select All</Text>
            </TouchableOpacity>
          </View>
        </View>
        {selectedClass && (
          <View className="mb-5 text-body">
            <Text className="text-lightgrey">Class- {selectedClass.class_details.class_name} {selectedClass.section_name}</Text>
          </View>
        )}
        <FlatList
          data={students}
          keyExtractor={item => item.stu_id.toString()}
          renderItem={({ item }) => (
            <View className="border border-[#DFDFDF] flex flex-row justify-between mb-5 items-center rounded-lg p-4">
              <View className="flex flex-row gap-x-3">
                <Checkbox
                  value={attendance[item.stu_id] === 'Present' || attendance[item.stu_id] === 'Absent'}
                  onValueChange={() => toggleAttendance(item.stu_id)}
                  disabled={item.attendance_status !== "Pending"}
                />
                <Text className="text-body font-bold capitalize">{item.stu_first_name} {item.stu_last_name}</Text>
              </View>
              {item.attendance_status === "Pending" &&
                <View className="flex flex-row gap-x-3">
                  <TouchableOpacity
                    disabled={item.attendance_status !== "Pending"}
                    className="rounded-[20px] bg-error p-2.5 w-[40px] h-[40px] flex justify-center items-center text-center"
                    onPress={() => markAsAbsent(item.stu_id)}
                  >
                    {attendance[item.stu_id] === 'Absent' ? <AppIcon type="AntDesign" name="check" size={20} color="#ffffff" /> : <Text className="text-light font-bold">A</Text>}
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={item.attendance_status !== "Pending"}
                    className="rounded-[20px] bg-success p-2.5 w-[40px] h-[40px] flex justify-center items-center text-center"
                    onPress={() => markAsPresent(item.stu_id)}
                  >
                    {attendance[item.stu_id] === 'Present' ? <AppIcon type="AntDesign" name="check" size={20} color="#ffffff" /> : <Text className="text-light font-bold">P</Text>}
                  </TouchableOpacity>
                </View>
              }
              {item.attendance_status === "Absent" &&
                <View className="flex flex-row gap-x-3">
                  <View className="rounded-[20px] bg-error p-2.5 w-[40px] h-[40px] flex justify-center items-center text-center">
                    <Text className="text-light font-bold">A</Text>
                  </View>
                </View>
              }
              {item.attendance_status === "Present" &&
                <View className="flex flex-row gap-x-3">
                  <View className="rounded-[20px] bg-success p-2.5 w-[40px] h-[40px] flex justify-center items-center text-center">
                    <Text className="text-light font-bold">P</Text>
                  </View>
                </View>
              }
              {item.attendance_status === "Leave" &&
                <View className="flex flex-row gap-x-3">
                  <View className="rounded-[20px] bg-lightgrey p-2.5 w-[40px] h-[40px] flex justify-center items-center text-center">
                    <Text className="text-body font-bold">:</Text>
                  </View>
                </View>
              }
            </View>
          )}
        />
      </View>
      <View className="border-t border-t-[#DFDFDF] p-5">
        <BtnGlobal
          styleClassName="button"
          title="Submit Attendance"
          onPress={submitAttendance}
          classNames="w-full"
          bgColor="#FF6F1B"
          isDisabled={selectedCount === 0 || (selectedClass && selectedClass.is_class_teacher === 0)}
        />
      </View>
    </ScrollView>
  );
};

export default MarkAttendance;
