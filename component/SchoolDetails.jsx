import React from 'react';
import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { stylesGlobal } from '../styles/global';
const SchoolDetails = ({ schoolDetails }) => {
  const renderField = (label, value) => (
    <View style={{ marginBottom: 5 }} className='flex flex-row items-center'>
      <Text style={{ fontWeight: 'bold' }}>{label}: </Text>
      <Text className='capitalize'>{value}</Text>
    </View>
  );

  return (
    <View style={{ paddingVertical: 20 }}>
      <Image
        source={{ uri: schoolDetails.body.other_details.school_logo }}
        style={{ width: 100, height: 100, marginBottom: 20, borderRadius: 18 }}
        contentFit='Cover'
      />

{renderField('School Name', schoolDetails.body.school_name)}
      {/* {renderField('School Code', schoolDetails.body.school_code)} */}
      {renderField('School Phone Number', schoolDetails.body.school_phone_number)}
      {renderField('School Address', schoolDetails.body.school_address)}
      {renderField('School State', schoolDetails.body.school_state)}
      {renderField('School City', schoolDetails.body.school_city)}
      {renderField('School Pin Code', schoolDetails.body.school_pin_code)}

      {/* {renderField('Trust Name', schoolDetails.body.trust_name)} */}
      {/* {renderField('Trust Address', schoolDetails.body.trust_address)} */}
      {/* {renderField('Trust State', schoolDetails.body.trust_state)} */}
      {/* {renderField('Trust City', schoolDetails.body.trust_city)} */}
      {/* {renderField('Trust Pin Code', schoolDetails.body.trust_pin_code)} */}

      {/* {renderField('Authorized Signatory Name', schoolDetails.body.authorized_signatory_name)} */}
      {/* {renderField('Authorized Signatory Designation', schoolDetails.body.authorized_signatory_designation)} */}
      {/* {renderField('Authorized Signatory Email ID', schoolDetails.body.authorized_signatory_email_id)} */}
      {/* {renderField('Authorized Signatory Contact Number', schoolDetails.body.authorized_signatory_contact_number)} */}

      {renderField('Website', schoolDetails.body.website)}
      {renderField('Curriculum Board', schoolDetails.body.curriculum_board)}

      {renderField('Principal Name', schoolDetails.body.principal_name)}
      {renderField('Principal Contact Number', schoolDetails.body.principal_contact_number)}
      {renderField('Principal Email ID', schoolDetails.body.principal_email_id)}

      {/* <Text style={[stylesGlobal.title, { fontWeight: 'bold', marginTop: 10 }]}>Other Details:</Text>
      {renderField('School Board', schoolDetails.body.other_details.school_board)}
      {renderField('School PAN Number', schoolDetails.body.other_details.school_pan_number)}

      <Text style={[stylesGlobal.title, { fontWeight: 'bold', marginTop: 10 }]}>Commercial Details:</Text>
      {renderField('Total Deal Value', schoolDetails.body.commercial_details.total_deal_value)}
      {renderField('Payment Receive', schoolDetails.body.commercial_details.payment_receive)}

      <Text style={[stylesGlobal.title, { fontWeight: 'bold', marginTop: 10 }]}>Platform License Details:</Text>
      {renderField('License Number', schoolDetails.body.platform_licence_detail.licence_number)}
      {renderField('Number of Students', schoolDetails.body.platform_licence_detail.num_student)} */}
    </View>
  );
};

export default SchoolDetails;
