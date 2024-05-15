import Variables from "../../assets/styles/Variables";

export default {
  container: {
    flex: 1,
    backgroundColor: Variables.colors.background,
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
  containerList: {
    marginTop: 20,
    flex: 1
  },
  dataText: {
    color: Variables.colors.white
  },
  emptyText: {
    fontSize: Variables.fontSizes.textCommon,
    color: Variables.colors.white,
    padding: 40,
    textAlign: "center"
  },
  image: {
    marginTop: 10,
    width: 300,
    height: 400,
    resizeMode: "stretch"
  },
  progressView: {
    flex: 1,
  },
  progressViewTitle: {
    color: Variables.colors.black,
    fontFamily: Variables.fonts.primaryBold,
    fontSize: Variables.fontSizes.titleSmall,
    padding: 5,
    paddingTop: 0,
    textAlign: "center",
    borderColor: Variables.colors.borderGray,
    borderStyle: "solid",
    borderBottomWidth: 1
  },
  progressViewItem: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: Variables.colors.borderGray,
    borderStyle: "solid",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  progressViewItemDate: {
    color: Variables.colors.black,
    fontFamily: Variables.fonts.primaryBold,
    fontSize: Variables.fontSizes.textCommon,
    textAlign: "left"
  },
  progressViewItemValue: {
    color: Variables.colors.black,
    fontSize: Variables.fontSizes.textCommon,
    textAlign: "left"
  },
  progressViewItemIcon: {
    marginLeft: 10
  },
};