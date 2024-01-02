import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import your icon library
import { AuthContext } from '../utility/AuthContext';

const Header = ({ user }) => {
  const {logOut, userData} = useContext(AuthContext);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleProfileDetails = () => {
    // Handle navigation to the Profile Details screen here
    // You can use navigation.navigate('ProfileDetails') or any navigation method of your choice
  };

  const handleLogout = () => {
    // Handle the logout action here
    // You can dispatch a logout action or perform any necessary logout logic
  };

  return (
    <View style={styles.container}>
      {/* Left text */}
      <Text style={styles.leftText}>{userData?.first_name}</Text>

      {/* Right user icon */}
      <TouchableOpacity onPress={toggleDropdown} style={styles.iconContainer}>
        <Icon name="user" size={30} color="white" />
      </TouchableOpacity>

      {/* Dropdown/Modal for Profile Options */}
      {isDropdownVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity style={styles.userList} onPress={handleProfileDetails}>
            <Text style={styles.userListA1}>Profile Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userList}  onPress={handleLogout}>
            <Text style={[styles.userListA1, styles.userListA2]}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff5315', // Customize the background color
    padding: 10,
  },
  leftText: {
    fontSize: 16,
    color: 'white', // Customize the text color
  },
  iconContainer: {
    marginLeft: 'auto', // Push the icon to the right
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: 'white', // Customize the dropdown background color
    padding: 0,
    width: 200
  },
  userList:{
    width:'100%',
    fontSize: 14,
    borderTopWidth: 1, // Add a 1px solid border
    borderTopColor: '#ff5315', // Customize the border color
  },
  userListA1:{
    width:'100%',
    fontSize: 14,
    paddingVertical:10,
    paddingHorizontal:10,
    //fontWeight:500
  },
  userListA2:{
    color: '#ff5315',
  }
});

export default Header;
