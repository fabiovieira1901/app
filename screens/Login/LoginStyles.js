import Variables from "../../assets/styles/Variables";
import { Dimensions } from 'react-native';

export default {
  container: {
    flex: 1,
    backgroundColor: Variables.colors.background,
  },
  background: {
    flex: 1
  },
  secondaryBackground: Variables.secondaryBackground,
  scroll: {
    flex: 1
  },
  imageContainer: {
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: Dimensions.get('window').height > 650 ? 100 : 60,
    marginBottom: Dimensions.get('window').height > 650 ? 80 : 20,
  },
  image: {
    height: Dimensions.get('window').height > 650 ? 80 : 60,
    resizeMode: "contain"
  },
  title: {
    fontSize: Variables.fontSizes.screenTitle,
    fontFamily: Variables.fonts.primaryBold,
    color: Variables.colors.white,
    textAlign: "center"
  },
  inputs: {
    justifyContent: "center"
  },
  inputContainer: {
    marginTop: 20
  },
  loading: {
    position: "absolute",
    top: 8,
    right: 10
  },
  inputElement: {
    backgroundColor: Variables.colors.transparent,
    borderColor: Variables.colors.white
  },
  labelColor: Variables.colors.white,
  inputText: {
    color: Variables.colors.white
  },
  buttonLogin: {
    marginTop: Dimensions.get('window').height > 650 ? 40 : 20
  },
  registerContainer: {
    marginTop: 15
  },
  registerButton: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center"
  },
  registerText: {
    fontSize: Variables.fontSizes.textCommon,
    color: Variables.colors.white
  },
  forgotPasswordContainer: {
    marginTop: 5
  },
  forgotPasswordText: {
    paddingTop: 5,
    paddingBottom: 10,
    fontSize: Variables.fontSizes.textSmallLogin,
    color: Variables.colors.white
  },
  mkgest: {
    position: "absolute",
    top: Variables.isIos ? Dimensions.get('window').height - 60 : Dimensions.get('window').height - 20,
    left: 0,
    right: 0
  },
  mkgestButton: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  mkgestImage: {
    height: 30,
    width: 30,
    resizeMode: "contain"
  },
  mkgestText: {
    marginLeft: 8,
    color: Variables.colors.white,
    fontFamily: Variables.fonts.primaryBold
  }
};