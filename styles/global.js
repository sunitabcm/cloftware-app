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
    borderRadius: 8,
    color: '#2A2D32',
    lineHeight: 16,
    textAlignVertical: 'center',
    outlineWidth: 0,
    borderWidth: 1,
    borderColor: "#f6f5fa",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 13,
    backgroundColor: "#f4f4f4",
    color: "#444",
    height: 50,
  },
  primaryInputDisabled: {
    backgroundColor: '#535353',
    color: '#535353',
    borderWidth: 0,
  },
  primaryDisabled: {
    color: '#535353',
    borderWidth: 0,
    filter: 'grayscale(100%)',
    pointerEvents: 'none',
    backgroundColor: 'transparent',
    opacity: 0.3,
  },
  
});
