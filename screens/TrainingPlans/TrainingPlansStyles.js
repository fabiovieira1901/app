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
  }
};