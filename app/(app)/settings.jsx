import { View, Text, ScrollView, Pressable, Modal, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import AppIcon from '../../component/GlobalComps/AppIcon';
import { useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAuthTeacherData, deleteAuthToken, deleteAuthUserData } from '../../authStorage';
import { setAuthToken } from '../../store/slices/authSlice';
import { logout } from '../../ApiCalls';
import { stylesGlobal } from '../../styles/global';
import { updateUser } from '../../store/slices/userSlice';
import LoggedInHeader from '../../component/GlobalComps/LoggedInHeader';
import { updateUserTeacher } from '../../store/slices/teacherSlice';

export default function Settings() {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const authToken = useSelector((state) => state.auth.authToken);
  const userCred = useSelector((state) => state.userDetails.user);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await logout(authToken);
    } catch (error) {
      // Handle error
    }
  };

  const logoutFunction = () => {
    fetchData();
    dispatch(setAuthToken(null));
    deleteAuthToken();
    dispatch(updateUser(null));
    dispatch(updateUserTeacher(null));
    deleteAuthUserData();
    deleteAuthTeacherData();
    router.replace('/login');
  };

  const handleLogoutPress = () => {
    setModalVisible(true);
  };

  const handleConfirmLogout = () => {
    setModalVisible(false);
    logoutFunction();
  };

  const handleCancelLogout = () => {
    setModalVisible(false);
  };

  return (
    <>
      <LoggedInHeader />
      <ScrollView className="bg-body">
        <View className="rounded-t-[24px] p-5 bg-light w-full h-full min-h-[600px]">
          <View className="h-full flex flex-col items-start gap-y-5 mb-auto w-full">
            {userCred && Object.keys(userCred).length > 0 && userCred?.role_id === 4 ? (
              <Pressable onPress={() => router.push('/updateProfile')} className="flex flex-row items-center w-[80%]">
                <View className="w-[40px] flex items-center">
                  <AppIcon type="EvilIcons" name="pencil" size={40} color={'#535353'} />
                </View>
                <Text className="font-bold text-body ml-5 mt-2 text-base">Update Profile</Text>
              </Pressable>
            ) : (
              <Pressable onPress={() => router.push('/updateProfileTeach')} className="flex flex-row items-center w-[80%]">
                <View className="w-[40px] flex items-center">
                  <AppIcon type="EvilIcons" name="pencil" size={40} color={'#535353'} />
                </View>
                <Text className="font-bold text-body ml-5 mt-2 text-base">Update Profile</Text>
              </Pressable>
            )}
            <Pressable onPress={() => router.push('/support')} className="flex flex-row items-center w-[80%]">
              <View className="w-[40px] flex items-center">
                <AppIcon type="AntDesign" name="customerservice" size={28} color={'#535353'} />
              </View>
              <Text className="font-bold text-body ml-5 text-base">Support</Text>
            </Pressable>
            <Pressable onPress={() => router.push('/updatePassword')} className="flex flex-row items-center w-[80%]">
              <View className="w-[40px] flex items-center">
                <AppIcon type="MaterialCommunityIcons" name="form-textbox-password" size={28} color={'#535353'} />
              </View>
              <Text className="font-bold text-body ml-5 text-base">Change your Password</Text>
            </Pressable>
            <Pressable onPress={handleLogoutPress} className="flex flex-row items-center w-[80%]">
              <View className="w-[40px] flex items-center">
                <AppIcon type="AntDesign" name="logout" size={28} color={'#535353'} />
              </View>
              <Text className="font-bold text-body ml-5 text-base">Logout</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Do you want to logout?</Text>
            <View style={styles.modalButtons}>
              <Pressable style={styles.button} onPress={handleConfirmLogout}>
                <Text style={styles.buttonText}>Yes</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.cancelButton]} onPress={handleCancelLogout}>
                <Text style={styles.buttonText}>No</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#2A2D32',
  },
  cancelButton: {
    backgroundColor: '#FE0A0A',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
