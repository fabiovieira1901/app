import Variables from "../../assets/styles/Variables";
import { Dimensions } from 'react-native';

export default {
  container: {
    flex: 1,
    backgroundColor: Variables.colors.background
  },
  background: {
    padding: 20,
    paddingBottom: 30,
    flex: 1
  },
  title: {
    fontSize: Variables.fontSizes.titleCommon,
    color: Variables.colors.title,
    fontFamily: Variables.fonts.primaryBold,
  },
  dataText: {
    marginTop: 20,
    color: Variables.colors.white
  },
  photoContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  photo: {
    width: 110,
    height: 110,
    borderRadius: Variables.radius.circle,
    resizeMode: "cover"
  },
  noPhoto: {
    resizeMode: "contain"
  },
  streamingButton: {
    marginTop: 20
  },
  labelItem: {
    padding: 10,
    marginTop: 20,
    backgroundColor: Variables.colors.backgroundPrimary,
    borderRadius: Variables.radius.button
  },
  labelItemIcon: {
    marginRight: 20
  },
  labelItemIconSize: Variables.sizes.icon,
  labelItemIconColor: Variables.colors.plusIcon,
  labelItemTitle: {
    color: Variables.colors.white,
    fontSize: Variables.fontSizes.titleSmall,
    fontFamily: Variables.fonts.primaryBold
  },
  labelItemValue: {
    color: Variables.colors.white,
    fontSize: Variables.fontSizes.titleSmall,
    flex: 1
  },
  labelItemRow: {
    flexDirection: "row",
    marginTop: 10
  },
  button: {
    backgroundColor: Variables.colors.white,
    minWidth: 120,
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 10
  },
  buttonText: {
    fontSize: Variables.fontSizes.textCommon,
    color: Variables.colors.secondary
  },
  buttonTextSmall: {
    color: Variables.colors.secondary,
    fontSize: Variables.fontSizes.textSmallLogin
  },
  buttonIconColor: Variables.colors.secondary,
  boxs: {
    paddingTop: 10,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  boxRow: {
    padding: 6,
    flexBasis: "100%"
  },
  box: {
    padding: 6,
    flexBasis: "50%"
  },
  boxImage: {
    borderRadius: Variables.radius.button
  },
  boxButton: {
    backgroundColor: Variables.colors.backgroundBox,
    borderRadius: Variables.radius.button,
    borderWidth: Variables.sizes.border,
    borderColor: Variables.colors.transparent,
    borderStyle: "solid",
    padding: 12,
    minHeight: 80,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  boxTitle: {
    fontSize: Variables.fontSizes.titleSmall,
    color: Variables.colors.white,
    fontFamily: Variables.fonts.primaryBold,
    textAlign: "center"
  },
  boxValue: {
    fontSize: Variables.fontSizes.textCommon,
    color: Variables.colors.white,
    textAlign: "center",
    marginTop: 10
  }
};