import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView, Dimensions, Pressable } from 'react-native';
import { stylesGlobal } from "../../styles/global";
import { useToast } from 'react-native-toast-notifications';
import { assignmentDetails, deleteAssignment, getScheduleList } from "../../ApiCalls";
import { Link, useLocalSearchParams, useRouter, usePathname } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import BtnGlobal from '../../component/GlobalComps/BtnGlobal';
import ClassDropdown from '../../component/ClassDropdown';
import AppIcon from '../../component/GlobalComps/AppIcon';
import { Image } from 'expo-image';
import FixedFooter from '../../component/GlobalComps/FixedFooter';
import ModalScreen from '../../component/GlobalComps/ModalScreen';
import PDFreader from '../../component/GlobalComps/PDFreader'
import { SmallPopup } from '../../component/GlobalComps/SmallPopup';
import TeachAssignmentUI from '../../component/TeachAssignmentUI';
import EmptyScreen from '../../component/GlobalComps/EmptyScreen';
import dayjs from 'dayjs';
import TeachScheduleUI from '../../component/TeachScheduleUI';
const SchedukeTeacher = () => {
  const router = useRouter();
  const toast = useToast();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const authToken = useSelector((state) => state.auth.authToken)
  const userCred = useSelector((state) => state.userDetails.user);
  const [dataView, setDataView] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const selectedClass = useSelector((state) => state.class.selectedClass);
  const screenWidth = Dimensions.get('window').width - 40;
  const screenWidthFull = Dimensions.get('window').width;
  const [showPDF, setShowPDF] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showPDFPath, setShowPDFPath] = useState('');
  const [selectedID, setSelectedId] = useState('');
  const [showPDFName, setShowPDFName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const params = useLocalSearchParams();


  useEffect(() => {
    if(Object.keys(params).length > 0 && params.assignment_id){
      setSelectedId(params.assignment_id)
    }
  }, [params]);

  const clearData = () => {
    router.push('/scheduleTeacher');
    loginPostFunc()
  };

  const loginPostFunc = async () => {
    try {
      const response = await getScheduleList(authToken, selectedClass?.class_id, selectedClass?.section_id);
      if (response) {
        setDataView(response.body)
      } else {
        setDataView(null)
      }
    } catch (error) {
      setDataView(null)
    }
    setLoading(false)
    setData(null)
    setSelectedId('')
    setShowPDF(false)
    setShowImage(false)
    setShowPDFPath('')
    setShowPDFName('')
    setModalVisible(false)
  };

  useEffect(() => {
    if (authToken && selectedClass && Object.keys(selectedClass).length > 0) {
      loginPostFunc()
    }
  }, [authToken, selectedClass, pathname]);

  useEffect(() => {
    if (selectedID && selectedID !== '' && dataView) {
      const selectedAssignment = dataView.find(assignment => assignment.id === selectedID);
      setData(selectedAssignment);
    }
  }, [selectedID, dataView]);

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
                onPress={() => { setData(null); setSelectedId(''); clearData() }}
                classNames={'mr-5 mt-2'}
                iconName={'arrowleft'}
                iconType={'AntDesign'}
                iconSize={22}
                iconColor={'#2A2D32'}
              />
            </View>
            <Text style={{ backgroundColor: data.status === 'Active' ? '#10B981' : '#FE0A0A' }} className='text-light p-2 font-bold mb-2 rounded-lg w-[80px] text-center'>{data.status}</Text>
            <Text style={[stylesGlobal.title]} className='mt-4 mb-2 capitalize'>{data.title}</Text>
            <View className='flex flex-row items-center justify-between mt-2'>
              <View>
                <Text className='text-body'>Created at</Text>
                <View className='flex flex-row items-center'>
                  <AppIcon type='AntDesign' name='calendar' size={25} color='#999999' />
                  <Text className='text-lightgrey ml-2'>{dayjs(data.created_at).format('DD-MMM-YYYY')}</Text>
                </View>
              </View>
              <View>
                <Text className='text-body'>Due date</Text>
                <View className='flex flex-row items-center'>
                  <AppIcon type='AntDesign' name='calendar' size={25} color='#999999' />
                  <Text className='text-lightgrey ml-2'>{data.due_date ? dayjs(data.due_date).format('DD-MMM-YYYY') : 'N/A'}</Text>
                </View>
              </View>
            </View>
            <Text className='mt-4 text-lightgrey font-bold text-sm'>
              Uploaded Files
            </Text>
            <View className='flex flex-col justify-center items-center mt-5'>
              {data.file_upload && data.file_upload !== '' && data.flag !== 0 ? (
                <>
                  {data.flag === 2 &&
                    <View className='w-full'>
                       <TouchableOpacity className='w-full' onPress={() => { setShowPDFPath(data.file_upload); setShowImage(true) }}>
                        <Image
                          source={{ uri: data.file_upload }}
                          style={{ width: screenWidth, height: 170, borderRadius: 10 }}
                          contentFit="fill"
                        />
                      </TouchableOpacity>
                    </View>
                  }
                  {data.flag === 1 &&
                    <TeachScheduleUI schedule={data} index={'1'}/>
                    }
                </>
              ) : null}
            </View>
          </View>
          :
          <View className='p-5'>
            {dataView && dataView.length > 0 && dataView.filter(assignment => assignment.status === 'Active').length > 0 ? (
              <View >
                {dataView.filter(assignment => assignment.status === 'Active').map((assignment, index) => (
                  <TeachAssignmentUI assignment={assignment} index={index} pressFunction={()=> setSelectedId(assignment.id)}/>
                ))}
              </View>
            ) : (
              <EmptyScreen url={'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/emptyFolder.png'} text1='Looks like there is no Active Assignment' text2='Hold back teacher will upload this soon'/>
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


export default SchedukeTeacher;
