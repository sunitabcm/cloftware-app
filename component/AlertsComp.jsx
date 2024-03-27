import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import dayjs from 'dayjs';
import AppIcon from './GlobalComps/AppIcon';
import ModalScreen from './GlobalComps/ModalScreen';

const AlertsComp = ({ apiData, ReadNotification }) => {
    const [selectedMessage, setSelectedMessage] = useState(null);

    let messages = [];
    if (apiData && apiData.body && apiData.body.length > 0) {
        messages = apiData.body.map(message => ({
            id: message.id,
            title: message.title,
            message: message.message,
            senderName: `${message.sender_details.first_name} ${message.sender_details.last_name}`,
            createdAt: dayjs(message.created_at).format('YYYY-MM-DD HH:mm:ss'),
            isRead: message.is_read
        })).sort((a, b) => dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? 1 : -1);
    }

    const openMessageModal = (message) => {
        setSelectedMessage(message);
    };

    const closeModal = () => {
        setSelectedMessage(null);
    };

    return (
        <View>
            {messages.length > 0 ? (
                messages.map(message => (
                    <Pressable key={message.id} className='flex flex-row items-center mb-5' onPress={() => openMessageModal(message)}>
                        <View className='mr-5 relative p-3 bg-[#EDE9FE] rounded-[50px]'>
                            <AppIcon type='Entypo' name='info-with-circle' size={30} color={'#9747FF'} />
                            {message.isRead === 0 &&
                                <View className='absolute bg-secondary h-[15px] w-[15px] rounded-[50px] right-0'></View>
                            }
                        </View>
                        <View>
                            <Text className='text-body text-lg font-bold'>{message.title}</Text>
                            <Text className='text-body text-sm mb-1'>{message.message}</Text>
                            <Text className='text-lightgrey text-sm'>{dayjs(message.createdAt).format('ddd, MMMM D, YYYY')}</Text>
                        </View>
                    </Pressable>
                ))
            ) : (
                <Text className='text-body font-bold text-lg'>No Data Found</Text>
            )}
            {selectedMessage && (
                <ModalScreen isVisible={true} onClose={() => { ReadNotification(selectedMessage.id); closeModal() }} outsideClick={false} modalWidth={'w-[80%]'} otherClasses={``}>
                    <View>
                        <Text className='text-body text-lg font-bold'>{selectedMessage.title}</Text>
                        <Text className='text-body text-sm mb-1'>{selectedMessage.message}</Text>
                        <Text className='text-lightgrey text-sm'>{dayjs(selectedMessage.createdAt).format('ddd, MMMM D, YYYY')}</Text>
                    </View>
                </ModalScreen>
            )}
        </View>
    );
};

export default AlertsComp;
