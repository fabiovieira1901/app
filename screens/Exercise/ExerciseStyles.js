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
  dataContainer: {
    flex: 1
  },
  titleContainer: {
    marginBottom: 10
  },
  title: {
    fontSize: Variables.fontSizes.titleCommon,
    color: Variables.colors.title,
    fontFamily: Variables.fonts.primaryBold
  },
  subtitle: {
    fontSize: Variables.fontSizes.textCommon,
    color: Variables.colors.title,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10
  },
  photo: {
    marginTop: 10,
    marginBottom: 10,
    height: 150,
    resizeMode: "contain"
  },
  hidden: {
    display: "none"
  },
  description: {
    marginBottom: 10
  }
};