import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AppIcon from '../../component/GlobalComps/AppIcon';
import { stylesGlobal } from '../../styles/global';
import ModalScreen from '../../component/GlobalComps/ModalScreen';

const dummyData = [
  { id: '1', question: 'What is Lorem Ipsum?', answer: 'Lorem ipsum is placeholder text' },
  { id: '2', question: 'How can I use React Native?', answer: 'To use React Native, you need to' },
  { id: '3', question: 'What are the key features of React Navigation?', answer: 'React Navigation provides' },
  { id: '4', question: 'Why use Redux with React?', answer: 'Redux helps manage the state' },
  { id: '5', question: 'What are React Hooks?', answer: 'React Hooks are functions that' },
  { id: '6', question: 'How do I style components in React Native?', answer: 'You can style components using' },
  { id: '7', question: 'What is the purpose of useEffect in React?', answer: 'useEffect is used for side effects in' },
  { id: '8', question: 'Can I use TypeScript with React Native?', answer: 'Yes, TypeScript is supported in React Native' },
  { id: '9', question: 'What is the purpose of AsyncStorage?', answer: 'AsyncStorage is used for' },
  { id: '10', question: 'How to handle navigation in React Native?', answer: 'You can use libraries like React Navigation for' },
];


export default function Support() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(dummyData);
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = (query) => {
    const filtered = dummyData.filter((item) =>
      item.question.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
    setSearchQuery(query);
  };

  const handleItemPress = (faq) => {
    setSelectedFAQ(faq);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderFAQItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)} className='flex justify-between flex-row items-center max-w-[95%] border-b border-b-lightergrey bg-light p-5 rounded-xl m-0' style={styles.faqItem}>
      <Text className='max-w-[85%]' style={styles.question}>{item.question}</Text>
      <AppIcon type='AntDesign' name='right' size={20} color={'#535353'} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container} className='bg-offwhite'>
      <View className='bg-light p-5'>
        <Text style={stylesGlobal.title}>How can we help</Text>
        <View className='relative my-5'>
          <TextInput
            style={stylesGlobal.primaryInput}
            placeholder="Type your query here"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <View className='absolute right-4 top-2.5'>
            <AppIcon type='AntDesign' name='search1' size={28} color={'#535353'} />
          </View>
        </View>
      </View>
      <ScrollView className='bg-lighergrey p-5 mb-10'>
        <Text style={stylesGlobal.title}>Need help check these options</Text>
        <TouchableOpacity className='flex justify-start flex-row mt-5 items-center max-w-[95%] border-b border-b-lightergrey bg-light p-5 rounded-xl m-0' style={styles.faqItem}>
          <View className='bg-[#000] rounded-full h-[44px] w-[44px] flex items-center justify-center mr-5'><AppIcon type='Ionicons' name='call' size={25} color={'#fff'} /></View>
          <View className='flex flex-col'>
            <Text className='' style={styles.question}>Call Us</Text>
            <Text className='' style={styles.answer}>Get in a call with us</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className='flex justify-start flex-row mt-5 items-center max-w-[95%] border-b border-b-lightergrey bg-light p-5 rounded-xl m-0' style={styles.faqItem}>
          <View className='bg-[#000] rounded-full h-[44px] w-[44px] flex items-center justify-center mr-5'><AppIcon type='Ionicons' name='mail' size={25} color={'#fff'} /></View>
          <View className='flex flex-col'>
            <Text className='' style={styles.question}>Email Us</Text>
            <Text className='' style={styles.answer}>Ask us anything</Text>
          </View>
        </TouchableOpacity>
        <Text style={stylesGlobal.title} className='my-5'>Frequently asked questions</Text>

        <View className='bg-light rounded-xl'>
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={renderFAQItem}
          />
        </View>
      </ScrollView>
      <ModalScreen isVisible={modalVisible} onClose={closeModal} outsideClick={false} modalWidth={'w-full'} otherClasses={` h-full rounded-none p-0`}>
        <View className="w-full h-full px-[20px] bg-light relative mt-16">
          <Text style={styles.modalHeading}>{selectedFAQ?.question}</Text>
          <Text style={styles.modalDescription}>{selectedFAQ?.answer}</Text>
        </View>
      </ModalScreen>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  faqItem: {
    marginBottom: 16,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  answer: {
    fontSize: 16,
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    padding: 16,
  },
  modalHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 18,
  },
  closeButton: {
    padding: 16,
    alignItems: 'flex-end',
  },
  closeButtonText: {
    fontSize: 16,
    color: 'blue',
  },
});
