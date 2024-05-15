import Variables from "../../assets/styles/Variables";
import { Dimensions } from 'react-native';

export default {
  container: {
    flex: 1,
    backgroundColor: Variables.colors.background
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
    marginBottom: 80
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
    maxWidth: 300,
    fontFamily: Variables.fonts.primaryBold
  },
  logoImage: {
    marginTop: Dimensions.get('window').height > 650 ? 20 : 10,
		height: 80,
		resizeMode: "contain",
		alignSelf: "center",
		justifyContent: "center",
		alignItems: "center"
  },
  subtitle: {
    fontSize: Variables.fontSizes.textCommon,
    marginTop: Dimensions.get('window').height > 650 ? 20 : 10,
    color: Variables.colors.secondary,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    maxWidth: 200
  },
  button: {
    marginTop: Dimensions.get('window').height > 650 ? 40 : 20
  }
};