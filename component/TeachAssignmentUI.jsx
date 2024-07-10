import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { stylesGlobal } from '../styles/global'
import AppIcon from './GlobalComps/AppIcon'

export default function TeachAssignmentUI({ assignment, index, pressFunction }) {
    return (
        <Pressable onPress={() => pressFunction()} key={index} className='border border-lightergrey p-4 rounded-xl mb-4 bg-light'>
            <Text style={{ backgroundColor: assignment.status === 'Active' ? '#10B981' : '#FE0A0A' }} className='text-light p-2 font-bold mb-2 rounded-lg w-[80px] text-center'>{assignment.status}</Text>
            <Text style={stylesGlobal.title}>{assignment.title}</Text>
            <Text className='text-lightgrey font-bold w-[90%] mt-2'>{assignment.description}</Text>
            <View className='flex flex-row items-center justify-between mt-2'>
                <View>
                    <Text className='text-body'>Created at</Text>
                    <View className='flex flex-row items-center'>
                        <AppIcon type='AntDesign' name='calendar' size={25} color='#999999' />
                        <Text className='text-lightgrey ml-2'>{new Date(assignment.created_at).toLocaleDateString()}</Text>
                    </View>
                </View>
                <View>
                    <Text className='text-body'>Due date</Text>
                    <View className='flex flex-row items-center'>
                        <AppIcon type='AntDesign' name='calendar' size={25} color='#999999' />
                        <Text className='text-lightgrey ml-2'>{assignment.due_date ? new Date(assignment.due_date).toLocaleDateString() : 'N/A'}</Text>
                    </View>
                </View>
            </View>
            <View className='flex flex-row my-2'>
                <Text className='text-body font-bold mr-1'>Subject:</Text>
                <Text className='text-body font-bold'>{assignment.subject_name}</Text>
            </View>
        </Pressable>
    )
}