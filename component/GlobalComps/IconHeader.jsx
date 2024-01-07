import { View, Text } from 'react-native'
import React from 'react'
import TechnoIcon from './TechnoIcon';
import SchoolIcon from './SchoolIcon';
export default function IconHeader() {
    return (
        <View style={{flex: 1, justifyContent: 'space-between', width: '100%', flexDirection: 'row', alignItems: 'center', position: 'relative'}}>
            <SchoolIcon />
            <TechnoIcon />
        </View>
    )
}