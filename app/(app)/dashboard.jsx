import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { stylesGlobal } from '../../styles/global';
import { useRouter } from "expo-router";
import { Image } from 'expo-image';
export default function dashboard() {
  const router = useRouter();

  return (
    <ScrollView className='h-full bg-body'>
      <View className='rounded-t-[24px] p-5 bg-light w-full'>
        <View style={stylesGlobal.flexCenter} className=''>
          <View className='w-full' style={[{ display: 'flex', flexDirection: 'row', marginTop: 20, flexWrap: 'wrap', gap: 10, justifyContent: 'center', }]}>
            <Pressable style={[stylesGlobal.flexCenter, { width: '31%', padding: 12 }]} onPress={() => router.push('/attendance')}>
              <Image
                source={require("../../assets/attendance_icon.svg")}
                style={{ width: 50, height: 50 }}
                contentFit="cover"
              />
              <Text style={[stylesGlobal.innertext, { marginTop: 5 }]}>Attendance</Text>
            </Pressable>
            <Pressable style={[stylesGlobal.flexCenter, { width: '31%', padding: 12 }]} onPress={() => router.push('/holidays')}>
              <Image
                source={require("../../assets/absense_icon.svg")}
                style={{ width: 50, height: 50 }}
                contentFit="cover"
              />
              <Text style={[stylesGlobal.innertext, { marginTop: 5 }]}>Holidays</Text>
            </Pressable>
            <Pressable style={[stylesGlobal.flexCenter, { width: '31%', padding: 12 }]} onPress={() => router.push('/events')}>
              <Image
                source={require("../../assets/performance_icon.svg")}
                style={{ width: 50, height: 50 }}
                contentFit="cover"
              />
              <Text style={[stylesGlobal.innertext, { marginTop: 5 }]}>Events</Text>
            </Pressable>
            <View style={[stylesGlobal.flexCenter, { width: '31%', padding: 12, marginTop: 10 }]}>
              <Image
                source={require("../../assets/schedules_icon.svg")}
                style={{ width: 50, height: 50 }}
                contentFit="cover"
              />
              <Text style={[stylesGlobal.innertext, { marginTop: 5 }]}>Schedules</Text>
            </View>
            <View style={[stylesGlobal.flexCenter, { width: '31%', padding: 12, marginTop: 10 }]}>
              <Image
                source={require("../../assets/fees_icon.svg")}
                style={{ width: 50, height: 50 }}
                contentFit="cover"
              />
              <Text style={[stylesGlobal.innertext, { marginTop: 5 }]}>Fees</Text>
            </View>
            <View style={[stylesGlobal.flexCenter, { width: '31%', padding: 12, marginTop: 10 }]}>
              <Image
                source={require("../../assets/discussion_icon.svg")}
                style={{ width: 50, height: 50 }}
                contentFit="cover"
              />
              <Text style={[stylesGlobal.innertext, { marginTop: 5 }]}>Discussion</Text>
            </View>
          </View>
        </View>
        <View className='w-full mt-10'>
          <Text style={stylesGlobal.title}>Latest Events</Text>
          <Image
            source={require("../../assets/dash_image.png")}
            style={{ width: '100%', height: 190 }}
            contentFit="cover"
          />
        </View>
      </View>
    </ScrollView>
  )
}