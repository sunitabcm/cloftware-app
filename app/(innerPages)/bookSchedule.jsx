import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useRouter } from 'expo-router';
import { useToast } from 'react-native-toast-notifications';
import { getBookScheduleList } from '../../ApiCalls';
import { Image } from 'expo-image';
import EmptyScreen from '../../component/GlobalComps/EmptyScreen';
import AppIcon from '../../component/GlobalComps/AppIcon';
import ModalScreen from '../../component/GlobalComps/ModalScreen';
import PDFreader from '../../component/GlobalComps/PDFreader';
export default function BookSchedule() {
  const authToken = useSelector((state) => state.auth.authToken)
  const userCred = useSelector((state) => state.userDetails.user);
  const [showCalender, setShowCalender] = useState(false);
  const toast = useToast();
  const [showPDF, setShowPDF] = useState(false);
  const [showPDFPath, setShowPDFPath] = useState('');
  const [showPDFName, setShowPDFName] = useState('');
  const [apiData, setApiData] = useState(null);

  const router = useRouter();
  useEffect(() => {
    if (userCred && Object.keys(userCred).length > 0) {
      setShowCalender(true)
      fetchData()
    } else {
      setShowCalender(false)
    }
  }, [userCred]);


  const fetchData = async () => {
    try {
      const response = await getBookScheduleList(authToken, userCred?.school_id, userCred?.class_id, userCred?.section_id);

      if (response) {
        // toast.show(response?.message, { type: "success" })
        setApiData(response)
      } else {
        // toast.show('An error occured, Please try again', { type: "danger" })
      }
    } catch (error) {
      // toast.show('An error occured, Please try again', { type: "danger" })
    }
  };

  return (
    <ScrollView className='h-full bg-light p-5'>
      <View>
        {showCalender && apiData && apiData.code === 200 && Object.values(apiData.body).length > 0 ? (
          Object.values(apiData.body).length > 0 && apiData.body.map((item) => (
            <View key={item.id} className='w-full flex flex-row items-center justify-between mb-4'>
              <TouchableOpacity className='w-[90%]' onPress={() => { setShowPDFName(item.title); setShowPDFPath(item.file_upload); setShowPDF(true) }} style={{
                flexDirection: 'row',
                alignItems: 'center',
                // marginBottom: 15,
              }}>
                <Image
                  source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/pdfImage.svg' }}
                  style={{ width: 45, height: 60 }}
                  contentFit="cover"
                />
                <Text className=' text-body ml-5 font-bold max-w-[85%]'>{item.title}</Text>
              </TouchableOpacity>
              <Link href={item.file_upload}><View className='w-[35px] h-[35px] rounded-full bg-[#10B98129] flex justify-center items-center'><AppIcon type='Feather' name='download-outline' size={18} color={'#10B981'} /></View></Link>
            </View>
          ))
        ) : (
          <EmptyScreen url={'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/emptyFolder.png'} text1='Looks like there is nothing yet!' text2='Hold back teacher will upload this soon'/>
        )}
      </View>
      <ModalScreen isVisible={showPDF} onClose={() => { setShowPDFName(''); setShowPDFPath(''); setShowPDF(false) }} outsideClick={false} modalWidth={'w-full'} otherClasses={` h-full rounded-none p-0`}>
        <PDFreader path={showPDFPath} Heading={showPDFName}/>
      </ModalScreen>
    </ScrollView>
  )
}
