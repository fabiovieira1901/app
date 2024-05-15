import Variables from "../../assets/styles/Variables";

export default {
	button: {
        color: Variables.colors.white,
        width: "100%",
        maxWidth: 300,
        marginLeft: "auto",
        marginRight: "auto",
        height: 50,
		borderRadius: Variables.radius.button,
		borderWidth: Variables.sizes.border,
		borderColor: Variables.colors.buttonBorder,
		borderStyle: "solid",
        backgroundColor: Variables.colors.buttonBackground,
        flexDirection: "row",
        justifyContent: "center"
    },
	buttonSecondary: {
        color: Variables.colors.white,
        width: "100%",
        height: 50,
		borderRadius: Variables.radius.button,
		borderWidth: Variables.sizes.border,
		borderColor: Variables.colors.buttonSecondaryBorder,
		borderStyle: "solid",
        backgroundColor: Variables.colors.buttonSecondaryBackground,
        flexDirection: "row",
        justifyContent: "center"
    },
    buttonText: {
        color: Variables.colors.buttonText,
        fontSize: 18,
        alignSelf: "center",
        justifyContent: "center",
        textAlign: "center",
        fontFamily: Variables.fonts.primaryBold
    },
    buttonSecondaryText: {
        color: Variables.colors.buttonSecondaryText,
        fontSize: 18,
        alignSelf: "center",
        justifyContent: "center",
        textAlign: "center",
        fontFamily: Variables.fonts.primaryBold
    },
    image: {
        alignSelf: "center",
        justifyContent: "center",
        marginRight: 15
    }
};