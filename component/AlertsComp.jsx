import React from 'react';
import { View, Text } from 'react-native';
import dayjs from 'dayjs';
import AppIcon from './GlobalComps/AppIcon';

const AlertsComp = ({ apiData }) => {
    let messages = [];

    // Checking if apiData is defined and body array exists
    if (apiData && apiData.body && apiData.body.length > 0) {
        messages = apiData.body.map(message => ({
            id: message.id,
            title: message.title,
            message: message.message,
            senderName: `${message.sender_details.first_name} ${message.sender_details.last_name}`,
            createdAt: dayjs(message.created_at).format('YYYY-MM-DD HH:mm:ss')
        })).sort((a, b) => dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? 1 : -1);
    }

    return (
        <View>
            {messages.length > 0 ? (
                messages.map(message => (
                    <View key={message.id} className='flex flex-row items-center mb-5'>
                        <View className='mr-5'>
                            <AppIcon type='Entypo' name='info-with-circle' size={30} color={'#9747FF'} />
                        </View>
                        <View>
                            <Text className='text-body text-lg font-bold'>{message.title}</Text>
                            <Text className='text-body text-sm mb-1'>{message.message}</Text>
                            {/* <Text className='text-lightgrey text-sm capitalize'>By: {message.senderName}</Text> */}
                            <Text className='text-lightgrey text-sm'>{dayjs(message.createdAt).format('ddd, MMMM D, YYYY')}</Text>
                        </View>
                    </View>
                ))
            ) : (
                <Text>No messages found</Text>
            )}
        </View>
    );
};


export default AlertsComp;
