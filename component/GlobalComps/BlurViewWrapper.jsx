import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
// import { BlurView } from 'expo-blur';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableWithoutFeedback } from 'react-native';

const BlurViewWrapper = ({ isVisible, onClose, outsideClick, children }) => {
    const [modalVisible, setModalVisible] = useState(isVisible);

    useEffect(() => {
        setModalVisible(isVisible);
    }, [isVisible]);

    const handleCloseOut = () => {
        if (outsideClick) {
            setModalVisible(false);
            onClose && onClose();
        }
    };

    const handleClose = () => {
        setModalVisible(false);
        onClose && onClose();
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
        >
            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={handleCloseOut}>
                <View
                    style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}
                    className='bg-[#0000005A]'
                    // intensity={5}
                    // tint="light"
                >
                    <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }} className='w-full relative'>
                        {children}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default BlurViewWrapper;
