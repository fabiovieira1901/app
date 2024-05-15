import Variables from "../../assets/styles/Variables";
import { Dimensions } from 'react-native';

export default {
  containerMain: {
    flex: 1,
    backgroundColor: Variables.colors.background
  },
  background: {
    paddingTop: Dimensions.get('window').height > 650 ? 150 : 60,
    paddingBottom: 20,
    paddingLeft: Dimensions.get('window').height > 650 ? 30 : 20,
    paddingRight: Dimensions.get('window').height > 650 ? 30 : 20,
    flex: 1
  },
  container: {
    flex: 1,
    marginBottom: 20
  },
  errorMessage: {
    fontSize: Variables.fontSizes.textCommon,
    color: Variables.colors.title,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: 20,
    paddingTop: 100
  },
  flex: {
    flex: 1
  },
  imageContainer: {
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    marginBottom: Dimensions.get('window').height > 650 ? 80 : 60,
  },
  image: {
    height: Dimensions.get('window').height > 650 ? 180 : 120,
    resizeMode: "contain"
  },
  title: {
    marginBottom: 10,
    fontFamily: Variables.fonts.primaryBold,
    fontSize: Variables.fontSizes.screenTitle,
    color: Variables.colors.title,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    maxWidth: 340
  },
  text: {
    marginBottom: 10,
    fontSize: Variables.fontSizes.titleCommon,
    color: Variables.colors.title,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    maxWidth: 340
  },
  button: {
    paddingTop: Dimensions.get('window').height > 650 ? 40 : 20,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20
  },
  buttonSpace: {
    marginBottom: 20,
  },
  languageSelection: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40
  },
  languageButton: {
    marginLeft: 10,
    marginRight: 10,
    opacity: 0.3
  },
  languageButtonActive: {
    opacity: 1
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
  },
  backgroundVideo: {
    height: Dimensions.get('window').height,
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "stretch",
    bottom: 0,
    right: 0
  }
};