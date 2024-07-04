import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { setSelectedClass } from '../store/slices/classSlice';
import { View } from 'react-native';

const ClassDropdown = () => {
  const dispatch = useDispatch();
  const userTeacherCred = useSelector((state) => state.userDetailsTeacher.user);
  const selectedClass = useSelector((state) => state.class.selectedClass);
  const classes = userTeacherCred.teacherSections || [];
  const [defaultValue, setDefaultValue] = useState(null);

  // useEffect(() => {
  //   const defaultClass = classes.find((cls) => cls.is_class_teacher === 1);
  //   if (defaultClass) {
  //     setDefaultValue(defaultClass.class_id);
  //     dispatch(setSelectedClass(defaultClass));
  //   }
  // }, [classes, dispatch]);

  const handleValueChange = (value) => {
    const selectedClassDetails = classes.find((cls) => cls.class_id === value);
    dispatch(setSelectedClass(selectedClassDetails));
  };

  return (
    <View className='border border-lightgrey rounded-xl capitalize'>
      <RNPickerSelect
        onValueChange={handleValueChange}
        placeholder={{ label: 'Select Class', value: null }}
        items={classes.map((cls) => ({
          label: cls.class_details.class_name,
          value: cls.class_id,
        }))}
        value={selectedClass ? selectedClass.class_id : defaultValue}
      />
    </View>
  );
};

export default ClassDropdown;
