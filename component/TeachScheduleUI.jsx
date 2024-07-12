import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { Image } from 'expo-image'
import AppIcon from './GlobalComps/AppIcon'
import { Link } from 'expo-router'
import PDFreader from './GlobalComps/PDFreader'
import ModalScreen from './GlobalComps/ModalScreen'

export default function TeachScheduleUI({ schedule, index }) {
    const [showPDF, setShowPDF] = useState(false);
    const [showPDFPath, setShowPDFPath] = useState('');
    const [showPDFName, setShowPDFName] = useState('');
    return (
        <>
            <View key={index} className='w-full flex flex-row items-center justify-between mb-4'>
                <TouchableOpacity onPress={() => { setShowPDFName(schedule.title); setShowPDFPath(schedule.file_upload); setShowPDF(true) }} className='w-[90%]'
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
                    <View key={index} className='flex flex-col ml-5'>
                        <Text className=' text-body text-lg font-bold w-[80%]'>{schedule.title}</Text>
                        <Text className=' text-body'>Uploaded on {new Date(schedule.created_at).toLocaleDateString()}</Text>
                    </View>
                </TouchableOpacity>
                <Link href={schedule.file_upload}><View className='w-[35px] h-[35px] rounded-full bg-[#10B98129] flex justify-center items-center'><AppIcon type='Feather' name='download-outline' size={18} color={'#10B981'} /></View></Link>
            </View>
            <ModalScreen isVisible={showPDF} onClose={() => { setShowPDFName(''); setShowPDFPath(''); setShowPDF(false) }} outsideClick={false} modalWidth={'w-full'} otherClasses={` h-full rounded-none p-0`}>
                <PDFreader path={showPDFPath} Heading={showPDFName} />
            </ModalScreen>
        </>
    )
}