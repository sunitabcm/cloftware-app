import { View, Text } from 'react-native'
import React from 'react';
import { Stack, useRouter, usePathname } from 'expo-router';
import TopBackHeader from '../../component/GlobalComps/TopBackHeader';
import { useSafeArea } from 'react-native-safe-area-context';

export default function _layout() {
  const { top } = useSafeArea();
  const { bottom } = useSafeArea();

  const pathname = usePathname();

  return (
    <View style={{ flex: 1, paddingBottom: bottom, fontSize: 14, backgroundColor: '#fff', color: '#37374E', position: 'relative' }}>
      <TopBackHeader TitleName={pathname} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='attendance' />
        <Stack.Screen name='bookSchedule' />
        <Stack.Screen name='discussion' />
        <Stack.Screen name='events' />
        <Stack.Screen name='exams' />
        <Stack.Screen name='fees' />
        <Stack.Screen name='holidays' />
        <Stack.Screen name='homeAssignment' />
        <Stack.Screen name='importantDates' />
        <Stack.Screen name='noticeBoard' />
        <Stack.Screen name='performance' />
        <Stack.Screen name='updateProfile' />
        <Stack.Screen name='reports' />
        <Stack.Screen name='schedule' />
        <Stack.Screen name='studentStats' />
        <Stack.Screen name='support' />
        <Stack.Screen name='updatePassword' />
        <Stack.Screen name='timeTable' />
        <Stack.Screen name='classes' />
        <Stack.Screen name='addAssignment' />
        <Stack.Screen name='addSchedule' />
        <Stack.Screen name='attendanceTeacher' />
        <Stack.Screen name='board' />
        <Stack.Screen name='homeAssignmentTeacher' />
        <Stack.Screen name='markAttendance' />
        <Stack.Screen name='scheduleTeacher' />
        <Stack.Screen
          name="requestLeave"
          options={{
            presentation: 'modal',
          }}
        />
      </Stack>
    </View>
  )
}