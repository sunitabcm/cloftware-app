// Footer.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fourColorBlack } from './stylesheet';
import AppIcon from './GlobalComps/AppIcon';

const Footer = () => {
  return (
    <View>
      <View style={styles.itemContainer}>
        <AppIcon type='MaterialCommunityIcons' name='library' size={18} color={'#000'} />
        <Text>Library</Text>
      </View>
      <View style={styles.itemContainer}>
        <AppIcon type='MaterialCommunityIcons' name='library' size={18} color={'#000'} />
        <Text>Library</Text>
      </View>
      <View style={[styles.itemContainer, styles.highlightedItemContainer]}>
        <AppIcon type='MaterialCommunityIcons' name='library' size={18} color={'#fff'} />
        <Text style={styles.whiteText}>Library</Text>
      </View>
      <View style={styles.itemContainer}>
        <AppIcon type='MaterialCommunityIcons' name='library' size={18} color={'#000'} />
        <Text>Library</Text>
      </View>
      <View style={styles.itemContainer}>
        <AppIcon type='MaterialCommunityIcons' name='library' size={18} color={'#000'} />
        <Text>Library</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderTopWidth: 1,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ccc'
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlightedItemContainer: {
    backgroundColor: 'black',
  },
  whiteText: {
    color: 'white',
  },
});

export default Footer;
