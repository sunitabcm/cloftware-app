import React, { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../store';
import { useSafeArea } from 'react-native-safe-area-context';
import { Pressable, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import { loadAuthTeacherData, loadAuthToken, loadAuthUserData } from '../authStorage';
import { setAuthToken } from '../store/slices/authSlice';
import { NativeWindStyleSheet } from "nativewind";
import AppIcon from '../component/GlobalComps/AppIcon';
import { ToastProvider } from 'react-native-toast-notifications';
import { startNetworkLogging } from 'react-native-network-logger';
import SplashScreen from '../component/GlobalComps/SplashScreen';
import { updateUser } from '../store/slices/userSlice';
import { updateUserTeacher } from '../store/slices/teacherSlice';
NativeWindStyleSheet.setOutput({
  default: "native",
});
export default function Layout() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  startNetworkLogging();
  useEffect(() => {
    loadAuthToken().then(authToken => {
      store.dispatch(setAuthToken(authToken));
    });
    loadAuthUserData().then(authUserData => {
      store.dispatch(updateUser(authUserData));
    });
    loadAuthTeacherData().then(authTeacherData => {
      store.dispatch(updateUserTeacher(authTeacherData));
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 1800);
  }, []);

  const { top } = useSafeArea();
  const { bottom } = useSafeArea();

  return (
    <Provider store={store}>
      {isLoading ?
        <SplashScreen />
        :
        <View style={{ flex: 1, paddingTop: top, paddingBottom: bottom, fontSize: 14, backgroundColor: '#fff', color: '#37374E', position: 'relative' }}>
          <Pressable onPress={() => router.push('/network')}><Text>Open Network</Text></Pressable>
          <ToastProvider
            placement="top"
            duration={1400}
            animationType='slide-in'
            animationDuration={250}
            successColor="#10B981"
            dangerColor="#FE0A0A"
            warningColor="#FEC532"
            normalColor="#9747FF"
            successIcon={<AppIcon type='AntDesign' name='checkcircle' size={20} color='#EEEEEE' />}
            dangerIcon={<AppIcon type='MaterialIcons' name='dangerous' size={20} color='#EEEEEE' />}
            warningIcon={<AppIcon type='AntDesign' name='warning' size={20} color='#EEEEEE' />}
            textStyle={{ fontSize: 14, color: '#EEEEEE', fontWeight: 700 }}
            offset={50}
            offsetTop={30}
            offsetBottom={40}
            swipeEnabled={true}
          >
            <StatusBar style="dark" />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name='index' />
              <Stack.Screen name='slideshow' />
              <Stack.Screen name='validateOtp' />
              <Stack.Screen name='login' />
              <Stack.Screen name='forgotPassword' />
              {/* <Stack.Screen name='network' /> */}

              {/* <Stack.Screen
              name="requestLeave"
              options={{
                presentation: 'modal',
              }}
            /> */}
            </Stack>
          </ToastProvider>
        </View>
      }
    </Provider>
  )
}