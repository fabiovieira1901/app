import Variables from "../../assets/styles/Variables";

export default {
  container: {
    flex: 1,
    backgroundColor: Variables.colors.background
  },
  background: {
    padding: 20,
    flex: 1
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "space-between",
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