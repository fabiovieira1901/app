import Variables from "../../assets/styles/Variables";
import { Dimensions } from 'react-native';

export default {
  container: {
    flex: 1,
    backgroundColor: Variables.colors.background
  },
  webviewBackground: Variables.colors.webviewBackground,
  background: {
    flex: 1,
    paddingTop: 10
  },
  webview: {
    backgroundColor: "transparent",
    flex: 1,
    height: Dimensions.get('window').height,
    opacity: 0.99
  },
  webviewProcessing: {
    flex: 0,
    height: 0,
    opacity: 0
  }
};