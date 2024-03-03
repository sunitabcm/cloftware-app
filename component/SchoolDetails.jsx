import React from 'react';
import { View, Text, Linking, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { stylesGlobal } from '../styles/global';
const SchoolDetails = ({ schoolDetails }) => {
  const renderField = (label, value) => (
    <View style={{ marginBottom: 5 }} className='flex flex-row items-start'>
      <Text className='text-lightgrey w-[50%] mr-2' style={{ fontWeight: 'bold' }}>{label}</Text>
      <Text className='capitalize text-body'>: {value}</Text>
    </View>
  );

  return (
    <View className=''>
      <View style={{ marginBottom: 5 }} className='flex flex-col items-start mb-3 mt-3'>
        <Text className='capitalize text-body font-bold'>{schoolDetails.body.school_name}</Text>
        <Text className='capitalize text-lightgrey'>{schoolDetails.body.school_address}, {schoolDetails.body.school_city}, {schoolDetails.body.school_state}, {schoolDetails.body.school_pin_code}</Text>
      </View>
      <View style={{ marginBottom: 5 }} className='flex flex-col items-start mb-3 mt-3'>
        <Text className='capitalize text-body text-lg font-bold mb-2'>Phone number</Text>
        <Text className='capitalize text-body'>+91 {schoolDetails.body.school_phone_number}</Text>
      </View>

      <View style={{ marginBottom: 5 }} className='flex flex-col items-start mb-3 mt-3'>
        <Text className='capitalize text-body text-lg font-bold mb-2'>Email</Text>
        <Text className='capitalize text-body'>{schoolDetails.body.website ? schoolDetails.body.website : 'Not Provided'}</Text>
      </View>

      <View style={{ marginBottom: 5 }} className='flex flex-col items-start mb-3 mt-3'>
        <Text className='capitalize text-body text-lg font-bold mb-2'>Principal Details</Text>
        {renderField('Principal Name', schoolDetails.body.principal_name)}
        {renderField('Principal Contact Number', schoolDetails.body.principal_contact_number)}
        {renderField('Principal Email ID', schoolDetails.body.principal_email_id)}
      </View>

      <View style={{ marginBottom: 5 }} className='flex flex-col items-start mb-3 mt-3'>
        <Text className='capitalize text-body text-lg font-bold mb-2'>Other Details</Text>
        {renderField('School Board', schoolDetails.body.other_details.school_board)}
        {renderField('School PAN Number', schoolDetails.body.other_details.school_pan_number)}
      </View>

      {/* <View style={{ marginBottom: 5 }} className='flex flex-col items-start mb-3 mt-3'>
        <Text className='capitalize text-body text-lg font-bold mb-2'>Commercial Details</Text>
        {renderField('Total Deal Value', schoolDetails.body.commercial_details.total_deal_value)}
        {renderField('Payment Receive', schoolDetails.body.commercial_details.payment_receive)}
      </View>

      <View style={{ marginBottom: 5 }} className='flex flex-col items-start mb-3 mt-3'>
        <Text className='capitalize text-body text-lg font-bold mb-2'>Platform Details</Text>
        {renderField('License Number', schoolDetails.body.platform_licence_detail.licence_number)}
        {renderField('Number of Students', schoolDetails.body.platform_licence_detail.num_student)}
      </View>

      <View style={{ marginBottom: 5 }} className='flex flex-col items-start mb-3 mt-3'>
        <Text className='capitalize text-body text-lg font-bold mb-2'>Other Details</Text>
        {renderField('License Number', schoolDetails.body.platform_licence_detail.licence_number)}
        {renderField('Number of Students', schoolDetails.body.platform_licence_detail.num_student)}
        {renderField('Trust Name', schoolDetails.body.trust_name)}
        {renderField('Trust Address', schoolDetails.body.trust_address)}
        {renderField('Trust State', schoolDetails.body.trust_state)}
        {renderField('Trust City', schoolDetails.body.trust_city)}
        {renderField('Trust Pin Code', schoolDetails.body.trust_pin_code)}
        {renderField('Authorized Signatory Name', schoolDetails.body.authorized_signatory_name)}
        {renderField('Authorized Signatory Designation', schoolDetails.body.authorized_signatory_designation)}
        {renderField('Authorized Signatory Email ID', schoolDetails.body.authorized_signatory_email_id)}
        {renderField('Authorized Signatory Contact Number', schoolDetails.body.authorized_signatory_contact_number)}
        {renderField('Curriculum Board', schoolDetails.body.curriculum_board)}
      </View> */}

      <View style={{ marginBottom: 5 }} className='flex flex-col items-start mb-3 mt-3'>
        <Text className='capitalize text-body text-lg font-bold'>Social Channels</Text>
        <View className="flex-row items-center justify-center py-3 gap-5">
          <Pressable onPress={() => Linking.openURL('https://cloftware.com/')}>
            <Image
              source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/facebook-icon.png' }}
              style={{ width: 36, height: 36 }}
              className='bg-light rounded-[8px]'
            />
          </Pressable>
          <Pressable onPress={() => Linking.openURL('https://cloftware.com/')}>
            <Image
              source={{ uri: 'https://clofterbucket.s3.ap-south-1.amazonaws.com/mobile-assets/instagram.png' }}
              style={{ width: 36, height: 36 }}
              className='bg-light rounded-[8px]'
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SchoolDetails;
