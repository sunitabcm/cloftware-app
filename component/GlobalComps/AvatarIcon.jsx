import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { useSelector, useDispatch } from 'react-redux';

export default function AvatarIcon({ styleSize = 49, styleChange }) {
    const userCred = useSelector((state) => state.userDetails.user);
    return (
        <Image
            source={userCred && Object.keys(userCred).length > 0 && userCred.profile_image !== '' ? {uri : userCred.profile_image} : {uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/Avatars.svg'}}
            style={{ width: styleSize, height: styleSize }}
            className={`${styleChange} rounded-full `}
            contentFit="cover"
        />
    )
}