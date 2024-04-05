import { Share } from 'react-native';
import React from 'react';
import BtnGlobal from './BtnGlobal';
export default function GlobalShare({ imageUrl = 'https://image.jobtrees.com/static/meta-img-home.jpeg' }) {
    const handleShare = async () => {
        try {
            await Share.share({
                imageUrl: imageUrl,
            });
        } catch (error) {
        }
    };
    return (
        <BtnGlobal
            styleClassName="closeBtn"
            icon={true}
            onPress={handleShare}
            classNames={'bg-light py-2 pr-2 px-2 rounded-lg'}
            iconName={'sharealt'}
            iconType={'AntDesign'}
            iconSize={24}
            iconColor={'#0C6C81'}
        />
    )
}