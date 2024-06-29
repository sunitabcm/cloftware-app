import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

const CheckboxGlobal = () => {
  const [checkedItems, setCheckedItems] = useState({
    item1: false,
    item2: false,
    item3: false,
  });

  const handleChange = (item) => {
    setCheckedItems({
      ...checkedItems,
      [item]: !checkedItems[item],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Items</Text>
      <CheckBox
        title='Item 1'
        checked={checkedItems.item1}
        onPress={() => handleChange('item1')}
      />
      <CheckBox
        title='Item 2'
        checked={checkedItems.item2}
        onPress={() => handleChange('item2')}
      />
      <CheckBox
        title='Item 3'
        checked={checkedItems.item3}
        onPress={() => handleChange('item3')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default CheckboxGlobal;
