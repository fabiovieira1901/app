import Variables from "../../assets/styles/Variables";

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
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 20
  },
  title: {
    fontSize: Variables.fontSizes.titleCommon,
    color: Variables.colors.title,
    fontFamily: Variables.fonts.primaryBold,
    marginRight: 5,
    flex: 1
  },
  button: {
    margin: -10,
    padding: 10
  },
  buttonIconSize: Variables.sizes.buttonIcon,
  buttonIconColor: Variables.colors.plusIcon,
  rowItem: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: Variables.sizes.border,
    borderBottomColor: Variables.colors.border,
    borderBottomStyle: "solid",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  itemTitleCol: {
    flex: 1
  },
  itemIconCol: {
    width: 20
  },
  itemInfoText: {
    color: Variables.colors.danger,
    fontSize: Variables.fontSizes.textCommon
  },
  itemTitleText: {
    color: Variables.colors.white,
    fontSize: Variables.fontSizes.textCommon
  },
  iconColor: Variables.colors.secondary,
  iconFinishedColor: Variables.colors.success,
  iconNotFinishedColor: Variables.colors.danger,
  iconSize: Variables.sizes.icon,
  itemImageCol: {
    width: 30
  },
  description: {
    marginTop: 10,
    backgroundColor: Variables.colors.backgroundPrimary,
    borderRadius: Variables.radius.medium,
    padding: 10
  },
  descriptionText: {
    fontSize: Variables.fontSizes.textCommon,
    color: Variables.colors.white,
    flexShrink: 1
  }
};