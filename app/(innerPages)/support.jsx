import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, ScrollView, TouchableOpacity, Linking, Button, Alert } from 'react-native';
import AppIcon from '../../component/GlobalComps/AppIcon';
import { stylesGlobal } from '../../styles/global';
import ModalScreen from '../../component/GlobalComps/ModalScreen';
import BtnGlobal from '../../component/GlobalComps/BtnGlobal';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import { RaiseIssue } from '../../ApiCalls';
import { getSupport } from '../../ApiCalls';

export default function Support() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(null);
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, openForm] = useState(false);
  const [text, setText] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const userCred = useSelector((state) => state.userDetails.user);
  const authToken = useSelector((state) => state.auth.authToken);
  const toast = useToast();

  const handleTextChange = (inputText) => {
    setText(inputText);
    setIsButtonDisabled(inputText.trim().length === 0);
  };

  useEffect(() => {
    if (authToken) {
      fetchData()
    }
  }, [authToken]);


  const fetchData = async () => {
    try {
      const response = await getSupport(authToken);
      if (response) {
        setFilteredData(response?.body)
      } else {
      }
    } catch (error) {
    }
  };

  const handleSubmit = async () => {
    if (text.trim().length === 0) {
      toast.show('Add issue to proceed', { type: "danger" })
    } else {
      try {
        const response = await RaiseIssue(authToken, text, userCred?.school_id, userCred?.phone_number, userCred?.last_name, userCred?.first_name, userCred?.email_id);
        if (response) {
          toast.show(response?.message, { type: "success" })
          setText('')
          openForm(false)
        }
      } catch (error) {
        toast.show('Some error occured while sending the request', { type: "danger" })
      }
    }
    setIsButtonDisabled(true)
  };

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
    setIsButtonDisabled(true)
  };

  const renderFAQItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)} className='flex justify-between flex-row items-center max-w-[95%] border-b border-b-lightergrey bg-light p-5 rounded-xl m-0' style={styles.faqItem}>
      <Text className='max-w-[85%]' style={styles.question}>{item.question}</Text>
      <AppIcon type='AntDesign' name='rightcircle' size={30} color={'#FF6F1B'} />
    </TouchableOpacity>
  );

  const openWhatsAppChat = () => {
    const phoneNumber = '+918287140514';
    const whatsappLink = `https://wa.me/${phoneNumber}`;
    Linking.openURL(whatsappLink);
  };

  const OpenModalEmail = () => {
    openForm(!form)
  };

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
            <AppIcon type='AntDesign' name='search1' size={28} color={'#9747FF'} />
          </View>
        </View>
      </View>
      <ScrollView className='bg-lighergrey p-5 mb-10'>
        <Text className='mb-5' style={stylesGlobal.title}>Need help check these options</Text>
        <View className='flex flex-row w-full items-center justify-between'>
          <TouchableOpacity onPress={openWhatsAppChat} className='flex justify-start flex-col items-center border-b w-[48%] border-b-lightergrey bg-light p-5 rounded-xl m-0' style={styles.faqItem}>
            <View className='bg-magenta rounded-full h-[44px] w-[44px] flex items-center justify-center'><AppIcon type='FontAwesome' name='whatsapp' size={25} color={'#fff'} /></View>
            <Text className='pt-2' style={styles.question}>Chat with us</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('tel:+918287140514')} className='flex justify-start flex-col items-center border-b w-[48%] border-b-lightergrey bg-light p-5 rounded-xl m-0' style={styles.faqItem}>
            <View className='bg-magenta rounded-full h-[44px] w-[44px] flex items-center justify-center'><AppIcon type='Ionicons' name='call' size={25} color={'#fff'} /></View>
            <Text className='pt-2' style={styles.question}>Call Us</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => OpenModalEmail()} className='flex justify-center flex-row mt-5 items-center border-b border-b-lightergrey bg-light p-5 rounded-xl m-0' style={styles.faqItem}>
          <View className='bg-magenta rounded-full h-[44px] w-[44px] flex items-center justify-center mr-5'><AppIcon type='FontAwesome' name='wpforms' size={25} color={'#fff'} /></View>
          <Text className='' style={styles.question}>Raise a ticket</Text>
        </TouchableOpacity>
        <Text style={stylesGlobal.title} className='my-5'>Frequently asked questions</Text>
        {filteredData &&
          <View className='bg-light rounded-xl'>
            <FlatList
              data={filteredData}
              keyExtractor={(item) => item.id}
              renderItem={renderFAQItem}
            />
          </View>
        }
      </ScrollView>
      <ModalScreen isVisible={modalVisible} onClose={closeModal} outsideClick={false} modalWidth={'w-full'} otherClasses={` h-screen rounded-none p-0`}>
        <View className="w-full h-full px-[20px] bg-light relative mt-16">
          <Text style={styles.modalHeading}>{selectedFAQ?.question}</Text>
          <Text style={styles.modalDescription}>{selectedFAQ?.answer}</Text>
        </View>
      </ModalScreen>
      <ModalScreen isVisible={form} onClose={() => OpenModalEmail()} outsideClick={false} modalWidth={'w-[90%]'} otherClasses={``}>
        <View className="w-full px-[20px] bg-light relative mb-4">
          <Text className='font-bold text-body text-xl mb-5 w-[90%]'>Raise your ticket with us</Text>
          <TextInput
            multiline
            numberOfLines={4}
            placeholder="Mention your Issue"
            value={text}
            onChangeText={handleTextChange}
            style={{
              borderWidth: 1,
              borderRadius: 8,
              color: '#2A2D32',
              lineHeight: 16,
              textAlignVertical: 'center',
              outlineWidth: 0,
              borderWidth: 1,
              borderColor: "#f6f5fa",
              borderRadius: 8,
              paddingHorizontal: 14,
              paddingVertical: 12,
              fontSize: 13,
              backgroundColor: "#f4f4f4",
              color: "#444",
              textAlignVertical: 'top',
            }}
          />
          <BtnGlobal
            styleClassName="button"
            title="Submit"
            onPress={handleSubmit}
            classNames={'w-full mt-5'}
            isDisabled={isButtonDisabled}
          />
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
