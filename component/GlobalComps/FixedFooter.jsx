import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Link, useRouter, usePathname } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import AppIcon from './AppIcon';
import { Image } from 'expo-image';
import BlurViewWrapper from './BlurViewWrapper';
import { setAuthToken } from '../../store/slices/authSlice';
import { loadAuthToken } from '../../authStorage';
import { stylesGlobal } from '../../styles/global';
const FixedFooter = () => {
	const [openMenu, setOpenMenu] = useState(false);
	const router = useRouter();
	const dispatch = useDispatch();
	const pathname = usePathname();
	useEffect(() => {
		loadAuthToken().then(authToken => {
			dispatch(setAuthToken(authToken));
		});
	}, []);
	const handleClose = () => {
		setOpenMenu(false)
	}

	return (
		<>
			<View className='h-[90px] pt-2 bg-light border-t border-t-menubg z-10'>
				<View className='px-7 flex justify-between items-center flex-row'>
					<Pressable onPress={() => router.push('/dashboard')} className='flex flex-col items-center justify-center'>
						<AppIcon type='Ionicons' name='cube-outline' size={27} color={pathname === '/dashboard' ? '#2A2D32' : '#E1E1E1'} />
						<Text className={` ${pathname === '/dashboard' ? 'text-body' : 'text-menubg'} font-bold text-center`}>Library</Text>
					</Pressable>
					<Pressable onPress={() => router.push('/contacts')} style={stylesGlobal.primaryDisabled} className='flex flex-col items-center justify-center'>
						<AppIcon type='FontAwesome' name='user-o' size={28} color={pathname === '/contacts' ? '#2A2D32' : '#E1E1E1'} />
						<Text className={` ${pathname === '/contacts' ? 'text-body' : 'text-menubg'} font-bold text-center`}>Contacts</Text>
					</Pressable>
					<Pressable onPress={() => setOpenMenu(!openMenu)} className='flex flex-col items-center justify-center bg-body rounded-full p-2.5'>
						<AppIcon type='AntDesign' name={openMenu ? 'close' : 'plus'} size={25} color={'#fff'} />
					</Pressable>
					<Pressable onPress={() => router.push('/alerts')} style={stylesGlobal.primaryDisabled} className='flex flex-col items-center justify-center'>
						<AppIcon type='Fontisto' name='bell' size={25} color={pathname === '/alerts' ? '#2A2D32' : '#E1E1E1'} />
						<Text className={` ${pathname === '/alerts' ? 'text-body' : 'text-menubg'} font-bold text-center`}>Alerts</Text>
					</Pressable>
					<Pressable onPress={() => router.push('/settings')} className='flex flex-col items-center justify-center'>
						<AppIcon type='SimpleLineIcons' name='settings' size={25} color={pathname === '/settings' ? '#2A2D32' : '#E1E1E1'} />
						<Text className={` ${pathname === '/settings' ? 'text-body' : 'text-menubg'} font-bold text-center`}>Settings</Text>
					</Pressable>
				</View>
			</View>
			{openMenu === true &&
				<BlurViewWrapper onClose={handleClose} isVisible={openMenu} outsideClick={true}>
					<View className='mt-auto pl-2.5 mb-8 mx-auto flex flex-col justify-center items-center'>
						<Pressable onPress={() => { router.push('/dashboard'); handleClose() }} className='py-4 bg-light w-[250px] pl-5 flex flex-row items-center gap-x-3 rounded-full border mb-5 border-lightgrey'>
							<Image
								source={require("../../assets/fees_icon.svg")}
								style={{ width: 25, height: 25 }}
								contentFit="cover"
							/>
							<Text>Pay Fee</Text>
						</Pressable>
						<Pressable onPress={() => { router.push('/requestLeave'); handleClose() }} className='py-4 bg-light w-[250px] pl-5 flex flex-row items-center gap-x-3 rounded-full border mb-5 border-lightgrey'>
							<Image
								source={require("../../assets/attendance_icon.svg")}
								style={{ width: 25, height: 25 }}
								contentFit="cover"
							/>
							<Text>Apply Leave</Text>
						</Pressable>
						<Pressable onPress={() => setOpenMenu(!openMenu)} className='flex flex-col items-center justify-center bg-body rounded-full p-2.5'>
							<AppIcon type='AntDesign' name={openMenu ? 'close' : 'plus'} size={25} color={'#fff'} />
						</Pressable>
					</View>
				</BlurViewWrapper>
			}
		</>
	)
}

export default FixedFooter