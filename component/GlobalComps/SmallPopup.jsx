import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import AppIcon from './AppIcon';

export const SmallPopup = ({ isVisible, closeModal, children }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={closeModal}
        >
            <View style={styles.modalContainer}>
                <BlurView  intensity={20} tint="dark" style={[StyleSheet.absoluteFill, styles.blurContainer]} >
                    <View style={styles.modalContent}>
                        <View style={{marginTop: 15}}>
                        {children}
                        </View>
                        <TouchableOpacity onPress={closeModal} style={{position: 'absolute', top: 10, right: 10}}>
                            <AppIcon type='Entypo' name='cross' size={30} color={'#000'}/>
                        </TouchableOpacity>
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
        height: '30%',
        position: 'relative',
        backgroundColor: 'white',
        padding: 20,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
});
