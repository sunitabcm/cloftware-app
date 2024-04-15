import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
//emptyFolder.png
//pencil.png
const EmptyScreen = ({ imageType = false, height = true }) => {

    return (
        <View className={`${height ? 'h-full' : ''}bg-light w-full flex justify-center items-center py-16 px-5`}>
            {imageType === true ?
                <>
                    <Image
                        source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/emptyFolder.png' }}
                        style={{ width: 135, height: 135 }}
                        contentFit="cover"
                    />
                    <Text className='text-body text-2xl font-bold mt-5 mb-2 text-center'>Looks like there is nothing yet!</Text>
                    <Text className='text-lightgrey text-lg text-center'>Hold back teacher will upload this soon</Text>
                </>
                :
                <>
                    <Image
                        source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/pencil.png' }}
                        style={{ width: 135, height: 135 }}
                        contentFit="cover"
                    />
                    <Text className='text-body text-2xl font-bold mt-5 mb-2 text-center'>Looks like its a relaxing day</Text>
                    <Text className='text-lightgrey text-lg text-center'>The day is too long so no need of homework today</Text>
                </>
            }
        </View>
    );
};

export default EmptyScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        height: '100%',
        width: '100%',
    },
});