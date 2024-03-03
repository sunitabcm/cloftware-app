import { View, Text } from 'react-native'
import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import FixedFooter from '../../component/GlobalComps/FixedFooter'
import LoggedInHeader from '../../component/GlobalComps/LoggedInHeader'
export default function _layout() {
  return (
    <View style={{ flex: 1, fontSize: 14, backgroundColor: '#fff', color: '#37374E', position: 'relative' }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='dashboard' />
        <Stack.Screen name='contacts' />
        <Stack.Screen name='alerts' />
        <Stack.Screen name='settings' />
      </Stack>
      <FixedFooter />
    </View>
  )
}