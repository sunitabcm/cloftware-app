import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import { stylesGlobal } from "../../styles/global";
import { useToast } from 'react-native-toast-notifications';
import { Link, usePathname, useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import BtnGlobal from '../../component/GlobalComps/BtnGlobal';
import EmptyScreen from '../../component/GlobalComps/EmptyScreen';
import { setSelectedClass } from '../../store/slices/classSlice';
const Classes = () => {
  const router = useRouter();
  const toast = useToast();
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.auth.authToken)
  const userCred = useSelector((state) => state.userDetails.user);
  const userTeacherCred = useSelector((state) => state.userDetailsTeacher.user);
  const selectedClass = useSelector((state) => state.class.selectedClass);
  const redirect = async (section) => {
    await dispatch(setSelectedClass(section)); // Wait for dispatch to complete
    router.push('/board');
  }

  return (
    <ScrollView className='h-full bg-light p-5'>
      {userTeacherCred && Object.keys(userTeacherCred).length > 0 ?
        <View className='mb-10'>
          <Text style={stylesGlobal.title}>My Classroom</Text>
          {userTeacherCred.teacherSections && userTeacherCred.teacherSections.length > 0 ? (
            <>
              {userTeacherCred.teacherSections.filter(section => section.is_class_teacher).length > 0 && (
                <>
                  {userTeacherCred.teacherSections.filter(section => section.is_class_teacher).map((section, index) => (
                    <View key={index} className="bg-secondary rounded-xl p-6 w-full my-5">
                      {section.section_name && (
                        <Text style={[stylesGlobal.title, { color: '#ffffff' }]} className="mb-5 capitalize text-light">
                          Classroom {section.class_details.class_name}-{section.section_name}
                        </Text>
                      )}
                      <View className="flex flex-row items-center justify-between w-full">
                        <View className="flex flex-row items-center">
                          <BtnGlobal
                            styleClassName="button"
                            title="View Class"
                            onPress={() => redirect(section)}
                            classNames="w-full"
                            bgColor="#FFFFFF4D"
                          />
                        </View>
                      </View>
                    </View>
                  ))}
                </>
              )}

              <Text style={stylesGlobal.title} className='my-7'>Other Classroom</Text>

              {userTeacherCred.teacherSections.filter(section => !section.is_class_teacher).length > 0 && (
                <>
                  {userTeacherCred.teacherSections.filter(section => !section.is_class_teacher).map((section, index) => (
                    <View key={index} className={`bg-[#F5F5F7] ${section.class_id === selectedClass.class_id ? 'border-2 border-orange' : ''} rounded-xl p-4 w-full my-2.5 mb-5 flex flex-row items-center justify-between`}>
                      {section.section_name && (
                        <Text style={{ color: '#535353' }} className="mb-2 text-base capitalize text-light">
                          {section.class_details.class_name}-{section.section_name}
                        </Text>
                      )}
                      <View className="flex flex-row items-center">
                        <BtnGlobal
                          styleClassName="button"
                          title="View"
                          onPress={() => redirect(section)}
                          classNames="w-fit"
                          bgColor="#2A2D32"
                        />
                      </View>
                    </View>
                  ))}
                </>
              )}
            </>
          ) : (
            <View>
              <EmptyScreen imageType={true} />
            </View>
          )}

        </View>
        :
        <View>
          <EmptyScreen imageType={true} />
        </View>
      }
    </ScrollView>
  );
};

export default Classes;
