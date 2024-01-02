
// HomeScreen.js

import React,{useState} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Buttons from '../../component/Buttons';
import Heading from '../../component/Heading';
import InputeFields from '../../component/InputeFields';
import Messages from '../../component/Messages';
import UseModal from '../../component/UseModal';
import axios from "axios"
import { BASE_URL } from '../../redux/constants';
const AddTeacher = ({closeModal}) => {

 
    const formList = {
      route_number: "",
      vehicle_type: "",
      vehicle_number: "",
      driver_name: "",
      driver_phone: "",
      helper_name: "",
      helper_phone: "",
    };


    console.log("formData", formData)

    const [formData, setFormData] = useState(formList);
    const [errors, setErrors] = useState({});

    const handleChange = (name, value) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };

      const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.route_number) {
          errors.route_number = "Route No is required";
        }
        if (!values.vehicle_type) {
          errors.vehicle_type = "Vehicle Type is required";
        }
        if (!values.vehicle_number) {
          errors.vehicle_number = "Vehicle No is required";
        }
        if (!values.driver_name) {
          errors.driver_name = "Driver Name is required";
        }
        if (!values.driver_phone) {
          errors.driver_phone = "Driver Contact No is required";
        }
        if (!values.helper_name) {
          errors.helper_name = "Helper Name is required";
        }
        if (!values.helper_phone) {
          errors.helper_phone = "Helper Contact No is required";
        }
      
        return errors;
      };


      const transportPostFunc = async () => {

        const logdata = await axios.post(`${BASE_URL}/login`, {
          email: 'monu@gmail.com',
          password: '123456',
          school_id: 58,
        });
        const responseData = logdata?.data;

        axios
          .post(`${BASE_URL}/transport/add_edit_transport`, {...formData, live_tracking: 'yes'}, {
            headers: {
              Authorization: `Bearer ${responseData?.body?.token}` 
            }
          })
          .then((response) => {
           
            if(response?.status === 400){
              toast.error(response?.data?.message);
            } else{
              toast.success(response?.data?.message, {autoClose: 2000, position: "top-center", className: 'customToast'});
              let timer = setTimeout(()=>{
                closeModal()
                clearTimeout(timer)
              },3000)
            }
          })
          .catch((error) => {
            console.log(error)
          });
      };


      const handleSubmit = (event) => {
        event.preventDefault();

        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length === 0) {
            transportPostFunc();
        } else {
          // toast.error("Please fill in the required field!", {
          //   position: "top-center",
          // });
          setErrors(validationErrors);
        }
      };

  return (

  
    <View style={styles.container}>
          <View style={styles.headerFix}>
          <Heading title="Add Transport" />
          </View>


        <View style={styles.formCss}>
        <InputeFields
          label="Route No"
          placeholder="Enter Route No"
          value={formData.route_number}
          onChangeText={(val)=> handleChange('route_number', val)}
        />
        {errors?.route_number && <Messages type="error" title={errors?.route_number} />}
      </View>
      <View style={styles.formCss}>
        <InputeFields
          label="Vehicle Type"
          placeholder="Enter Vehicle Type"
          value={formData.vehicle_type}
          onChangeText={(val)=> handleChange('vehicle_type', val)}
        />
        {errors?.vehicle_type && <Messages type="error" title={errors?.vehicle_type} />}
      </View>
      <View style={styles.formCss}>
        <InputeFields
          label="Vehicle No"
          placeholder="Enter Vehicle No"
          value={formData.vehicle_number}
          onChangeText={(val)=> handleChange('vehicle_number', val)}
        />
        {errors?.vehicle_number && <Messages type="error" title={errors?.vehicle_number} />}
      </View>
      <View style={styles.formCss}>
        <InputeFields
          label="Driver Name"
          placeholder="Enter Driver Name"
          value={formData.driver_name}
          onChangeText={(val)=> handleChange('driver_name', val)}
        />
        {errors?.driver_name && <Messages type="error" title={errors?.driver_name} />}
      </View>
      <View style={styles.formCss}>
        <InputeFields
          label="Driver Contact No"
          placeholder="Enter Contact No"
          value={formData.driver_phone}
          onChangeText={(val)=> handleChange('driver_phone', val)}
        />
        {errors?.driver_phone && <Messages type="error" title={errors?.driver_phone} />}
      </View>
      <View style={styles.formCss}>
        <InputeFields
          label="Helper Name"
          placeholder="Enter Helper Name"
          value={formData.helper_name}
          onChangeText={(val)=> handleChange('helper_name', val)}
        />
        {errors?.helper_name && <Messages type="error" title={errors?.helper_name} />}
      </View>
      <View style={styles.formCss}>
        <InputeFields
          label="Helper Contact No"
          placeholder="Enter Helper Contact No"
          value={formData.helper_phone}
          onChangeText={(val)=> handleChange('helper_phone', val)}
        />
        {errors?.helper_phone && <Messages type="error" title={errors?.helper_phone} />}
      </View>
      <View style={styles.formCss}>
        <InputeFields
          label="Live Tracker"
          placeholder="Enter Live Tracker"
          value={formData.live_tracking}
          onChangeText={(val)=> handleChange('live_tracking', val)}
        />
        {errors?.live_tracking && <Messages type="error" title={errors?.live_tracking} />}
      </View>
      
      <Buttons title="Continue" onPress={handleSubmit} />
    </View>

  );
};

const styles = StyleSheet.create({
  headerFix: {
    backgroundColor: 'white',
    padding: 0,
    elevation: 3,
    zIndex: 1, 
    width:'100%'
  },
  container2: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  formCss: {
    width: "100%",
    marginBottom: 10,
  },
});

export default AddTeacher;