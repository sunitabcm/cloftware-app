import { StyleSheet, Platform  } from 'react-native';
export const stylesGlobal = StyleSheet.create({
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
    color: '#000'
  },
  innertext: {
    fontSize: 16,
    color: '#999999'
  },
  button_2: {
    alignItems: 'center',
    paddingTop: 20
  },
  buttonContainer: {
    alignItems: 'center',
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
});
