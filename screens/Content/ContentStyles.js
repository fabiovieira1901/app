import Variables from "../../assets/styles/Variables";
import { Dimensions } from 'react-native';

export default {
  container: {
    flex: 1,
    backgroundColor: Variables.colors.background,
  },
  background: {
    padding: 20,
    flex: 1
  },
  dataContainer: {
    flex: 1
  },
  title: {
    fontSize: Variables.fontSizes.titleCommon,
    marginBottom: 20,
    color: Variables.colors.title,
    fontFamily: Variables.fonts.primaryBold
  },
  image: {
    paddingBottom: 10
  },
  imageElement: {
    height: 180,
    resizeMode: "contain"
  },
  description: {
    fontSize: Variables.fontSizes.textCommon,
    marginBottom: 20,
    color: Variables.colors.title
  },
  video: {
    marginBottom: 10
  },
  button: {
    marginBottom: 10
  },
  buttonElement: {
    maxWidth: 200
  },
  pdf: {
    height: Dimensions.get('window').height - 200
  }
};