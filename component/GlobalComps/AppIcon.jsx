import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ApplicaitonTracker from 'react-native-vector-icons/Foundation';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';
import Fontisto from 'react-native-vector-icons/Fontisto';
const iconMap = {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome5,
  FontAwesome,
  MaterialIcons,
  ApplicaitonTracker,
  SimpleLineIcons,
  Entypo,
  Icon,
  Octicons,
  Foundation,
  Fontisto,
};

const AppIcon = ({ type, name, size, color }) => {
  const IconComponent = iconMap[type] || Ionicons;

  return (
      <IconComponent name={name} size={size} color={color} />
  );
};

export default AppIcon;
