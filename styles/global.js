import { StyleSheet, Platform } from 'react-native';
export const stylesGlobal = StyleSheet.create({
  containerFlexWhite: {
    flex: 1,
    justifyContent: "center",
    position: 'relative',
    alignItems: "center",
    backgroundColor: "#fff", // Set your desired background color
  },
  below_logo: {
    position: "absolute",
    bottom: 20, // Adjust this value to position the frame image as needed
    alignItems: "center",
  },
  circle_1: {
    width: 633,
    height: 633,
    position: 'absolute',
    borderWidth: 50,
    borderColor: "#FFF3E4",
    borderRadius: 1000,
    borderStyle: "solid",
  },
  circle_2: {
    width: 455,
    height: 455,
    position: 'absolute',
    borderWidth: 50,
    borderColor: "#FFF3E4",
    borderRadius: 1000,
    borderStyle: "solid",
  },
  circle_3: {
    width: 253,
    height: 253,
    position: 'absolute',
    borderWidth: 50,
    borderColor: "#FFF3E4",
    borderRadius: 1000,
    borderStyle: "solid",
  },
  image: {
    width: 110,
    height: 110,
    // Additional styles for your image
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  textcontainer: {
    paddingTop: 30,
    paddingBottom: 30
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#535353'
  },
  innertext: {
    fontSize: 14,
    color: '#535353'
  },
  button_2: {
    alignItems: 'center',
    paddingTop: 20
  },
  buttonContainer: {
    // alignItems: 'center',
    paddingTop: 40
  },
  handlerBox: {
    marginHorizontal: "auto",
    marginVertical: "auto",
    width: "100%",
  },
  formFields: {
    width: "100%",
    paddingBottom: 20,
  },
  inputFields: {
    paddingBottom: 15,
    width: "100%",
    alignItems: 'center',
  },
  flexCenter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: "100%",
    alignItems: 'center',
  },
  primaryInput: {
    borderWidth: 1,
    borderColor: '#535353',
    paddingVertical: 13,
    paddingHorizontal: 20,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 14,
    color: '#2A2D32',
    fontFamily: 'Inter-Regular',
    lineHeight: 17,
    textAlignVertical: 'center',
    outlineWidth: 0,
  },
  primaryInputDisabled: {
    backgroundColor: '#E1E1E1',
    color: '#535353',
    borderWidth: 0,
  },
});
