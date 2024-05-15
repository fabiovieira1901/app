import Variables from "../../assets/styles/Variables";

export default {
  container: {
    flex: 1,
    backgroundColor: Variables.colors.background
  },
  background: {
    flex: 1
  },
  padding: {
    paddingLeft: 20,
    paddingRight: 20
  },
  title: {
    fontSize: Variables.fontSizes.titleCommon,
    marginTop: 20,
    marginBottom: 10,
    color: Variables.colors.title,
    fontFamily: Variables.fonts.primaryBold
  },
  photoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 10,
    height: 150
  },
  inputContainer: {
    marginTop: 10
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20
  },
  scroll: {
    flex: 1
  },
  inputRow: {
    marginVertical: 0
  },
  selectContainer: {
    marginTop: 10
  },
  buttonDeleteAccount: {
    marginTop: 20,
    marginBottom: 10
  }
};