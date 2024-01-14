import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { stylesGlobal } from '../styles/global';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
export default function Loginpopup({ closeModal }) {
    const router = useRouter();
    return (
        <View style={stylesGlobal.flexCenter}>
            <Text style={stylesGlobal.title}>Login with</Text>
            <View style={[{ display: 'flex', flexDirection: 'row', marginTop: 20 }]}>
                <View style={[stylesGlobal.flexCenter, stylesGlobal.primaryDisabled,{ width: '31%', backgroundColor: '#F6F6F6', padding: 20, marginRight: 15, borderRadius: 20 }]}>
                    <Image
                        source={require("../assets/microsoft.svg")}
                        style={{ width: 35, height: 35 }}
                        contentFit="cover"
                    />
                    <Text style={[stylesGlobal.innertext, { marginTop: 10 }]}>Micosoft</Text>
                </View>
                <Pressable onPress={() => { router.push('/login'); closeModal() }} style={[stylesGlobal.flexCenter, { width: '31%', backgroundColor: '#F6F6F6', padding: 20, marginRight: 15, borderRadius: 20 }]}>
                    <Image
                        source={require("../assets/mail.svg")}
                        style={{ width: 49, height: 35, borderRadius: 4 }}
                        contentFit="cover"
                    />
                    <Text style={[stylesGlobal.innertext, { marginTop: 10 }]}>Mail</Text>
                </Pressable>
                <View style={[stylesGlobal.flexCenter, stylesGlobal.primaryDisabled,{ width: '31%', backgroundColor: '#F6F6F6', padding: 20, borderRadius: 20 }]}>
                    <Image
                        source={require("../assets/google.svg")}
                        style={{ width: 35, height: 35 }}
                        contentFit="cover"
                    />
                    <Text style={[stylesGlobal.innertext, { marginTop: 10 }]}>Google</Text>
                </View>
            </View>
        </View>
    )
}