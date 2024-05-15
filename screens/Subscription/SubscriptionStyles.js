import Variables from "../../assets/styles/Variables";
import { Dimensions } from 'react-native';

export default {
  container: {
    flex: 1,
    backgroundColor: Variables.colors.background,
  },
  webviewBackground: Variables.colors.webviewBackground,
  background: {
    paddingTop: 20,
    flex: 1
  },
  webview: {
    backgroundColor: Variables.colors.background,
    flex: 1,
    height: Dimensions.get('window').height,
    opacity: 0.99
	}
};