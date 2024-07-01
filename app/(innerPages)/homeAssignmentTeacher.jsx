import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView, Dimensions, Pressable } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import { stylesGlobal } from "../../styles/global";
import { useToast } from 'react-native-toast-notifications';
import { ClassViewData, addEditApplyLeave, assignmentDetails, deleteAssignment, getAssignmentList, getProfileData } from "../../ApiCalls";
import { Link, usePathname, useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import GlobalDatePicker from '../../component/GlobalComps/GlobalDatePicker';
import GlobalInputs from '../../component/GlobalComps/GlobalInputs';
import BtnGlobal from '../../component/GlobalComps/BtnGlobal';
import AttendanceBox from '../../component/AttendanceBar';
import ClassDropdown from '../../component/ClassDropdown';
import AppIcon from '../../component/GlobalComps/AppIcon';
import { Image } from 'expo-image';
import FixedFooter from '../../component/GlobalComps/FixedFooter';
import ModalScreen from '../../component/GlobalComps/ModalScreen';
import PDFreader from '../../component/GlobalComps/PDFreader'
import { SmallPopup } from '../../component/GlobalComps/SmallPopup';

const TeacherHomeAssignment = () => {
  const router = useRouter();
  const toast = useToast();
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.auth.authToken)
  const userCred = useSelector((state) => state.userDetails.user);
  const [dataView, setDataView] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useLocalSearchParams();
  const selectedClass = useSelector((state) => state.class.selectedClass);
  const screenWidth = Dimensions.get('window').width - 40;
  const screenWidthFull = Dimensions.get('window').width;
  const [showPDF, setShowPDF] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showPDFPath, setShowPDFPath] = useState('');
  const [selectedID, setSelectedId] = useState('');
  const [showPDFName, setShowPDFName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const loginPostFunc = async () => {
    try {
      const response = await getAssignmentList(authToken, selectedClass?.class_id, selectedClass?.section_id);
      if (response) {
        setDataView(response.body)
      } else {
        setDataView(null)
      }
    } catch (error) {
      setDataView(null)
    }
    setLoading(false)
  };

  useEffect(() => {
    if (authToken && selectedClass && Object.keys(selectedClass).length > 0) {
      loginPostFunc()
    }
  }, [authToken, selectedClass]);

  const getData = async (id) => {
    setSelectedId(id)
    try {
      const response = await assignmentDetails(authToken, id);
      if (response) {
        setData(response.body)
      } else {
        setData(null)
        setSelectedId('')
      }
    } catch (error) {
      setData(null)
      setSelectedId('')
    }
  };

  const deleteData = async (id) => {
    try {
      const response = await deleteAssignment(authToken, id);
      if (response) {
        setData(response.body)
      } else {

      }
    } catch (error) {

    }
    setData(null)
    setSelectedId('')
  };

  return (
    <>
      <ScrollView className='h-full bg-lightergrey'>
        <View className='bg-light p-5'>
          <ClassDropdown />
        </View>
        {data ?
          <View className='p-5 bg-light h-screen'>
            <View className='flex flex-row items-center mb-5 justify-between'>
              <BtnGlobal
                styleClassName="closeBtn"
                icon={true}
                onPress={() => {setData(null); setSelectedId('')}}
                classNames={'mr-5 mt-2'}
                iconName={'arrowleft'}
                iconType={'AntDesign'}
                iconSize={22}
                iconColor={'#2A2D32'}
              />
              <Pressable onPress={() => openModal()} className=''>
                <AppIcon type='Entypo' name='dots-three-vertical' size={20} color={'#2A2D32'} />
              </Pressable>
            </View>
            <Text style={{ backgroundColor: data.status === 'Active' ? '#10B981' : '#FE0A0A' }} className='text-light p-2 font-bold mb-2 rounded-lg w-[80px] text-center'>{data.status}</Text>
            <Text style={[stylesGlobal.title]} className='mt-4 mb-2 capitalize'>{data.title}</Text>
            <View className='flex flex-row items-center justify-between mt-2'>
              <View>
                <Text className='text-body'>Created at</Text>
                <View className='flex flex-row items-center'>
                  <AppIcon type='AntDesign' name='calendar' size={25} color='#999999' />
                  <Text className='text-lightgrey ml-2'>{new Date(data.created_at).toLocaleDateString()}</Text>
                </View>
              </View>
              <View>
                <Text className='text-body'>Due date</Text>
                <View className='flex flex-row items-center'>
                  <AppIcon type='AntDesign' name='calendar' size={25} color='#999999' />
                  <Text className='text-lightgrey ml-2'>{data.due_date ? new Date(data.due_date).toLocaleDateString() : 'N/A'}</Text>
                </View>
              </View>
            </View>
            <View className='flex flex-col border-b border-b-lightergrey pb-5'>
              <Text className='text-body'>Assigned by</Text>
              <Text className='text-body'>{data.teacher_name}</Text>
            </View>
            <Text className='mt-4 text-lightgrey text-sm'>
              {data.description}
            </Text>
            <Text className='mt-4 text-lightgrey font-bold text-sm'>
              Uploaded Files
            </Text>
            <View className='flex flex-col justify-center items-center mt-5'>
              {data.image && data.image !== '' && data.flag !== 0 ? (
                <>
                  {data.flag === 2 &&
                    <View className='w-full'>
                      <TouchableOpacity className='w-full' onPress={() => { setShowPDFPath(data.image); setShowImage(true) }}>
                        <Image
                          source={{ uri: data.image }}
                          style={{ width: screenWidth, height: 170, borderRadius: 10 }}
                          contentFit="fill"
                        />
                      </TouchableOpacity>
                    </View>
                  }
                  {data.flag === 1 &&
                    <TouchableOpacity onPress={() => { setShowPDFName(data.title); setShowPDFPath(data.image); setShowPDF(true) }}>
                      <Image
                        source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/pdfImage.svg' }}
                        style={{ width: 45, height: 60 }}
                        contentFit="cover"
                      />
                    </TouchableOpacity>}
                </>
              ) : null}
            </View>
          </View>
          :
          <View className='p-5'>
            {dataView && dataView.length > 0 ? (
              <View >
                {dataView.map((assignment, index) => (
                  <Pressable onPress={() => getData(assignment.assignment_id)} key={index} className='border border-lightergrey p-4 rounded-xl mb-4 bg-light'>
                    <Text style={{ backgroundColor: assignment.status === 'Active' ? '#10B981' : '#FE0A0A' }} className='text-light p-2 font-bold mb-2 rounded-lg w-[80px] text-center'>{assignment.status}</Text>
                    <Text style={stylesGlobal.title}>{assignment.title}</Text>
                    <Text className='text-lightgrey font-bold w-[90%] mt-2'>{assignment.description}</Text>
                    <View className='flex flex-row items-center justify-between mt-2'>
                      <View>
                        <Text className='text-body'>Created at</Text>
                        <View className='flex flex-row items-center'>
                          <AppIcon type='AntDesign' name='calendar' size={25} color='#999999' />
                          <Text className='text-lightgrey ml-2'>{new Date(assignment.created_at).toLocaleDateString()}</Text>
                        </View>
                      </View>
                      <View>
                        <Text className='text-body'>Due date</Text>
                        <View className='flex flex-row items-center'>
                          <AppIcon type='AntDesign' name='calendar' size={25} color='#999999' />
                          <Text className='text-lightgrey ml-2'>{assignment.due_date ? new Date(assignment.due_date).toLocaleDateString() : 'N/A'}</Text>
                        </View>
                      </View>
                    </View>
                    <View className='flex flex-col my-2'>
                      <Text className='text-body'>Assigned by</Text>
                      <Text className='text-body'>{assignment.teacher_name}</Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            ) : (
              <Text style={styles.noDataText}>No Assignments Available</Text>
            )}
          </View>
        }
      </ScrollView>
      <ModalScreen isVisible={showPDF} onClose={() => { setShowPDFName(''); setShowPDFPath(''); setShowPDF(false) }} outsideClick={false} modalWidth={'w-full'} otherClasses={` h-screen rounded-none p-0`}>
        <PDFreader path={showPDFPath} Heading={showPDFName} />
      </ModalScreen>
      <ModalScreen isVisible={showImage} onClose={() => { setShowPDFName(''); setShowPDFPath(''); setShowImage(false) }} outsideClick={false} modalWidth={'w-full'} otherClasses={` h-screen rounded-none p-0`}>
        <Image
          source={{ uri: showPDFPath }}
          contentFit="contain"
          style={{ width: screenWidthFull, flex: 1 }}
        />
        <Link href={showPDFPath} className='text-lg text-[#6bac98] font-bold text-center mt-5 mb-10'>Download <AppIcon type='MaterialCommunityIcons' name='tray-arrow-down' size={20} color='#6bac98' /></Link>
      </ModalScreen>
      <SmallPopup isVisible={modalVisible} closeModal={closeModal} customModalClass={'h-[20%]'}>
        <View className='flex flex-col gap-5 items-start'>
          <Pressable onPress={() => router.push({ pathname: "/addAssignment", params: { assignment_id: data.assignment_id, class_id: data.class_id, class_name: data.class_name, classwise_subject_id: data.classwise_subject_id, created_at: data.created_at, description: data.description, flag: data.flag, image: data.image, section_id: data.section_id, section_name: data.section_name, status: data.status, subject_name: data.subject_name, teacher_id: data.teacher_id, teacher_name: data.teacher_name, title: data.title } })} className='flex flex-row items-center'>
            <AppIcon type='Entypo' name='camera' size={30} color={'#535353'} />
            <Text className='text-body pl-5'>Edit Assignment</Text>
          </Pressable>
          <Pressable onPress={()=> deleteData(selectedID)} className='flex flex-row items-center'>
            <AppIcon type='Feather' name='image' size={30} color={'#535353'} />
            <Text className='text-body pl-5'>Delete Assignment</Text>
          </Pressable>
        </View>
      </SmallPopup>
      <FixedFooter />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    // marginBottom: 24,
    padding: 20
    // backgroundColor: '#EEEEEE'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    // marginBottom: 12,
  },
  item: {
    backgroundColor: '#F5F5F7',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    marginVertical: 8,
  },
  itemDate: {
    fontSize: 12,
    color: '#777',
  },
  assignedBy: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  noDataText: {
    fontSize: 16,
    color: '#777',
  },
});


export default TeacherHomeAssignment;
