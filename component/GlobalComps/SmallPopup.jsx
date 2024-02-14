import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import AppIcon from './AppIcon';
import BtnGlobal from './BtnGlobal';

export const SmallPopup = ({ isVisible, closeModal, children, customModalClass = 'h-[30%]' }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={closeModal}
        >
            <View style={styles.modalContainer}>
                <BlurView intensity={20} tint="dark" style={[StyleSheet.absoluteFill, styles.blurContainer]} >
                    <View style={styles.modalContent} className={customModalClass}>
                        <View style={{ marginTop: 15 }}>
                            {children}
                        </View>
                        <BtnGlobal
                            styleClassName="closeBtn"
                            icon={true}
                            onPress={closeModal}
                            classNames={'absolute right-3 top-4'}
                            iconName={'close'}
                            iconType={'AntDesign'}
                            iconSize={15}
                            iconColor={'#2A2D32'}
                        />
                    </View>
                </BlurView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    blurContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        position: 'relative',
        backgroundColor: 'white',
        padding: 20,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
});
