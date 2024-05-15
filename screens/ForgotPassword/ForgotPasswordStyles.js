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
  imageContainer: {
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 100,
    marginBottom: Dimensions.get('window').height > 650 ? 80 : 40,
  },
  image: {
    height: Dimensions.get('window').height > 650 ? 80 : 60,
    resizeMode: "contain"
  },
  title: {
    fontSize: Variables.fontSizes.screenTitle,
    color: Variables.colors.white,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    maxWidth: 200,
    fontFamily: Variables.fonts.primaryBold
  },
  subtitle: {
    fontSize: Variables.fontSizes.textSmallLogin,
    marginTop: 20,
    color: Variables.colors.secondary,
  },
  backContainer: {
    marginTop: 15,
    position: "absolute",
    top: -10,
    left: 20
  },
  buttonBack: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center"
  },
  backContainerText: {
    fontSize: Variables.fontSizes.textCommon,
    marginTop: Variables.isIos ? 9 : 5,
    color: Variables.colors.white,
    marginLeft: 5,
    fontFamily: Variables.fonts.primaryBold
  },
  buttonImage: {
    marginTop: Variables.back.imageMarginTop
  },
  inputs: {
    flex: 1,
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
  buttonForgotPassword: {
    marginTop: Dimensions.get('window').height > 650 ? 80 : 40
  }
};