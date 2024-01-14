import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../store';
import { useSafeArea } from 'react-native-safe-area-context';
import { Pressable, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import { loadAuthToken, saveAuthToken } from '../authStorage';
import { setAuthToken } from '../store/slices/authSlice';
import { NativeWindStyleSheet } from "nativewind";
import AppIcon from '../component/GlobalComps/AppIcon';
import { ToastProvider } from 'react-native-toast-notifications';
import { startNetworkLogging } from 'react-native-network-logger';
NativeWindStyleSheet.setOutput({
  default: "native",
});
export default function Layout() {
  const router = useRouter();
  startNetworkLogging();
  useEffect(() => {
    loadAuthToken().then(authToken => {
      store.dispatch(setAuthToken(authToken));
    });

  }, []);

  const { top } = useSafeArea();
  const { bottom } = useSafeArea();

  return (
    <Provider store={store}>
      <View style={{ flex: 1, paddingTop: top, paddingBottom: bottom, fontSize: 14, backgroundColor: '#fff', color: '#37374E', position: 'relative' }}>
        <Pressable onPress={()=> router.push('/network')}><Text>Open Network</Text></Pressable>
        <ToastProvider
          placement="top"
          duration={5000}
          animationType='slide-in'
          animationDuration={250}
          successColor="#84e38d"
          dangerColor="#ffa8a8"
          warningColor="#ffe791"
          normalColor="#fafafa"
          //  successIcon={<AppIcon type='AntDesign' name='checkcircle' size={20} color='#242424' />}
          //  dangerIcon={<AppIcon type='MaterialIcons' name='dangerous' size={20} color='#242424' />}
          //  warningIcon={<AppIcon type='AntDesign' name='warning' size={20} color='#242424' />}
          textStyle={{ fontSize: 14, color: '#242424', fontWeight: 700 }}
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
            <Stack.Screen name='network' />

            {/* <Stack.Screen
              name="requestLeave"
              options={{
                presentation: 'modal',
              }}
            /> */}
          </Stack>
        </ToastProvider>
      </View>
    </Provider>
  )
}