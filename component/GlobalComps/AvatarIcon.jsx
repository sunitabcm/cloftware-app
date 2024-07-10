import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { useSelector, useDispatch } from 'react-redux';

export default function AvatarIcon({ styleSize = 49, styleChange }) {
    const userCred = useSelector((state) => state.userDetails.user);
    const userTeacherCred = useSelector((state) => state.userDetailsTeacher.user);

    return (
        userCred && Object.keys(userCred).length > 0 &&
            userCred?.role_id === 3 ?
                <Image
                    source={userTeacherCred && Object.keys(userTeacherCred).length > 0 && userTeacherCred.profile_image !== '' ? { uri: userTeacherCred.profile_image } : { uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/Avatars.svg' }}
                    style={{ width: styleSize, height: styleSize }}
                    className={`${styleChange} rounded-full `}
                    contentFit="cover"
                />
                :
                <Image
                    source={userCred && Object.keys(userCred).length > 0 && userCred.profile_image !== '' ? { uri: userCred.profile_image } : { uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/Avatars.svg' }}
                    style={{ width: styleSize, height: styleSize }}
                    className={`${styleChange} rounded-full `}
                    contentFit="cover"
                />
    )
}