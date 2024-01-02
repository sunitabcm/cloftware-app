import { View, Text , Pressable} from 'react-native'
import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import WelcomeSchool from '../pageComponent/welcome/WelcomeSchool';
import WelcomeFooter from '../pageComponent/welcome/WelcomeFooter';
import Footer from '../component/Footer';
import { stylesGlobal } from '../styles/global';
import AppIcon from '../component/GlobalComps/AppIcon';
import { useRouter } from "expo-router";
import { loadAuthToken } from '../authStorage';
export default function dashboard() {
  const router = useRouter();
  const authToken = useSelector((state) => state.auth.authToken)

  return (
    <View>
      {authToken && Object.keys(authToken).length > 0 ?
        <View className='bg-black'>
          <View className='flex flex-row items-center  p-4 pt-0'>
            <WelcomeSchool />
          </View>
          <View className='flex flex-col items-start gap-2 p-4'>
            <Text className='font-bold text-white'>{authToken.first_name} {authToken?.last_name}</Text>
            <Text className='font-bold text-white'>{authToken.class_name}</Text>
          </View>
          <View className='bg-white rounded-t-xl w-full'>
            <View style={stylesGlobal.flexCenter}>
              <View style={[{ display: 'flex', flexDirection: 'row', marginTop: 20, flexWrap:'wrap', gap: 10, justifyContent: 'center', }]}>
                <Pressable style={[stylesGlobal.flexCenter, { width: '30%', backgroundColor: '#ccc', padding: 15, borderRadius: 10 }]} onPress={()=> router.push('/attendance')}>
                  <AppIcon type='Fontisto' name='microsoft' size={30} color={'#000'} />
                  <Text style={[stylesGlobal.innertext, { marginTop: 5 }]}>Attendance</Text>
                </Pressable>
                <Pressable style={[stylesGlobal.flexCenter, { width: '30%', backgroundColor: '#ccc', padding: 15, borderRadius: 10 }]} onPress={()=> router.push('/holidays')}>
                  <AppIcon type='Fontisto' name='microsoft' size={30} color={'#000'} />
                  <Text style={[stylesGlobal.innertext, { marginTop: 5 }]}>Events</Text>
                </Pressable>
                <View style={[stylesGlobal.flexCenter, { width: '30%', backgroundColor: '#ccc', padding: 15, borderRadius: 10 }]}>
                  <AppIcon type='Fontisto' name='microsoft' size={30} color={'#000'} />
                  <Text style={[stylesGlobal.innertext, { marginTop: 5 }]}>Micosoft</Text>
                </View>
                <View style={[stylesGlobal.flexCenter, { width: '30%', backgroundColor: '#ccc', padding: 15, borderRadius: 10 }]}>
                  <AppIcon type='Fontisto' name='microsoft' size={30} color={'#000'} />
                  <Text style={[stylesGlobal.innertext, { marginTop: 5 }]}>Micosoft</Text>
                </View>
                <View style={[stylesGlobal.flexCenter, { width: '30%', backgroundColor: '#ccc', padding: 15, borderRadius: 10 }]}>
                  <AppIcon type='AntDesign' name='mail' size={30} color={'#000'} />
                  <Text style={[stylesGlobal.innertext, { marginTop: 5 }]}>Mail</Text>
                </View>
                <View style={[stylesGlobal.flexCenter, { width: '30%', backgroundColor: '#ccc', padding: 15, borderRadius: 10 }]}>
                  <AppIcon type='AntDesign' name='google' size={30} color={'#000'} />
                  <Text style={[stylesGlobal.innertext, { marginTop: 5 }]}>Google</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        :
        <Text>Loading</Text>
      }
      {/* <Footer/> */}
    </View>
  )
}