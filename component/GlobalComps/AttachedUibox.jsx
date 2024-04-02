import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { stylesGlobal } from '../../styles/global';
import dayjs from 'dayjs';
import AppIcon from './AppIcon';
import { Image } from 'expo-image';
export default function AttachedUibox({ press, item, noticeBoard = true, HomeAssigment = false }) {
    return (
        <Pressable className='bg-light rounded-xl p-4 w-full my-2.5' onPress={press}>
            {noticeBoard === true &&
                item.image && item.image !== '' &&
                <View className='w-full'>
                    <Image
                        source={item.image}
                        style={{ width: '100%', height: 190 }}
                        contentFit="fill"
                        className='rounded-xl border border-lightgrey mb-4'
                    />
                </View>
            }
            <Text style={[stylesGlobal.title, { fontSize: 16 }]} className='mb-2 capitalize'>{item.title}</Text>
            {HomeAssigment === true &&
                <Text style={[stylesGlobal.innertext, { fontSize: 16 }]} className='mb-2 capitalize'>{item.subject_name}</Text>
            }
            {item.description &&
                <Text style={stylesGlobal.innertext} className='mb-4'>
                    {item.description?.length > 150 ? `${item.description?.slice(0, 150)}...` : item.description}
                </Text>
            }
            <View className='flex flex-row items-center justify-between w-full'>
                <View className='flex flex-row items-center'>
                    <AppIcon type='AntDesign' name='calendar' color='#999999' size={20} />
                    {noticeBoard === true ?
                        <Text className='ml-4 text-lightgrey text-sm'>{dayjs(item.created_at).format('DD MMM, YYYY')}</Text>
                        :
                        <Text className='ml-4 text-lightgrey text-sm'>{dayjs(item.date).format('DD MMM, YYYY')}</Text>
                    }
                </View>
                {HomeAssigment === true &&
                    item.flag !== 0 &&
                    <View className='flex flex-row items-center'>
                        <AppIcon type='Entypo' name='attachment' color='#999999' size={20} />
                        <Text className='ml-2 text-lightgrey text-sm'>
                            1
                        </Text>
                    </View>
                }
                {noticeBoard === true &&
                    item.notice_images.length + item.notice_videos.length !== 0 &&
                    <View className='flex flex-row items-center'>
                        <AppIcon type='Entypo' name='attachment' color='#999999' size={20} />
                        <Text className='ml-2 text-lightgrey text-sm'>
                            {item.notice_images.length + item.notice_videos.length}
                        </Text>
                    </View>
                }
            </View>
        </Pressable>
    )
}