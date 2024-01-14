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
        <Stack.Screen name='holidays' />
        <Stack.Screen name='schedule' />
        <Stack.Screen name='fees' />
        <Stack.Screen name='performance' />
        <Stack.Screen name='events' />
        <Stack.Screen name='homeAssignment' />
        <Stack.Screen name='noticeBoard' />
        <Stack.Screen name='bookSchedule' />
        <Stack.Screen name='updateProfile' />
        <Stack.Screen name='reports' />
        <Stack.Screen name='studentStats' />
        <Stack.Screen name='support' />
        <Stack.Screen name='updatePassword' />
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