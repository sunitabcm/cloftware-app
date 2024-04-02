import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Link, useRouter, usePathname } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import AppIcon from './AppIcon';
import { Image } from 'expo-image';
import BlurViewWrapper from './BlurViewWrapper';
import { setAuthToken } from '../../store/slices/authSlice';
import { loadAuthToken, loadAuthUserData } from '../../authStorage';
const FixedFooter = () => {
	const [openMenu, setOpenMenu] = useState(false);
	const router = useRouter();
	const dispatch = useDispatch();
	const pathname = usePathname();
	useEffect(() => {
		loadAuthToken().then(authToken => {
			dispatch(setAuthToken(authToken));
		});
		loadAuthUserData().then(authUserData => {
			dispatch(updateUser(authUserData));
		});
	}, []);
	const handleClose = () => {
		setOpenMenu(false)
	}

	return (
		<>
			<View className='h-[90px] pt-2 bg-light border-t border-t-menubg z-10'>
				<View className='px-2 flex justify-between items-center flex-row gap-1'>
					<Pressable onPress={() =>  {router.push('/dashboard'); setOpenMenu(false)}} className='flex flex-col items-center justify-center w-[20%]'>
						<Image
							source={{ uri: pathname === '/dashboard' ? 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/dashDark.png' : 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/dash.png' }}
							style={{ width: 25, height: 25 }}
							contentFit="cover"
							className='mb-1.5'
						/>
						<Text className={` ${pathname === '/dashboard' ? 'text-body' : 'text-menubg'} font-bold text-center`}>DashBoard</Text>
					</Pressable>
					<Pressable onPress={() => { router.push('/contacts'); setOpenMenu(false)}} className='flex flex-col items-center justify-center w-[20%]'>
						<Image
							source={{ uri: pathname === '/contacts' ? 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/schlDark.png' : 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/schl.png' }}
							style={{ width: 25, height: 25 }}
							contentFit="cover"
							className='mb-1.5'
						/>
						<Text className={` ${pathname === '/contacts' ? 'text-body' : 'text-menubg'} font-bold text-center`}>My School</Text>
					</Pressable>
					<Pressable onPress={() => setOpenMenu(!openMenu)} className='flex flex-col items-center justify-center bg-body rounded-full p-2.5'>
						<AppIcon type='AntDesign' name={openMenu ? 'close' : 'plus'} size={25} color={'#fff'} />
					</Pressable>
					<Pressable onPress={() => { router.push('/alerts'); setOpenMenu(false)}} className='flex flex-col items-center justify-center w-[20%]'>
						<Image
							source={{ uri: pathname === '/alerts' ? 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/BellDark.png' : 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/Bell.png' }}
							style={{ width: 25, height: 25 }}
							contentFit="cover"
							className='mb-1.5'
						/>
						<Text className={` ${pathname === '/alerts' ? 'text-body' : 'text-menubg'} font-bold text-center`}>Alerts</Text>
					</Pressable>
					<Pressable onPress={() => { router.push('/settings'); setOpenMenu(false)}} className='flex flex-col items-center justify-center w-[20%]'>
						<Image
							source={{ uri: pathname === '/settings' ? 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/GearDark.png' : 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/Gear.png' }}
							style={{ width: 25, height: 25 }}
							contentFit="cover"
							className='mb-1.5'
						/>
						<Text className={` ${pathname === '/settings' ? 'text-body' : 'text-menubg'} font-bold text-center`}>Settings</Text>
					</Pressable>
				</View>
			</View>
			{openMenu === true &&
				<View className='absolute h-screen bg-[#0000005A] w-screen flex justify-end items-center'>
					{/* onClose={handleClose} isVisible={openMenu} outsideClick={true} */}
					<View className='flex flex-col justify-center items-center mb-32'>
						{/* <Pressable onPress={() => { router.push('/dashboard'); handleClose() }} className='py-4 bg-light w-[250px] pl-5 flex flex-row items-center gap-x-3 rounded-full border mb-5 border-lightgrey'>
							<Image
								source={require("../../assets/fees_svg.svg")}
								style={{ width: 25, height: 25 }}
								contentFit="cover"
							/>
							<Text>Pay Fee</Text>
						</Pressable> */}
						<Pressable onPress={() => { router.push('/requestLeave'); handleClose() }} className='py-4 bg-light w-[250px] pl-5 flex flex-row items-center gap-x-3 rounded-full border mb-5 border-lightgrey'>
							<Image
								source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/attendance_svg.svg' }}
								style={{ width: 25, height: 25 }}
								contentFit="cover"
							/>
							<Text>Apply Leave</Text>
						</Pressable>
						{/* <Pressable onPress={() => setOpenMenu(!openMenu)} className='flex flex-col items-center justify-center bg-body rounded-full p-2.5'>
							<AppIcon type='AntDesign' name={openMenu ? 'close' : 'plus'} size={25} color={'#fff'} />
						</Pressable> */}
					</View>
				</View>
			}
		</>
	)
}

export default FixedFooter