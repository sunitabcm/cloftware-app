import { View, ImageBackground, Dimensions } from 'react-native'
import React from 'react'
import BtnGlobal from './BtnGlobal';
import { Image } from 'expo-image';
import SchoolIcon from './SchoolIcon';
import { useRouter } from 'expo-router';

export default function NonLoggedInBlur({ onPressBtn, hidden = true }) {
    const router = useRouter();
    const screenWidth = Dimensions.get('window').width;
    return (
        <View className='relative mb-16'>
            <ImageBackground
                source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/BannerSchoolBlur.png' }}
                style={{ width: screenWidth, height: 200 }}
                contentFit="cover"
            >
                <View
                    style={{ width: screenWidth, height: 200 }}
                    // blurType="light"
                    // blurAmount={100}
                    // reducedTransparencyFallbackColor="dark"
                />
                <View className='absolute w-full h-full'>
                    {hidden ? <BtnGlobal
                        styleClassName="closeBtn"
                        icon={true}
                        onPress={onPressBtn}
                        classNames={'m-5'}
                        iconName={'arrowleft'}
                        iconType={'AntDesign'}
                        iconSize={22}
                        iconColor={'#2A2D32'}
                    />: <View className='m-8'></View>}
                    <View className='mt-[70px] flex justify-center w-full items-center'>
                        <SchoolIcon styleSize={120} />
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}