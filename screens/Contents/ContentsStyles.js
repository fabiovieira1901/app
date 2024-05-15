import Variables from "../../assets/styles/Variables";
import { Dimensions } from 'react-native';

export default {
  container: {
    flex: 1,
    backgroundColor: Variables.colors.background
  },
  background: {
    padding: 20,
    flex: 1
  },
  title: {
    fontSize: Variables.fontSizes.titleCommon,
    color: Variables.colors.title,
    fontFamily: Variables.fonts.primaryBold
  },
  containerView: {
    flex: 1
  },
  dataContainer: {
    marginTop: 5,
    flex: 1
  },
  select: {
    paddingTop: 5,
  },
  list: {
    paddingTop: 10,
    flex: 1
  },
  listBox: {
    height: "auto"
  },
  listItem: {
    alignItems: "center"
  },
  listItemTitle: {
    fontSize: Variables.fontSizes.titleSmall,
    textAlign: "center",
    width: "100%"
  },
  listItemDescription: {
    fontSize: Variables.fontSizes.textCommon,
    textAlign: "center"
  }
};