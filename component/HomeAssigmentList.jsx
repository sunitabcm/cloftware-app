// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, TouchableOpacity, ScrollView, Dimensions, ImageBackground, FlatList } from 'react-native';
// import dayjs from 'dayjs';
// import AppIcon from './GlobalComps/AppIcon';
// import { Image } from 'expo-image';
// import AttachedUibox from './GlobalComps/AttachedUibox';
// import BtnGlobal from './GlobalComps/BtnGlobal';
// import { stylesGlobal } from '../styles/global';
// import ModalScreen from './GlobalComps/ModalScreen';
// import PDFreader from './GlobalComps/PDFreader';
// import EmptyScreen from './GlobalComps/EmptyScreen';
// import { Link } from 'expo-router';
// import CalendarStrip from 'react-native-calendar-strip';

// const HorizontalDateScroll = ({ selectedDate, onDateSelect }) => {
//   const startDate = dayjs(selectedDate).startOf('month').format('YYYY-MM-DD');
//   const endDate = dayjs(selectedDate).endOf('month').format('YYYY-MM-DD');
  
//   const onDateSelected = (date) => {
//     const formattedDate = dayjs(date).format('YYYY-MM-DD');
//     onDateSelect(formattedDate);
//   };

//   return (
//     <CalendarStrip
//     selectedDate={selectedDate}
//     onDateSelected={onDateSelected}
//     style={{ height: 50 }}
//     calendarColor={'white'}
//     calendarHeaderStyle={{ color: 'black' }}
//     dateNumberStyle={{ color: 'black' }}
//     dateNameStyle={{ color: 'black' }}
//     highlightDateNumberStyle={{ color: '#ffffff' }}
//     highlightDateNameStyle={{ color: '#ffffff' }}
//     disabledDateNameStyle={{ color: 'grey' }}
//     disabledDateNumberStyle={{ color: 'grey' }}
//     showMonth={false}
//     showYear={false}
//     minDate={startDate}
//     maxDate={endDate}
//     daySelectionAnimation={{ type: 'background', highlightColor: '#2A2D32', duration: 200, borderWidth: 1, borderHighlightColor: '#2A2D32' }}
//     scrollable={true}
//   />

//   );
// };

// const HorizontalDateScrolll = ({ selectedDate, onDateSelect }) => {
//   const scrollViewRef = useRef(null);
//   const startDate = dayjs(selectedDate).startOf('month');
//   const endDate = dayjs(selectedDate).endOf('month');

//   const renderDates = () => {
//     const dates = [];
//     let currentDate = startDate;
//     while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
//       dates.push(currentDate);
//       currentDate = currentDate.add(1, 'day');
//     }

//     return dates.map((date) => (
//       <TouchableOpacity
//         key={date.format('YYYY-MM-DD')}
//         onPress={() => onDateSelect(date.format('YYYY-MM-DD'))}
//         style={{
//           marginRight: 10,
//           paddingVertical: 8,
//           paddingHorizontal: 12,
//           borderRadius: 8,
//           backgroundColor: date.format('YYYY-MM-DD') === selectedDate ? '#2A2D32' : '#fff',
//         }}
//       >
//         <Text className='text-light text-center text-xs' style={{ color: date.format('YYYY-MM-DD') === selectedDate ? '#fff' : '#2A2D32' }}>{date.format('ddd')}</Text>
//         <Text className='text-light text-center font-bold text-2xl' style={{ color: date.format('YYYY-MM-DD') === selectedDate ? '#fff' : '#2A2D32' }}>{date.format('DD')}</Text>
//       </TouchableOpacity>
//     ));
//   };

//   return (
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       ref={scrollViewRef}
//     >
//       {renderDates()}
//     </ScrollView>
//   );
// };

// const HomeAssigmentList = ({ data, fetchData }) => {
//   const [selectedDate, setSelectedDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedHoliday, setSelectedHoliday] = useState(null);
//   const screenWidth = Dimensions.get('window').width - 40;
//   const screenWidthFull = Dimensions.get('window').width;
//   const [showPDF, setShowPDF] = useState(false);
//   const [showImage, setShowImage] = useState(false);
//   const [showPDFPath, setShowPDFPath] = useState('');
//   const [showPDFName, setShowPDFName] = useState('');
//   const [page, setPage] = useState(null);
//   const openModal = (holiday) => {
//     setSelectedHoliday(holiday);
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//   };

//   const onArrowPress = (increment) => {
//     const newDate = dayjs(selectedDate).add(increment, 'month').format('YYYY-MM-DD');
//     setSelectedDate(newDate);
//     fetchData(newDate);
//   };

//   const organizeDataByMonth = () => {
//     const organizedData = {};

//     data && data.forEach((holiday) => {
//       const month = new Date(holiday.date).toLocaleString('default', { month: 'long' });

//       if (!organizedData[month]) {
//         organizedData[month] = [];
//       }

//       organizedData[month].push(holiday);
//     });

//     return organizedData;
//   };

//   const renderHolidays = () => {
//     const organizedData = organizeDataByMonth();

//     return Object.keys(organizedData).map((month) => (
//       <View key={month} className='mb-4'>
//         {organizedData[month].map((item) => (
//           <AttachedUibox press={() => setPage(item)} key={item.title} item={item} noticeBoard={false} HomeAssigment={true} />
//         ))}
//       </View>
//     ));
//   };

//   return (
//     <>
//       {
//         !page ?
//           (
//             <View style={{ flex: 1 }} className='bg-light h-full'>
//               <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 40 }}>
//                 <TouchableOpacity onPress={() => onArrowPress(-1)}>
//                   <AppIcon type='AntDesign' name='caretleft' size={20} color='#A3A3A3' />
//                 </TouchableOpacity>
//                 <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{dayjs(selectedDate).format('MMMM YYYY')}</Text>
//                 <TouchableOpacity onPress={() => onArrowPress(1)}>
//                   <AppIcon type='AntDesign' name='caretright' size={20} color='#A3A3A3' />
//                 </TouchableOpacity>
//               </View>
//               <HorizontalDateScroll key={data} selectedDate={selectedDate} onDateSelect={(date) => { setSelectedDate(date); fetchData(date) }} />
//               <View className='bg-lightergrey p-5'>
//                 {data && Array.isArray(data) && data.length === 0 && <EmptyScreen height={false} />}
//                 {renderHolidays()}
//               </View>
//             </View>
//           )
//           :
//           (
//             <ScrollView className='p-5 bg-light h-full'>
//               <View className='flex flex-row items-center'>
//                 <BtnGlobal
//                   styleClassName="closeBtn"
//                   icon={true}
//                   onPress={() => setPage(null)}
//                   classNames={'mr-5 mt-2'}
//                   iconName={'arrowleft'}
//                   iconType={'AntDesign'}
//                   iconSize={22}
//                   iconColor={'#2A2D32'}
//                 />
//                 {/* <Image
//                   source={'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/speaker.svg}
//                   style={[{ width: 50, height: 50 }]}
//                   contentFit="cover"
//                 /> */}
//               </View>
//               <Text style={[stylesGlobal.title]} className='mt-4 mb-2 capitalize'>{page.title}</Text>
//               <Text style={[stylesGlobal.title]} className='mb-4 capitalize'>{page.subject_name}</Text>
//               <View className='flex flex-row pb-5 border-b border-lightergrey'>
//                 <AppIcon type='AntDesign' name='calendar' color='#999999' size={20} />
//                 <Text className='ml-4 text-lightgrey text-sm '>{dayjs(page.created_at).format('DD MMM, YYYY')}</Text>
//               </View>
//               <View className='flex flex-col justify-center items-center mt-5'>
//                 {page.image && page.image !== '' && page.flag !== 0 ? (
//                   <>
//                     {page.flag === 2 &&
//                       <View className='w-full'>
//                         <TouchableOpacity className='w-full' onPress={() => { setShowPDFPath(page.image); setShowImage(true) }}>
//                           <Image
//                             source={{ uri: page.image }}
//                             style={{ width: screenWidth, height: 170, borderRadius: 10 }}
//                             contentFit="fill"
//                           />
//                         </TouchableOpacity>
//                       </View>
//                     }
//                     {page.flag === 1 &&
//                       <TouchableOpacity onPress={() => { setShowPDFName(page.title); setShowPDFPath(page.image); setShowPDF(true) }}>
//                         <Image
//                           source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/pdfImage.svg' }}
//                           style={{ width: 45, height: 60 }}
//                           contentFit="cover"
//                         />
//                       </TouchableOpacity>}
//                   </>
//                 ) : null}
//               </View>
//               <Text className='mt-4 text-lightgrey text-sm'>
//                 {page.description}
//               </Text>
//             </ScrollView>
//           )
//       }
//       <ModalScreen isVisible={showPDF} onClose={() => { setShowPDFName(''); setShowPDFPath(''); setShowPDF(false) }} outsideClick={false} modalWidth={'w-full'} otherClasses={` h-screen rounded-none p-0`}>
//         <PDFreader path={showPDFPath} Heading={showPDFName} />
//       </ModalScreen>
//       <ModalScreen isVisible={showImage} onClose={() => { setShowPDFName(''); setShowPDFPath(''); setShowImage(false) }} outsideClick={false} modalWidth={'w-full'} otherClasses={` h-screen rounded-none p-0`}>
//         <Image
//           source={{ uri: showPDFPath }}
//           contentFit="contain"
//           style={{ width: screenWidthFull, flex: 1 }}
//         />
//         <Link href={showPDFPath} className='text-lg text-[#6bac98] font-bold text-center mt-5 mb-10'>Download <AppIcon type='MaterialCommunityIcons' name='tray-arrow-down' size={20} color='#6bac98' /></Link>
//       </ModalScreen>
//     </>
//   );
// };

// export default HomeAssigmentList;
