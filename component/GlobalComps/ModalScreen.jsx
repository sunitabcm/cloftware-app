import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { globalstyles } from '../../styles/global';
import BtnGlobal from './BtnGlobal';
import AppIcon from '../GlobalComps/AppIcon';
import { useSafeArea } from 'react-native-safe-area-context';
const ModalScreen = ({ isVisible, onClose, outsideClick, children, heading, modalWidth = 'w-[80%]', otherClasses, closeBtnHide = false }) => {
	const { top } = useSafeArea();
	const { bottom } = useSafeArea();
	const [modalVisible, setModalVisible] = useState(isVisible);

	useEffect(() => {
		setModalVisible(isVisible);
	}, [isVisible]);

	const handleCloseOut = () => {
		if (outsideClick) {
			setModalVisible(false);
			onClose && onClose();
		}
	};

	const handleClose = () => {
		setModalVisible(false);
		onClose && onClose();
	};

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
		// onRequestClose={() => {
		// handleCloseOut();
		// }}
		>
			<TouchableWithoutFeedback style={{ flex: 1 }} onPress={handleCloseOut}>
				<View
					style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: top, paddingBottom: bottom, backgroundColor: '#0000005A' }}
					// intensity={70}
					// tint={modalWidth === 'w-full' ? 'light' : "dark"}
				>
					<View style={{ borderRadius: 10 }} className={` p-5 ${modalWidth} ${otherClasses} bg-light relative`}>
						{heading !== undefined && <View className="w-full border-b pb-3 border-b-primary text-center flex items-center"><Text style={globalstyles.subHead}>{heading}</Text></View>}
						{children}
						{closeBtnHide === false &&
							<BtnGlobal
								styleClassName="closeBtn"
								icon={true}
								onPress={handleClose}
								classNames={'absolute top-4 right-3'}
								iconName={'close'}
								iconType={'AntDesign'}
								iconSize={22}
								iconColor={'#37374E'}
							/>
						}
					</View>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

export default ModalScreen;