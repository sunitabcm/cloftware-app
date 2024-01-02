// import React,{useContext} from 'react';
// import {
//   View,
//   Text,
//   ImageBackground,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import {
//   DrawerContentScrollView,
//   DrawerItemList,
// } from '@react-navigation/drawer';

// import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import { AuthContext } from '../utility/AuthContext';

// const CustomDrawer = props => {
//   const {logIn, logOut} = useContext(AuthContext)
//   return (
//     <View style={{flex: 1}}>
//       <DrawerContentScrollView
//         {...props}
//         contentContainerStyle={{backgroundColor: '#8200d6'}}>
//         <ImageBackground
//           source={require('../assets/images/menu-bg.jpeg')}
//           style={{padding: 20}}>
//           <Image
//             source={require('../assets/images/user-profile.jpg')}
//             style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
//           />
//           <Text
//             style={{
//               color: '#fff',
//               fontSize: 18,
//               fontFamily: 'Roboto-Medium',
//               marginBottom: 5,
//             }}>
//             John Doe
//           </Text>
//           <View style={{flexDirection: 'row'}}>
//             <Text
//               style={{
//                 color: '#fff',
//                 fontFamily: 'Roboto-Regular',
//                 marginRight: 5,
//               }}>
//               280 Coins
//             </Text>
//             <FontAwesome5 name="coins" size={14} color="#fff" />
//           </View>
//         </ImageBackground>
//         <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
//           <DrawerItemList {...props} />
//         </View>
//       </DrawerContentScrollView>
//       <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
//         <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
//           <View style={{flexDirection: 'row', alignItems: 'center'}}>
//             <Ionicons name="share-social-outline" size={22} />
//             <Text
//               style={{
//                 fontSize: 15,
//                 fontFamily: 'Roboto-Medium',
//                 marginLeft: 5,
//               }}>
//               Tell a Friend
//             </Text>
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => {logOut()}} style={{paddingVertical: 15}}>
//           <View style={{flexDirection: 'row', alignItems: 'center'}}>
//             <Ionicons name="exit-outline" size={22} />
//             <Text
//               style={{
//                 fontSize: 15,
//                 fontFamily: 'Roboto-Medium',
//                 marginLeft: 5,
//               }}>
//               Sign Out
//             </Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default CustomDrawer;



// CustomDrawerContent.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

function CustomDrawer(props) {
  return (
    <DrawerContentScrollView {...props}>
      {/* Drawer Header */}
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>Custom Drawer Header</Text>
      </View>

      {/* Drawer Items */}
      <DrawerItemList {...props} />

      {/* Custom Drawer Items */}
      <TouchableOpacity
        style={styles.customDrawerItem}
        onPress={() => {
          // Handle custom item press here
        }}
      >
        <Text style={styles.customDrawerItemText}>Custom Drawer Item</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  drawerHeaderText: {
    fontSize: 18,
    //fontWeight: 700,
  },
  customDrawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  customDrawerItemText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default CustomDrawer;
